<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\Order;
use App\Models\User;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Carbon\Carbon;

class AdminController extends Controller
{
    public function __construct()
    {
        // Add authentication middleware for admin users
        $this->middleware('auth');
    }

    public function dashboard()
    {
        // Get dashboard statistics
        $stats = $this->getDashboardStats();
        
        // Get recent data
        $recent_orders = $this->getRecentOrders();
        $recent_products = $this->getRecentProducts();
        $recent_users = $this->getRecentUsers();

        return Inertia::render('admin-dashboard', [
            'stats' => $stats,
            'recent_orders' => $recent_orders,
            'recent_products' => $recent_products,
            'recent_users' => $recent_users,
        ]);
    }

    public function products(Request $request)
    {
        $query = Product::with(['category', 'primaryImage']);

        // Search functionality
        if ($request->has('search') && $request->search) {
            $query->where('name', 'like', '%' . $request->search . '%')
                  ->orWhere('description', 'like', '%' . $request->search . '%');
        }

        // Category filter
        if ($request->has('category') && $request->category) {
            $query->where('category_id', $request->category);
        }

        // Status filter
        if ($request->has('status') && $request->status) {
            $query->where('status', $request->status);
        }

        // Sorting
        $sortBy = $request->get('sort_by', 'created_at');
        $sortOrder = $request->get('sort_order', 'desc');
        $query->orderBy($sortBy, $sortOrder);

        $products = $query->paginate(20);

        $categories = Category::all();

        return Inertia::render('admin/products', [
            'products' => $products->items(),
            'pagination' => [
                'current_page' => $products->currentPage(),
                'last_page' => $products->lastPage(),
                'per_page' => $products->perPage(),
                'total' => $products->total(),
            ],
            'categories' => $categories,
            'filters' => $request->only(['search', 'category', 'status', 'sort_by', 'sort_order']),
        ]);
    }

    public function orders(Request $request)
    {
        $query = Order::with(['orderItems.product']);

        // Search functionality
        if ($request->has('search') && $request->search) {
            $query->where('order_number', 'like', '%' . $request->search . '%')
                  ->orWhere('billing_email', 'like', '%' . $request->search . '%')
                  ->orWhere('billing_first_name', 'like', '%' . $request->search . '%')
                  ->orWhere('billing_last_name', 'like', '%' . $request->search . '%');
        }

        // Status filter
        if ($request->has('status') && $request->status) {
            $query->where('status', $request->status);
        }

        // Payment status filter
        if ($request->has('payment_status') && $request->payment_status) {
            $query->where('payment_status', $request->payment_status);
        }

        // Date range filter
        if ($request->has('date_from') && $request->date_from) {
            $query->whereDate('created_at', '>=', $request->date_from);
        }
        if ($request->has('date_to') && $request->date_to) {
            $query->whereDate('created_at', '<=', $request->date_to);
        }

        // Sorting
        $sortBy = $request->get('sort_by', 'created_at');
        $sortOrder = $request->get('sort_order', 'desc');
        $query->orderBy($sortBy, $sortOrder);

        $orders = $query->paginate(20);

        return Inertia::render('admin/orders', [
            'orders' => $orders->items(),
            'pagination' => [
                'current_page' => $orders->currentPage(),
                'last_page' => $orders->lastPage(),
                'per_page' => $orders->perPage(),
                'total' => $orders->total(),
            ],
            'filters' => $request->only(['search', 'status', 'payment_status', 'date_from', 'date_to', 'sort_by', 'sort_order']),
        ]);
    }

    public function customers(Request $request)
    {
        $query = User::query();

        // Search functionality
        if ($request->has('search') && $request->search) {
            $query->where('name', 'like', '%' . $request->search . '%')
                  ->orWhere('email', 'like', '%' . $request->search . '%');
        }

        // Verification filter
        if ($request->has('verified') && $request->verified !== '') {
            if ($request->verified === '1') {
                $query->whereNotNull('email_verified_at');
            } else {
                $query->whereNull('email_verified_at');
            }
        }

        // Sorting
        $sortBy = $request->get('sort_by', 'created_at');
        $sortOrder = $request->get('sort_order', 'desc');
        $query->orderBy($sortBy, $sortOrder);

        $users = $query->paginate(20);

        return Inertia::render('admin/customers', [
            'customers' => $users->items(),
            'pagination' => [
                'current_page' => $users->currentPage(),
                'last_page' => $users->lastPage(),
                'per_page' => $users->perPage(),
                'total' => $users->total(),
            ],
            'filters' => $request->only(['search', 'verified', 'sort_by', 'sort_order']),
        ]);
    }

    public function updateOrderStatus(Request $request, Order $order)
    {
        $request->validate([
            'status' => 'required|in:pending,confirmed,processing,shipped,delivered,cancelled',
        ]);

        $order->update([
            'status' => $request->status,
            'shipped_at' => $request->status === 'shipped' ? now() : $order->shipped_at,
            'delivered_at' => $request->status === 'delivered' ? now() : $order->delivered_at,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Order status updated successfully.',
        ]);
    }

    public function updatePaymentStatus(Request $request, Order $order)
    {
        $request->validate([
            'payment_status' => 'required|in:pending,paid,failed,refunded',
        ]);

        $order->update([
            'payment_status' => $request->payment_status,
            'payment_date' => $request->payment_status === 'paid' ? now() : $order->payment_date,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Payment status updated successfully.',
        ]);
    }

    private function getDashboardStats()
    {
        return [
            'total_products' => Product::count(),
            'total_orders' => Order::count(),
            'total_users' => User::count(),
            'total_revenue' => Order::where('payment_status', 'paid')->sum('total_amount'),
            'pending_orders' => Order::where('status', 'pending')->count(),
            'low_stock_products' => Product::where('stock_quantity', '<', 10)->count(),
            'monthly_revenue' => Order::where('payment_status', 'paid')
                ->whereBetween('created_at', [Carbon::now()->startOfMonth(), Carbon::now()->endOfMonth()])
                ->sum('total_amount'),
            'monthly_orders' => Order::whereBetween('created_at', [Carbon::now()->startOfMonth(), Carbon::now()->endOfMonth()])
                ->count(),
        ];
    }

    private function getRecentOrders($limit = 10)
    {
        return Order::orderBy('created_at', 'desc')
            ->limit($limit)
            ->get()
            ->map(function ($order) {
                return [
                    'id' => $order->id,
                    'order_number' => $order->order_number,
                    'billing_first_name' => $order->billing_first_name,
                    'billing_last_name' => $order->billing_last_name,
                    'billing_email' => $order->billing_email,
                    'total_amount' => $order->total_amount,
                    'status' => $order->status,
                    'payment_status' => $order->payment_status,
                    'payment_method' => $order->payment_method,
                    'created_at' => $order->created_at->toISOString(),
                ];
            });
    }

    private function getRecentProducts($limit = 12)
    {
        return Product::with(['category', 'primaryImage'])
            ->orderBy('created_at', 'desc')
            ->limit($limit)
            ->get()
            ->map(function ($product) {
                return [
                    'id' => $product->id,
                    'name' => $product->name,
                    'slug' => $product->slug,
                    'price' => $product->price,
                    'stock_quantity' => $product->stock_quantity,
                    'status' => $product->status ?? 'active',
                    'category' => [
                        'id' => $product->category->id,
                        'name' => $product->category->name,
                    ],
                    'primary_image' => $product->primaryImage ? [
                        'image_path' => $product->primaryImage->image_path,
                        'alt_text' => $product->primaryImage->alt_text,
                        'url' => asset('storage/' . $product->primaryImage->image_path),
                    ] : null,
                    'created_at' => $product->created_at->toISOString(),
                ];
            });
    }

    private function getRecentUsers($limit = 10)
    {
        return User::orderBy('created_at', 'desc')
            ->limit($limit)
            ->get()
            ->map(function ($user) {
                return [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'email_verified_at' => $user->email_verified_at?->toISOString(),
                    'created_at' => $user->created_at->toISOString(),
                ];
            });
    }

    public function analytics()
    {
        // Get sales data for charts
        $salesData = $this->getSalesAnalytics();
        $productAnalytics = $this->getProductAnalytics();
        $customerAnalytics = $this->getCustomerAnalytics();

        return Inertia::render('admin/analytics', [
            'sales_data' => $salesData,
            'product_analytics' => $productAnalytics,
            'customer_analytics' => $customerAnalytics,
        ]);
    }

    private function getSalesAnalytics()
    {
        // Last 12 months sales data
        $salesByMonth = Order::where('payment_status', 'paid')
            ->where('created_at', '>=', Carbon::now()->subMonths(12))
            ->groupBy(DB::raw('YEAR(created_at), MONTH(created_at)'))
            ->selectRaw('YEAR(created_at) as year, MONTH(created_at) as month, SUM(total_amount) as total, COUNT(*) as orders')
            ->orderBy('year', 'asc')
            ->orderBy('month', 'asc')
            ->get();

        return $salesByMonth;
    }

    private function getProductAnalytics()
    {
        // Best selling products
        $bestSellers = DB::table('order_items')
            ->join('orders', 'order_items.order_id', '=', 'orders.id')
            ->join('products', 'order_items.product_id', '=', 'products.id')
            ->where('orders.payment_status', 'paid')
            ->groupBy('order_items.product_id', 'products.name')
            ->selectRaw('products.name, SUM(order_items.quantity) as total_sold, SUM(order_items.total_price) as revenue')
            ->orderBy('total_sold', 'desc')
            ->limit(10)
            ->get();

        return $bestSellers;
    }

    private function getCustomerAnalytics()
    {
        // Customer registration trends
        $customerGrowth = User::where('created_at', '>=', Carbon::now()->subMonths(12))
            ->groupBy(DB::raw('YEAR(created_at), MONTH(created_at)'))
            ->selectRaw('YEAR(created_at) as year, MONTH(created_at) as month, COUNT(*) as new_customers')
            ->orderBy('year', 'asc')
            ->orderBy('month', 'asc')
            ->get();

        return $customerGrowth;
    }
}