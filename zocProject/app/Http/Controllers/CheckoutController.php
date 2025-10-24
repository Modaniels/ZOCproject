<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\Order;
use App\Models\OrderItem;
use App\Services\MpesaService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class CheckoutController extends Controller
{
    protected $mpesaService;

    public function __construct(MpesaService $mpesaService)
    {
        $this->mpesaService = $mpesaService;
    }
    public function index()
    {
        // Get cart items for authenticated users or session-based cart
        if (Auth::check()) {
            $cartItems = Cart::with(['product.primaryImage'])
                ->where('user_id', Auth::id())
                ->get();
        } else {
            $sessionId = session()->getId();
            $cartItems = Cart::with(['product.primaryImage'])
                ->where('session_id', $sessionId)
                ->get();
        }

        // Calculate total
        $total = $cartItems->sum(function ($item) {
            return $item->quantity * $item->price;
        });

        // Get user details for pre-filling form
        $userDetails = null;
        if (Auth::check()) {
            $user = Auth::user();
            $userDetails = [
                'firstName' => $user->name ? explode(' ', $user->name)[0] : '',
                'lastName' => $user->name && count(explode(' ', $user->name)) > 1 ? explode(' ', $user->name)[1] : '',
                'email' => $user->email,
                'phone' => $user->phone ?? '',
                'address' => $user->address ?? '',
                'city' => $user->city ?? '',
                'county' => $user->state ?? '',
            ];
        }

        return Inertia::render('checkout', [
            'cartItems' => $cartItems->map(function ($item) {
                return [
                    'id' => $item->id,
                    'product_id' => $item->product_id,
                    'quantity' => $item->quantity,
                    'price' => $item->price,
                    'total' => $item->quantity * $item->price,
                    'product' => [
                        'id' => $item->product->id,
                        'name' => $item->product->name,
                        'slug' => $item->product->slug,
                        'price' => $item->product->price,
                        'formatted_price' => 'KSh ' . number_format($item->product->price),
                        'weight' => $item->product->weight ?? '',
                        'primary_image' => $item->product->primaryImage ? [
                            'image_path' => $item->product->primaryImage->image_path,
                            'alt_text' => $item->product->primaryImage->alt_text,
                            'url' => asset('storage/' . $item->product->primaryImage->image_path),
                        ] : null,
                    ],
                ];
            }),
            'total' => $total,
            'userDetails' => $userDetails,
        ]);
    }

    public function process(Request $request)
    {
        // Validate the request
        $validated = $request->validate([
            'firstName' => 'required|string|max:255',
            'lastName' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'required|string|max:20',
            'address' => 'required|string|max:500',
            'city' => 'required|string|max:255',
            'county' => 'required|string|max:255',
            'deliveryNotes' => 'nullable|string|max:1000',
            'paymentMethod' => 'required|in:mpesa,cod',
            'items' => 'required|array',
            'total' => 'required|numeric|min:0',
        ]);

        try {
            DB::beginTransaction();

            // Get cart items
            if (Auth::check()) {
                $cartItems = Cart::with('product')
                    ->where('user_id', Auth::id())
                    ->get();
            } else {
                $sessionId = session()->getId();
                $cartItems = Cart::with('product')
                    ->where('session_id', $sessionId)
                    ->get();
            }

            if ($cartItems->isEmpty()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Your cart is empty.',
                ], 400);
            }

            // Create order
            $order = Order::create([
                'user_id' => Auth::id(), // Will be null for guest users
                'order_number' => 'ZOC-' . time() . '-' . rand(1000, 9999),
                'status' => 'pending',
                'subtotal' => $validated['total'],
                'tax_amount' => 0,
                'shipping_amount' => 0, // Free delivery
                'total_amount' => $validated['total'],
                'currency' => 'KSH',
                'billing_first_name' => $validated['firstName'],
                'billing_last_name' => $validated['lastName'],
                'billing_email' => $validated['email'],
                'billing_phone' => $validated['phone'],
                'billing_address' => $validated['address'],
                'billing_city' => $validated['city'],
                'billing_state' => $validated['county'],
                'billing_postal_code' => '00000',
                'billing_country' => 'Kenya',
                'shipping_first_name' => $validated['firstName'],
                'shipping_last_name' => $validated['lastName'],
                'shipping_phone' => $validated['phone'],
                'shipping_address' => $validated['address'],
                'shipping_city' => $validated['city'],
                'shipping_state' => $validated['county'],
                'shipping_postal_code' => '00000',
                'shipping_country' => 'Kenya',
                'payment_method' => $validated['paymentMethod'],
                'payment_status' => 'pending',
                'notes' => $validated['deliveryNotes'],
            ]);

            // Create order items
            foreach ($cartItems as $cartItem) {
                OrderItem::create([
                    'order_id' => $order->id,
                    'product_id' => $cartItem->product_id,
                    'product_name' => $cartItem->product->name,
                    'product_sku' => $cartItem->product->sku ?? '',
                    'quantity' => $cartItem->quantity,
                    'unit_price' => $cartItem->price,
                    'total_price' => $cartItem->quantity * $cartItem->price,
                ]);
            }

            // Process payment based on method
            if ($validated['paymentMethod'] === 'mpesa') {
                // Initiate M-Pesa STK Push
                $mpesaResponse = $this->mpesaService->stkPush(
                    $validated['phone'],
                    $validated['total'],
                    $order->order_number,
                    'Payment for Order ' . $order->order_number
                );

                if ($mpesaResponse['success']) {
                    // Update order with M-Pesa details
                    $order->update([
                        'mpesa_checkout_request_id' => $mpesaResponse['checkout_request_id'],
                        'mpesa_merchant_request_id' => $mpesaResponse['merchant_request_id'],
                        'mpesa_phone_number' => $validated['phone'],
                        'mpesa_response' => $mpesaResponse
                    ]);

                    DB::commit();

                    return response()->json([
                        'success' => true,
                        'message' => $mpesaResponse['message'],
                        'order_number' => $order->order_number,
                        'order_id' => $order->id,
                        'checkout_request_id' => $mpesaResponse['checkout_request_id'],
                        'payment_method' => 'mpesa'
                    ]);
                } else {
                    DB::rollBack();
                    Log::warning('M-Pesa STK Push failed', [
                        'response' => $mpesaResponse,
                        'order_id' => $order->id
                    ]);
                    
                    // Check if it's a credential issue
                    if (isset($mpesaResponse['response']['errorMessage']) && 
                        str_contains($mpesaResponse['response']['errorMessage'], 'Access Token')) {
                        return response()->json([
                            'success' => false,
                            'message' => 'M-Pesa service is currently unavailable. Please try again later or use Cash on Delivery.',
                        ], 400);
                    }
                    
                    return response()->json([
                        'success' => false,
                        'message' => $mpesaResponse['message'],
                    ], 400);
                }
            } else {
                // Cash on delivery
                $order->update([
                    'payment_status' => 'pending',
                ]);

                // Clear the cart
                $cartItems->each->delete();

                DB::commit();

                return response()->json([
                    'success' => true,
                    'message' => 'Order placed successfully! You will pay upon delivery.',
                    'order_number' => $order->order_number,
                    'order_id' => $order->id,
                    'payment_method' => 'cod'
                ]);
            }

        } catch (\Exception $e) {
            DB::rollBack();
            Log::error('Checkout process failed', [
                'error' => $e->getMessage(),
                'user_id' => Auth::id(),
                'session_id' => session()->getId(),
                'trace' => $e->getTraceAsString()
            ]);

            return response()->json([
                'success' => false,
                'message' => 'An error occurred while processing your order. Please try again.',
            ], 500);
        }
    }

    public function success(Request $request)
    {
        $orderNumber = $request->get('order_number');
        $email = $request->get('email');

        return Inertia::render('checkout-success', [
            'orderNumber' => $orderNumber,
            'email' => $email,
        ]);
    }

    /**
     * Handle M-Pesa callback from Safaricom
     */
    public function mpesaCallback(Request $request)
    {
        Log::info('M-Pesa callback received', $request->all());

        try {
            $callbackData = $request->all();
            $result = $this->mpesaService->processCallback($callbackData);

            if ($result && $result['success']) {
                // Find order by checkout request ID
                $order = Order::where('mpesa_checkout_request_id', $result['checkout_request_id'])->first();

                if ($order) {
                    $order->update([
                        'payment_status' => 'paid',
                        'payment_id' => $result['mpesa_receipt_number'],
                        'payment_date' => now(),
                        'mpesa_receipt_number' => $result['mpesa_receipt_number'],
                        'mpesa_transaction_date' => $result['transaction_date'],
                        'status' => 'confirmed'
                    ]);

                    // Clear the cart after successful payment
                    if ($order->user_id) {
                        Cart::where('user_id', $order->user_id)->delete();
                    }

                    Log::info('M-Pesa payment successful', [
                        'order_id' => $order->id,
                        'order_number' => $order->order_number,
                        'mpesa_receipt' => $result['mpesa_receipt_number'],
                    ]);
                } else {
                    Log::warning('Order not found for M-Pesa callback', [
                        'checkout_request_id' => $result['checkout_request_id']
                    ]);
                }
            } else if ($result && !$result['success']) {
                // Payment failed
                $order = Order::where('mpesa_checkout_request_id', $result['checkout_request_id'])->first();
                
                if ($order) {
                    $order->update([
                        'payment_status' => 'failed',
                        'status' => 'cancelled'
                    ]);

                    Log::warning('M-Pesa payment failed', [
                        'order_id' => $order->id,
                        'result_code' => $result['result_code'],
                        'result_desc' => $result['result_desc']
                    ]);
                }
            }

            // Always return success to M-Pesa
            return response()->json([
                'ResultCode' => 0,
                'ResultDesc' => 'Accepted'
            ]);

        } catch (\Exception $e) {
            Log::error('M-Pesa callback processing failed', [
                'error' => $e->getMessage(),
                'request_data' => $request->all(),
                'trace' => $e->getTraceAsString()
            ]);

            // Still return success to prevent M-Pesa retries
            return response()->json([
                'ResultCode' => 0,
                'ResultDesc' => 'Accepted'
            ]);
        }
    }

    /**
     * Check payment status for M-Pesa orders
     */
    public function checkPaymentStatus(Request $request)
    {
        $validated = $request->validate([
            'order_id' => 'required|exists:orders,id',
        ]);

        try {
            $order = Order::findOrFail($validated['order_id']);

            // If payment is already completed, return success
            if ($order->payment_status === 'paid') {
                return response()->json([
                    'success' => true,
                    'status' => 'paid',
                    'message' => 'Payment successful',
                    'order' => [
                        'order_number' => $order->order_number,
                        'payment_status' => $order->payment_status,
                        'mpesa_receipt_number' => $order->mpesa_receipt_number,
                    ]
                ]);
            }

            // If payment failed, return failure
            if ($order->payment_status === 'failed') {
                return response()->json([
                    'success' => false,
                    'status' => 'failed',
                    'message' => 'Payment failed. Please try again.',
                ]);
            }

            // If M-Pesa order and still pending, query M-Pesa for status
            if ($order->payment_method === 'mpesa' && $order->mpesa_checkout_request_id) {
                $mpesaStatus = $this->mpesaService->stkQuery($order->mpesa_checkout_request_id);

                if ($mpesaStatus['success'] && isset($mpesaStatus['data']['ResponseCode'])) {
                    $responseCode = $mpesaStatus['data']['ResponseCode'];
                    
                    if ($responseCode == '0') {
                        // Payment successful
                        $order->update([
                            'payment_status' => 'paid',
                            'payment_date' => now(),
                            'status' => 'confirmed'
                        ]);

                        return response()->json([
                            'success' => true,
                            'status' => 'paid',
                            'message' => 'Payment successful',
                        ]);
                    } else {
                        // Payment still pending or failed
                        return response()->json([
                            'success' => false,
                            'status' => 'pending',
                            'message' => 'Payment is still pending. Please complete the payment on your phone.',
                        ]);
                    }
                }
            }

            // Default pending response
            return response()->json([
                'success' => false,
                'status' => 'pending',
                'message' => 'Payment is still pending.',
            ]);

        } catch (\Exception $e) {
            Log::error('Payment status check failed', [
                'error' => $e->getMessage(),
                'order_id' => $validated['order_id']
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Failed to check payment status',
            ], 500);
        }
    }
}