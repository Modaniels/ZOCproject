import React, { useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
import { MagnifyingGlassIcon, TruckIcon } from '@heroicons/react/24/outline';
import Navigation from '../../components/Navigation';

export default function OrderTrackForm() {
    const { data, setData, post, processing, errors } = useForm({
        order_number: '',
        email: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/orders/track');
    };

    return (
        <>
            <Head title="Track Your Order - ZOC Farm">
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link
                    href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600;700&display=swap"
                    rel="stylesheet"
                />
            </Head>

            <div className="min-h-screen" style={{
                fontFamily: 'Inter, sans-serif',
                backgroundColor: '#FDF8E3',
                color: '#333333'
            }}>
                <Navigation />

                <div className="pt-24 pb-16 px-4">
                    <div className="max-w-2xl mx-auto">
                        {/* Header */}
                        <div className="text-center mb-12">
                            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-6" style={{backgroundColor: '#3A4C2F'}}>
                                <TruckIcon className="w-8 h-8 text-white" />
                            </div>
                            <h1 className="text-3xl sm:text-4xl font-bold mb-4" style={{color: '#3A4C2F', fontFamily: 'Space Grotesk, sans-serif'}}>
                                Track Your Order
                            </h1>
                            <p className="text-gray-600 text-lg">
                                Enter your order details below to track your shipment
                            </p>
                        </div>

                        {/* Tracking Form */}
                        <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label htmlFor="order_number" className="block text-sm font-medium text-gray-700 mb-2">
                                        Order Number *
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            id="order_number"
                                            value={data.order_number}
                                            onChange={(e) => setData('order_number', e.target.value)}
                                            placeholder="e.g., ZOC-1729781234-5678"
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-opacity-50"
                                            style={{'--tw-ring-color': '#3A4C2F'} as React.CSSProperties}
                                            required
                                        />
                                    </div>
                                    {errors.order_number && (
                                        <p className="text-red-600 text-sm mt-1">{errors.order_number}</p>
                                    )}
                                </div>

                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                        Email Address *
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="email"
                                            id="email"
                                            value={data.email}
                                            onChange={(e) => setData('email', e.target.value)}
                                            placeholder="Enter the email used for the order"
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-opacity-50"
                                            style={{'--tw-ring-color': '#3A4C2F'} as React.CSSProperties}
                                            required
                                        />
                                    </div>
                                    {errors.email && (
                                        <p className="text-red-600 text-sm mt-1">{errors.email}</p>
                                    )}
                                </div>

                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="w-full flex items-center justify-center gap-2 px-6 py-3 text-white font-semibold rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
                                    style={{backgroundColor: '#3A4C2F'}}
                                >
                                    {processing ? (
                                        <>
                                            <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full"></div>
                                            Tracking...
                                        </>
                                    ) : (
                                        <>
                                            <MagnifyingGlassIcon className="w-5 h-5" />
                                            Track Order
                                        </>
                                    )}
                                </button>
                            </form>
                        </div>

                        {/* Help Section */}
                        <div className="mt-12 bg-gray-50 rounded-xl p-6">
                            <h3 className="text-lg font-semibold mb-4" style={{color: '#3A4C2F'}}>
                                Need Help?
                            </h3>
                            <div className="space-y-3 text-sm text-gray-600">
                                <p>
                                    <strong>Can't find your order number?</strong> Check your email confirmation or receipt.
                                </p>
                                <p>
                                    <strong>Order number format:</strong> ZOC-XXXXXXXXXX-XXXX (e.g., ZOC-1729781234-5678)
                                </p>
                                <p>
                                    <strong>Still having trouble?</strong> Contact our support team at{' '}
                                    <a href="mailto:support@zocfarms.co.ke" className="text-blue-600 hover:underline">
                                        support@zocfarms.co.ke
                                    </a>{' '}
                                    or call{' '}
                                    <a href="tel:+254700123456" className="text-blue-600 hover:underline">
                                        +254 700 123 456
                                    </a>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <footer className="py-16 px-4" style={{backgroundColor: '#1A1A1A', color: '#EDEDEC'}}>
                    <div className="max-w-6xl mx-auto">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                            <div className="md:col-span-2">
                                <div className="text-3xl font-bold mb-4" style={{color: '#F4C542', fontFamily: 'Space Grotesk, sans-serif'}}>
                                    ZOC Farm
                                </div>
                                <p className="text-gray-400 mb-6 leading-relaxed">
                                    Connecting farmers, investors, contractors and consumers through transparency, 
                                    sustainability, and community-driven agriculture.
                                </p>
                            </div>
                            
                            <div>
                                <h4 className="text-lg font-semibold mb-4" style={{fontFamily: 'Space Grotesk, sans-serif'}}>Quick Links</h4>
                                <ul className="space-y-2">
                                    <li><a href="/" className="text-gray-400 hover:text-yellow-400 transition-colors">Home</a></li>
                                    <li><a href="/about" className="text-gray-400 hover:text-yellow-400 transition-colors">About</a></li>
                                    <li><a href="/services" className="text-gray-400 hover:text-yellow-400 transition-colors">Services</a></li>
                                    <li><a href="/products" className="text-gray-400 hover:text-yellow-400 transition-colors">Products</a></li>
                                    <li><a href="/contact" className="text-gray-400 hover:text-yellow-400 transition-colors">Contact</a></li>
                                </ul>
                            </div>
                            
                            <div>
                                <h4 className="text-lg font-semibold mb-4" style={{fontFamily: 'Space Grotesk, sans-serif'}}>Contact Info</h4>
                                <ul className="space-y-2 text-gray-400">
                                    <li>
                                        <i className="fas fa-map-marker-alt mr-2"></i>
                                        Kirinyaga, Kenya
                                    </li>
                                    <li>
                                        <i className="fas fa-phone mr-2"></i>
                                        +254 700 123 456
                                    </li>
                                    <li>
                                        <i className="fas fa-envelope mr-2"></i>
                                        info@zocfarms.co.ke
                                    </li>
                                </ul>
                            </div>
                        </div>
                        
                        <div className="border-t border-gray-700 mt-12 pt-8 text-center text-gray-400">
                            <p>&copy; 2025 ZOC Farm. All rights reserved.</p>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}