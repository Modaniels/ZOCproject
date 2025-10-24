import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { ArrowLeftIcon, TruckIcon, CheckCircleIcon, ClockIcon } from '@heroicons/react/24/outline';
import Navigation from '../../components/Navigation';

interface OrderItem {
    id: number;
    quantity: number;
    price: number;
    formatted_price: string;
    total: number;
    formatted_total: string;
    product: {
        id: number;
        name: string;
        slug: string;
        primary_image?: {
            url: string;
            alt_text: string;
        };
    };
}

interface Order {
    id: number;
    order_number: string;
    status: string;
    payment_status: string;
    payment_method: string;
    subtotal: number;
    tax_amount: number;
    shipping_amount: number;
    total_amount: number;
    formatted_subtotal: string;
    formatted_tax: string;
    formatted_shipping: string;
    formatted_total: string;
    created_at: string;
    billing_address: {
        first_name: string;
        last_name: string;
        email: string;
        phone: string;
        address: string;
        city: string;
        state: string;
        postal_code: string;
        country: string;
    };
    shipping_address: {
        first_name: string;
        last_name: string;
        phone: string;
        address: string;
        city: string;
        state: string;
        postal_code: string;
        country: string;
    };
    items: OrderItem[];
}

interface Props {
    order: Order;
}

export default function OrderShow({ order }: Props) {
    const getStatusColor = (status: string) => {
        switch (status.toLowerCase()) {
            case 'pending': return 'bg-yellow-100 text-yellow-800';
            case 'confirmed': return 'bg-blue-100 text-blue-800';
            case 'processing': return 'bg-purple-100 text-purple-800';
            case 'shipped': return 'bg-indigo-100 text-indigo-800';
            case 'delivered': return 'bg-green-100 text-green-800';
            case 'cancelled': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status.toLowerCase()) {
            case 'pending':
            case 'confirmed': 
                return <ClockIcon className="w-5 h-5" />;
            case 'processing':
            case 'shipped': 
                return <TruckIcon className="w-5 h-5" />;
            case 'delivered': 
                return <CheckCircleIcon className="w-5 h-5" />;
            default: 
                return <ClockIcon className="w-5 h-5" />;
        }
    };

    const getOrderProgress = (status: string) => {
        const statuses = ['pending', 'confirmed', 'processing', 'shipped', 'delivered'];
        const currentIndex = statuses.indexOf(status.toLowerCase());
        return Math.max(0, currentIndex);
    };

    const orderStatuses = [
        { key: 'pending', label: 'Order Placed' },
        { key: 'confirmed', label: 'Confirmed' },
        { key: 'processing', label: 'Processing' },
        { key: 'shipped', label: 'Shipped' },
        { key: 'delivered', label: 'Delivered' }
    ];

    const currentProgress = getOrderProgress(order.status);

    return (
        <>
            <Head title={`Order #${order.order_number} - ZOC Farm`}>
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
                    <div className="max-w-6xl mx-auto">
                        {/* Back Button */}
                        <div className="mb-6">
                            <Link
                                href="/orders"
                                className="inline-flex items-center text-gray-600 hover:text-gray-800 transition-colors"
                            >
                                <ArrowLeftIcon className="w-5 h-5 mr-2" />
                                Back to Orders
                            </Link>
                        </div>

                        {/* Header */}
                        <div className="bg-white rounded-xl shadow-lg p-6 mb-8 border border-gray-100">
                            <div className="flex flex-col lg:flex-row lg:items-center justify-between">
                                <div>
                                    <h1 className="text-2xl sm:text-3xl font-bold mb-2" style={{color: '#3A4C2F', fontFamily: 'Space Grotesk, sans-serif'}}>
                                        Order #{order.order_number}
                                    </h1>
                                    <p className="text-gray-600">
                                        Placed on {order.created_at}
                                    </p>
                                </div>

                                <div className="mt-4 lg:mt-0 flex items-center gap-4">
                                    <div className="flex items-center gap-2">
                                        {getStatusIcon(order.status)}
                                        <span className={`px-4 py-2 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                                            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                                        </span>
                                    </div>
                                    <div className="text-2xl font-bold" style={{color: '#3A4C2F'}}>
                                        {order.formatted_total}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Order Progress */}
                        <div className="bg-white rounded-xl shadow-lg p-6 mb-8 border border-gray-100">
                            <h2 className="text-xl font-semibold mb-6" style={{color: '#3A4C2F'}}>
                                Order Progress
                            </h2>
                            
                            <div className="flex items-center justify-between">
                                {orderStatuses.map((status, index) => (
                                    <div key={status.key} className="flex flex-col items-center flex-1 relative">
                                        <div 
                                            className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 ${
                                                index <= currentProgress 
                                                    ? 'text-white' 
                                                    : 'bg-gray-200 text-gray-400'
                                            }`}
                                            style={index <= currentProgress ? {backgroundColor: '#3A4C2F'} : {}}
                                        >
                                            {index <= currentProgress ? (
                                                <CheckCircleIcon className="w-5 h-5" />
                                            ) : (
                                                <span className="text-xs font-bold">{index + 1}</span>
                                            )}
                                        </div>
                                        
                                        <span className={`text-xs font-medium text-center ${
                                            index <= currentProgress ? 'text-gray-900' : 'text-gray-400'
                                        }`}>
                                            {status.label}
                                        </span>

                                        {index < orderStatuses.length - 1 && (
                                            <div 
                                                className={`absolute top-4 left-1/2 w-full h-0.5 ${
                                                    index < currentProgress ? 'bg-green-500' : 'bg-gray-200'
                                                }`}
                                                style={{transform: 'translateX(50%)'}}
                                            />
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            {/* Order Items */}
                            <div className="lg:col-span-2">
                                <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
                                    <div className="p-6 border-b border-gray-100">
                                        <h2 className="text-xl font-semibold" style={{color: '#3A4C2F'}}>
                                            Order Items ({order.items.length})
                                        </h2>
                                    </div>

                                    <div className="divide-y divide-gray-100">
                                        {order.items.map((item) => (
                                            <div key={item.id} className="p-6 flex gap-4">
                                                {item.product.primary_image ? (
                                                    <img
                                                        src={item.product.primary_image.url}
                                                        alt={item.product.primary_image.alt_text}
                                                        className="w-20 h-20 object-cover rounded-lg flex-shrink-0"
                                                    />
                                                ) : (
                                                    <div className="w-20 h-20 bg-gray-200 rounded-lg flex items-center justify-center flex-shrink-0">
                                                        <span className="text-gray-400 text-xs">No Image</span>
                                                    </div>
                                                )}

                                                <div className="flex-1">
                                                    <h3 className="font-semibold text-gray-900 mb-2">
                                                        {item.product.name}
                                                    </h3>
                                                    <div className="flex items-center justify-between">
                                                        <div className="text-sm text-gray-600">
                                                            <span>Qty: {item.quantity}</span>
                                                            <span className="mx-2">×</span>
                                                            <span>{item.formatted_price}</span>
                                                        </div>
                                                        <div className="font-semibold" style={{color: '#3A4C2F'}}>
                                                            {item.formatted_total}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Order Summary & Addresses */}
                            <div className="space-y-6">
                                {/* Order Summary */}
                                <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                                    <h3 className="text-lg font-semibold mb-4" style={{color: '#3A4C2F'}}>
                                        Order Summary
                                    </h3>
                                    
                                    <div className="space-y-3">
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Subtotal:</span>
                                            <span>{order.formatted_subtotal}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Tax:</span>
                                            <span>{order.formatted_tax}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Shipping:</span>
                                            <span>{order.formatted_shipping}</span>
                                        </div>
                                        <div className="border-t border-gray-200 pt-3">
                                            <div className="flex justify-between text-lg font-semibold">
                                                <span>Total:</span>
                                                <span style={{color: '#3A4C2F'}}>{order.formatted_total}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-4 pt-4 border-t border-gray-200">
                                        <div className="text-sm text-gray-600">
                                            <div>Payment Method: <span className="font-medium capitalize">{order.payment_method}</span></div>
                                            <div>Payment Status: <span className={`font-medium ${order.payment_status === 'paid' ? 'text-green-600' : 'text-yellow-600'}`}>
                                                {order.payment_status.charAt(0).toUpperCase() + order.payment_status.slice(1)}
                                            </span></div>
                                        </div>
                                    </div>
                                </div>

                                {/* Shipping Address */}
                                <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                                    <h3 className="text-lg font-semibold mb-4" style={{color: '#3A4C2F'}}>
                                        Shipping Address
                                    </h3>
                                    <div className="text-sm text-gray-600 space-y-1">
                                        <div className="font-medium text-gray-900">
                                            {order.shipping_address.first_name} {order.shipping_address.last_name}
                                        </div>
                                        <div>{order.shipping_address.address}</div>
                                        <div>
                                            {order.shipping_address.city}, {order.shipping_address.state} {order.shipping_address.postal_code}
                                        </div>
                                        <div>{order.shipping_address.country}</div>
                                        <div className="pt-2">
                                            Phone: {order.shipping_address.phone}
                                        </div>
                                    </div>
                                </div>

                                {/* Billing Address */}
                                <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                                    <h3 className="text-lg font-semibold mb-4" style={{color: '#3A4C2F'}}>
                                        Billing Address
                                    </h3>
                                    <div className="text-sm text-gray-600 space-y-1">
                                        <div className="font-medium text-gray-900">
                                            {order.billing_address.first_name} {order.billing_address.last_name}
                                        </div>
                                        <div>{order.billing_address.address}</div>
                                        <div>
                                            {order.billing_address.city}, {order.billing_address.state} {order.billing_address.postal_code}
                                        </div>
                                        <div>{order.billing_address.country}</div>
                                        <div className="pt-2">
                                            <div>Email: {order.billing_address.email}</div>
                                            <div>Phone: {order.billing_address.phone}</div>
                                        </div>
                                    </div>
                                </div>
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
                                    <li><Link href="/" className="text-gray-400 hover:text-yellow-400 transition-colors">Home</Link></li>
                                    <li><Link href="/about" className="text-gray-400 hover:text-yellow-400 transition-colors">About</Link></li>
                                    <li><Link href="/services" className="text-gray-400 hover:text-yellow-400 transition-colors">Services</Link></li>
                                    <li><Link href="/products" className="text-gray-400 hover:text-yellow-400 transition-colors">Products</Link></li>
                                    <li><Link href="/contact" className="text-gray-400 hover:text-yellow-400 transition-colors">Contact</Link></li>
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