<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\OrderItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class OrderController extends Controller
{
    /**
     * Display a listing of the user's orders.
     */
    public function index(Request $request)
    {
        if (!Auth::check()) {
            return redirect()->route('login');
        }

        $query = Order::with(['items.product.primaryImage'])
            ->where('user_id', Auth::id())
            ->orderBy('created_at', 'desc');

        // Filter by status if provided
        if ($request->has('status') && $request->status !== '') {
            $query->where('status', $request->status);
        }

        // Search by order number
        if ($request->has('search') && $request->search !== '') {
            $query->where('order_number', 'like', '%' . $request->search . '%');
        }

        $orders = $query->paginate(10);

        // Transform orders for frontend
        $transformedOrders = $orders->map(function ($order) {
            return [
                'id' => $order->id,
                'order_number' => $order->order_number,
                'status' => $order->status,
                'payment_status' => $order->payment_status,
                'total_amount' => $order->total_amount,
                'formatted_total' => 'KSh ' . number_format($order->total_amount),
                'created_at' => $order->created_at->format('M d, Y'),
                'items_count' => $order->items->count(),
                'items' => $order->items->map(function ($item) {
                    return [
                        'id' => $item->id,
                        'quantity' => $item->quantity,
                        'price' => $item->price,
                        'product' => [
                            'id' => $item->product->id,
                            'name' => $item->product->name,
                            'slug' => $item->product->slug,
                            'primary_image' => $item->product->primaryImage ? [
                                'url' => asset('storage/' . $item->product->primaryImage->image_path),
                                'alt_text' => $item->product->primaryImage->alt_text,
                            ] : null,
                        ],
                    ];
                }),
            ];
        });

        return Inertia::render('orders/index', [
            'orders' => [
                'data' => $transformedOrders,
                'current_page' => $orders->currentPage(),
                'last_page' => $orders->lastPage(),
                'per_page' => $orders->perPage(),
                'total' => $orders->total(),
            ],
            'filters' => $request->only(['status', 'search']),
        ]);
    }

    /**
     * Display the specified order.
     */
    public function show(Order $order)
    {
        // Check if user owns this order
        if (!Auth::check() || $order->user_id !== Auth::id()) {
            abort(403, 'You are not authorized to view this order.');
        }

        $order->load(['items.product.primaryImage']);

        $transformedOrder = [
            'id' => $order->id,
            'order_number' => $order->order_number,
            'status' => $order->status,
            'payment_status' => $order->payment_status,
            'payment_method' => $order->payment_method,
            'subtotal' => $order->subtotal,
            'tax_amount' => $order->tax_amount,
            'shipping_amount' => $order->shipping_amount,
            'total_amount' => $order->total_amount,
            'formatted_subtotal' => 'KSh ' . number_format($order->subtotal),
            'formatted_tax' => 'KSh ' . number_format($order->tax_amount),
            'formatted_shipping' => 'KSh ' . number_format($order->shipping_amount),
            'formatted_total' => 'KSh ' . number_format($order->total_amount),
            'created_at' => $order->created_at->format('M d, Y g:i A'),
            'billing_address' => [
                'first_name' => $order->billing_first_name,
                'last_name' => $order->billing_last_name,
                'email' => $order->billing_email,
                'phone' => $order->billing_phone,
                'address' => $order->billing_address,
                'city' => $order->billing_city,
                'state' => $order->billing_state,
                'postal_code' => $order->billing_postal_code,
                'country' => $order->billing_country,
            ],
            'shipping_address' => [
                'first_name' => $order->shipping_first_name,
                'last_name' => $order->shipping_last_name,
                'phone' => $order->shipping_phone,
                'address' => $order->shipping_address,
                'city' => $order->shipping_city,
                'state' => $order->shipping_state,
                'postal_code' => $order->shipping_postal_code,
                'country' => $order->shipping_country,
            ],
            'items' => $order->items->map(function ($item) {
                return [
                    'id' => $item->id,
                    'quantity' => $item->quantity,
                    'price' => $item->price,
                    'formatted_price' => 'KSh ' . number_format($item->price),
                    'total' => $item->quantity * $item->price,
                    'formatted_total' => 'KSh ' . number_format($item->quantity * $item->price),
                    'product' => [
                        'id' => $item->product->id,
                        'name' => $item->product->name,
                        'slug' => $item->product->slug,
                        'primary_image' => $item->product->primaryImage ? [
                            'url' => asset('storage/' . $item->product->primaryImage->image_path),
                            'alt_text' => $item->product->primaryImage->alt_text,
                        ] : null,
                    ],
                ];
            }),
        ];

        return Inertia::render('orders/show', [
            'order' => $transformedOrder,
        ]);
    }

    /**
     * Track order by order number (for guests)
     */
    public function track(Request $request)
    {
        $request->validate([
            'order_number' => 'required|string',
            'email' => 'required|email',
        ]);

        $order = Order::where('order_number', $request->order_number)
            ->where('billing_email', $request->email)
            ->with(['items.product.primaryImage'])
            ->first();

        if (!$order) {
            return back()->withErrors([
                'order_number' => 'Order not found. Please check your order number and email address.',
            ]);
        }

        // Use the same transformation as the show method
        $transformedOrder = [
            'id' => $order->id,
            'order_number' => $order->order_number,
            'status' => $order->status,
            'payment_status' => $order->payment_status,
            'payment_method' => $order->payment_method,
            'total_amount' => $order->total_amount,
            'formatted_total' => 'KSh ' . number_format($order->total_amount),
            'created_at' => $order->created_at->format('M d, Y g:i A'),
            'items' => $order->items->map(function ($item) {
                return [
                    'id' => $item->id,
                    'quantity' => $item->quantity,
                    'price' => $item->price,
                    'formatted_price' => 'KSh ' . number_format($item->price),
                    'product' => [
                        'id' => $item->product->id,
                        'name' => $item->product->name,
                        'primary_image' => $item->product->primaryImage ? [
                            'url' => asset('storage/' . $item->product->primaryImage->image_path),
                            'alt_text' => $item->product->primaryImage->alt_text,
                        ] : null,
                    ],
                ];
            }),
        ];

        return Inertia::render('orders/track', [
            'order' => $transformedOrder,
        ]);
    }

    /**
     * Show order tracking form
     */
    public function trackForm()
    {
        return Inertia::render('orders/track-form');
    }
}
