import React, { useState, useEffect } from 'react';
import { Link } from '@inertiajs/react';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';

interface NavigationProps {
    cartCount?: number;
}

export default function Navigation({ cartCount = 0 }: NavigationProps) {
    const [currentCartCount, setCurrentCartCount] = useState(cartCount);

    // Fetch cart count on component mount if not provided
    useEffect(() => {
        if (cartCount === 0) {
            fetch('/cart/count')
                .then(response => response.json())
                .then(data => setCurrentCartCount(data.count))
                .catch(error => console.error('Error fetching cart count:', error));
        }
    }, [cartCount]);

    // Get CSRF token safely
    const getCsrfToken = () => {
        if (typeof document !== 'undefined') {
            return document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '';
        }
        return '';
    };

    return (
        <>
            {/* Add CSRF token meta tag if not present */}
            {typeof document !== 'undefined' && !document.querySelector('meta[name="csrf-token"]') && (
                <meta name="csrf-token" content={getCsrfToken()} />
            )}
            
            <nav className="navbar fixed w-full z-30 top-0 start-0 border-b border-gray-200 bg-white">
                <div className="w-full px-2 py-3">
                    <div className="flex items-center justify-between w-full">
                        <div className="flex items-center pl-2">
                            <Link href="/" className="flex items-center space-x-3">
                                <div className="text-2xl font-bold" style={{color: '#3A4C2F', fontFamily: 'Space Grotesk, sans-serif'}}>
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
                                      style={{color: '#3A4C2F'}}>
                                    <ShoppingCartIcon className="w-6 h-6" />
                                    {currentCartCount > 0 && (
                                        <span className="absolute -top-1 -right-1 text-xs rounded-full h-5 w-5 flex items-center justify-center text-white font-medium" 
                                              style={{backgroundColor: '#F4C542', color: '#333333'}}>
                                            {currentCartCount}
                                        </span>
                                    )}
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
        </>
    );
}