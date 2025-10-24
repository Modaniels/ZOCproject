<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();
        
        // Get user's orders with statistics
        $orders = Order::where('user_id', $user->id)
            ->orderBy('created_at', 'desc')
            ->get();
            
        $recentOrders = $orders->take(5)->map(function ($order) {
            return [
                'id' => $order->id,
                'order_number' => $order->order_number,
                'status' => $order->status,
                'total' => $order->total,
                'formatted_total' => 'KSh ' . number_format($order->total, 2),
                'created_at' => $order->created_at->format('M j, Y'),
            ];
        });
        
        $orderStats = [
            'total' => $orders->count(),
            'pending' => $orders->where('status', 'pending')->count(),
            'completed' => $orders->where('status', 'delivered')->count(),
        ];
        
        return Inertia::render('dashboard', [
            'user' => $user,
            'recentOrders' => $recentOrders,
            'orderStats' => $orderStats,
        ]);
    }
}