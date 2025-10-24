<?php

namespace App\Services;

use Iankumu\Mpesa\Facades\Mpesa;
use Illuminate\Support\Facades\Log;

class MpesaService
{
    /**
     * Initiate STK Push using the package facade
     */
    public function stkPush($phone, $amount, $accountReference, $transactionDesc)
    {
        try {
            // Format phone number
            $phone = $this->formatPhoneNumber($phone);
            
            Log::info('Initiating M-Pesa STK Push', [
                'phone' => $phone,
                'amount' => $amount,
                'account_reference' => $accountReference
            ]);

            // Use the package facade with correct parameters
            $response = Mpesa::stkpush(
                $phone,                                    // Phone number
                $amount,                                   // Amount
                $accountReference,                         // Account reference
                config('mpesa.callbacks.callback_url'),    // Callback URL (optional)
                Mpesa::PAYBILL                            // Transaction type (PayBill)
            );

            $responseData = $response->json();

            Log::info('M-Pesa STK Push Response', [
                'status' => $response->status(),
                'response' => $responseData
            ]);

            if ($response->successful() && isset($responseData['ResponseCode']) && $responseData['ResponseCode'] == '0') {
                return [
                    'success' => true,
                    'message' => $responseData['CustomerMessage'] ?? 'STK Push sent successfully',
                    'checkout_request_id' => $responseData['CheckoutRequestID'],
                    'merchant_request_id' => $responseData['MerchantRequestID']
                ];
            }

            return [
                'success' => false,
                'message' => 'M-Pesa payment is temporarily unavailable. Please choose Cash on Delivery or try again later.',
                'response' => $responseData
            ];

        } catch (\Exception $e) {
            Log::error('M-Pesa STK Push failed', [
                'error' => $e->getMessage(),
                'phone' => $phone ?? 'unknown',
                'amount' => $amount ?? 'unknown',
                'trace' => $e->getTraceAsString()
            ]);

            return [
                'success' => false,
                'message' => 'Payment request failed. Please try again.'
            ];
        }
    }

    /**
     * Query STK Push status using the package facade
     */
    public function stkQuery($checkoutRequestId)
    {
        try {
            Log::info('Querying M-Pesa STK status', [
                'checkout_request_id' => $checkoutRequestId
            ]);

            $response = Mpesa::stkquery($checkoutRequestId);
            $responseData = $response->json();

            Log::info('M-Pesa STK Query Response', [
                'status' => $response->status(),
                'response' => $responseData
            ]);

            return [
                'success' => $response->successful(),
                'data' => $responseData
            ];

        } catch (\Exception $e) {
            Log::error('M-Pesa STK Query failed', [
                'error' => $e->getMessage(),
                'checkout_request_id' => $checkoutRequestId
            ]);

            return [
                'success' => false,
                'message' => 'Query failed'
            ];
        }
    }

    /**
     * Format phone number to M-Pesa format
     */
    private function formatPhoneNumber($phone)
    {
        // Remove any spaces, dashes, or other characters
        $phone = preg_replace('/[^0-9]/', '', $phone);
        
        // Convert to international format
        if (substr($phone, 0, 1) === '0') {
            $phone = '254' . substr($phone, 1);
        } elseif (substr($phone, 0, 3) !== '254') {
            $phone = '254' . $phone;
        }
        
        return $phone;
    }

    /**
     * Process M-Pesa callback
     */
    public function processCallback($callbackData)
    {
        try {
            if (!isset($callbackData['Body'])) {
                Log::error('Invalid M-Pesa callback structure', $callbackData);
                return false;
            }

            $stkCallback = $callbackData['Body']['stkCallback'];
            $resultCode = $stkCallback['ResultCode'];
            $checkoutRequestId = $stkCallback['CheckoutRequestID'];
            $merchantRequestId = $stkCallback['MerchantRequestID'];

            Log::info('Processing M-Pesa callback', [
                'checkout_request_id' => $checkoutRequestId,
                'merchant_request_id' => $merchantRequestId,
                'result_code' => $resultCode
            ]);

            if ($resultCode == 0) {
                // Payment successful
                $callbackMetadata = $stkCallback['CallbackMetadata']['Item'] ?? [];
                $mpesaReceiptNumber = '';
                $transactionDate = '';
                $phoneNumber = '';
                
                foreach ($callbackMetadata as $item) {
                    switch ($item['Name']) {
                        case 'MpesaReceiptNumber':
                            $mpesaReceiptNumber = $item['Value'];
                            break;
                        case 'TransactionDate':
                            $transactionDate = $item['Value'];
                            break;
                        case 'PhoneNumber':
                            $phoneNumber = $item['Value'];
                            break;
                    }
                }

                return [
                    'success' => true,
                    'checkout_request_id' => $checkoutRequestId,
                    'merchant_request_id' => $merchantRequestId,
                    'mpesa_receipt_number' => $mpesaReceiptNumber,
                    'transaction_date' => $transactionDate,
                    'phone_number' => $phoneNumber
                ];
            } else {
                // Payment failed
                $resultDesc = $stkCallback['ResultDesc'] ?? 'Payment failed';
                
                Log::warning('M-Pesa payment failed', [
                    'checkout_request_id' => $checkoutRequestId,
                    'result_code' => $resultCode,
                    'result_desc' => $resultDesc
                ]);

                return [
                    'success' => false,
                    'checkout_request_id' => $checkoutRequestId,
                    'result_code' => $resultCode,
                    'result_desc' => $resultDesc
                ];
            }

        } catch (\Exception $e) {
            Log::error('M-Pesa callback processing failed', [
                'error' => $e->getMessage(),
                'callback_data' => $callbackData
            ]);

            return false;
        }
    }
}