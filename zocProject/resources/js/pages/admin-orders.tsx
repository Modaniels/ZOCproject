import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { 
    EyeIcon,
    PencilIcon,
    CheckCircleIcon,
    XCircleIcon,
    ClockIcon,
    TruckIcon,
    MagnifyingGlassIcon,
    FunnelIcon
} from '@heroicons/react/24/outline';

interface OrderItem {
    id: number;
    quantity: number;
    price: number;
    product: {
        id: number;
        name: string;
        slug: string;
    };
}

interface Order {
    id: number;
    order_number: string;
    billing_first_name: string;
    billing_last_name: string;
    billing_email: string;
    billing_phone: string;
    billing_address: string;
    billing_city: string;
    shipping_first_name: string;
    shipping_last_name: string;
    shipping_address: string;
    shipping_city: string;
    total_amount: number;
    status: string;
    payment_status: string;
    payment_method: string;
    created_at: string;
    shipped_at?: string;
    delivered_at?: string;
    user: {
        id: number;
        name: string;
        email: string;
    };
    items: OrderItem[];
}

interface Props {
    orders: Order[];
}

export default function AdminOrders({ orders: initialOrders }: Props) {
    const [orders, setOrders] = useState(initialOrders);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [paymentFilter, setPaymentFilter] = useState('all');

    // Get CSRF token safely
    const getCsrfToken = () => {
        if (typeof document !== 'undefined') {
            return document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '';
        }
        return '';
    };

    const filteredOrders = orders.filter(order => {
        const matchesSearch = order.order_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            order.billing_email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            `${order.billing_first_name} ${order.billing_last_name}`.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
        const matchesPayment = paymentFilter === 'all' || order.payment_status === paymentFilter;
        
        return matchesSearch && matchesStatus && matchesPayment;
    });

    const updateOrderStatus = async (orderId: number, newStatus: string) => {
        try {
            const response = await fetch(`/admin/orders/${orderId}/status`, {
                method: 'PUT',
                headers: {
                    'X-CSRF-TOKEN': getCsrfToken(),
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ status: newStatus }),
            });

            const data = await response.json();

            if (response.ok) {
                // Update the order in the local state
                setOrders(orders.map(order => 
                    order.id === orderId 
                        ? { ...order, status: newStatus, ...(newStatus === 'delivered' ? { delivered_at: new Date().toISOString() } : {}) }
                        : order
                ));
                alert(data.message || 'Order status updated successfully!');
            } else {
                alert(data.message || 'Failed to update order status');
            }
        } catch (error) {
            console.error('Error updating order status:', error);
            alert('An error occurred while updating the order status');
        }
    };

    const getStatusBadge = (status: string) => {
        const baseClasses = 'px-3 py-1 text-xs font-medium rounded-full';
        
        switch (status) {
            case 'pending':
                return `${baseClasses} bg-yellow-100 text-yellow-800`;
            case 'confirmed':
                return `${baseClasses} bg-blue-100 text-blue-800`;
            case 'processing':
                return `${baseClasses} bg-purple-100 text-purple-800`;
            case 'shipped':
                return `${baseClasses} bg-indigo-100 text-indigo-800`;
            case 'delivered':
                return `${baseClasses} bg-green-100 text-green-800`;
            case 'cancelled':
                return `${baseClasses} bg-red-100 text-red-800`;
            default:
                return `${baseClasses} bg-gray-100 text-gray-800`;
        }
    };

    const getPaymentBadge = (status: string) => {
        const baseClasses = 'px-2 py-1 text-xs font-medium rounded-full';
        
        switch (status) {
            case 'completed':
                return `${baseClasses} bg-green-100 text-green-800`;
            case 'pending':
                return `${baseClasses} bg-yellow-100 text-yellow-800`;
            case 'failed':
                return `${baseClasses} bg-red-100 text-red-800`;
            case 'refunded':
                return `${baseClasses} bg-purple-100 text-purple-800`;
            default:
                return `${baseClasses} bg-gray-100 text-gray-800`;
        }
    };

    const getStatusActions = (order: Order) => {
        const actions = [];
        
        switch (order.status) {
            case 'pending':
                actions.push(
                    <button
                        key="confirm"
                        onClick={() => updateOrderStatus(order.id, 'confirmed')}
                        className="px-3 py-1 text-xs bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                    >
                        Confirm
                    </button>
                );
                break;
            case 'confirmed':
                actions.push(
                    <button
                        key="process"
                        onClick={() => updateOrderStatus(order.id, 'processing')}
                        className="px-3 py-1 text-xs bg-purple-500 text-white rounded hover:bg-purple-600 transition-colors"
                    >
                        Start Processing
                    </button>
                );
                break;
            case 'processing':
                actions.push(
                    <button
                        key="ship"
                        onClick={() => updateOrderStatus(order.id, 'shipped')}
                        className="px-3 py-1 text-xs bg-indigo-500 text-white rounded hover:bg-indigo-600 transition-colors"
                    >
                        Mark as Shipped
                    </button>
                );
                break;
            case 'shipped':
                actions.push(
                    <button
                        key="deliver"
                        onClick={() => updateOrderStatus(order.id, 'delivered')}
                        className="px-3 py-1 text-xs bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
                    >
                        Mark as Delivered
                    </button>
                );
                break;
        }

        if (order.status !== 'cancelled' && order.status !== 'delivered') {
            actions.push(
                <button
                    key="cancel"
                    onClick={() => updateOrderStatus(order.id, 'cancelled')}
                    className="px-3 py-1 text-xs bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                >
                    Cancel
                </button>
            );
        }

        return actions;
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-GB', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const Navigation = () => (
        <nav className="bg-white shadow-sm border-b">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex justify-between items-center h-16">
                    <div className="flex items-center space-x-4">
                        <Link href="/admin" className="text-2xl font-bold" style={{color: '#3A4C2F', fontFamily: 'Space Grotesk, sans-serif'}}>
                            ZOC Farm Admin
                        </Link>
                        <span className="text-gray-400">/</span>
                        <span className="text-gray-900">Orders</span>
                    </div>
                    <div className="flex items-center space-x-4">
                        <Link href="/" className="text-gray-600 hover:text-gray-900 text-sm">
                            View Store
                        </Link>
                        <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                            <span className="text-xs font-semibold">AD</span>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );

    return (
        <>
            <Head title="Orders - Admin">
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link
                    href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600;700&display=swap"
                    rel="stylesheet"
                />
                <meta name="csrf-token" content={getCsrfToken()} />
            </Head>
            
            <div className="min-h-screen bg-gray-50" style={{
                fontFamily: 'Inter, sans-serif',
                color: '#1F2937'
            }}>
                <Navigation />
                
                <div className="max-w-7xl mx-auto p-8">
                    {/* Header */}
                    <div className="flex justify-between items-center mb-8">
                        <div>
                            <h1 className="text-3xl font-bold" style={{color: '#1F2937'}}>
                                Orders Management
                            </h1>
                            <p className="text-gray-600 mt-2">
                                Track and manage customer orders
                            </p>
                        </div>
                    </div>

                    {/* Filters */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            {/* Search */}
                            <div className="relative">
                                <MagnifyingGlassIcon className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Search orders..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                                />
                            </div>

                            {/* Status Filter */}
                            <div>
                                <select
                                    value={statusFilter}
                                    onChange={(e) => setStatusFilter(e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                                >
                                    <option value="all">All Statuses</option>
                                    <option value="pending">Pending</option>
                                    <option value="confirmed">Confirmed</option>
                                    <option value="processing">Processing</option>
                                    <option value="shipped">Shipped</option>
                                    <option value="delivered">Delivered</option>
                                    <option value="cancelled">Cancelled</option>
                                </select>
                            </div>

                            {/* Payment Filter */}
                            <div>
                                <select
                                    value={paymentFilter}
                                    onChange={(e) => setPaymentFilter(e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                                >
                                    <option value="all">All Payments</option>
                                    <option value="completed">Paid</option>
                                    <option value="pending">Pending</option>
                                    <option value="failed">Failed</option>
                                    <option value="refunded">Refunded</option>
                                </select>
                            </div>

                            {/* Results Count */}
                            <div className="flex items-center text-sm text-gray-600">
                                {filteredOrders.length} of {orders.length} orders
                            </div>
                        </div>
                    </div>

                    {/* Orders Table */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Order
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Customer
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Status
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Payment
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Total
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Date
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {filteredOrders.map((order) => (
                                        <tr key={order.id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div>
                                                    <div className="text-sm font-medium text-gray-900">
                                                        {order.order_number}
                                                    </div>
                                                    <div className="text-sm text-gray-500">
                                                        {order.items.length} item{order.items.length !== 1 ? 's' : ''}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div>
                                                    <div className="text-sm font-medium text-gray-900">
                                                        {order.billing_first_name} {order.billing_last_name}
                                                    </div>
                                                    <div className="text-sm text-gray-500">
                                                        {order.billing_email}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={getStatusBadge(order.status)}>
                                                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div>
                                                    <span className={getPaymentBadge(order.payment_status)}>
                                                        {order.payment_status.charAt(0).toUpperCase() + order.payment_status.slice(1)}
                                                    </span>
                                                    <div className="text-xs text-gray-500 mt-1">
                                                        {order.payment_method}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm font-medium text-gray-900">
                                                    KSh {order.total_amount.toLocaleString()}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-900">
                                                    {formatDate(order.created_at)}
                                                </div>
                                                {order.delivered_at && (
                                                    <div className="text-xs text-green-600">
                                                        Delivered: {formatDate(order.delivered_at)}
                                                    </div>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center space-x-2">
                                                    <Link
                                                        href={`/admin/orders/${order.id}`}
                                                        className="p-2 text-gray-600 hover:text-blue-600 transition-colors"
                                                        title="View Details"
                                                    >
                                                        <EyeIcon className="w-4 h-4" />
                                                    </Link>
                                                    <div className="flex space-x-1">
                                                        {getStatusActions(order)}
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* No Results */}
                        {filteredOrders.length === 0 && (
                            <div className="p-12 text-center">
                                <div className="text-gray-400 mb-4">
                                    <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                    </svg>
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">No orders found</h3>
                                <p className="text-gray-600">
                                    {searchTerm || statusFilter !== 'all' || paymentFilter !== 'all' 
                                        ? 'Try adjusting your filters'
                                        : 'No orders have been placed yet'
                                    }
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}