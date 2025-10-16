import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { 
    ArrowLeftIcon,
    CheckCircleIcon,
    XCircleIcon,
    ClockIcon,
    TruckIcon,
    MapPinIcon,
    CreditCardIcon,
    UserIcon
} from '@heroicons/react/24/outline';

interface OrderItem {
    id: number;
    quantity: number;
    price: number;
    product: {
        id: number;
        name: string;
        slug: string;
        price: number;
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
    billing_state?: string;
    billing_postal_code?: string;
    billing_country: string;
    shipping_first_name?: string;
    shipping_last_name?: string;
    shipping_phone?: string;
    shipping_address?: string;
    shipping_city?: string;
    shipping_state?: string;
    shipping_postal_code?: string;
    shipping_country?: string;
    subtotal: number;
    tax_amount?: number;
    shipping_amount?: number;
    total_amount: number;
    status: string;
    payment_status: string;
    payment_method: string;
    payment_id?: string;
    notes?: string;
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
    order: Order;
}

export default function AdminOrderDetail({ order: initialOrder }: Props) {
    const [order, setOrder] = useState(initialOrder);

    // Get CSRF token safely
    const getCsrfToken = () => {
        if (typeof document !== 'undefined') {
            return document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '';
        }
        return '';
    };

    const updateOrderStatus = async (newStatus: string) => {
        try {
            const response = await fetch(`/admin/orders/${order.id}/status`, {
                method: 'PUT',
                headers: {
                    'X-CSRF-TOKEN': getCsrfToken(),
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ status: newStatus }),
            });

            const data = await response.json();

            if (response.ok) {
                setOrder({ 
                    ...order, 
                    status: newStatus,
                    ...(newStatus === 'delivered' ? { delivered_at: new Date().toISOString() } : {}),
                    ...(newStatus === 'shipped' ? { shipped_at: new Date().toISOString() } : {})
                });
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
        const baseClasses = 'px-3 py-1 text-sm font-medium rounded-full';
        
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
        const baseClasses = 'px-3 py-1 text-sm font-medium rounded-full';
        
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

    const getStatusActions = () => {
        const actions = [];
        
        switch (order.status) {
            case 'pending':
                actions.push(
                    <button
                        key="confirm"
                        onClick={() => updateOrderStatus('confirmed')}
                        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                    >
                        Confirm Order
                    </button>
                );
                break;
            case 'confirmed':
                actions.push(
                    <button
                        key="process"
                        onClick={() => updateOrderStatus('processing')}
                        className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
                    >
                        Start Processing
                    </button>
                );
                break;
            case 'processing':
                actions.push(
                    <button
                        key="ship"
                        onClick={() => updateOrderStatus('shipped')}
                        className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors"
                    >
                        Mark as Shipped
                    </button>
                );
                break;
            case 'shipped':
                actions.push(
                    <button
                        key="deliver"
                        onClick={() => updateOrderStatus('delivered')}
                        className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
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
                    onClick={() => updateOrderStatus('cancelled')}
                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                >
                    Cancel Order
                </button>
            );
        }

        return actions;
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-GB', {
            year: 'numeric',
            month: 'long',
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
                        <Link href="/admin/orders" className="text-gray-600 hover:text-gray-900">
                            Orders
                        </Link>
                        <span className="text-gray-400">/</span>
                        <span className="text-gray-900">{order.order_number}</span>
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
            <Head title={`Order ${order.order_number} - Admin`}>
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
                color: '#333333'
            }}>
                <Navigation />
                
                <div className="max-w-7xl mx-auto p-8">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center space-x-4">
                            <Link
                                href="/admin/orders"
                                className="p-2 text-gray-600 hover:text-gray-900 transition-colors"
                            >
                                <ArrowLeftIcon className="w-5 h-5" />
                            </Link>
                            <div>
                                <h1 className="text-3xl font-bold" style={{color: '#3A4C2F'}}>
                                    Order {order.order_number}
                                </h1>
                                <p className="text-gray-600 mt-1">
                                    Placed on {formatDate(order.created_at)}
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-4">
                            <span className={getStatusBadge(order.status)}>
                                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                            </span>
                            <span className={getPaymentBadge(order.payment_status)}>
                                {order.payment_status.charAt(0).toUpperCase() + order.payment_status.slice(1)}
                            </span>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Order Details */}
                        <div className="lg:col-span-2 space-y-8">
                            {/* Order Items */}
                            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                                <div className="px-6 py-4 border-b border-gray-100">
                                    <h2 className="text-lg font-semibold text-gray-900">Order Items</h2>
                                </div>
                                <div className="divide-y divide-gray-100">
                                    {order.items.map((item) => (
                                        <div key={item.id} className="px-6 py-4 flex justify-between items-center">
                                            <div className="flex-1">
                                                <h3 className="font-medium text-gray-900">{item.product.name}</h3>
                                                <p className="text-sm text-gray-600">
                                                    KSh {item.price.toLocaleString()} × {item.quantity}
                                                </p>
                                            </div>
                                            <div className="text-right">
                                                <p className="font-medium text-gray-900">
                                                    KSh {(item.price * item.quantity).toLocaleString()}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
                                    <div className="space-y-2">
                                        <div className="flex justify-between text-sm">
                                            <span>Subtotal:</span>
                                            <span>KSh {order.subtotal.toLocaleString()}</span>
                                        </div>
                                        {order.tax_amount && order.tax_amount > 0 && (
                                            <div className="flex justify-between text-sm">
                                                <span>Tax:</span>
                                                <span>KSh {order.tax_amount.toLocaleString()}</span>
                                            </div>
                                        )}
                                        {order.shipping_amount && order.shipping_amount > 0 && (
                                            <div className="flex justify-between text-sm">
                                                <span>Shipping:</span>
                                                <span>KSh {order.shipping_amount.toLocaleString()}</span>
                                            </div>
                                        )}
                                        <div className="flex justify-between font-semibold text-lg border-t pt-2">
                                            <span>Total:</span>
                                            <span>KSh {order.total_amount.toLocaleString()}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Timeline */}
                            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                                <h2 className="text-lg font-semibold text-gray-900 mb-4">Order Timeline</h2>
                                <div className="space-y-4">
                                    <div className="flex items-center space-x-3">
                                        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                                            <CheckCircleIcon className="w-4 h-4 text-green-600" />
                                        </div>
                                        <div>
                                            <p className="font-medium">Order Placed</p>
                                            <p className="text-sm text-gray-600">{formatDate(order.created_at)}</p>
                                        </div>
                                    </div>
                                    
                                    {order.status !== 'pending' && (
                                        <div className="flex items-center space-x-3">
                                            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                                <CheckCircleIcon className="w-4 h-4 text-blue-600" />
                                            </div>
                                            <div>
                                                <p className="font-medium">Order Confirmed</p>
                                                <p className="text-sm text-gray-600">Order has been confirmed</p>
                                            </div>
                                        </div>
                                    )}

                                    {['processing', 'shipped', 'delivered'].includes(order.status) && (
                                        <div className="flex items-center space-x-3">
                                            <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                                                <CheckCircleIcon className="w-4 h-4 text-purple-600" />
                                            </div>
                                            <div>
                                                <p className="font-medium">Processing</p>
                                                <p className="text-sm text-gray-600">Order is being prepared</p>
                                            </div>
                                        </div>
                                    )}

                                    {['shipped', 'delivered'].includes(order.status) && (
                                        <div className="flex items-center space-x-3">
                                            <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center">
                                                <TruckIcon className="w-4 h-4 text-indigo-600" />
                                            </div>
                                            <div>
                                                <p className="font-medium">Shipped</p>
                                                <p className="text-sm text-gray-600">
                                                    {order.shipped_at ? formatDate(order.shipped_at) : 'Order has been shipped'}
                                                </p>
                                            </div>
                                        </div>
                                    )}

                                    {order.status === 'delivered' && (
                                        <div className="flex items-center space-x-3">
                                            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                                                <CheckCircleIcon className="w-4 h-4 text-green-600" />
                                            </div>
                                            <div>
                                                <p className="font-medium">Delivered</p>
                                                <p className="text-sm text-gray-600">
                                                    {order.delivered_at ? formatDate(order.delivered_at) : 'Order has been delivered'}
                                                </p>
                                            </div>
                                        </div>
                                    )}

                                    {order.status === 'cancelled' && (
                                        <div className="flex items-center space-x-3">
                                            <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                                                <XCircleIcon className="w-4 h-4 text-red-600" />
                                            </div>
                                            <div>
                                                <p className="font-medium">Cancelled</p>
                                                <p className="text-sm text-gray-600">Order has been cancelled</p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Sidebar */}
                        <div className="space-y-6">
                            {/* Actions */}
                            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                                <h3 className="font-semibold text-gray-900 mb-4">Actions</h3>
                                <div className="space-y-3">
                                    {getStatusActions()}
                                </div>
                            </div>

                            {/* Customer Info */}
                            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                                <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                                    <UserIcon className="w-5 h-5 mr-2" />
                                    Customer
                                </h3>
                                <div className="space-y-2 text-sm">
                                    <p><strong>Name:</strong> {order.billing_first_name} {order.billing_last_name}</p>
                                    <p><strong>Email:</strong> {order.billing_email}</p>
                                    <p><strong>Phone:</strong> {order.billing_phone}</p>
                                </div>
                            </div>

                            {/* Billing Address */}
                            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                                <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                                    <MapPinIcon className="w-5 h-5 mr-2" />
                                    Billing Address
                                </h3>
                                <div className="space-y-1 text-sm">
                                    <p>{order.billing_first_name} {order.billing_last_name}</p>
                                    <p>{order.billing_address}</p>
                                    <p>{order.billing_city}{order.billing_state ? `, ${order.billing_state}` : ''} {order.billing_postal_code}</p>
                                    <p>{order.billing_country}</p>
                                </div>
                            </div>

                            {/* Shipping Address */}
                            {order.shipping_address && (
                                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                                    <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                                        <TruckIcon className="w-5 h-5 mr-2" />
                                        Shipping Address
                                    </h3>
                                    <div className="space-y-1 text-sm">
                                        <p>{order.shipping_first_name} {order.shipping_last_name}</p>
                                        <p>{order.shipping_address}</p>
                                        <p>{order.shipping_city}{order.shipping_state ? `, ${order.shipping_state}` : ''} {order.shipping_postal_code}</p>
                                        <p>{order.shipping_country}</p>
                                        {order.shipping_phone && <p>Phone: {order.shipping_phone}</p>}
                                    </div>
                                </div>
                            )}

                            {/* Payment Info */}
                            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                                <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                                    <CreditCardIcon className="w-5 h-5 mr-2" />
                                    Payment
                                </h3>
                                <div className="space-y-2 text-sm">
                                    <p><strong>Method:</strong> {order.payment_method}</p>
                                    <p><strong>Status:</strong> 
                                        <span className={`ml-2 ${getPaymentBadge(order.payment_status)}`}>
                                            {order.payment_status.charAt(0).toUpperCase() + order.payment_status.slice(1)}
                                        </span>
                                    </p>
                                    {order.payment_id && (
                                        <p><strong>Transaction ID:</strong> {order.payment_id}</p>
                                    )}
                                </div>
                            </div>

                            {/* Notes */}
                            {order.notes && (
                                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                                    <h3 className="font-semibold text-gray-900 mb-4">Notes</h3>
                                    <p className="text-sm text-gray-600">{order.notes}</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}