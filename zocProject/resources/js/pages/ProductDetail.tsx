import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import { ShoppingCartIcon, HeartIcon, StarIcon, ArrowLeftIcon, MinusIcon, PlusIcon } from '@heroicons/react/24/outline';
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid';

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
    sku: string;
    category: {
        id: number;
        name: string;
        slug: string;
    };
    images?: Array<{
        id: number;
        image_path: string;
        alt_text: string;
        url: string;
        is_primary: boolean;
    }>;
}

interface Props {
    product: Product;
    relatedProducts: Product[];
}

export default function ProductDetail({ product, relatedProducts }: Props) {
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [isAddingToCart, setIsAddingToCart] = useState(false);

    const images = product.images && product.images.length > 0 
        ? product.images 
        : [{
            id: 0,
            image_path: '',
            alt_text: product.name,
            url: '/images/placeholder.jpg',
            is_primary: true
        }];

    const addToCart = async () => {
        setIsAddingToCart(true);
        
        try {
            const response = await fetch('/cart/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
                },
                body: JSON.stringify({ 
                    product_id: product.id, 
                    quantity: quantity 
                }),
            });

            const data = await response.json();
            
            if (response.ok) {
                alert('Product added to cart!');
            } else {
                alert(data.message || 'Error adding product to cart');
            }
        } catch (error) {
            console.error('Error adding to cart:', error);
            alert('Error adding product to cart');
        } finally {
            setIsAddingToCart(false);
        }
    };

    return (
        <>
            <Head title={`${product.name} - ZOC Farm`}>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link
                    href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600;700&display=swap"
                    rel="stylesheet"
                />
                <meta name="csrf-token" content={document.querySelector('meta[name="csrf-token"]')?.getAttribute('content')} />
                <meta name="description" content={product.short_description} />
            </Head>

            <div className="min-h-screen" style={{
                fontFamily: 'Inter, sans-serif',
                backgroundColor: '#FDF8E3',
            }}>
                {/* Header */}
                <nav className="bg-white shadow-sm border-b">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between items-center h-16">
                            <div className="flex items-center">
                                <Link href="/" className="text-2xl font-bold" style={{color: '#3A4C2F', fontFamily: 'Space Grotesk, sans-serif'}}>
                                    ZOC Farm
                                </Link>
                            </div>

                            <div className="hidden md:flex items-center space-x-8">
                                <Link href="/" className="text-gray-700 hover:text-green-800">Home</Link>
                                <Link href="/about" className="text-gray-700 hover:text-green-800">About</Link>
                                <Link href="/services" className="text-gray-700 hover:text-green-800">Services</Link>
                                <Link href="/products" className="font-semibold" style={{color: '#3A4C2F'}}>Products</Link>
                                <Link href="/contact" className="text-gray-700 hover:text-green-800">Contact</Link>
                            </div>

                            <div className="flex items-center space-x-4">
                                <Link href="/cart" className="relative p-2 text-gray-700 hover:text-green-800">
                                    <ShoppingCartIcon className="w-6 h-6" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </nav>

                {/* Breadcrumb */}
                <div className="bg-white border-b">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                        <nav className="flex items-center space-x-2 text-sm">
                            <Link href="/" className="text-gray-500 hover:text-green-600">Home</Link>
                            <span className="text-gray-400">/</span>
                            <Link href="/products" className="text-gray-500 hover:text-green-600">Products</Link>
                            <span className="text-gray-400">/</span>
                            <Link 
                                href={`/products?category=${product.category.slug}`} 
                                className="text-gray-500 hover:text-green-600"
                            >
                                {product.category.name}
                            </Link>
                            <span className="text-gray-400">/</span>
                            <span className="text-gray-900">{product.name}</span>
                        </nav>
                    </div>
                </div>

                {/* Product Detail */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="lg:grid lg:grid-cols-2 lg:gap-8">
                        {/* Product Images */}
                        <div>
                            <div className="bg-white rounded-lg shadow overflow-hidden">
                                <div className="aspect-w-1 aspect-h-1">
                                    <img
                                        src={images[selectedImageIndex]?.url || '/images/placeholder.jpg'}
                                        alt={images[selectedImageIndex]?.alt_text || product.name}
                                        className="w-full h-96 object-cover"
                                    />
                                </div>
                            </div>

                            {/* Thumbnail Images */}
                            {images.length > 1 && (
                                <div className="mt-4 grid grid-cols-4 gap-2">
                                    {images.map((image, index) => (
                                        <button
                                            key={image.id}
                                            onClick={() => setSelectedImageIndex(index)}
                                            className={`bg-white rounded border-2 overflow-hidden ${
                                                selectedImageIndex === index ? 'border-green-500' : 'border-gray-200 hover:border-gray-300'
                                            }`}
                                        >
                                            <img
                                                src={image.url}
                                                alt={image.alt_text}
                                                className="w-full h-20 object-cover"
                                            />
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Product Info */}
                        <div>
                            <div className="bg-white rounded-lg shadow p-6">
                                {/* Product category */}
                                <div className="mb-2">
                                    <Link 
                                        href={`/products?category=${product.category.slug}`}
                                        className="text-green-600 text-sm font-medium hover:text-green-700"
                                    >
                                        {product.category.name}
                                    </Link>
                                </div>

                                {/* Product name */}
                                <h1 className="text-3xl font-bold mb-4" style={{color: '#3A4C2F', fontFamily: 'Space Grotesk, sans-serif'}}>{product.name}</h1>

                                {/* Product rating (placeholder) */}
                                <div className="flex items-center mb-4">
                                    <div className="flex items-center">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <StarIconSolid
                                                key={star}
                                                className="w-5 h-5 text-yellow-400"
                                            />
                                        ))}
                                    </div>
                                    <span className="ml-2 text-sm text-gray-600">(25 reviews)</span>
                                </div>

                                {/* Price */}
                                <div className="mb-6">
                                    <div className="flex items-center space-x-3">
                                        <span className="text-3xl font-bold" style={{color: '#F4C542'}}>
                                            {product.formatted_price}
                                        </span>
                                        {product.formatted_compare_price && (
                                            <>
                                                <span className="text-xl text-gray-500 line-through">
                                                    {product.formatted_compare_price}
                                                </span>
                                                {product.discount_percentage && (
                                                    <span className="bg-red-100 text-red-800 text-sm font-medium px-2 py-1 rounded">
                                                        Save {product.discount_percentage}%
                                                    </span>
                                                )}
                                            </>
                                        )}
                                    </div>
                                    <p className="text-gray-600 mt-1">Per {product.weight}</p>
                                </div>

                                {/* Short description */}
                                <div className="mb-6">
                                    <p className="text-gray-700 text-lg">{product.short_description}</p>
                                </div>

                                {/* Product details */}
                                <div className="mb-6 space-y-2">
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">SKU:</span>
                                        <span className="text-gray-900">{product.sku}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Weight:</span>
                                        <span className="text-gray-900">{product.weight}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Availability:</span>
                                        <span className={`font-medium ${product.quantity > 0 ? 'text-green-600' : 'text-red-600'}`}>
                                            {product.quantity > 0 ? 'In Stock' : 'Out of Stock'}
                                        </span>
                                    </div>
                                </div>

                                {/* Quantity and Add to Cart */}
                                {product.quantity > 0 && (
                                    <div className="mb-6">
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Quantity
                                        </label>
                                        <div className="flex items-center space-x-4">
                                            <div className="flex items-center border border-gray-300 rounded-md">
                                                <button
                                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                                    className="p-2 hover:bg-gray-100"
                                                >
                                                    <MinusIcon className="w-4 h-4" />
                                                </button>
                                                <input
                                                    type="number"
                                                    min="1"
                                                    max={product.quantity}
                                                    value={quantity}
                                                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                                                    className="w-16 text-center border-0 focus:ring-0"
                                                />
                                                <button
                                                    onClick={() => setQuantity(Math.min(product.quantity, quantity + 1))}
                                                    className="p-2 hover:bg-gray-100"
                                                >
                                                    <PlusIcon className="w-4 h-4" />
                                                </button>
                                            </div>
                                            <span className="text-sm text-gray-600">
                                                ({product.quantity} available)
                                            </span>
                                        </div>
                                    </div>
                                )}

                                {/* Action buttons */}
                                <div className="space-y-3">
                                    <button
                                        onClick={addToCart}
                                        disabled={product.quantity === 0 || isAddingToCart}
                                        className="w-full py-3 px-6 rounded-md transition duration-200 font-medium"
                                        style={{backgroundColor: '#3A4C2F', color: 'white'}}
                                        onMouseEnter={(e) => e.target.style.backgroundColor = '#2D3B22'}
                                        onMouseLeave={(e) => e.target.style.backgroundColor = '#3A4C2F'}
                                    >
                                        {isAddingToCart ? 'Adding...' : 'Add to Cart'}
                                    </button>
                                    <button className="w-full border border-gray-300 text-gray-700 py-3 px-6 rounded-md hover:bg-gray-50 transition duration-200 font-medium flex items-center justify-center">
                                        <HeartIcon className="w-5 h-5 mr-2" />
                                        Add to Wishlist
                                    </button>
                                </div>

                                {/* Features */}
                                <div className="mt-6 pt-6 border-t border-gray-200">
                                    <div className="space-y-2 text-sm text-gray-600">
                                        <div className="flex items-center">
                                            <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                                            Free delivery on orders over KSh 2,000
                                        </div>
                                        <div className="flex items-center">
                                            <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                                            Fresh guarantee
                                        </div>
                                        <div className="flex items-center">
                                            <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                                            Organic certified
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Product Description */}
                            <div className="bg-white rounded-lg shadow p-6 mt-6">
                                <h3 className="text-lg font-semibold mb-4" style={{color: '#3A4C2F', fontFamily: 'Space Grotesk, sans-serif'}}>Product Description</h3>
                                <div className="prose prose-sm text-gray-700">
                                    <p>{product.description}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Related Products */}
                    {relatedProducts.length > 0 && (
                        <div className="mt-16">
                            <h2 className="text-2xl font-bold mb-8" style={{color: '#3A4C2F', fontFamily: 'Space Grotesk, sans-serif'}}>Related Products</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                                {relatedProducts.map((relatedProduct) => (
                                    <div key={relatedProduct.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                                        <Link href={`/products/${relatedProduct.slug}`}>
                                            <div className="h-48 bg-gray-200 flex items-center justify-center">
                                                <span className="text-gray-500">{relatedProduct.name}</span>
                                            </div>
                                        </Link>
                                        <div className="p-4">
                                            <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                                <Link href={`/products/${relatedProduct.slug}`} className="hover:text-green-600">
                                                    {relatedProduct.name}
                                                </Link>
                                            </h3>
                                            <p className="text-green-600 font-bold">{relatedProduct.formatted_price}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}