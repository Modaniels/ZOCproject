<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Category;
use App\Models\Order;
use App\Models\User;
use App\Models\ProductImage;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;

class AdminController extends Controller
{
    public function dashboard()
    {
        $stats = [
            'total_products' => Product::count(),
            'total_orders' => Order::count(),
            'total_customers' => User::count(),
            'total_revenue' => Order::where('payment_status', 'completed')->sum('total_amount'),
            'pending_orders' => Order::where('status', 'pending')->count(),
            'low_stock_products' => Product::where('quantity', '<', 10)->count(),
        ];

        $recent_orders = Order::with(['user', 'items.product'])
            ->latest()
            ->take(5)
            ->get();

        $recent_products = Product::with(['category', 'primaryImage'])
            ->latest()
            ->take(5)
            ->get();

        $recent_users = User::latest()
            ->take(5)
            ->get();

        return Inertia::render('admin-dashboard', [
            'stats' => $stats,
            'recent_orders' => $recent_orders,
            'recent_products' => $recent_products,
            'recent_users' => $recent_users,
        ]);
    }

    public function products()
    {
        $products = Product::with(['category', 'primaryImage'])
            ->latest()
            ->get();
            
        $categories = Category::all();

        return Inertia::render('admin-products', [
            'products' => $products,
            'categories' => $categories,
        ]);
    }

    public function createProduct()
    {
        $categories = Category::all();

        return Inertia::render('admin-product-form', [
            'categories' => $categories,
            'isEdit' => false,
        ]);
    }

    public function storeProduct(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'price' => 'required|numeric|min:0',
            'stock_quantity' => 'required|integer|min:0',
            'weight' => 'nullable|string|max:50',
            'sku' => 'nullable|string|max:100|unique:products,sku',
            'category_id' => 'required|exists:categories,id',
            'status' => 'required|in:active,inactive,draft',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:10240', // 10MB max
        ]);

        // Create slug from name
        $slug = Str::slug($request->name);
        $originalSlug = $slug;
        $counter = 1;

        // Ensure slug is unique
        while (Product::where('slug', $slug)->exists()) {
            $slug = $originalSlug . '-' . $counter;
            $counter++;
        }

        // Generate SKU if not provided
        $sku = $request->sku;
        if (empty($sku)) {
            $sku = 'ZOC-' . strtoupper(Str::random(6));
            // Ensure SKU is unique
            while (Product::where('sku', $sku)->exists()) {
                $sku = 'ZOC-' . strtoupper(Str::random(6));
            }
        }

        // Create the product
        $product = Product::create([
            'name' => $request->name,
            'slug' => $slug,
            'description' => $request->description,
            'price' => $request->price,
            'quantity' => $request->stock_quantity, // Map stock_quantity to quantity
            'weight' => $request->weight,
            'sku' => $sku,
            'category_id' => $request->category_id,
            'status' => $request->status,
        ]);

        // Handle image upload
        if ($request->hasFile('image')) {
            $this->handleImageUpload($request->file('image'), $product);
        }

        return response()->json([
            'message' => 'Product created successfully!',
            'product' => $product->load(['category', 'primaryImage'])
        ]);
    }

    public function editProduct(Product $product)
    {
        $categories = Category::all();

        return Inertia::render('admin-product-form', [
            'product' => $product->load(['category', 'primaryImage']),
            'categories' => $categories,
            'isEdit' => true,
        ]);
    }

    public function updateProduct(Request $request, Product $product)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'price' => 'required|numeric|min:0',
            'stock_quantity' => 'required|integer|min:0',
            'weight' => 'nullable|string|max:50',
            'sku' => ['nullable', 'string', 'max:100', Rule::unique('products')->ignore($product->id)],
            'category_id' => 'required|exists:categories,id',
            'status' => 'required|in:active,inactive,draft',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:10240', // 10MB max
        ]);

        // Update slug if name changed
        $slug = $product->slug;
        if ($product->name !== $request->name) {
            $slug = Str::slug($request->name);
            $originalSlug = $slug;
            $counter = 1;

            // Ensure slug is unique (excluding current product)
            while (Product::where('slug', $slug)->where('id', '!=', $product->id)->exists()) {
                $slug = $originalSlug . '-' . $counter;
                $counter++;
            }
        }

        // Update the product
        $product->update([
            'name' => $request->name,
            'slug' => $slug,
            'description' => $request->description,
            'price' => $request->price,
            'quantity' => $request->stock_quantity, // Map stock_quantity to quantity
            'weight' => $request->weight,
            'sku' => $request->sku,
            'category_id' => $request->category_id,
            'status' => $request->status,
        ]);

        // Handle image upload
        if ($request->hasFile('image')) {
            // Delete old image if it exists
            $oldImage = $product->primaryImage;
            if ($oldImage) {
                Storage::disk('public')->delete($oldImage->image_path);
                $oldImage->delete();
            }

            $this->handleImageUpload($request->file('image'), $product);
        }

        return response()->json([
            'message' => 'Product updated successfully!',
            'product' => $product->load(['category', 'primaryImage'])
        ]);
    }

    public function deleteProduct(Product $product)
    {
        // Delete associated images
        $images = $product->images;
        foreach ($images as $image) {
            Storage::disk('public')->delete($image->image_path);
            $image->delete();
        }

        // Delete the product
        $product->delete();

        return response()->json([
            'message' => 'Product deleted successfully!'
        ]);
    }

    public function orders()
    {
        $orders = Order::with(['user', 'items.product'])
            ->latest()
            ->get();

        return Inertia::render('admin-orders', [
            'orders' => $orders,
        ]);
    }

    public function showOrder(Order $order)
    {
        $order->load(['user', 'items.product']);

        return Inertia::render('admin-order-detail', [
            'order' => $order,
        ]);
    }

    public function updateOrderStatus(Request $request, Order $order)
    {
        $request->validate([
            'status' => 'required|in:pending,confirmed,processing,shipped,delivered,cancelled',
        ]);

        $updateData = [
            'status' => $request->status
        ];

        // Add timestamps for specific status changes
        if ($request->status === 'shipped') {
            $updateData['shipped_at'] = now();
        } elseif ($request->status === 'delivered') {
            $updateData['delivered_at'] = now();
        }

        $order->update($updateData);

        return response()->json([
            'message' => 'Order status updated successfully!',
            'order' => $order
        ]);
    }

    public function customers()
    {
        $customers = User::withCount(['orders'])
            ->with(['orders' => function($query) {
                $query->latest()->take(3);
            }])
            ->latest()
            ->get();

        return Inertia::render('admin-customers', [
            'customers' => $customers,
        ]);
    }

    public function showCustomer(User $user)
    {
        $user->load(['orders.items.product']);

        return Inertia::render('admin-customer-detail', [
            'customer' => $user,
        ]);
    }

    public function analytics()
    {
        // Get sales data for the last 30 days
        $salesData = Order::selectRaw('DATE(created_at) as date, COUNT(*) as orders, SUM(total_amount) as revenue')
            ->where('created_at', '>=', now()->subDays(30))
            ->where('payment_status', 'completed')
            ->groupBy('date')
            ->orderBy('date')
            ->get();

        // Get top selling products
        $topProducts = Product::withCount(['orderItems'])
            ->orderBy('order_items_count', 'desc')
            ->take(10)
            ->get();

        // Get category sales
        $categorySales = Category::withSum(['products.orderItems' => function($query) {
            $query->whereHas('order', function($q) {
                $q->where('payment_status', 'completed');
            });
        }], 'quantity')
        ->orderBy('products_order_items_sum_quantity', 'desc')
        ->get();

        return Inertia::render('admin-analytics', [
            'sales_data' => $salesData,
            'top_products' => $topProducts,
            'category_sales' => $categorySales,
        ]);
    }

    private function handleImageUpload($file, Product $product)
    {
        $filename = time() . '_' . Str::random(10) . '.' . $file->getClientOriginalExtension();
        $path = $file->storeAs('products', $filename, 'public');

        ProductImage::create([
            'product_id' => $product->id,
            'image_path' => $path,
            'alt_text' => $product->name . ' image',
            'is_primary' => true,
        ]);
    }
}