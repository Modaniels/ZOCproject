<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class CartController extends Controller
{
    /**
     * Display the shopping cart
     */
    public function index()
    {
        $cartItems = $this->getCartItems();
        
        $total = $cartItems->sum(function($item) {
            return $item->quantity * $item->price;
        });

        return Inertia::render('cart', [
            'cartItems' => $cartItems,
            'total' => $total,
        ]);
    }

    /**
     * Add product to cart
     */
    public function add(Request $request)
    {
        $request->validate([
            'product_id' => 'required|exists:products,id',
            'quantity' => 'required|integer|min:1',
        ]);

        $product = Product::findOrFail($request->product_id);

        // Check if product is available
        if (!$product->isInStock()) {
            return response()->json([
                'message' => 'Product is out of stock'
            ], 400);
        }

        // Check if requested quantity is available
        if ($product->track_quantity && $product->quantity < $request->quantity) {
            return response()->json([
                'message' => 'Only ' . $product->quantity . ' items available'
            ], 400);
        }

        $userId = Auth::id();
        $sessionId = session()->getId();

        // Check if item already exists in cart
        $existingCartItem = Cart::where('product_id', $request->product_id)
            ->where(function($query) use ($userId, $sessionId) {
                if ($userId) {
                    $query->where('user_id', $userId);
                } else {
                    $query->where('session_id', $sessionId);
                }
            })
            ->first();

        if ($existingCartItem) {
            // Update quantity
            $newQuantity = $existingCartItem->quantity + $request->quantity;
            
            // Check if new quantity is available
            if ($product->track_quantity && $product->quantity < $newQuantity) {
                return response()->json([
                    'message' => 'Only ' . $product->quantity . ' items available'
                ], 400);
            }

            $existingCartItem->update([
                'quantity' => $newQuantity,
                'price' => $product->price, // Update price in case it changed
            ]);
        } else {
            // Create new cart item
            Cart::create([
                'user_id' => $userId,
                'session_id' => $userId ? null : $sessionId,
                'product_id' => $request->product_id,
                'quantity' => $request->quantity,
                'price' => $product->price,
            ]);
        }

        $cartCount = $this->getCartCount();

        return response()->json([
            'message' => 'Product added to cart',
            'cartCount' => $cartCount,
        ]);
    }

    /**
     * Update cart item quantity
     */
    public function update(Request $request, Cart $cart)
    {
        $request->validate([
            'quantity' => 'required|integer|min:1',
        ]);

        $product = $cart->product;

        // Check if requested quantity is available
        if ($product->track_quantity && $product->quantity < $request->quantity) {
            return response()->json([
                'message' => 'Only ' . $product->quantity . ' items available'
            ], 400);
        }

        $cart->update([
            'quantity' => $request->quantity,
            'price' => $product->price, // Update price in case it changed
        ]);

        $cartItems = $this->getCartItems();
        $total = $cartItems->sum(function($item) {
            return $item->quantity * $item->price;
        });

        return response()->json([
            'message' => 'Cart updated',
            'total' => $total,
        ]);
    }

    /**
     * Remove item from cart
     */
    public function remove(Cart $cart)
    {
        $cart->delete();

        $cartCount = $this->getCartCount();

        return response()->json([
            'message' => 'Item removed from cart',
            'cartCount' => $cartCount,
        ]);
    }

    /**
     * Clear all items from cart
     */
    public function clear()
    {
        $userId = Auth::id();
        $sessionId = session()->getId();

        Cart::where(function($query) use ($userId, $sessionId) {
            if ($userId) {
                $query->where('user_id', $userId);
            } else {
                $query->where('session_id', $sessionId);
            }
        })->delete();

        return response()->json([
            'message' => 'Cart cleared',
            'cartCount' => 0,
        ]);
    }

    /**
     * Get cart items count
     */
    public function count()
    {
        return response()->json([
            'count' => $this->getCartCount()
        ]);
    }

    /**
     * Helper method to get cart items
     */
    private function getCartItems()
    {
        $userId = Auth::id();
        $sessionId = session()->getId();

        return Cart::with('product.primaryImage')
            ->where(function($query) use ($userId, $sessionId) {
                if ($userId) {
                    $query->where('user_id', $userId);
                } else {
                    $query->where('session_id', $sessionId);
                }
            })
            ->get();
    }

    /**
     * Helper method to get cart count
     */
    private function getCartCount()
    {
        $userId = Auth::id();
        $sessionId = session()->getId();

        return Cart::where(function($query) use ($userId, $sessionId) {
            if ($userId) {
                $query->where('user_id', $userId);
            } else {
                $query->where('session_id', $sessionId);
            }
        })->sum('quantity');
    }
}
