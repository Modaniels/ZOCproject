<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Http;

class TestMpesaSTK extends Command
{
    protected $signature = 'mpesa:test-stk';
    protected $description = 'Test M-Pesa STK Push directly';

    public function handle()
    {
        $this->info('Testing M-Pesa STK Push directly...');

        // Get access token first
        $consumerKey = config('mpesa.mpesa_consumer_key');
        $consumerSecret = config('mpesa.mpesa_consumer_secret');
        
        $authResponse = Http::withOptions(['verify' => false])
            ->withBasicAuth($consumerKey, $consumerSecret)
            ->get('https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials');

        if (!$authResponse->successful()) {
            $this->error('Failed to get access token');
            return 1;
        }

        $accessToken = $authResponse->json()['access_token'];
        $this->info('✅ Got access token: ' . substr($accessToken, 0, 20) . '...');

        // Prepare STK Push request
        $shortcode = config('mpesa.shortcode');
        $passkey = config('mpesa.passkey');
        $timestamp = date('YmdHis');
        $password = base64_encode($shortcode . $passkey . $timestamp);
        
        $stkData = [
            'BusinessShortCode' => $shortcode,
            'Password' => $password,
            'Timestamp' => $timestamp,
            'TransactionType' => 'CustomerPayBillOnline',
            'Amount' => 1,
            'PartyA' => '254708374149', // Test phone number from Safaricom docs
            'PartyB' => $shortcode,
            'PhoneNumber' => '254708374149',
            'CallBackURL' => config('mpesa.callbacks.callback_url'),
            'AccountReference' => 'TEST123',
            'TransactionDesc' => 'Test payment'
        ];

        $this->info('Request data:');
        $this->line(json_encode($stkData, JSON_PRETTY_PRINT));

        try {
            $stkResponse = Http::withOptions(['verify' => false])
                ->withHeaders([
                    'Authorization' => 'Bearer ' . $accessToken,
                    'Content-Type' => 'application/json',
                ])
                ->post('https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest', $stkData);

            $this->info('STK Response Status: ' . $stkResponse->status());
            $this->info('STK Response Body: ' . $stkResponse->body());

            $responseData = $stkResponse->json();
            
            if ($stkResponse->successful() && isset($responseData['ResponseCode']) && $responseData['ResponseCode'] == '0') {
                $this->info('✅ STK Push successful!');
                $this->info('CheckoutRequestID: ' . $responseData['CheckoutRequestID']);
                $this->info('CustomerMessage: ' . $responseData['CustomerMessage']);
            } else {
                $this->error('❌ STK Push failed');
                if (isset($responseData['errorMessage'])) {
                    $this->error('Error: ' . $responseData['errorMessage']);
                }
            }

        } catch (\Exception $e) {
            $this->error('❌ Exception: ' . $e->getMessage());
        }

        return 0;
    }
}