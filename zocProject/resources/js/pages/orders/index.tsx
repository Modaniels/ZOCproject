import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { MagnifyingGlassIcon, EyeIcon, ShoppingBagIcon } from '@heroicons/react/24/outline';
import Navigation from '../../components/Navigation';

interface OrderItem {
    id: number;
    quantity: number;
    price: number;
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
    total_amount: number;
    formatted_total: string;
    created_at: string;
    items_count: number;
    items: OrderItem[];
}

interface PaginationData {
    data: Order[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
}

interface Props {
    orders: PaginationData;
    filters: {
        status?: string;
        search?: string;
    };
}

export default function OrdersIndex({ orders, filters }: Props) {
    const [search, setSearch] = useState(filters.search || '');
    const [statusFilter, setStatusFilter] = useState(filters.status || '');

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.get('/orders', { search, status: statusFilter }, { preserveState: true });
    };

    const handleStatusFilter = (status: string) => {
        setStatusFilter(status);
        router.get('/orders', { search, status }, { preserveState: true });
    };

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

    const getPaymentStatusColor = (status: string) => {
        switch (status.toLowerCase()) {
            case 'paid': return 'bg-green-100 text-green-800';
            case 'pending': return 'bg-yellow-100 text-yellow-800';
            case 'failed': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <>
            <Head title="My Orders - ZOC Farm">
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
                        {/* Header */}
                        <div className="mb-8">
                            <h1 className="text-3xl sm:text-4xl font-bold mb-4" style={{color: '#3A4C2F', fontFamily: 'Space Grotesk, sans-serif'}}>
                                My Orders
                            </h1>
                            <p className="text-gray-600">
                                Track and manage your orders from ZOC Farm
                            </p>
                        </div>

                        {/* Search and Filter */}
                        <div className="bg-white rounded-xl shadow-lg p-6 mb-8 border border-gray-100">
                            <div className="flex flex-col lg:flex-row gap-4">
                                <form onSubmit={handleSearch} className="flex-1">
                                    <div className="relative">
                                        <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                        <input
                                            type="text"
                                            placeholder="Search by order number..."
                                            value={search}
                                            onChange={(e) => setSearch(e.target.value)}
                                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-opacity-50"
                                            style={{'--tw-ring-color': '#3A4C2F'} as React.CSSProperties}
                                        />
                                    </div>
                                </form>

                                <div className="flex gap-2 flex-wrap">
                                    <button
                                        onClick={() => handleStatusFilter('')}
                                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                                            statusFilter === '' 
                                                ? 'text-white' 
                                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                        }`}
                                        style={statusFilter === '' ? {backgroundColor: '#3A4C2F'} : {}}
                                    >
                                        All
                                    </button>
                                    {['pending', 'confirmed', 'processing', 'shipped', 'delivered'].map((status) => (
                                        <button
                                            key={status}
                                            onClick={() => handleStatusFilter(status)}
                                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors capitalize ${
                                                statusFilter === status 
                                                    ? 'text-white' 
                                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                            }`}
                                            style={statusFilter === status ? {backgroundColor: '#3A4C2F'} : {}}
                                        >
                                            {status}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Orders List */}
                        {orders.data.length > 0 ? (
                            <div className="space-y-6">
                                {orders.data.map((order) => (
                                    <div key={order.id} className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
                                        <div className="p-6">
                                            <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-4">
                                                <div className="mb-4 lg:mb-0">
                                                    <h3 className="text-lg font-semibold mb-2" style={{color: '#3A4C2F'}}>
                                                        Order #{order.order_number}
                                                    </h3>
                                                    <div className="flex flex-wrap gap-2 text-sm text-gray-600">
                                                        <span>Placed on {order.created_at}</span>
                                                        <span>•</span>
                                                        <span>{order.items_count} item{order.items_count > 1 ? 's' : ''}</span>
                                                        <span>•</span>
                                                        <span className="font-semibold">{order.formatted_total}</span>
                                                    </div>
                                                </div>

                                                <div className="flex items-center gap-4">
                                                    <div className="flex flex-col gap-2">
                                                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                                                            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                                                        </span>
                                                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getPaymentStatusColor(order.payment_status)}`}>
                                                            Payment: {order.payment_status}
                                                        </span>
                                                    </div>

                                                    <Link
                                                        href={`/orders/${order.id}`}
                                                        className="flex items-center gap-2 px-4 py-2 text-white rounded-lg hover:opacity-90 transition-opacity"
                                                        style={{backgroundColor: '#3A4C2F'}}
                                                    >
                                                        <EyeIcon className="w-4 h-4" />
                                                        View Details
                                                    </Link>
                                                </div>
                                            </div>

                                            {/* Order Items Preview */}
                                            <div className="border-t border-gray-100 pt-4">
                                                <div className="flex flex-wrap gap-4">
                                                    {order.items.slice(0, 3).map((item) => (
                                                        <div key={item.id} className="flex items-center gap-3">
                                                            {item.product.primary_image ? (
                                                                <img
                                                                    src={item.product.primary_image.url}
                                                                    alt={item.product.primary_image.alt_text}
                                                                    className="w-12 h-12 object-cover rounded-lg"
                                                                />
                                                            ) : (
                                                                <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                                                                    <ShoppingBagIcon className="w-6 h-6 text-gray-400" />
                                                                </div>
                                                            )}
                                                            <div>
                                                                <p className="text-sm font-medium text-gray-900">
                                                                    {item.product.name}
                                                                </p>
                                                                <p className="text-xs text-gray-500">
                                                                    Qty: {item.quantity}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    ))}
                                                    {order.items.length > 3 && (
                                                        <div className="flex items-center text-sm text-gray-500">
                                                            +{order.items.length - 3} more item{order.items.length - 3 > 1 ? 's' : ''}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}

                                {/* Pagination */}
                                {orders.last_page > 1 && (
                                    <div className="flex justify-center mt-8">
                                        <div className="flex space-x-2">
                                            {Array.from({ length: orders.last_page }, (_, i) => i + 1).map((page) => (
                                                <button
                                                    key={page}
                                                    onClick={() => router.get('/orders', { ...filters, page }, { preserveState: true })}
                                                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                                                        page === orders.current_page
                                                            ? 'text-white'
                                                            : 'bg-white text-gray-700 hover:bg-gray-100'
                                                    }`}
                                                    style={page === orders.current_page ? {backgroundColor: '#3A4C2F'} : {}}
                                                >
                                                    {page}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="bg-white rounded-xl shadow-lg p-12 text-center border border-gray-100">
                                <div className="text-6xl mb-6">📦</div>
                                <h3 className="text-2xl font-bold mb-4" style={{color: '#3A4C2F'}}>
                                    No orders found
                                </h3>
                                <p className="text-gray-600 text-lg mb-8">
                                    {filters.search || filters.status 
                                        ? 'No orders match your search criteria.' 
                                        : "You haven't placed any orders yet."
                                    }
                                </p>
                                <Link
                                    href="/products"
                                    className="inline-flex items-center px-8 py-4 text-white font-semibold rounded-lg hover:opacity-90 transition duration-200"
                                    style={{backgroundColor: '#3A4C2F'}}
                                >
                                    <ShoppingBagIcon className="w-5 h-5 mr-2" />
                                    Start Shopping
                                </Link>
                            </div>
                        )}
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