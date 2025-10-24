import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { ArrowLeftIcon, TruckIcon, CheckCircleIcon, ClockIcon, ShoppingBagIcon } from '@heroicons/react/24/outline';
import Navigation from '../../components/Navigation';

interface OrderItem {
    id: number;
    quantity: number;
    price: number;
    formatted_price: string;
    product: {
        id: number;
        name: string;
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
    total_amount: number;
    formatted_total: string;
    created_at: string;
    items: OrderItem[];
}

interface Props {
    order: Order;
}

export default function OrderTrack({ order }: Props) {
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
            <Head title={`Track Order #${order.order_number} - ZOC Farm`}>
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
                    <div className="max-w-4xl mx-auto">
                        {/* Back Button */}
                        <div className="mb-6">
                            <Link
                                href="/orders/track"
                                className="inline-flex items-center text-gray-600 hover:text-gray-800 transition-colors"
                            >
                                <ArrowLeftIcon className="w-5 h-5 mr-2" />
                                Track Another Order
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

                        {/* Order Items */}
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
                                                <ShoppingBagIcon className="w-8 h-8 text-gray-400" />
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
                                                    KSh {(item.quantity * item.price).toLocaleString()}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Payment Info */}
                        <div className="mt-6 bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                            <h3 className="text-lg font-semibold mb-4" style={{color: '#3A4C2F'}}>
                                Payment Information
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                                <div>
                                    <span className="text-gray-600">Payment Method:</span>
                                    <span className="ml-2 font-medium capitalize">{order.payment_method}</span>
                                </div>
                                <div>
                                    <span className="text-gray-600">Payment Status:</span>
                                    <span className={`ml-2 font-medium ${
                                        order.payment_status === 'paid' ? 'text-green-600' : 'text-yellow-600'
                                    }`}>
                                        {order.payment_status.charAt(0).toUpperCase() + order.payment_status.slice(1)}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Contact Support */}
                        <div className="mt-8 bg-gray-50 rounded-xl p-6 text-center">
                            <h3 className="text-lg font-semibold mb-4" style={{color: '#3A4C2F'}}>
                                Need Help?
                            </h3>
                            <p className="text-gray-600 mb-4">
                                Have questions about your order? Our support team is here to help.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <a
                                    href="mailto:support@zocfarms.co.ke"
                                    className="px-6 py-3 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                                >
                                    Email Support
                                </a>
                                <a
                                    href="tel:+254700123456"
                                    className="px-6 py-3 text-white rounded-lg hover:opacity-90 transition-opacity"
                                    style={{backgroundColor: '#3A4C2F'}}
                                >
                                    Call Support
                                </a>
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