<?php

use App\Http\Controllers\ProductController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\CheckoutController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\DashboardController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('zoc-farm');
})->name('home');

Route::get('/about', function () {
    return Inertia::render('about');
})->name('about');

Route::get('/services', function () {
    return Inertia::render('services');
})->name('services');

// Product routes
Route::get('/products', [ProductController::class, 'index'])->name('products');
Route::get('/products/{product:slug}', [ProductController::class, 'show'])->name('products.show');
Route::get('/api/products/featured', [ProductController::class, 'featured'])->name('products.featured');
Route::get('/api/products/search', [ProductController::class, 'search'])->name('products.search');

// Cart routes
Route::prefix('cart')->name('cart.')->group(function () {
    Route::get('/', [CartController::class, 'index'])->name('index');
    Route::post('/add', [CartController::class, 'add'])->name('add');
    Route::put('/{cart}', [CartController::class, 'update'])->name('update');
    Route::delete('/{cart}', [CartController::class, 'remove'])->name('remove');
    Route::delete('/', [CartController::class, 'clear'])->name('clear');
    Route::get('/count', [CartController::class, 'count'])->name('count');
});

// Checkout routes
Route::prefix('checkout')->name('checkout.')->group(function () {
    Route::get('/', [CheckoutController::class, 'index'])->name('index');
    Route::post('/process', [CheckoutController::class, 'process'])->name('process');
    Route::get('/success', [CheckoutController::class, 'success'])->name('success');
    Route::post('/mpesa/callback', [CheckoutController::class, 'mpesaCallback'])->name('mpesa.callback');
});

// Order tracking routes (for guests)
Route::get('/track-order', [OrderController::class, 'trackForm'])->name('orders.track-form');
Route::post('/track-order', [OrderController::class, 'track'])->name('orders.track');

// Authenticated order routes
Route::middleware(['auth'])->group(function () {
    Route::get('/orders', [OrderController::class, 'index'])->name('orders.index');
    Route::get('/orders/{order}', [OrderController::class, 'show'])->name('orders.show');
});

// Order tracking routes
Route::prefix('orders')->name('orders.')->group(function () {
    // Guest order tracking
    Route::get('/track', [OrderController::class, 'trackForm'])->name('track.form');
    Route::post('/track', [OrderController::class, 'track'])->name('track');
    
    // Authenticated user orders
    Route::middleware(['auth', 'verified'])->group(function () {
        Route::get('/', [OrderController::class, 'index'])->name('index');
        Route::get('/{order}', [OrderController::class, 'show'])->name('show');
    });
});

Route::get('/contact', function () {
    return Inertia::render('contact');
})->name('contact');

// Admin routes (for now without auth middleware for testing)
Route::prefix('admin')->name('admin.')->group(function () {
    // Dashboard
    Route::get('/', [AdminController::class, 'dashboard'])->name('dashboard');
    
    // Products management
    Route::get('/products', [AdminController::class, 'products'])->name('products');
    Route::get('/products/create', [AdminController::class, 'createProduct'])->name('products.create');
    Route::post('/products', [AdminController::class, 'storeProduct'])->name('products.store');
    Route::get('/products/{product}/edit', [AdminController::class, 'editProduct'])->name('products.edit');
    Route::put('/products/{product}', [AdminController::class, 'updateProduct'])->name('products.update');
    Route::delete('/products/{product}', [AdminController::class, 'deleteProduct'])->name('products.delete');
    
    // Orders management
    Route::get('/orders', [AdminController::class, 'orders'])->name('orders');
    Route::get('/orders/{order}', [AdminController::class, 'showOrder'])->name('orders.show');
    Route::put('/orders/{order}/status', [AdminController::class, 'updateOrderStatus'])->name('orders.update-status');
    
    // Customers management
    Route::get('/customers', [AdminController::class, 'customers'])->name('customers');
    Route::get('/customers/{user}', [AdminController::class, 'showCustomer'])->name('customers.show');
    
    // Analytics
    Route::get('/analytics', [AdminController::class, 'analytics'])->name('analytics');
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
