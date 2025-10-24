import React, { useState, useEffect } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { 
    ShoppingBagIcon, 
    UserGroupIcon, 
    CurrencyDollarIcon, 
    ChartBarIcon,
    PlusIcon,
    PencilIcon,
    TrashIcon,
    EyeIcon,
    MagnifyingGlassIcon,
    FunnelIcon,
    ArrowUpIcon,
    ArrowDownIcon,
    Bars3Icon,
    XMarkIcon
} from '@heroicons/react/24/outline';

interface Product {
    id: number;
    name: string;
    slug: string;
    price: number;
    stock_quantity: number;
    category: {
        id: number;
        name: string;
    };
    primary_image?: {
        image_path: string;
        alt_text: string;
        url: string;
    };
    created_at: string;
    status: string;
}

interface Order {
    id: number;
    order_number: string;
    billing_first_name: string;
    billing_last_name: string;
    billing_email: string;
    total_amount: number;
    status: string;
    payment_status: string;
    payment_method: string;
    created_at: string;
}

interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at: string | null;
    created_at: string;
}

interface DashboardStats {
    total_products: number;
    total_orders: number;
    total_users: number;
    total_revenue: number;
    pending_orders: number;
    low_stock_products: number;
}

interface Props {
    stats: DashboardStats;
    recent_orders: Order[];
    recent_products: Product[];
    recent_users: User[];
}

export default function AdminDashboard({ stats, recent_orders, recent_products, recent_users }: Props) {
    const [activeTab, setActiveTab] = useState('overview');
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState('created_at');
    const [sortOrder, setSortOrder] = useState('desc');
    const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

    const formatPrice = (price: number) => {
        return `KSh ${price.toLocaleString()}`;
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-GB');
    };

    const getStatusBadge = (status: string, type: 'order' | 'payment' | 'product' = 'order') => {
        const baseClasses = "px-2 py-1 text-xs font-semibold rounded-full";
        
        if (type === 'order') {
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
        } else if (type === 'payment') {
            switch (status) {
                case 'pending':
                    return `${baseClasses} bg-yellow-100 text-yellow-800`;
                case 'paid':
                    return `${baseClasses} bg-green-100 text-green-800`;
                case 'failed':
                    return `${baseClasses} bg-red-100 text-red-800`;
                case 'refunded':
                    return `${baseClasses} bg-gray-100 text-gray-800`;
                default:
                    return `${baseClasses} bg-gray-100 text-gray-800`;
            }
        } else {
            switch (status) {
                case 'active':
                    return `${baseClasses} bg-green-100 text-green-800`;
                case 'inactive':
                    return `${baseClasses} bg-red-100 text-red-800`;
                case 'draft':
                    return `${baseClasses} bg-gray-100 text-gray-800`;
                default:
                    return `${baseClasses} bg-gray-100 text-gray-800`;
            }
        }
    };

    const Navigation = () => (
        <nav className="bg-white shadow-sm border-b">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex justify-between items-center h-16">
                    <div className="flex items-center">
                        <button
                            onClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
                            className="lg:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 mr-3"
                        >
                            <Bars3Icon className="w-6 h-6" />
                        </button>
                        <Link href="/admin" className="text-xl sm:text-2xl font-bold" style={{color: '#3A4C2F', fontFamily: 'Space Grotesk, sans-serif'}}>
                            ZOC Farm Admin
                        </Link>
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

    const Sidebar = () => (
        <>
            {/* Mobile Sidebar Overlay */}
            {isMobileSidebarOpen && (
                <div className="fixed inset-0 z-50 lg:hidden">
                    <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setIsMobileSidebarOpen(false)}></div>
                    <div className="relative flex flex-col w-64 bg-white shadow-xl">
                        <div className="flex items-center justify-between p-4 border-b">
                            <span className="text-lg font-semibold text-gray-900">Menu</span>
                            <button
                                onClick={() => setIsMobileSidebarOpen(false)}
                                className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                            >
                                <XMarkIcon className="w-6 h-6" />
                            </button>
                        </div>
                        <div className="flex-1 p-6">
                            <nav className="space-y-2">
                                <button
                                    onClick={() => {
                                        setActiveTab('overview');
                                        setIsMobileSidebarOpen(false);
                                    }}
                                    className={`w-full flex items-center px-4 py-2 text-left text-sm font-medium rounded-lg transition-colors ${
                                        activeTab === 'overview' 
                                            ? 'text-white' 
                                            : 'text-gray-700 hover:bg-gray-100'
                                    }`}
                                    style={activeTab === 'overview' ? {backgroundColor: '#3A4C2F'} : {}}
                                >
                                    <ChartBarIcon className="w-5 h-5 mr-3" />
                                    Overview
                                </button>
                                <Link
                                    href="/admin/products"
                                    className="w-full flex items-center px-4 py-2 text-left text-sm font-medium rounded-lg transition-colors text-gray-700 hover:bg-gray-100"
                                    onClick={() => setIsMobileSidebarOpen(false)}
                                >
                                    <ShoppingBagIcon className="w-5 h-5 mr-3" />
                                    Products
                                </Link>
                                <Link
                                    href="/admin/orders"
                                    className="w-full flex items-center px-4 py-2 text-left text-sm font-medium rounded-lg transition-colors text-gray-700 hover:bg-gray-100"
                                    onClick={() => setIsMobileSidebarOpen(false)}
                                >
                                    <CurrencyDollarIcon className="w-5 h-5 mr-3" />
                                    Orders
                                </Link>
                                <button
                                    onClick={() => {
                                        setActiveTab('customers');
                                        setIsMobileSidebarOpen(false);
                                    }}
                                    className={`w-full flex items-center px-4 py-2 text-left text-sm font-medium rounded-lg transition-colors ${
                                        activeTab === 'customers' 
                                            ? 'text-white' 
                                            : 'text-gray-700 hover:bg-gray-100'
                                    }`}
                                    style={activeTab === 'customers' ? {backgroundColor: '#3A4C2F'} : {}}
                                >
                                    <UserGroupIcon className="w-5 h-5 mr-3" />
                                    Customers
                                </button>
                            </nav>
                        </div>
                    </div>
                </div>
            )}
            
            {/* Desktop Sidebar */}
            <div className="hidden lg:block w-64 bg-white shadow-sm min-h-screen">
                <div className="p-6">
                    <nav className="space-y-2">
                        <button
                            onClick={() => setActiveTab('overview')}
                            className={`w-full flex items-center px-4 py-2 text-left text-sm font-medium rounded-lg transition-colors ${
                                activeTab === 'overview' 
                                    ? 'text-white' 
                                    : 'text-gray-700 hover:bg-gray-100'
                            }`}
                            style={activeTab === 'overview' ? {backgroundColor: '#3A4C2F'} : {}}
                        >
                            <ChartBarIcon className="w-5 h-5 mr-3" />
                            Overview
                        </button>
                        <Link
                            href="/admin/products"
                            className="w-full flex items-center px-4 py-2 text-left text-sm font-medium rounded-lg transition-colors text-gray-700 hover:bg-gray-100"
                        >
                            <ShoppingBagIcon className="w-5 h-5 mr-3" />
                            Products
                        </Link>
                        <Link
                            href="/admin/orders"
                            className="w-full flex items-center px-4 py-2 text-left text-sm font-medium rounded-lg transition-colors text-gray-700 hover:bg-gray-100"
                        >
                            <CurrencyDollarIcon className="w-5 h-5 mr-3" />
                            Orders
                        </Link>
                        <button
                            onClick={() => setActiveTab('customers')}
                            className={`w-full flex items-center px-4 py-2 text-left text-sm font-medium rounded-lg transition-colors ${
                                activeTab === 'customers' 
                                    ? 'text-white' 
                                    : 'text-gray-700 hover:bg-gray-100'
                            }`}
                            style={activeTab === 'customers' ? {backgroundColor: '#3A4C2F'} : {}}
                        >
                            <UserGroupIcon className="w-5 h-5 mr-3" />
                            Customers
                        </button>
                    </nav>
                </div>
            </div>
        </>
    );

    const StatsCards = () => (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <div className="flex items-center">
                    <div className="p-2 rounded-lg" style={{backgroundColor: '#3A4C2F'}}>
                        <ShoppingBagIcon className="w-6 h-6 text-white" />
                    </div>
                    <div className="ml-4">
                        <p className="text-sm font-medium text-gray-600">Total Products</p>
                        <p className="text-2xl font-bold text-gray-900">{stats.total_products}</p>
                    </div>
                </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <div className="flex items-center">
                    <div className="p-2 rounded-lg" style={{backgroundColor: '#F4C542'}}>
                        <CurrencyDollarIcon className="w-6 h-6 text-white" />
                    </div>
                    <div className="ml-4">
                        <p className="text-sm font-medium text-gray-600">Total Orders</p>
                        <p className="text-2xl font-bold text-gray-900">{stats.total_orders}</p>
                    </div>
                </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <div className="flex items-center">
                    <div className="p-2 rounded-lg bg-blue-500">
                        <UserGroupIcon className="w-6 h-6 text-white" />
                    </div>
                    <div className="ml-4">
                        <p className="text-sm font-medium text-gray-600">Total Customers</p>
                        <p className="text-2xl font-bold text-gray-900">{stats.total_users}</p>
                    </div>
                </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <div className="flex items-center">
                    <div className="p-2 rounded-lg bg-green-500">
                        <ChartBarIcon className="w-6 h-6 text-white" />
                    </div>
                    <div className="ml-4">
                        <p className="text-sm font-medium text-gray-600">Revenue</p>
                        <p className="text-2xl font-bold text-gray-900">{formatPrice(stats.total_revenue)}</p>
                    </div>
                </div>
            </div>
        </div>
    );

    const OverviewTab = () => (
        <div>
            <StatsCards />
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                {/* Quick Actions */}
                <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                    <h3 className="text-lg font-semibold mb-4" style={{color: '#3A4C2F'}}>Quick Actions</h3>
                    <div className="space-y-3">
                        <button
                            onClick={() => router.visit('/admin/products/create')}
                            className="w-full flex items-center px-4 py-3 text-left bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                            <PlusIcon className="w-5 h-5 mr-3" style={{color: '#3A4C2F'}} />
                            <span className="font-medium">Add New Product</span>
                        </button>
                        <button className="w-full flex items-center px-4 py-3 text-left bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
                            <EyeIcon className="w-5 h-5 mr-3" style={{color: '#3A4C2F'}} />
                            <span className="font-medium">View All Orders</span>
                        </button>
                        <button className="w-full flex items-center px-4 py-3 text-left bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
                            <UserGroupIcon className="w-5 h-5 mr-3" style={{color: '#3A4C2F'}} />
                            <span className="font-medium">Manage Customers</span>
                        </button>
                    </div>
                </div>

                {/* Alerts */}
                <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                    <h3 className="text-lg font-semibold mb-4" style={{color: '#3A4C2F'}}>Alerts</h3>
                    <div className="space-y-3">
                        <div className="flex items-center p-3 bg-yellow-50 rounded-lg">
                            <div className="w-2 h-2 bg-yellow-400 rounded-full mr-3"></div>
                            <span className="text-sm text-yellow-800">
                                {stats.pending_orders} pending orders need attention
                            </span>
                        </div>
                        <div className="flex items-center p-3 bg-red-50 rounded-lg">
                            <div className="w-2 h-2 bg-red-400 rounded-full mr-3"></div>
                            <span className="text-sm text-red-800">
                                {stats.low_stock_products} products running low on stock
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Recent Orders */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 mb-8">
                <div className="p-6 border-b border-gray-100">
                    <div className="flex justify-between items-center">
                        <h3 className="text-lg font-semibold" style={{color: '#3A4C2F'}}>Recent Orders</h3>
                        <Link href="/admin/orders" className="text-sm font-medium hover:underline" style={{color: '#3A4C2F'}}>
                            View All
                        </Link>
                    </div>
                </div>
                <div className="p-6">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    <th className="pb-3">Order</th>
                                    <th className="pb-3">Customer</th>
                                    <th className="pb-3">Total</th>
                                    <th className="pb-3">Status</th>
                                    <th className="pb-3">Date</th>
                                </tr>
                            </thead>
                            <tbody className="space-y-3">
                                {recent_orders.map((order) => (
                                    <tr key={order.id} className="border-t border-gray-100">
                                        <td className="py-3 font-medium">{order.order_number}</td>
                                        <td className="py-3">{order.billing_first_name} {order.billing_last_name}</td>
                                        <td className="py-3 font-semibold">{formatPrice(order.total_amount)}</td>
                                        <td className="py-3">
                                            <span className={getStatusBadge(order.status)}>
                                                {order.status}
                                            </span>
                                        </td>
                                        <td className="py-3 text-gray-600">{formatDate(order.created_at)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );

    const ProductsTab = () => (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold" style={{color: '#3A4C2F'}}>Products</h2>
                <button
                    onClick={() => router.visit('/admin/products/create')}
                    className="flex items-center px-4 py-2 text-white font-semibold rounded-lg hover:opacity-90 transition-colors"
                    style={{backgroundColor: '#3A4C2F'}}
                >
                    <PlusIcon className="w-5 h-5 mr-2" />
                    Add Product
                </button>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100">
                <div className="p-6 border-b border-gray-100">
                    <div className="flex flex-col sm:flex-row gap-4">
                        <div className="relative flex-1">
                            <MagnifyingGlassIcon className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search products..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                            />
                        </div>
                        <div className="flex gap-2">
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                            >
                                <option value="created_at">Sort by Date</option>
                                <option value="name">Sort by Name</option>
                                <option value="price">Sort by Price</option>
                                <option value="stock_quantity">Sort by Stock</option>
                            </select>
                            <button
                                onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                                className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                            >
                                {sortOrder === 'asc' ? <ArrowUpIcon className="w-5 h-5" /> : <ArrowDownIcon className="w-5 h-5" />}
                            </button>
                        </div>
                    </div>
                </div>
                
                <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {recent_products.map((product) => (
                            <div key={product.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                                <div className="aspect-square bg-gray-100 rounded-lg mb-4 overflow-hidden">
                                    {product.primary_image ? (
                                        <img
                                            src={product.primary_image.url}
                                            alt={product.primary_image.alt_text || product.name}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center">
                                            <ShoppingBagIcon className="w-12 h-12 text-gray-400" />
                                        </div>
                                    )}
                                </div>
                                <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
                                <p className="text-gray-600 text-sm mb-2">{product.category.name}</p>
                                <div className="flex justify-between items-center mb-3">
                                    <span className="font-bold text-lg" style={{color: '#3A4C2F'}}>{formatPrice(product.price)}</span>
                                    <span className="text-sm text-gray-600">Stock: {product.stock_quantity}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className={getStatusBadge(product.status, 'product')}>
                                        {product.status}
                                    </span>
                                    <div className="flex gap-2">
                                        <button className="p-2 text-gray-600 hover:text-blue-600 transition-colors">
                                            <EyeIcon className="w-4 h-4" />
                                        </button>
                                        <button className="p-2 text-gray-600 hover:text-green-600 transition-colors">
                                            <PencilIcon className="w-4 h-4" />
                                        </button>
                                        <button className="p-2 text-gray-600 hover:text-red-600 transition-colors">
                                            <TrashIcon className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );

    const OrdersTab = () => (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold" style={{color: '#3A4C2F'}}>Orders</h2>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100">
                <div className="p-6">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    <th className="pb-4">Order #</th>
                                    <th className="pb-4">Customer</th>
                                    <th className="pb-4">Email</th>
                                    <th className="pb-4">Total</th>
                                    <th className="pb-4">Payment</th>
                                    <th className="pb-4">Status</th>
                                    <th className="pb-4">Date</th>
                                    <th className="pb-4">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {recent_orders.map((order) => (
                                    <tr key={order.id} className="border-t border-gray-100">
                                        <td className="py-4 font-medium">{order.order_number}</td>
                                        <td className="py-4">{order.billing_first_name} {order.billing_last_name}</td>
                                        <td className="py-4 text-gray-600">{order.billing_email}</td>
                                        <td className="py-4 font-semibold">{formatPrice(order.total_amount)}</td>
                                        <td className="py-4">
                                            <span className={getStatusBadge(order.payment_status, 'payment')}>
                                                {order.payment_status}
                                            </span>
                                        </td>
                                        <td className="py-4">
                                            <span className={getStatusBadge(order.status)}>
                                                {order.status}
                                            </span>
                                        </td>
                                        <td className="py-4 text-gray-600">{formatDate(order.created_at)}</td>
                                        <td className="py-4">
                                            <div className="flex gap-2">
                                                <button className="p-2 text-gray-600 hover:text-blue-600 transition-colors">
                                                    <EyeIcon className="w-4 h-4" />
                                                </button>
                                                <button className="p-2 text-gray-600 hover:text-green-600 transition-colors">
                                                    <PencilIcon className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );

    const CustomersTab = () => (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold" style={{color: '#3A4C2F'}}>Customers</h2>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100">
                <div className="p-6">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    <th className="pb-4">Name</th>
                                    <th className="pb-4">Email</th>
                                    <th className="pb-4">Verified</th>
                                    <th className="pb-4">Joined</th>
                                    <th className="pb-4">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {recent_users && recent_users.length > 0 ? recent_users.map((user) => (
                                    <tr key={user.id} className="border-t border-gray-100">
                                        <td className="py-4 font-medium">{user.name}</td>
                                        <td className="py-4 text-gray-600">{user.email}</td>
                                        <td className="py-4">
                                            <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                                                user.email_verified_at 
                                                    ? 'bg-green-100 text-green-800' 
                                                    : 'bg-red-100 text-red-800'
                                            }`}>
                                                {user.email_verified_at ? 'Verified' : 'Unverified'}
                                            </span>
                                        </td>
                                        <td className="py-4 text-gray-600">{formatDate(user.created_at)}</td>
                                        <td className="py-4">
                                            <div className="flex gap-2">
                                                <button className="p-2 text-gray-600 hover:text-blue-600 transition-colors">
                                                    <EyeIcon className="w-4 h-4" />
                                                </button>
                                                <button className="p-2 text-gray-600 hover:text-green-600 transition-colors">
                                                    <PencilIcon className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                )) : (
                                    <tr>
                                        <td colSpan={5} className="py-8 text-center text-gray-500">
                                            No users found
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );

    const renderActiveTab = () => {
        switch (activeTab) {
            case 'overview':
                return <OverviewTab />;
            case 'products':
                return <ProductsTab />;
            case 'orders':
                return <OrdersTab />;
            case 'customers':
                return <CustomersTab />;
            default:
                return <OverviewTab />;
        }
    };

    return (
        <>
            <Head title="Admin Dashboard - ZOC Farm">
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
            </Head>
            
            <div className="min-h-screen" style={{
                fontFamily: 'Inter, sans-serif',
                backgroundColor: '#FDF8E3',
                color: '#333333'
            }}>
                <Navigation />
                
                <div className="flex">
                    <Sidebar />
                    
                    <div className="flex-1 p-4 lg:p-8">
                        {renderActiveTab()}
                    </div>
                </div>
            </div>
        </>
    );
}