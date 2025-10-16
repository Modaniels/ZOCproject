import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { 
    PlusIcon,
    PencilIcon,
    TrashIcon,
    EyeIcon,
    PhotoIcon,
    XMarkIcon
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
    product?: Product;
    categories: Category[];
    isEdit?: boolean;
}

export default function AdminProductForm({ product, categories, isEdit = false }: Props) {
    const [formData, setFormData] = useState({
        name: product?.name || '',
        description: product?.description || '',
        price: product?.price || '',
        stock_quantity: product?.stock_quantity || '',
        weight: product?.weight || '',
        sku: product?.sku || '',
        category_id: product?.category?.id || '',
        status: product?.status || 'active',
    });

    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState(product?.primary_image?.url || '');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});

    // Get CSRF token safely
    const getCsrfToken = () => {
        if (typeof document !== 'undefined') {
            return document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '';
        }
        return '';
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        
        // Clear error for this field
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImageFile(file);
            
            // Create preview
            const reader = new FileReader();
            reader.onload = (e) => {
                setImagePreview(e.target?.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const removeImage = () => {
        setImageFile(null);
        setImagePreview('');
        const fileInput = document.getElementById('image') as HTMLInputElement;
        if (fileInput) {
            fileInput.value = '';
        }
    };

    const validateForm = () => {
        const newErrors: Record<string, string> = {};

        if (!formData.name) newErrors.name = 'Product name is required';
        if (!formData.description) newErrors.description = 'Description is required';
        if (!formData.price) newErrors.price = 'Price is required';
        if (!formData.stock_quantity) newErrors.stock_quantity = 'Stock quantity is required';
        if (!formData.category_id) newErrors.category_id = 'Category is required';

        if (formData.price && parseFloat(formData.price) <= 0) {
            newErrors.price = 'Price must be greater than 0';
        }

        if (formData.stock_quantity && parseInt(formData.stock_quantity) < 0) {
            newErrors.stock_quantity = 'Stock quantity cannot be negative';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!validateForm()) return;

        setIsSubmitting(true);

        try {
            const submitData = new FormData();
            
            // Add form data
            Object.entries(formData).forEach(([key, value]) => {
                submitData.append(key, value.toString());
            });

            // Add image if selected
            if (imageFile) {
                submitData.append('image', imageFile);
            }

            // Add method for updates
            if (isEdit) {
                submitData.append('_method', 'PUT');
            }

            const url = isEdit ? `/admin/products/${product?.id}` : '/admin/products';
            
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'X-CSRF-TOKEN': getCsrfToken(),
                },
                body: submitData,
            });

            const data = await response.json();

            if (response.ok) {
                alert(data.message || `Product ${isEdit ? 'updated' : 'created'} successfully!`);
                router.visit('/admin/products');
            } else {
                if (data.errors) {
                    setErrors(data.errors);
                } else {
                    alert(data.message || 'An error occurred');
                }
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            alert('An error occurred while saving the product');
        } finally {
            setIsSubmitting(false);
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
                        <Link href="/admin/products" className="text-gray-600 hover:text-gray-900">
                            Products
                        </Link>
                        <span className="text-gray-400">/</span>
                        <span className="text-gray-900">{isEdit ? 'Edit Product' : 'Add Product'}</span>
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
            <Head title={`${isEdit ? 'Edit' : 'Add'} Product - Admin`}>
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
                
                <div className="max-w-4xl mx-auto p-8">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100">
                        <div className="p-6 border-b border-gray-100">
                            <div className="flex justify-between items-center">
                                <h1 className="text-2xl font-bold" style={{color: '#3A4C2F'}}>
                                    {isEdit ? 'Edit Product' : 'Add New Product'}
                                </h1>
                                <Link
                                    href="/admin/products"
                                    className="px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors"
                                >
                                    Cancel
                                </Link>
                            </div>
                        </div>

                        <form onSubmit={handleSubmit} className="p-6">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                {/* Left Column */}
                                <div className="space-y-6">
                                    {/* Product Name */}
                                    <div>
                                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                                            Product Name *
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-opacity-50 ${
                                                errors.name ? 'border-red-300 focus:ring-red-500' : 'border-gray-300 focus:ring-green-500'
                                            }`}
                                            placeholder="Enter product name"
                                        />
                                        {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                                    </div>

                                    {/* Description */}
                                    <div>
                                        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                                            Description *
                                        </label>
                                        <textarea
                                            id="description"
                                            name="description"
                                            value={formData.description}
                                            onChange={handleInputChange}
                                            rows={4}
                                            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-opacity-50 ${
                                                errors.description ? 'border-red-300 focus:ring-red-500' : 'border-gray-300 focus:ring-green-500'
                                            }`}
                                            placeholder="Enter product description"
                                        />
                                        {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
                                    </div>

                                    {/* Price and Stock */}
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-2">
                                                Price (KSh) *
                                            </label>
                                            <input
                                                type="number"
                                                id="price"
                                                name="price"
                                                value={formData.price}
                                                onChange={handleInputChange}
                                                step="0.01"
                                                min="0"
                                                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-opacity-50 ${
                                                    errors.price ? 'border-red-300 focus:ring-red-500' : 'border-gray-300 focus:ring-green-500'
                                                }`}
                                                placeholder="0.00"
                                            />
                                            {errors.price && <p className="mt-1 text-sm text-red-600">{errors.price}</p>}
                                        </div>

                                        <div>
                                            <label htmlFor="stock_quantity" className="block text-sm font-medium text-gray-700 mb-2">
                                                Stock Quantity *
                                            </label>
                                            <input
                                                type="number"
                                                id="stock_quantity"
                                                name="stock_quantity"
                                                value={formData.stock_quantity}
                                                onChange={handleInputChange}
                                                min="0"
                                                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-opacity-50 ${
                                                    errors.stock_quantity ? 'border-red-300 focus:ring-red-500' : 'border-gray-300 focus:ring-green-500'
                                                }`}
                                                placeholder="0"
                                            />
                                            {errors.stock_quantity && <p className="mt-1 text-sm text-red-600">{errors.stock_quantity}</p>}
                                        </div>
                                    </div>

                                    {/* Weight and SKU */}
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label htmlFor="weight" className="block text-sm font-medium text-gray-700 mb-2">
                                                Weight
                                            </label>
                                            <input
                                                type="text"
                                                id="weight"
                                                name="weight"
                                                value={formData.weight}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                                                placeholder="e.g., 1kg, 500g"
                                            />
                                        </div>

                                        <div>
                                            <label htmlFor="sku" className="block text-sm font-medium text-gray-700 mb-2">
                                                SKU
                                            </label>
                                            <input
                                                type="text"
                                                id="sku"
                                                name="sku"
                                                value={formData.sku}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                                                placeholder="Product SKU"
                                            />
                                        </div>
                                    </div>

                                    {/* Category and Status */}
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label htmlFor="category_id" className="block text-sm font-medium text-gray-700 mb-2">
                                                Category *
                                            </label>
                                            <select
                                                id="category_id"
                                                name="category_id"
                                                value={formData.category_id}
                                                onChange={handleInputChange}
                                                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-opacity-50 ${
                                                    errors.category_id ? 'border-red-300 focus:ring-red-500' : 'border-gray-300 focus:ring-green-500'
                                                }`}
                                            >
                                                <option value="">Select a category</option>
                                                {categories.map((category) => (
                                                    <option key={category.id} value={category.id}>
                                                        {category.name}
                                                    </option>
                                                ))}
                                            </select>
                                            {errors.category_id && <p className="mt-1 text-sm text-red-600">{errors.category_id}</p>}
                                        </div>

                                        <div>
                                            <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-2">
                                                Status
                                            </label>
                                            <select
                                                id="status"
                                                name="status"
                                                value={formData.status}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                                            >
                                                <option value="active">Active</option>
                                                <option value="inactive">Inactive</option>
                                                <option value="draft">Draft</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                {/* Right Column - Image Upload */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Product Image
                                    </label>
                                    
                                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
                                        {imagePreview ? (
                                            <div className="relative">
                                                <img
                                                    src={imagePreview}
                                                    alt="Product preview"
                                                    className="w-full h-64 object-cover rounded-lg"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={removeImage}
                                                    className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                                                >
                                                    <XMarkIcon className="w-4 h-4" />
                                                </button>
                                            </div>
                                        ) : (
                                            <div className="text-center">
                                                <PhotoIcon className="mx-auto h-12 w-12 text-gray-400" />
                                                <div className="mt-4">
                                                    <label htmlFor="image" className="cursor-pointer">
                                                        <span className="mt-2 block text-sm font-medium text-gray-900">
                                                            Click to upload image
                                                        </span>
                                                        <span className="mt-1 block text-xs text-gray-500">
                                                            PNG, JPG, GIF up to 10MB
                                                        </span>
                                                    </label>
                                                    <input
                                                        id="image"
                                                        name="image"
                                                        type="file"
                                                        accept="image/*"
                                                        onChange={handleImageChange}
                                                        className="sr-only"
                                                    />
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                    
                                    {!imagePreview && (
                                        <div className="mt-4">
                                            <label htmlFor="image" className="cursor-pointer">
                                                <div className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                                                    <PhotoIcon className="w-5 h-5 mr-2 text-gray-400" />
                                                    <span className="text-sm text-gray-600">Choose file</span>
                                                </div>
                                            </label>
                                            <input
                                                id="image"
                                                name="image"
                                                type="file"
                                                accept="image/*"
                                                onChange={handleImageChange}
                                                className="sr-only"
                                            />
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Submit Buttons */}
                            <div className="flex justify-end space-x-4 mt-8 pt-6 border-t border-gray-100">
                                <Link
                                    href="/admin/products"
                                    className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                                >
                                    Cancel
                                </Link>
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className={`px-6 py-3 text-white font-semibold rounded-lg transition-colors ${
                                        isSubmitting 
                                            ? 'opacity-50 cursor-not-allowed' 
                                            : 'hover:opacity-90'
                                    }`}
                                    style={{backgroundColor: '#3A4C2F'}}
                                >
                                    {isSubmitting ? (
                                        <span className="flex items-center">
                                            <i className="fas fa-spinner fa-spin mr-2"></i>
                                            {isEdit ? 'Updating...' : 'Creating...'}
                                        </span>
                                    ) : (
                                        isEdit ? 'Update Product' : 'Create Product'
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}