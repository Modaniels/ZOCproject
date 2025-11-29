import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { 
    PlusIcon,
    PencilIcon,
    TrashIcon,
    EyeIcon,
    MagnifyingGlassIcon,
    FunnelIcon,
    ChevronDownIcon
} from '@heroicons/react/24/outline';

interface Product {
    id: number;
    name: string;
    slug: string;
    description: string;
    price: number;
    stock_quantity: number;
    weight: string;
    sku: string;
    status: string;
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
}

interface Category {
    id: number;
    name: string;
}

interface Props {
    products: Product[];
    categories: Category[];
}

export default function AdminProducts({ products: initialProducts, categories }: Props) {
    const [products, setProducts] = useState(initialProducts);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [categoryFilter, setCategoryFilter] = useState('all');
    const [sortBy, setSortBy] = useState('name');
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

    // Get CSRF token safely
    const getCsrfToken = () => {
        if (typeof document !== 'undefined') {
            return document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '';
        }
        return '';
    };

    // Filter and sort products
    const filteredProducts = products
        .filter(product => {
            const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                product.sku.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesStatus = statusFilter === 'all' || product.status === statusFilter;
            const matchesCategory = categoryFilter === 'all' || product.category.id.toString() === categoryFilter;
            
            return matchesSearch && matchesStatus && matchesCategory;
        })
        .sort((a, b) => {
            let aValue, bValue;
            
            switch (sortBy) {
                case 'name':
                    aValue = a.name.toLowerCase();
                    bValue = b.name.toLowerCase();
                    break;
                case 'price':
                    aValue = a.price;
                    bValue = b.price;
                    break;
                case 'stock':
                    aValue = a.stock_quantity;
                    bValue = b.stock_quantity;
                    break;
                case 'category':
                    aValue = a.category.name.toLowerCase();
                    bValue = b.category.name.toLowerCase();
                    break;
                case 'created_at':
                    aValue = new Date(a.created_at).getTime();
                    bValue = new Date(b.created_at).getTime();
                    break;
                default:
                    aValue = a.name.toLowerCase();
                    bValue = b.name.toLowerCase();
            }
            
            if (sortDirection === 'asc') {
                return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
            } else {
                return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
            }
        });

    const handleSort = (field: string) => {
        if (sortBy === field) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortBy(field);
            setSortDirection('asc');
        }
    };

    const handleDeleteProduct = async (productId: number) => {
        if (!confirm('Are you sure you want to delete this product? This action cannot be undone.')) {
            return;
        }

        try {
            const response = await fetch(`/admin/products/${productId}`, {
                method: 'DELETE',
                headers: {
                    'X-CSRF-TOKEN': getCsrfToken(),
                    'Content-Type': 'application/json',
                },
            });

            const data = await response.json();

            if (response.ok) {
                setProducts(products.filter(p => p.id !== productId));
                alert(data.message || 'Product deleted successfully!');
            } else {
                alert(data.message || 'Failed to delete product');
            }
        } catch (error) {
            console.error('Error deleting product:', error);
            alert('An error occurred while deleting the product');
        }
    };

    const getStatusBadge = (status: string) => {
        const baseClasses = 'px-2 py-1 text-xs font-medium rounded-full';
        
        switch (status) {
            case 'active':
                return `${baseClasses} bg-green-100 text-green-800`;
            case 'inactive':
                return `${baseClasses} bg-red-100 text-red-800`;
            case 'draft':
                return `${baseClasses} bg-yellow-100 text-yellow-800`;
            default:
                return `${baseClasses} bg-gray-100 text-gray-800`;
        }
    };

    const getStockStatus = (quantity: number) => {
        if (quantity === 0) {
            return <span className="text-red-600 font-medium">Out of Stock</span>;
        } else if (quantity < 10) {
            return <span className="text-yellow-600 font-medium">Low Stock</span>;
        } else {
            return <span className="text-green-600 font-medium">In Stock</span>;
        }
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
                        <span className="text-gray-900">Products</span>
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
            <Head title="Products - Admin">
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
                            <h1 className="text-3xl font-bold" style={{color: '#3A4C2F'}}>
                                Products
                            </h1>
                            <p className="text-gray-600 mt-2">
                                Manage your product catalog
                            </p>
                        </div>
                        <Link
                            href="/admin/products/create"
                            className="flex items-center px-4 py-2 text-white font-semibold rounded-lg hover:opacity-90 transition-colors"
                            style={{backgroundColor: '#3A4C2F'}}
                        >
                            <PlusIcon className="w-5 h-5 mr-2" />
                            Add Product
                        </Link>
                    </div>

                    {/* Filters and Search */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            {/* Search */}
                            <div className="relative">
                                <MagnifyingGlassIcon className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Search products..."
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
                                    <option value="active">Active</option>
                                    <option value="inactive">Inactive</option>
                                    <option value="draft">Draft</option>
                                </select>
                            </div>

                            {/* Category Filter */}
                            <div>
                                <select
                                    value={categoryFilter}
                                    onChange={(e) => setCategoryFilter(e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                                >
                                    <option value="all">All Categories</option>
                                    {categories.map((category) => (
                                        <option key={category.id} value={category.id.toString()}>
                                            {category.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Sort */}
                            <div>
                                <select
                                    value={`${sortBy}-${sortDirection}`}
                                    onChange={(e) => {
                                        const [field, direction] = e.target.value.split('-');
                                        setSortBy(field);
                                        setSortDirection(direction as 'asc' | 'desc');
                                    }}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                                >
                                    <option value="name-asc">Name (A-Z)</option>
                                    <option value="name-desc">Name (Z-A)</option>
                                    <option value="price-asc">Price (Low-High)</option>
                                    <option value="price-desc">Price (High-Low)</option>
                                    <option value="stock-asc">Stock (Low-High)</option>
                                    <option value="stock-desc">Stock (High-Low)</option>
                                    <option value="created_at-desc">Newest First</option>
                                    <option value="created_at-asc">Oldest First</option>
                                </select>
                            </div>
                        </div>

                        <div className="mt-4 flex justify-between items-center text-sm text-gray-600">
                            <span>
                                Showing {filteredProducts.length} of {products.length} products
                            </span>
                            {(searchTerm || statusFilter !== 'all' || categoryFilter !== 'all') && (
                                <button
                                    onClick={() => {
                                        setSearchTerm('');
                                        setStatusFilter('all');
                                        setCategoryFilter('all');
                                    }}
                                    className="text-blue-600 hover:text-blue-800"
                                >
                                    Clear filters
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Products Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {filteredProducts.map((product) => (
                            <div key={product.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
                                {/* Product Image */}
                                <div className="relative h-48 bg-gray-100">
                                    {product.primary_image ? (
                                        <img
                                            src={product.primary_image.url}
                                            alt={product.primary_image.alt_text || product.name}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center">
                                            <div className="text-gray-400">
                                                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                </svg>
                                            </div>
                                        </div>
                                    )}
                                    
                                    {/* Status Badge */}
                                    <div className="absolute top-2 left-2">
                                        <span className={getStatusBadge(product.status)}>
                                            {product.status.charAt(0).toUpperCase() + product.status.slice(1)}
                                        </span>
                                    </div>

                                    {/* Quick Actions */}
                                    <div className="absolute top-2 right-2 flex space-x-1">
                                        <Link
                                            href={`/admin/products/${product.id}/edit`}
                                            className="p-1.5 bg-white bg-opacity-90 hover:bg-opacity-100 rounded-full transition-colors"
                                            title="Edit Product"
                                        >
                                            <PencilIcon className="w-4 h-4 text-gray-600" />
                                        </Link>
                                        <button
                                            onClick={() => handleDeleteProduct(product.id)}
                                            className="p-1.5 bg-white bg-opacity-90 hover:bg-opacity-100 rounded-full transition-colors"
                                            title="Delete Product"
                                        >
                                            <TrashIcon className="w-4 h-4 text-red-600" />
                                        </button>
                                    </div>
                                </div>

                                {/* Product Info */}
                                <div className="p-4">
                                    <div className="mb-2">
                                        <h3 className="font-semibold text-gray-900 truncate" title={product.name}>
                                            {product.name}
                                        </h3>
                                        <p className="text-sm text-gray-500 truncate">
                                            {product.category.name}
                                        </p>
                                    </div>

                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-lg font-bold" style={{color: '#3A4C2F'}}>
                                            KSh {product.price.toLocaleString()}
                                        </span>
                                        <span className="text-sm text-gray-500">
                                            SKU: {product.sku || 'N/A'}
                                        </span>
                                    </div>

                                    <div className="flex justify-between items-center">
                                        <div className="text-sm">
                                            <div>{getStockStatus(product.stock_quantity)}</div>
                                            <div className="text-gray-500">
                                                {product.stock_quantity} units
                                            </div>
                                        </div>
                                        
                                        <div className="flex space-x-1">
                                            <Link
                                                href={`/products/${product.slug}`}
                                                className="p-2 text-gray-600 hover:text-gray-900 transition-colors"
                                                title="View Product"
                                            >
                                                <EyeIcon className="w-4 h-4" />
                                            </Link>
                                            <Link
                                                href={`/admin/products/${product.id}/edit`}
                                                className="p-2 text-blue-600 hover:text-blue-800 transition-colors"
                                                title="Edit Product"
                                            >
                                                <PencilIcon className="w-4 h-4" />
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* No Results */}
                    {filteredProducts.length === 0 && (
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
                            <div className="text-gray-400 mb-4">
                                <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">No products found</h3>
                            <p className="text-gray-600 mb-6">
                                {searchTerm || statusFilter !== 'all' || categoryFilter !== 'all' 
                                    ? 'Try adjusting your filters or search terms'
                                    : 'Get started by adding your first product'
                                }
                            </p>
                            {products.length === 0 && (
                                <Link
                                    href="/admin/products/create"
                                    className="inline-flex items-center px-4 py-2 text-white font-semibold rounded-lg hover:opacity-90 transition-colors"
                                    style={{backgroundColor: '#3A4C2F'}}
                                >
                                    <PlusIcon className="w-5 h-5 mr-2" />
                                    Add Your First Product
                                </Link>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}