import React, { useState, useEffect } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { ShoppingCartIcon, Bars3Icon, XMarkIcon, UserIcon, ChevronDownIcon } from '@heroicons/react/24/outline';

interface NavigationProps {
    cartCount?: number;
    showAccount?: boolean;
}

interface User {
    id: number;
    name: string;
    email: string;
}

interface PageProps {
    auth: {
        user: User | null;
    };
    [key: string]: any;
}

export default function Navigation({ cartCount = 0, showAccount = false }: NavigationProps) {
    const [currentCartCount, setCurrentCartCount] = useState(cartCount);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isAccountDropdownOpen, setIsAccountDropdownOpen] = useState(false);
    
    const { auth } = usePage<PageProps>().props;

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

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false);
    };

    const closeAccountDropdown = () => {
        setIsAccountDropdownOpen(false);
    };

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as Element;
            if (isAccountDropdownOpen && !target.closest('.account-dropdown')) {
                setIsAccountDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isAccountDropdownOpen]);

    return (
        <>
            {/* Add CSRF token meta tag if not present */}
            {typeof document !== 'undefined' && !document.querySelector('meta[name="csrf-token"]') && (
                <meta name="csrf-token" content={getCsrfToken()} />
            )}
            
            <nav className="navbar fixed w-full z-30 top-0 start-0 border-b shadow-sm" style={{backgroundColor: '#1F2937', borderColor: '#374151'}}>
                <div className="w-full px-4 py-2 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between w-full">
                        <div className="flex items-center">
                            <Link href="/" className="flex items-center">
                                <img 
                                    src="/images/logo.png" 
                                    alt="ZOC Farm Logo" 
                                    className="h-16 sm:h-20 w-auto"
                                />
                            </Link>
                        </div>

                        {/* Desktop Navigation - Moved to right side */}
                        <div className="flex items-center space-x-3">
                            <div className="hidden lg:flex items-center space-x-8 mr-3">
                                <ul className="flex space-x-8 font-medium">
                                    <li>
                                        <Link href="/" className="text-white hover:opacity-80 transition-colors duration-200 text-base">
                                            Home
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/about" className="text-white hover:opacity-80 transition-colors duration-200 text-base">
                                            About
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/services" className="text-white hover:opacity-80 transition-colors duration-200 text-base">
                                            Services
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/products" className="text-white hover:opacity-80 transition-colors duration-200 text-base">
                                            Products
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/contact" className="text-white hover:opacity-80 transition-colors duration-200 text-base">
                                            Contact
                                        </Link>
                                    </li>
                                </ul>
                            </div>

                            {/* Cart Icon - Desktop Only */}
                            <Link href="/cart" className="hidden lg:block relative p-2 hover:opacity-80 transition-colors"
                                  style={{color: '#FFFFFF'}}>
                                <ShoppingCartIcon className="w-5 h-5 sm:w-6 sm:h-6" />
                                {currentCartCount > 0 && (
                                    <span className="absolute -top-1 -right-1 text-xs rounded-full h-4 w-4 sm:h-5 sm:w-5 flex items-center justify-center text-white font-medium text-[10px] sm:text-xs" 
                                          style={{backgroundColor: '#F4C542', color: '#333333'}}>
                                        {currentCartCount}
                                    </span>
                                )}
                            </Link>

                            {/* Account Menu - Only show if showAccount is true */}
                            {showAccount && (
                                <div className="hidden lg:block relative account-dropdown">
                                    {auth.user ? (
                                        <div className="relative">
                                            <button
                                                onClick={() => setIsAccountDropdownOpen(!isAccountDropdownOpen)}
                                                className="flex items-center space-x-2 p-2 text-white hover:opacity-80 transition-colors"
                                            >
                                                <UserIcon className="w-5 h-5" />
                                                <span className="text-sm font-medium">{auth.user.name}</span>
                                                <ChevronDownIcon className="w-4 h-4" />
                                            </button>
                                            
                                            {isAccountDropdownOpen && (
                                                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 z-50">
                                                    <div className="py-1">
                                                        <Link
                                                            href="/dashboard"
                                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                            onClick={() => setIsAccountDropdownOpen(false)}
                                                        >
                                                            My Account
                                                        </Link>
                                                        <Link
                                                            href="/orders"
                                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                            onClick={() => setIsAccountDropdownOpen(false)}
                                                        >
                                                            My Orders
                                                        </Link>
                                                        <Link
                                                            href="/settings/profile"
                                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                            onClick={() => setIsAccountDropdownOpen(false)}
                                                        >
                                                            Settings
                                                        </Link>
                                                        <div className="border-t border-gray-100"></div>
                                                        <Link
                                                            href="/logout"
                                                            method="post"
                                                            as="button"
                                                            className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                                                            onClick={() => setIsAccountDropdownOpen(false)}
                                                        >
                                                            Logout
                                                        </Link>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    ) : (
                                        <div className="flex items-center">
                                            <Link
                                                href="/login"
                                                className="text-sm font-medium px-4 py-2 rounded-md text-white hover:opacity-80 transition-all border"
                                                style={{borderColor: '#D4AF37'}}
                                            >
                                                Account
                                            </Link>
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* Mobile Menu Button */}
                            <div className="lg:hidden">
                                <button 
                                    type="button" 
                                    className="text-white hover:opacity-80 p-2"
                                    onClick={toggleMobileMenu}
                                    aria-label="Toggle mobile menu"
                                >
                                    {isMobileMenuOpen ? (
                                        <XMarkIcon className="w-6 h-6" />
                                    ) : (
                                        <Bars3Icon className="w-6 h-6" />
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Mobile Navigation Menu */}
                    {isMobileMenuOpen && (
                        <div className="lg:hidden border-t mt-3 pt-3" style={{borderColor: '#333333'}}>
                            <ul className="flex flex-col space-y-3 font-medium">
                                <li>
                                    <Link 
                                        href="/" 
                                        className="block text-white hover:opacity-80 transition-colors duration-200 text-base py-2"
                                        onClick={closeMobileMenu}
                                    >
                                        Home
                                    </Link>
                                </li>
                                <li>
                                    <Link 
                                        href="/about" 
                                        className="block text-white hover:opacity-80 transition-colors duration-200 text-base py-2"
                                        onClick={closeMobileMenu}
                                    >
                                        About
                                    </Link>
                                </li>
                                <li>
                                    <Link 
                                        href="/services" 
                                        className="block text-white hover:opacity-80 transition-colors duration-200 text-base py-2"
                                        onClick={closeMobileMenu}
                                    >
                                        Services
                                    </Link>
                                </li>
                                <li>
                                    <Link 
                                        href="/products" 
                                        className="block text-white hover:opacity-80 transition-colors duration-200 text-base py-2"
                                        onClick={closeMobileMenu}
                                    >
                                        Products
                                    </Link>
                                </li>
                                <li>
                                    <Link 
                                        href="/contact" 
                                        className="block text-white hover:opacity-80 transition-colors duration-200 text-base py-2"
                                        onClick={closeMobileMenu}
                                    >
                                        Contact
                                    </Link>
                                </li>
                                <li>
                                    <Link 
                                        href="/cart" 
                                        className="block text-white hover:opacity-80 transition-colors duration-200 text-base py-2 flex items-center justify-between"
                                        onClick={closeMobileMenu}
                                    >
                                        <span>Cart</span>
                                        {currentCartCount > 0 && (
                                            <span className="text-xs rounded-full h-5 w-5 flex items-center justify-center text-white font-medium" 
                                                  style={{backgroundColor: '#F4C542', color: '#333333'}}>
                                                {currentCartCount}
                                            </span>
                                        )}
                                    </Link>
                                </li>
                                
                                {/* Mobile Authentication Options - Only show if showAccount is true */}
                                {showAccount && (
                                    <li className="border-t pt-3 mt-3" style={{borderColor: '#333333'}}>
                                        {auth.user ? (
                                            <>
                                                <div className="text-sm text-gray-300 mb-3">
                                                    Welcome, {auth.user.name}
                                                </div>
                                                <Link 
                                                    href="/dashboard" 
                                                    className="block text-gray-700 hover:opacity-80 transition-colors duration-200 text-base py-2"
                                                    onClick={closeMobileMenu}
                                                >
                                                    My Account
                                                </Link>
                                                <Link 
                                                    href="/orders" 
                                                    className="block text-gray-700 hover:opacity-80 transition-colors duration-200 text-base py-2"
                                                    onClick={closeMobileMenu}
                                                >
                                                    My Orders
                                                </Link>
                                                <Link 
                                                    href="/settings/profile" 
                                                    className="block text-gray-700 hover:opacity-80 transition-colors duration-200 text-base py-2"
                                                    onClick={closeMobileMenu}
                                                >
                                                    Settings
                                                </Link>
                                                <Link
                                                    href="/logout"
                                                    method="post"
                                                    as="button"
                                                    className="block w-full text-left text-red-600 hover:opacity-80 transition-colors duration-200 text-base py-2"
                                                    onClick={closeMobileMenu}
                                                >
                                                    Logout
                                                </Link>
                                            </>
                                        ) : (
                                            <>
                                                <Link 
                                                    href="/login" 
                                                    className="block text-gray-700 hover:opacity-80 transition-colors duration-200 text-base py-2"
                                                    onClick={closeMobileMenu}
                                                >
                                                    Account
                                                </Link>
                                            </>
                                        )}
                                    </li>
                                )}
                            </ul>
                        </div>
                    )}
                </div>
            </nav>
        </>
    );
}