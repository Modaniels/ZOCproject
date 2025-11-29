import React, { useState, useEffect } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { MinusIcon, PlusIcon, TrashIcon, ShoppingCartIcon } from '@heroicons/react/24/outline';
import Newsletter from '../components/Newsletter';

interface CartItem {
    id: number;
    product_id: number;
    quantity: number;
    price: number;
    total: number;
    product: {
        id: number;
        name: string;
        slug: string;
        price: number;
        formatted_price: string;
        weight: string;
        primary_image?: {
            image_path: string;
            alt_text: string;
            url: string;
        };
    };
}

interface Props {
    cartItems: CartItem[];
    total: number;
}

export default function Cart({ cartItems: initialCartItems, total: initialTotal }: Props) {
    const [cartItems, setCartItems] = useState(initialCartItems);
    const [total, setTotal] = useState(initialTotal);
    const [isUpdating, setIsUpdating] = useState<number | null>(null);

    // Get CSRF token safely
    const getCsrfToken = () => {
        if (typeof document !== 'undefined') {
            return document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '';
        }
        return '';
    };

    const updateQuantity = async (cartItemId: number, newQuantity: number) => {
        if (newQuantity < 1) return;
        
        setIsUpdating(cartItemId);
        
        try {
            const response = await fetch(`/cart/${cartItemId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': getCsrfToken(),
                },
                body: JSON.stringify({ quantity: newQuantity }),
            });

            const data = await response.json();
            
            if (response.ok) {
                setCartItems(prevItems => 
                    prevItems.map(item => 
                        item.id === cartItemId 
                            ? { ...item, quantity: newQuantity, total: newQuantity * item.price }
                            : item
                    )
                );
                setTotal(data.total);
            } else {
                alert(data.message || 'Error updating cart');
            }
        } catch (error) {
            console.error('Error updating cart:', error);
            alert('Error updating cart');
        } finally {
            setIsUpdating(null);
        }
    };

    const removeItem = async (cartItemId: number) => {
        try {
            const response = await fetch(`/cart/${cartItemId}`, {
                method: 'DELETE',
                headers: {
                    'X-CSRF-TOKEN': getCsrfToken(),
                },
            });

            const data = await response.json();
            
            if (response.ok) {
                setCartItems(prevItems => prevItems.filter(item => item.id !== cartItemId));
                const newTotal = cartItems
                    .filter(item => item.id !== cartItemId)
                    .reduce((sum, item) => sum + (item.quantity * item.price), 0);
                setTotal(newTotal);
            } else {
                alert(data.message || 'Error removing item');
            }
        } catch (error) {
            console.error('Error removing item:', error);
            alert('Error removing item');
        }
    };

    const clearCart = async () => {
        if (!confirm('Are you sure you want to clear your cart?')) return;
        
        try {
            const response = await fetch('/cart', {
                method: 'DELETE',
                headers: {
                    'X-CSRF-TOKEN': getCsrfToken(),
                },
            });

            const data = await response.json();
            
            if (response.ok) {
                setCartItems([]);
                setTotal(0);
            } else {
                alert(data.message || 'Error clearing cart');
            }
        } catch (error) {
            console.error('Error clearing cart:', error);
            alert('Error clearing cart');
        }
    };

    const formatPrice = (price: number) => {
        return `KSh ${price.toLocaleString()}`;
    };

    const Navigation = () => (
        <nav className="navbar fixed w-full z-30 top-0 start-0 border-b border-gray-200 bg-white">
            <div className="w-full px-2 py-3">
                <div className="flex items-center justify-between w-full">
                    <div className="flex items-center pl-2">
                        <Link href="/" className="flex items-center space-x-3">
                            <div className="text-2xl font-bold" style={{color: '#2E7D32', fontFamily: 'Space Grotesk, sans-serif'}}>
                                ZOC Farm
                            </div>
                        </Link>
                    </div>

                    <div className="flex items-center space-x-10 pr-8">
                        <div className="hidden md:flex items-center">
                            <ul className="flex space-x-10 font-medium">
                                <li>
                                    <Link href="/" className="text-gray-700 hover:opacity-80 transition-colors duration-200 text-lg">
                                        Home
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/about" className="text-gray-700 hover:opacity-80 transition-colors duration-200 text-lg">
                                        About
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/services" className="text-gray-700 hover:opacity-80 transition-colors duration-200 text-lg">
                                        Services
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/products" className="text-gray-700 hover:opacity-80 transition-colors duration-200 text-lg">
                                        Products
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/contact" className="text-gray-700 hover:opacity-80 transition-colors duration-200 text-lg">
                                        Contact
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        <div className="flex items-center space-x-4">
                            <Link href="/cart" className="relative p-2 hover:text-yellow-600 transition-colors"
                                  style={{color: '#2E7D32'}}>
                                <ShoppingCartIcon className="w-6 h-6" />
                                <span className="absolute -top-1 -right-1 text-xs rounded-full h-5 w-5 flex items-center justify-center text-white font-medium" 
                                      style={{backgroundColor: '#D4AF37', color: '#1F2937'}}>
                                    {cartItems.reduce((sum, item) => sum + item.quantity, 0)}
                                </span>
                            </Link>
                        </div>

                        <div className="md:hidden">
                            <button type="button" className="text-gray-500 hover:text-gray-600">
                                <span className="sr-only">Open main menu</span>
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );

    const Footer = () => (
        <footer className="text-white py-16" style={{backgroundColor: '#1A1A1A'}}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <div>
                        <div className="flex items-center space-x-3 mb-6">
                            <div className="text-2xl font-bold" style={{color: '#D4AF37', fontFamily: 'Space Grotesk, sans-serif'}}>
                                ZOC Farm
                            </div>
                        </div>
                        <p className="text-gray-400 mb-6 leading-relaxed">
                            Zedjah Organic Crowd Farms - A systemized regenerative farming company specializing in organic food production and farm management from Kirinyaga County, Kenya.
                        </p>
                        <div className="flex space-x-4">
                            <a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors">
                                <i className="fab fa-facebook-f text-xl"></i>
                            </a>
                            <a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors">
                                <i className="fab fa-twitter text-xl"></i>
                            </a>
                            <a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors">
                                <i className="fab fa-instagram text-xl"></i>
                            </a>
                            <a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors">
                                <i className="fab fa-linkedin-in text-xl"></i>
                            </a>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-lg font-bold mb-6" style={{fontFamily: 'Space Grotesk, sans-serif'}}>Quick Links</h3>
                        <ul className="space-y-3">
                            <li><Link href="/" className="text-gray-400 hover:text-white transition-colors">Home</Link></li>
                            <li><Link href="/about" className="text-gray-400 hover:text-white transition-colors">About Us</Link></li>
                            <li><Link href="/services" className="text-gray-400 hover:text-white transition-colors">Services</Link></li>
                            <li><Link href="/products" className="text-gray-400 hover:text-white transition-colors">Products</Link></li>
                            <li><Link href="/contact" className="text-gray-400 hover:text-white transition-colors">Contact</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-lg font-bold mb-6" style={{fontFamily: 'Space Grotesk, sans-serif'}}>Contact Info</h3>
                        <ul className="space-y-3">
                            <li className="text-gray-400">
                                <i className="fas fa-map-marker-alt mr-2"></i>
                                020 Mutira, Kirinyaga County, Kenya
                            </li>
                            <li className="text-gray-400">
                                <i className="fas fa-phone mr-2"></i>
                                +254-790-344-724
                            </li>
                            <li className="text-gray-400">
                                <i className="fas fa-phone mr-2"></i>
                                +254-741-122-375
                            </li>
                            <li className="text-gray-400">
                                <i className="fas fa-phone mr-2"></i>
                                +254-754-919-395
                            </li>
                            <li className="text-gray-400">
                                <i className="fas fa-envelope mr-2"></i>
                                zedjahorganiccrowdfarms@gmail.com
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-700 mt-12 pt-8 text-center">
                    <p className="text-gray-400">
                        &copy; 2025 Zedjah Organic Crowd Farms Ltd. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );

    if (cartItems.length === 0) {
        return (
            <>
                <Head title="Shopping Cart - ZOC Farm">
                    <link rel="preconnect" href="https://fonts.googleapis.com" />
                    <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                    <link
                        href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600;700&display=swap"
                        rel="stylesheet"
                    />
                    <link
                        rel="stylesheet"
                        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
                    />
                    <meta name="csrf-token" content={getCsrfToken()} />
                </Head>
                
                <div className="min-h-screen" style={{
                    fontFamily: 'Inter, sans-serif',
                    backgroundColor: '#FAFAFA',
                    color: '#1F2937'
                }}>
                    <Navigation />

                    <div className="pt-24 pb-16 px-4">
                        <div className="max-w-4xl mx-auto text-center">
                            <div className="bg-white rounded-3xl p-12 hover:shadow-2xl transition-all duration-300" style={{boxShadow: '0 10px 40px rgba(0,0,0,0.08)', border: '1px solid #E5E7EB'}}>
                                <ShoppingCartIcon className="w-24 h-24 mx-auto mb-6" style={{color: '#2E7D32'}} />
                                <h2 className="text-5xl md:text-6xl font-bold mb-4" style={{color: '#1F2937', fontFamily: 'Space Grotesk, sans-serif'}}>
                                    Your cart is empty
                                </h2>
                                <div className="w-24 h-1 mx-auto mb-6" style={{backgroundColor: '#D4AF37'}}></div>
                                <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                                    Looks like you haven't added any items to your cart yet. 
                                    Start shopping to discover our amazing products!
                                </p>
                                <Link
                                    href="/products"
                                    className="inline-flex items-center rounded-lg px-10 py-5 text-white font-semibold transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1"
                                    style={{backgroundColor: '#2E7D32', boxShadow: '0 4px 14px rgba(46, 125, 50, 0.39)'}}
                                >
                                    <i className="fas fa-shopping-bag mr-2"></i>
                                    Continue Shopping
                                </Link>
                            </div>
                        </div>
                    </div>

                    <div className="py-20 px-4" style={{backgroundColor: '#1F2937'}}>
                        <div className="max-w-4xl mx-auto">
                            <Newsletter />
                        </div>
                    </div>

                    <Footer />
                </div>
            </>
        );
    }

    return (
        <>
            <Head title="Shopping Cart - ZOC Farm">
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link
                    href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600;700&display=swap"
                    rel="stylesheet"
                />
                <link
                    rel="stylesheet"
                    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
                />
                <meta name="csrf-token" content={getCsrfToken()} />
            </Head>
            
            <div className="min-h-screen" style={{
                fontFamily: 'Inter, sans-serif',
                backgroundColor: '#FAFAFA',
                color: '#1F2937'
            }}>
                <Navigation />

                <div className="pt-24 pb-16 px-4">
                    <div className="max-w-6xl mx-auto">
                        <div className="bg-white rounded-3xl border mb-8" style={{boxShadow: '0 10px 40px rgba(0,0,0,0.08)', border: '1px solid #E5E7EB'}}>
                            <div className="px-4 sm:px-8 py-6 border-b border-gray-100">
                                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-4 sm:space-y-0">
                                    <h1 className="text-5xl md:text-6xl font-bold" style={{color: '#1F2937', fontFamily: 'Space Grotesk, sans-serif'}}>
                                        Shopping Cart
                                    </h1>
                                    <button
                                        onClick={clearCart}
                                        className="text-red-600 hover:text-red-800 text-sm font-semibold transition-colors px-4 py-2 rounded-lg hover:bg-red-50 self-start sm:self-auto"
                                    >
                                        <i className="fas fa-trash mr-2"></i>
                                        Clear Cart
                                    </button>
                                </div>
                            </div>

                            <div className="divide-y divide-gray-100">
                                {cartItems.map((item) => (
                                    <div key={item.id} className="p-4 sm:p-6 hover:bg-gray-50 transition-colors">
                                        {/* Mobile Layout */}
                                        <div className="block sm:hidden">
                                            <div className="flex space-x-4 mb-4">
                                                <div className="flex-shrink-0 w-20 h-20 sm:w-24 sm:h-24">
                                                    {item.product.primary_image ? (
                                                        <img
                                                            src={item.product.primary_image.url}
                                                            alt={item.product.primary_image.alt_text || item.product.name}
                                                            className="w-full h-full object-cover rounded-lg shadow-md"
                                                        />
                                                    ) : (
                                                        <div className="w-full h-full bg-gray-100 rounded-lg flex items-center justify-center border border-gray-200">
                                                            <i className="fas fa-image text-xl text-gray-400"></i>
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="flex-1">
                                                    <h3 className="text-lg font-bold mb-2" style={{fontFamily: 'Space Grotesk, sans-serif'}}>
                                                        <Link 
                                                            href={`/products/${item.product.slug}`}
                                                            className="hover:opacity-80 transition-opacity"
                                                            style={{color: '#1F2937'}}
                                                        >
                                                            {item.product.name}
                                                        </Link>
                                                    </h3>
                                                    {item.product.weight && (
                                                        <p className="text-sm text-gray-600 font-medium mb-2">
                                                            <i className="fas fa-weight mr-1"></i>
                                                            {item.product.weight}
                                                        </p>
                                                    )}
                                                    <p className="text-lg font-bold" style={{color: '#2E7D32'}}>
                                                        {formatPrice(item.price)} each
                                                    </p>
                                                </div>
                                            </div>
                                            
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center border-2 border-gray-200 rounded-lg overflow-hidden">
                                                    <button
                                                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                        disabled={item.quantity <= 1 || isUpdating === item.id}
                                                        className="p-2 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                                    >
                                                        <MinusIcon className="w-4 h-4" />
                                                    </button>
                                                    <span className="px-4 py-2 font-bold text-lg min-w-[3rem] text-center" style={{color: '#2E7D32'}}>
                                                        {item.quantity}
                                                    </span>
                                                    <button
                                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                        disabled={isUpdating === item.id}
                                                        className="p-2 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                                    >
                                                        <PlusIcon className="w-4 h-4" />
                                                    </button>
                                                </div>
                                                
                                                <div className="flex items-center space-x-3">
                                                    <div className="text-right">
                                                        <p className="text-lg font-bold" style={{color: '#2E7D32'}}>
                                                            {formatPrice(item.quantity * item.price)}
                                                        </p>
                                                    </div>
                                                    <button
                                                        onClick={() => removeItem(item.id)}
                                                        className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-all"
                                                    >
                                                        <TrashIcon className="w-5 h-5" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Desktop Layout */}
                                        <div className="hidden sm:flex items-center space-x-6">
                                            <div className="flex-shrink-0 w-24 h-24">
                                                {item.product.primary_image ? (
                                                    <img
                                                        src={item.product.primary_image.url}
                                                        alt={item.product.primary_image.alt_text || item.product.name}
                                                        className="w-full h-full object-cover rounded-lg shadow-md"
                                                    />
                                                ) : (
                                                    <div className="w-full h-full bg-gray-100 rounded-lg flex items-center justify-center border border-gray-200">
                                                        <i className="fas fa-image text-2xl text-gray-400"></i>
                                                    </div>
                                                )}
                                            </div>

                                            <div className="flex-1">
                                                <div className="flex justify-between items-start">
                                                    <div className="space-y-2">
                                                        <h3 className="text-xl font-bold" style={{fontFamily: 'Space Grotesk, sans-serif'}}>
                                                            <Link 
                                                                href={`/products/${item.product.slug}`}
                                                                className="hover:opacity-80 transition-opacity"
                                                                style={{color: '#1F2937'}}
                                                            >
                                                                {item.product.name}
                                                            </Link>
                                                        </h3>
                                                        {item.product.weight && (
                                                            <p className="text-sm text-gray-600 font-medium">
                                                                <i className="fas fa-weight mr-1"></i>
                                                                {item.product.weight}
                                                            </p>
                                                        )}
                                                        <p className="text-lg font-bold" style={{color: '#2E7D32'}}>
                                                            {formatPrice(item.price)} each
                                                        </p>
                                                    </div>

                                                    <div className="flex items-center space-x-6">
                                                        <div className="flex items-center border-2 border-gray-200 rounded-lg overflow-hidden">
                                                            <button
                                                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                                disabled={item.quantity <= 1 || isUpdating === item.id}
                                                                className="p-3 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                                            >
                                                                <MinusIcon className="w-4 h-4" />
                                                            </button>
                                                            <span className="px-6 py-3 font-bold text-lg min-w-[3rem] text-center" style={{color: '#2E7D32'}}>
                                                                {item.quantity}
                                                            </span>
                                                            <button
                                                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                                disabled={isUpdating === item.id}
                                                                className="p-3 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                                            >
                                                                <PlusIcon className="w-4 h-4" />
                                                            </button>
                                                        </div>

                                                        <div className="text-right min-w-[6rem]">
                                                            <p className="text-xl font-bold" style={{color: '#2E7D32'}}>
                                                                {formatPrice(item.quantity * item.price)}
                                                            </p>
                                                        </div>

                                                        <button
                                                            onClick={() => removeItem(item.id)}
                                                            className="p-3 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-all"
                                                        >
                                                            <TrashIcon className="w-5 h-5" />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="px-8 py-6 border-t border-gray-100" style={{backgroundColor: '#F8F9FA'}}>
                                <div className="flex justify-between items-center mb-6">
                                    <span className="text-2xl font-bold" style={{color: '#1F2937', fontFamily: 'Space Grotesk, sans-serif'}}>
                                        Total:
                                    </span>
                                    <span className="text-3xl font-bold" style={{color: '#2E7D32', fontFamily: 'Space Grotesk, sans-serif'}}>
                                        {formatPrice(total)}
                                    </span>
                                </div>
                                
                                <div className="flex flex-col sm:flex-row gap-4">
                                    <Link
                                        href="/products"
                                        className="flex-1 bg-gray-200 text-gray-800 rounded-lg px-10 py-5 text-center font-semibold hover:bg-gray-300 transition duration-200"
                                    >
                                        <i className="fas fa-arrow-left mr-2"></i>
                                        Continue Shopping
                                    </Link>
                                    <Link 
                                        href="/checkout"
                                        className="flex-1 text-white rounded-lg px-10 py-5 font-semibold transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1 text-center"
                                        style={{backgroundColor: '#2E7D32', boxShadow: '0 4px 14px rgba(46, 125, 50, 0.39)'}}
                                    >
                                        <i className="fas fa-credit-card mr-2"></i>
                                        Proceed to Checkout
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="py-24 px-4" style={{backgroundColor: '#1F2937'}}>
                    <div className="max-w-4xl mx-auto">
                        <Newsletter />
                    </div>
                </div>

                <Footer />
            </div>
        </>
    );
}