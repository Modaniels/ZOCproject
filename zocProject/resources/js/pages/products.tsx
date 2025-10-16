import React, { useState, useEffect } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { ChevronDownIcon, MagnifyingGlassIcon, ShoppingCartIcon, HeartIcon } from '@heroicons/react/24/outline';
import Newsletter from '../components/Newsletter';
import Navigation from '../components/Navigation';

interface Product {
    id: number;
    name: string;
    slug: string;
    description: string;
    short_description: string;
    price: number;
    compare_price?: number;
    formatted_price: string;
    formatted_compare_price?: string;
    discount_percentage?: number;
    quantity: number;
    is_featured: boolean;
    weight: string;
    category: {
        id: number;
        name: string;
        slug: string;
    };
    primary_image?: {
        image_path: string;
        alt_text: string;
        url: string;
    };
}

interface Category {
    id: number;
    name: string;
    slug: string;
    description: string;
    children?: Category[];
}

interface Props {
    products: {
        data: Product[];
        meta: any;
        links: any;
    };
    categories: Category[];
    filters?: {
        category?: string;
        search?: string;
        min_price?: string;
        max_price?: string;
        sort?: string;
    };
}

export default function Products({ products, categories, filters }: Props) {
    // Debug logging to identify the issue
    console.log('Products component props:', { products, categories, filters });
    
    // Add defensive checks for undefined data with explicit type checking
    const safeProducts = products && typeof products === 'object' ? products : { data: [], meta: {}, links: [] };
    const safeCategories = Array.isArray(categories) ? categories : [];
    const safeFilters = filters && typeof filters === 'object' ? filters : {};

    console.log('Safe data:', { safeProducts, safeCategories, safeFilters });

    const [searchQuery, setSearchQuery] = useState(
        (safeFilters && typeof safeFilters.search === 'string') ? safeFilters.search : ''
    );
    const [selectedCategory, setSelectedCategory] = useState(
        (safeFilters && typeof safeFilters.category === 'string') ? safeFilters.category : ''
    );
    const [sortBy, setSortBy] = useState(
        (safeFilters && typeof safeFilters.sort === 'string') ? safeFilters.sort : 'created_at'
    );
    const [priceRange, setPriceRange] = useState({
        min: (safeFilters && typeof safeFilters.min_price === 'string') ? safeFilters.min_price : '',
        max: (safeFilters && typeof safeFilters.max_price === 'string') ? safeFilters.max_price : ''
    });
    const [cartCount, setCartCount] = useState(0);

    // Early return if essential data is missing
    if (!safeProducts || !safeProducts.data) {
        return (
            <div className="min-h-screen bg-gray-50">
                <Head title="Products - Loading" />
                <div className="max-w-7xl mx-auto px-4 py-8">
                    <p>Loading products...</p>
                </div>
            </div>
        );
    }

    // Helper function to get CSRF token
    const getCsrfToken = (): string => {
        const meta = document.querySelector('meta[name="csrf-token"]');
        return meta?.getAttribute('content') || '';
    };

    // Fetch cart count on component mount
    useEffect(() => {
        fetch('/cart/count')
            .then(res => res.json())
            .then(data => setCartCount(data.count))
            .catch(console.error);
    }, []);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        applyFilters();
    };

    const applyFilters = () => {
        const params = new URLSearchParams();
        if (searchQuery) params.set('search', searchQuery);
        if (selectedCategory) params.set('category', selectedCategory);
        if (sortBy) params.set('sort', sortBy);
        if (priceRange.min) params.set('min_price', priceRange.min);
        if (priceRange.max) params.set('max_price', priceRange.max);

        router.get('/products', Object.fromEntries(params));
    };

    const addToCart = async (productId: number, quantity: number = 1) => {
        try {
            const response = await fetch('/cart/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': getCsrfToken(),
                },
                body: JSON.stringify({ product_id: productId, quantity }),
            });

            const data = await response.json();
            
            if (response.ok) {
                setCartCount(data.cartCount);
                // Show success message
                alert('Product added to cart!');
            } else {
                alert(data.message || 'Error adding product to cart');
            }
        } catch (error) {
            console.error('Error adding to cart:', error);
            alert('Error adding product to cart');
        }
    };

    return (
        <>
            <Head title="Products - ZOC Farm">
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
                {/* Header & Navigation */}
                <Navigation cartCount={cartCount} />

                {/* Hero Section */}
                <div className="relative py-20 px-4 text-center" style={{
                    background: 'linear-gradient(135deg, #3A4C2F 0%, #2D3B22 100%)',
                    marginTop: '70px'
                }}>
                    <div className="max-w-4xl mx-auto">
                        <h1 className="text-5xl md:text-6xl font-bold text-white mb-6" style={{fontFamily: 'Space Grotesk, sans-serif'}}>
                            Our <span style={{color: '#F4C542'}}>Products</span>
                        </h1>
                        <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
                            Premium organic products straight from our farms to your table. 
                            Discover fresh, sustainable produce grown with care and passion.
                        </p>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="lg:grid lg:grid-cols-4 lg:gap-8">
                        {/* Sidebar Filters */}
                        <div className="hidden lg:block">
                            <div className="bg-white rounded-xl shadow-lg p-6 mb-6 border border-gray-100">
                                <h3 className="text-lg font-semibold mb-4" style={{fontFamily: 'Space Grotesk, sans-serif', color: '#3A4C2F'}}>Search Products</h3>
                                <form onSubmit={handleSearch} className="space-y-4">
                                    <div>
                                        <input
                                            type="text"
                                            placeholder="Search products..."
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-opacity-50"
                                            style={{'--focus-ring-color': '#3A4C2F'} as React.CSSProperties}
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        className="w-full text-white py-3 px-4 rounded-lg font-semibold transition duration-200 hover:opacity-90"
                                        style={{backgroundColor: '#3A4C2F'}}
                                    >
                                        Search
                                    </button>
                                </form>
                            </div>

                            <div className="bg-white rounded-xl shadow-lg p-6 mb-6 border border-gray-100">
                                <h3 className="text-lg font-semibold mb-4" style={{fontFamily: 'Space Grotesk, sans-serif', color: '#3A4C2F'}}>Categories</h3>
                                <div className="space-y-2">
                                    <button
                                        onClick={() => {
                                            setSelectedCategory('');
                                            router.get('/products', { search: searchQuery, sort: sortBy });
                                        }}
                                        className={`block w-full text-left px-4 py-3 rounded-lg transition-colors ${!selectedCategory ? 'text-white font-semibold' : 'text-gray-700 hover:bg-gray-50'}`}
                                        style={!selectedCategory ? {backgroundColor: '#3A4C2F'} : {}}
                                    >
                                        All Products
                                    </button>
                                    {safeCategories.map((category) => (
                                        <button
                                            key={category.id}
                                            onClick={() => {
                                                setSelectedCategory(category.slug);
                                                router.get('/products', { category: category.slug, search: searchQuery, sort: sortBy });
                                            }}
                                            className={`block w-full text-left px-4 py-3 rounded-lg transition-colors ${selectedCategory === category.slug ? 'text-white font-semibold' : 'text-gray-700 hover:bg-gray-50'}`}
                                            style={selectedCategory === category.slug ? {backgroundColor: '#3A4C2F'} : {}}
                                        >
                                            {category.name}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                                <h3 className="text-lg font-semibold mb-4" style={{fontFamily: 'Space Grotesk, sans-serif', color: '#3A4C2F'}}>Price Range</h3>
                                <div className="space-y-4">
                                    <div>
                                        <input
                                            type="number"
                                            placeholder="Min price"
                                            value={priceRange.min}
                                            onChange={(e) => setPriceRange(prev => ({ ...prev, min: e.target.value }))}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-opacity-50"
                                            style={{'--focus-ring-color': '#3A4C2F'} as React.CSSProperties}
                                        />
                                    </div>
                                    <div>
                                        <input
                                            type="number"
                                            placeholder="Max price"
                                            value={priceRange.max}
                                            onChange={(e) => setPriceRange(prev => ({ ...prev, max: e.target.value }))}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-opacity-50"
                                            style={{'--focus-ring-color': '#3A4C2F'} as React.CSSProperties}
                                        />
                                    </div>
                                    <button
                                        onClick={applyFilters}
                                        className="w-full text-white py-3 px-4 rounded-lg font-semibold transition duration-200 hover:opacity-90"
                                        style={{backgroundColor: '#3A4C2F'}}
                                    >
                                        Apply
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Main Content */}
                        <div className="lg:col-span-3">
                            {/* Sort and View Options */}
                            <div className="flex justify-between items-center mb-8 bg-white rounded-xl shadow-lg p-4 border border-gray-100">
                                <div className="text-sm text-gray-600">
                                    <span className="font-semibold" style={{color: '#3A4C2F'}}>
                                        {safeProducts.data?.length || 0}
                                    </span> of <span className="font-semibold" style={{color: '#3A4C2F'}}>
                                        {safeProducts.meta?.total || 0}
                                    </span> products
                                </div>
                                <div className="flex items-center space-x-4">
                                    <label className="text-sm font-medium text-gray-600">Sort by:</label>
                                    <select
                                        value={sortBy}
                                        onChange={(e) => {
                                            setSortBy(e.target.value);
                                            router.get('/products', { 
                                                ...(safeFilters || {}), 
                                                sort: e.target.value,
                                                category: selectedCategory,
                                                search: searchQuery 
                                            });
                                        }}
                                        className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-opacity-50"
                                        style={{'--focus-ring-color': '#3A4C2F'} as React.CSSProperties}
                                    >
                                        <option value="created_at">Newest</option>
                                        <option value="featured">Featured</option>
                                        <option value="price_low">Price: Low to High</option>
                                        <option value="price_high">Price: High to Low</option>
                                        <option value="name">Name</option>
                                    </select>
                                </div>
                            </div>

                            {/* Products Grid */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                                {safeProducts.data && safeProducts.data.length > 0 ? (
                                    safeProducts.data.map((product) => {
                                        // Add safety check for each product
                                        if (!product || typeof product !== 'object' || !product.id) {
                                            return null;
                                        }
                                        
                                        return (
                                        <div key={product.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100">
                                            <div className="relative">
                                                <Link href={`/products/${product.slug || '#'}`}>
                                                    <div className="h-56 bg-gray-100 flex items-center justify-center overflow-hidden">
                                                        {product.primary_image ? (
                                                            <img
                                                                src={product.primary_image.url}
                                                                alt={product.primary_image.alt_text || product.name}
                                                                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                                                            />
                                                        ) : (
                                                            <div className="text-center">
                                                                <i className="fas fa-image text-4xl text-gray-400 mb-2"></i>
                                                                <span className="text-gray-500 text-sm">{product.name || 'Product'}</span>
                                                            </div>
                                                        )}
                                                    </div>
                                                </Link>
                                                {product.discount_percentage && (
                                                    <div className="absolute top-3 left-3 text-white px-3 py-1 rounded-full text-xs font-bold"
                                                         style={{backgroundColor: '#F4C542', color: '#333333'}}>
                                                        -{product.discount_percentage}%
                                                    </div>
                                                )}
                                                {product.is_featured && (
                                                    <div className="absolute top-3 right-3 text-white px-3 py-1 rounded-full text-xs font-bold"
                                                         style={{backgroundColor: '#3A4C2F'}}>
                                                        Featured
                                                    </div>
                                                )}
                                            </div>
                                            
                                            <div className="p-6">
                                                <div className="mb-3">
                                                    <span className="text-xs font-semibold px-2 py-1 rounded-full"
                                                          style={{backgroundColor: '#F4C542', color: '#333333'}}>
                                                        {product.category?.name || 'No Category'}
                                                    </span>
                                                </div>
                                                <h3 className="text-lg font-bold mb-3" style={{fontFamily: 'Space Grotesk, sans-serif'}}>
                                                    <Link href={`/products/${product.slug || '#'}`} 
                                                          className="hover:opacity-80 transition-opacity"
                                                          style={{color: '#3A4C2F'}}>
                                                        {product.name || 'Unnamed Product'}
                                                    </Link>
                                                </h3>
                                                <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">
                                                    {product.short_description || ''}
                                                </p>
                                                
                                                <div className="flex items-center justify-between mb-4">
                                                    <div className="flex items-center space-x-2">
                                                        <span className="text-xl font-bold" style={{color: '#3A4C2F'}}>
                                                            {product.formatted_price || '$0.00'}
                                                        </span>
                                                        {product.formatted_compare_price && (
                                                            <span className="text-sm text-gray-500 line-through">
                                                                {product.formatted_compare_price}
                                                            </span>
                                                        )}
                                                    </div>
                                                    {product.weight && (
                                                        <span className="text-xs text-gray-500 font-medium">
                                                            {product.weight}
                                                        </span>
                                                    )}
                                                </div>
                                                
                                                <div className="flex space-x-3">
                                                    <button
                                                        onClick={() => addToCart(product.id)}
                                                        className="flex-1 text-white py-3 px-4 rounded-lg font-semibold transition-all duration-200 hover:opacity-90 transform hover:scale-105"
                                                        style={{backgroundColor: '#3A4C2F'}}
                                                    >
                                                        Add to Cart
                                                    </button>
                                                    <button className="p-3 border-2 border-gray-200 rounded-lg hover:border-yellow-400 hover:bg-yellow-50 transition-all duration-200">
                                                        <HeartIcon className="w-5 h-5 text-gray-600" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        );
                                    }).filter(Boolean) // Remove any null returns
                                ) : (
                                    <div className="col-span-full text-center py-16">
                                        <div className="bg-white rounded-xl shadow-lg p-12">
                                            <i className="fas fa-search text-6xl mb-6" style={{color: '#3A4C2F'}}></i>
                                            <h3 className="text-xl font-bold mb-4" style={{fontFamily: 'Space Grotesk, sans-serif', color: '#3A4C2F'}}>
                                                No products found
                                            </h3>
                                            <p className="text-gray-500 text-lg mb-2">We couldn't find any products matching your criteria.</p>
                                            <p className="text-gray-400 text-sm">Try adjusting your filters or search terms.</p>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Pagination */}
                            {safeProducts.meta && safeProducts.meta.last_page > 1 && (
                                <div className="mt-12 flex justify-center">
                                    <nav className="flex space-x-2 bg-white rounded-xl shadow-lg p-2 border border-gray-100">
                                        {safeProducts.links?.map((link: any, index: number) => (
                                            <Link
                                                key={index}
                                                href={link.url || '#'}
                                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                                                    link.active
                                                        ? 'text-white font-bold'
                                                        : link.url
                                                        ? 'text-gray-700 hover:bg-gray-50'
                                                        : 'text-gray-400 cursor-not-allowed'
                                                }`}
                                                style={link.active ? {backgroundColor: '#3A4C2F'} : {}}
                                                dangerouslySetInnerHTML={{ __html: link.label }}
                                            />
                                        )) || []}
                                    </nav>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Newsletter Section */}
                <div className="py-20 px-4" style={{backgroundColor: '#3A4C2F'}}>
                    <div className="max-w-4xl mx-auto">
                        <Newsletter />
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
                                <div className="flex space-x-4">
                                    <a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors">
                                        <i className="fab fa-facebook-f text-xl"></i>
                                    </a>
                                    <a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors">
                                        <i className="fab fa-twitter text-xl"></i>
                                    </a>
                                    <a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors">
                                        <i className="fab fa-instagram text-xl"></i>
                                    </a>
                                    <a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors">
                                        <i className="fab fa-linkedin-in text-xl"></i>
                                    </a>
                                </div>
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
                                        123 Farm Road, Green Valley
                                    </li>
                                    <li>
                                        <i className="fas fa-phone mr-2"></i>
                                        +1 (555) 123-4567
                                    </li>
                                    <li>
                                        <i className="fas fa-envelope mr-2"></i>
                                        info@zocfarm.com
                                    </li>
                                </ul>
                            </div>
                        </div>
                        
                        <div className="border-t border-gray-700 mt-12 pt-8 text-center text-gray-400">
                            <p>&copy; 2024 ZOC Farm. All rights reserved.</p>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}