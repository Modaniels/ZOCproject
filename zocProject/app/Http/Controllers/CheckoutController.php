<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\Order;
use App\Models\OrderItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class CheckoutController extends Controller
{
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
                'user_id' => Auth::id() ?? 0, // Set to 0 for guest users
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
                'payment_status' => $validated['paymentMethod'] === 'mpesa' ? 'pending' : 'pending',
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

            // Simulate M-Pesa payment process
            if ($validated['paymentMethod'] === 'mpesa') {
                // In a real implementation, you would:
                // 1. Call M-Pesa STK Push API
                // 2. Get transaction ID
                // 3. Store payment reference
                // 4. Set up webhook to handle payment confirmation
                
                Log::info('M-Pesa payment simulation', [
                    'order_id' => $order->id,
                    'phone' => $validated['phone'],
                    'amount' => $validated['total'],
                ]);

                // Simulate successful payment after a delay
                // In real implementation, this would be handled by M-Pesa callback
                $order->update([
                    'payment_status' => 'paid',
                    'payment_id' => 'MPESA_' . time(),
                    'payment_date' => now(),
                ]);
            }

            // Clear the cart
            $cartItems->each->delete();

            DB::commit();

            return response()->json([
                'success' => true,
                'message' => 'Order placed successfully!',
                'order_number' => $order->order_number,
                'order_id' => $order->id,
            ]);

        } catch (\Exception $e) {
            DB::rollBack();
            Log::error('Checkout process failed', [
                'error' => $e->getMessage(),
                'user_id' => Auth::id(),
                'session_id' => session()->getId(),
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

    // Simulate M-Pesa callback (in real implementation, this would be called by Safaricom)
    public function mpesaCallback(Request $request)
    {
        // This is where you would handle the M-Pesa payment callback
        // For now, it's just a placeholder for future M-Pesa integration
        
        $validated = $request->validate([
            'order_id' => 'required|exists:orders,id',
            'payment_reference' => 'required|string',
            'status' => 'required|in:success,failed',
        ]);

        try {
            $order = Order::findOrFail($validated['order_id']);

            if ($validated['status'] === 'success') {
                $order->update([
                    'payment_status' => 'paid',
                    'payment_id' => $validated['payment_reference'],
                    'payment_date' => now(),
                ]);

                Log::info('M-Pesa payment successful', [
                    'order_id' => $order->id,
                    'payment_reference' => $validated['payment_reference'],
                ]);
            } else {
                $order->update([
                    'payment_status' => 'failed',
                ]);

                Log::warning('M-Pesa payment failed', [
                    'order_id' => $order->id,
                    'payment_reference' => $validated['payment_reference'],
                ]);
            }

            return response()->json(['success' => true]);

        } catch (\Exception $e) {
            Log::error('M-Pesa callback processing failed', [
                'error' => $e->getMessage(),
                'request_data' => $request->all(),
            ]);

            return response()->json(['success' => false], 500);
        }
    }
}