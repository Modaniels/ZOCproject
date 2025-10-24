import React from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import { 
    UserIcon, 
    ShoppingBagIcon, 
    CogIcon, 
    ChartBarIcon,
    ClockIcon,
    TruckIcon
} from '@heroicons/react/24/outline';
import Navigation from '../components/Navigation';

interface User {
    id: number;
    name: string;
    email: string;
    phone?: string;
    address?: string;
    city?: string;
    county?: string;
}

interface Order {
    id: number;
    order_number: string;
    status: string;
    total: number;
    formatted_total: string;
    created_at: string;
}

interface DashboardProps {
    user: User;
    recentOrders: Order[];
    orderStats: {
        total: number;
        pending: number;
        completed: number;
    };
}

export default function Dashboard({ user, recentOrders = [], orderStats = { total: 0, pending: 0, completed: 0 } }: DashboardProps) {
    const { auth } = usePage<{ auth: { user: User } }>().props;

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'pending':
                return 'bg-yellow-100 text-yellow-800';
            case 'processing':
                return 'bg-blue-100 text-blue-800';
            case 'shipped':
                return 'bg-purple-100 text-purple-800';
            case 'delivered':
                return 'bg-green-100 text-green-800';
            case 'cancelled':
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <>
            <Head title="My Account Dashboard" />
            
            <div className="min-h-screen bg-gray-50">
                <Navigation showAccount={true} />
                
                {/* Main Content */}
                <div className="pt-20 pb-12">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        {/* Header */}
                        <div className="mb-8">
                            <h1 className="text-3xl font-bold text-gray-900">Welcome back, {auth.user?.name || user?.name}</h1>
                            <p className="text-gray-600 mt-2">Manage your account and track your orders</p>
                        </div>

                        {/* Quick Stats */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                            <div className="bg-white rounded-lg shadow p-6">
                                <div className="flex items-center">
                                    <ShoppingBagIcon className="h-8 w-8 text-green-600" />
                                    <div className="ml-4">
                                        <p className="text-sm font-medium text-gray-600">Total Orders</p>
                                        <p className="text-2xl font-bold text-gray-900">{orderStats.total}</p>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="bg-white rounded-lg shadow p-6">
                                <div className="flex items-center">
                                    <ClockIcon className="h-8 w-8 text-yellow-600" />
                                    <div className="ml-4">
                                        <p className="text-sm font-medium text-gray-600">Pending Orders</p>
                                        <p className="text-2xl font-bold text-gray-900">{orderStats.pending}</p>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="bg-white rounded-lg shadow p-6">
                                <div className="flex items-center">
                                    <TruckIcon className="h-8 w-8 text-green-600" />
                                    <div className="ml-4">
                                        <p className="text-sm font-medium text-gray-600">Completed Orders</p>
                                        <p className="text-2xl font-bold text-gray-900">{orderStats.completed}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Recent Orders and Quick Actions */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            {/* Recent Orders */}
                            <div className="lg:col-span-2">
                                <div className="bg-white rounded-lg shadow">
                                    <div className="px-6 py-4 border-b border-gray-200">
                                        <h2 className="text-lg font-medium text-gray-900">Recent Orders</h2>
                                    </div>
                                    <div className="p-6">
                                        {recentOrders.length > 0 ? (
                                            <div className="space-y-4">
                                                {recentOrders.map((order) => (
                                                    <div key={order.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                                                        <div>
                                                            <p className="font-medium text-gray-900">#{order.order_number}</p>
                                                            <p className="text-sm text-gray-600">{order.created_at}</p>
                                                        </div>
                                                        <div className="flex items-center space-x-4">
                                                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(order.status)}`}>
                                                                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                                                            </span>
                                                            <p className="font-medium text-gray-900">{order.formatted_total}</p>
                                                        </div>
                                                    </div>
                                                ))}
                                                <Link
                                                    href="/orders"
                                                    className="block w-full text-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700"
                                                >
                                                    View All Orders
                                                </Link>
                                            </div>
                                        ) : (
                                            <div className="text-center py-8">
                                                <ShoppingBagIcon className="mx-auto h-12 w-12 text-gray-400" />
                                                <p className="mt-4 text-sm text-gray-600">No orders yet</p>
                                                <Link
                                                    href="/products"
                                                    className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
                                                >
                                                    Start Shopping
                                                </Link>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Quick Actions */}
                            <div className="space-y-6">
                                <div className="bg-white rounded-lg shadow p-6">
                                    <h3 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h3>
                                    <div className="space-y-3">
                                        <Link
                                            href="/orders"
                                            className="flex items-center p-3 rounded-lg hover:bg-gray-50 transition-colors"
                                        >
                                            <ShoppingBagIcon className="h-5 w-5 text-gray-400" />
                                            <span className="ml-3 text-sm font-medium text-gray-900">View Orders</span>
                                        </Link>
                                        
                                        <Link
                                            href="/settings/profile"
                                            className="flex items-center p-3 rounded-lg hover:bg-gray-50 transition-colors"
                                        >
                                            <UserIcon className="h-5 w-5 text-gray-400" />
                                            <span className="ml-3 text-sm font-medium text-gray-900">Edit Profile</span>
                                        </Link>
                                        
                                        <Link
                                            href="/settings/password"
                                            className="flex items-center p-3 rounded-lg hover:bg-gray-50 transition-colors"
                                        >
                                            <CogIcon className="h-5 w-5 text-gray-400" />
                                            <span className="ml-3 text-sm font-medium text-gray-900">Settings</span>
                                        </Link>
                                        
                                        <Link
                                            href="/products"
                                            className="flex items-center p-3 rounded-lg hover:bg-gray-50 transition-colors"
                                        >
                                            <ChartBarIcon className="h-5 w-5 text-gray-400" />
                                            <span className="ml-3 text-sm font-medium text-gray-900">Browse Products</span>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
