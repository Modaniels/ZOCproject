import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { CreditCardIcon, DevicePhoneMobileIcon, MapPinIcon, UserIcon } from '@heroicons/react/24/outline';
import Navigation from '../components/Navigation';
import Newsletter from '../components/Newsletter';

interface CartItem {
    id: number;
    product_id: number;
    quantity: number;
    price: number;
    total: number;
    product: {
        id: number;
        name: string;
        slug: string;
        price: number;
        formatted_price: string;
        weight: string;
        primary_image?: {
            image_path: string;
            alt_text: string;
            url: string;
        };
    };
}

interface Props {
    cartItems: CartItem[];
    total: number;
    userDetails?: {
        firstName: string;
        lastName: string;
        email: string;
        phone: string;
        address: string;
        city: string;
        county: string;
    } | null;
}

export default function Checkout({ cartItems, total, userDetails }: Props) {
    const [isProcessing, setIsProcessing] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState('mpesa');
    const [paymentStatus, setPaymentStatus] = useState<'idle' | 'pending' | 'checking' | 'success' | 'failed'>('idle');
    const [currentOrder, setCurrentOrder] = useState<any>(null);
    const [statusMessage, setStatusMessage] = useState('');
    const [timeRemaining, setTimeRemaining] = useState(120); // 2 minutes in seconds
    const [formData, setFormData] = useState({
        firstName: userDetails?.firstName || '',
        lastName: userDetails?.lastName || '',
        email: userDetails?.email || '',
        phone: userDetails?.phone || '',
        address: userDetails?.address || '',
        city: userDetails?.city || '',
        county: userDetails?.county || '',
        deliveryNotes: ''
    });

    // Countdown timer effect
    React.useEffect(() => {
        if (paymentStatus === 'checking' && timeRemaining > 0) {
            const timer = setTimeout(() => {
                setTimeRemaining(prev => prev - 1);
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, [paymentStatus, timeRemaining]);

    // Format time remaining
    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    // Get CSRF token safely
    const getCsrfToken = () => {
        if (typeof document !== 'undefined') {
            return document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '';
        }
        return '';
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const validateForm = () => {
        const required = ['firstName', 'lastName', 'email', 'phone', 'address', 'city', 'county'];
        for (const field of required) {
            if (!formData[field as keyof typeof formData]) {
                alert(`Please fill in ${field.replace(/([A-Z])/g, ' $1').toLowerCase()}`);
                return false;
            }
        }

        // Basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            alert('Please enter a valid email address');
            return false;
        }

        // Basic phone validation (Kenyan format)
        const phoneRegex = /^(\+254|0)[7-9]\d{8}$/;
        if (!phoneRegex.test(formData.phone)) {
            alert('Please enter a valid Kenyan phone number (e.g., +254712345678 or 0712345678)');
            return false;
        }

        return true;
    };

    // Function to check payment status
    const checkPaymentStatus = async (orderId: number) => {
        try {
            const response = await fetch('/checkout/payment-status', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': getCsrfToken(),
                },
                body: JSON.stringify({ order_id: orderId }),
            });

            const data = await response.json();
            
            if (data.success && data.status === 'paid') {
                setPaymentStatus('success');
                setStatusMessage('Payment successful! Your order has been confirmed.');
                setTimeout(() => {
                    router.visit(`/checkout/success?order_number=${currentOrder?.order_number}&email=${formData.email}`);
                }, 2000);
                return true;
            } else if (data.status === 'failed') {
                setPaymentStatus('failed');
                setStatusMessage('Payment failed. Please try again.');
                return false;
            } else {
                // Still pending
                return false;
            }
        } catch (error) {
            console.error('Error checking payment status:', error);
            return false;
        }
    };

    // Polling function for M-Pesa payment status
    const pollPaymentStatus = (orderId: number, maxAttempts = 40) => {
        let attempts = 0;
        
        const poll = async () => {
            attempts++;
            const isComplete = await checkPaymentStatus(orderId);
            
            if (isComplete || attempts >= maxAttempts) {
                if (!isComplete && attempts >= maxAttempts) {
                    setPaymentStatus('failed');
                    setStatusMessage('Payment timeout. Please try again or choose a different payment method.');
                }
                return;
            }
            
            // Update status message every few attempts to keep user informed
            if (attempts === 5) {
                setStatusMessage('Still waiting for payment confirmation. Please ensure you entered your M-Pesa PIN.');
            } else if (attempts === 15) {
                setStatusMessage('Payment is taking longer than expected. Please complete the transaction on your phone.');
            } else if (attempts === 25) {
                setStatusMessage('Still processing... If you didn\'t receive the prompt, the transaction may have timed out.');
            }
            
            // Continue polling every 3 seconds
            setTimeout(poll, 3000);
        };
        
        poll();
    };

    const handleCheckout = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!validateForm()) return;

        setIsProcessing(true);
        setPaymentStatus('pending');

        try {
            const response = await fetch('/checkout/process', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': getCsrfToken(),
                },
                body: JSON.stringify({
                    ...formData,
                    paymentMethod,
                    items: cartItems,
                    total
                }),
            });

            const data = await response.json();

            if (response.ok) {
                setCurrentOrder(data);
                
                if (paymentMethod === 'mpesa') {
                    setStatusMessage(`M-Pesa payment request sent to ${formData.phone}. Please check your phone and enter your M-Pesa PIN to complete the payment.`);
                    setPaymentStatus('checking');
                    
                    // Start polling for payment status after a longer delay to give user time to enter PIN
                    setTimeout(() => {
                        setStatusMessage('Waiting for payment confirmation. Please complete the transaction on your phone.');
                        pollPaymentStatus(data.order_id);
                    }, 10000); // Wait 10 seconds before starting to poll
                    
                } else {
                    // Cash on delivery
                    setPaymentStatus('success');
                    setStatusMessage('Order placed successfully! You will pay upon delivery.');
                    setTimeout(() => {
                        router.visit(`/checkout/success?order_number=${data.order_number}&email=${formData.email}`);
                    }, 2000);
                }
            } else {
                setPaymentStatus('failed');
                setStatusMessage(data.message || 'Error processing checkout');
            }
        } catch (error) {
            console.error('Checkout error:', error);
            setPaymentStatus('failed');
            setStatusMessage('Error processing checkout. Please try again.');
        } finally {
            setIsProcessing(false);
        }
    };

    const formatPrice = (price: number) => {
        return `KSh ${price.toLocaleString()}`;
    };

    const Footer = () => (
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
    );

    if (cartItems.length === 0) {
        return (
            <>
                <Head title="Checkout - ZOC Farm">
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
                    <meta name="csrf-token" content={getCsrfToken()} />
                </Head>
                
                <div className="min-h-screen" style={{
                    fontFamily: 'Inter, sans-serif',
                    backgroundColor: '#FDF8E3',
                    color: '#333333'
                }}>
                    <Navigation />

                    <div className="pt-24 pb-16 px-4">
                        <div className="max-w-4xl mx-auto text-center">
                            <div className="bg-white rounded-xl shadow-lg p-12 border border-gray-100">
                                <div className="text-6xl mb-6">🛒</div>
                                <h2 className="text-4xl font-bold mb-4" style={{color: '#3A4C2F', fontFamily: 'Space Grotesk, sans-serif'}}>
                                    Your cart is empty
                                </h2>
                                <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                                    Add some items to your cart before proceeding to checkout.
                                </p>
                                <Link
                                    href="/products"
                                    className="inline-flex items-center px-8 py-4 text-white font-semibold rounded-lg hover:opacity-90 transition duration-200"
                                    style={{backgroundColor: '#3A4C2F'}}
                                >
                                    <i className="fas fa-shopping-bag mr-2"></i>
                                    Continue Shopping
                                </Link>
                            </div>
                        </div>
                    </div>

                    <Footer />
                </div>
            </>
        );
    }

    return (
        <>
            <Head title="Checkout - ZOC Farm">
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
                <meta name="csrf-token" content={getCsrfToken()} />
            </Head>
            
            <div className="min-h-screen" style={{
                fontFamily: 'Inter, sans-serif',
                backgroundColor: '#FDF8E3',
                color: '#333333'
            }}>
                <Navigation />

                <div className="pt-24 pb-16 px-4">
                    <div className="max-w-6xl mx-auto">
                        <div className="mb-8">
                            <h1 className="text-3xl sm:text-4xl font-bold mb-4" style={{color: '#3A4C2F', fontFamily: 'Space Grotesk, sans-serif'}}>
                                Checkout
                            </h1>
                            <div className="flex items-center space-x-2 text-sm text-gray-600">
                                <Link href="/cart" className="hover:text-yellow-600">Cart</Link>
                                <span>→</span>
                                <span className="font-semibold" style={{color: '#3A4C2F'}}>Checkout</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            {/* Checkout Form */}
                            <div className="lg:col-span-2">
                                <form onSubmit={handleCheckout} className="bg-white rounded-xl shadow-lg p-4 sm:p-8 border border-gray-100">
                                    {/* Customer Information */}
                                    <div className="mb-8">
                                        <h2 className="text-xl sm:text-2xl font-bold mb-6 flex items-center" style={{color: '#3A4C2F', fontFamily: 'Space Grotesk, sans-serif'}}>
                                            <UserIcon className="w-5 h-5 sm:w-6 sm:h-6 mr-2" />
                                            Customer Information
                                        </h2>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                                            <div>
                                                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                                                    First Name *
                                                </label>
                                                <input
                                                    type="text"
                                                    id="firstName"
                                                    name="firstName"
                                                    value={formData.firstName}
                                                    onChange={handleInputChange}
                                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-opacity-50"
                                                    style={{'--tw-ring-color': '#3A4C2F'} as React.CSSProperties}
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                                                    Last Name *
                                                </label>
                                                <input
                                                    type="text"
                                                    id="lastName"
                                                    name="lastName"
                                                    value={formData.lastName}
                                                    onChange={handleInputChange}
                                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-opacity-50"
                                                    style={{'--tw-ring-color': '#3A4C2F'} as React.CSSProperties}
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                                    Email Address *
                                                </label>
                                                <input
                                                    type="email"
                                                    id="email"
                                                    name="email"
                                                    value={formData.email}
                                                    onChange={handleInputChange}
                                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-opacity-50"
                                                    style={{'--tw-ring-color': '#3A4C2F'} as React.CSSProperties}
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                                                    Phone Number *
                                                </label>
                                                <input
                                                    type="tel"
                                                    id="phone"
                                                    name="phone"
                                                    value={formData.phone}
                                                    onChange={handleInputChange}
                                                    placeholder="+254712345678"
                                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-opacity-50"
                                                    style={{'--tw-ring-color': '#3A4C2F'} as React.CSSProperties}
                                                    required
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Delivery Address */}
                                    <div className="mb-8">
                                        <h2 className="text-2xl font-bold mb-6 flex items-center" style={{color: '#3A4C2F', fontFamily: 'Space Grotesk, sans-serif'}}>
                                            <MapPinIcon className="w-6 h-6 mr-2" />
                                            Delivery Address
                                        </h2>
                                        <div className="space-y-6">
                                            <div>
                                                <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
                                                    Street Address *
                                                </label>
                                                <input
                                                    type="text"
                                                    id="address"
                                                    name="address"
                                                    value={formData.address}
                                                    onChange={handleInputChange}
                                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-opacity-50"
                                                    style={{'--tw-ring-color': '#3A4C2F'} as React.CSSProperties}
                                                    required
                                                />
                                            </div>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <div>
                                                    <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-2">
                                                        City/Town *
                                                    </label>
                                                    <input
                                                        type="text"
                                                        id="city"
                                                        name="city"
                                                        value={formData.city}
                                                        onChange={handleInputChange}
                                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-opacity-50"
                                                        style={{'--tw-ring-color': '#3A4C2F'} as React.CSSProperties}
                                                        required
                                                    />
                                                </div>
                                                <div>
                                                    <label htmlFor="county" className="block text-sm font-medium text-gray-700 mb-2">
                                                        County *
                                                    </label>
                                                    <input
                                                        type="text"
                                                        id="county"
                                                        name="county"
                                                        value={formData.county}
                                                        onChange={handleInputChange}
                                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-opacity-50"
                                                        style={{'--tw-ring-color': '#3A4C2F'} as React.CSSProperties}
                                                        required
                                                    />
                                                </div>
                                            </div>
                                            <div>
                                                <label htmlFor="deliveryNotes" className="block text-sm font-medium text-gray-700 mb-2">
                                                    Delivery Notes (Optional)
                                                </label>
                                                <textarea
                                                    id="deliveryNotes"
                                                    name="deliveryNotes"
                                                    value={formData.deliveryNotes}
                                                    onChange={handleInputChange}
                                                    rows={3}
                                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-opacity-50"
                                                    style={{'--tw-ring-color': '#3A4C2F'} as React.CSSProperties}
                                                    placeholder="Any special delivery instructions..."
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Payment Method */}
                                    <div className="mb-8">
                                        <h2 className="text-2xl font-bold mb-6 flex items-center" style={{color: '#3A4C2F', fontFamily: 'Space Grotesk, sans-serif'}}>
                                            <CreditCardIcon className="w-6 h-6 mr-2" />
                                            Payment Method
                                        </h2>
                                        <div className="space-y-4">
                                            <div className="flex items-center p-4 border-2 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                                                 style={{borderColor: paymentMethod === 'mpesa' ? '#3A4C2F' : '#E5E7EB'}}
                                                 onClick={() => setPaymentMethod('mpesa')}>
                                                <input
                                                    type="radio"
                                                    id="mpesa"
                                                    name="paymentMethod"
                                                    value="mpesa"
                                                    checked={paymentMethod === 'mpesa'}
                                                    onChange={(e) => setPaymentMethod(e.target.value)}
                                                    className="mr-3"
                                                />
                                                <DevicePhoneMobileIcon className="w-8 h-8 mr-3" style={{color: '#3A4C2F'}} />
                                                <div>
                                                    <h3 className="font-semibold text-lg">M-Pesa</h3>
                                                    <p className="text-gray-600">Pay securely with M-Pesa mobile money</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center p-4 border-2 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                                                 style={{borderColor: paymentMethod === 'cod' ? '#3A4C2F' : '#E5E7EB'}}
                                                 onClick={() => setPaymentMethod('cod')}>
                                                <input
                                                    type="radio"
                                                    id="cod"
                                                    name="paymentMethod"
                                                    value="cod"
                                                    checked={paymentMethod === 'cod'}
                                                    onChange={(e) => setPaymentMethod(e.target.value)}
                                                    className="mr-3"
                                                />
                                                <i className="fas fa-money-bill-wave text-2xl mr-3" style={{color: '#3A4C2F'}}></i>
                                                <div>
                                                    <h3 className="font-semibold text-lg">Cash on Delivery</h3>
                                                    <p className="text-gray-600">Pay when your order is delivered</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Payment Status Display */}
                                    {paymentStatus !== 'idle' && (
                                        <div className="mb-8 p-6 rounded-lg border-2" style={{
                                            backgroundColor: paymentStatus === 'success' ? '#F0F9FF' : 
                                                           paymentStatus === 'failed' ? '#FEF2F2' : '#FFF7ED',
                                            borderColor: paymentStatus === 'success' ? '#059669' : 
                                                        paymentStatus === 'failed' ? '#DC2626' : '#F59E0B'
                                        }}>
                                            <div className="flex items-center">
                                                {paymentStatus === 'pending' && (
                                                    <div className="flex items-center text-orange-600">
                                                        <i className="fas fa-clock-o text-2xl mr-3"></i>
                                                        <span className="font-semibold">Processing Payment...</span>
                                                    </div>
                                                )}
                                                {paymentStatus === 'checking' && (
                                                    <div className="flex items-center text-blue-600">
                                                        <i className="fas fa-spinner fa-spin text-2xl mr-3"></i>
                                                        <span className="font-semibold">Checking Payment Status...</span>
                                                    </div>
                                                )}
                                                {paymentStatus === 'success' && (
                                                    <div className="flex items-center text-green-600">
                                                        <i className="fas fa-check-circle text-2xl mr-3"></i>
                                                        <span className="font-semibold">Payment Successful!</span>
                                                    </div>
                                                )}
                                                {paymentStatus === 'failed' && (
                                                    <div className="flex items-center text-red-600">
                                                        <i className="fas fa-times-circle text-2xl mr-3"></i>
                                                        <span className="font-semibold">Payment Failed</span>
                                                    </div>
                                                )}
                                            </div>
                                            {statusMessage && (
                                                <p className="mt-3 text-sm" style={{
                                                    color: paymentStatus === 'success' ? '#059669' : 
                                                           paymentStatus === 'failed' ? '#DC2626' : '#F59E0B'
                                                }}>
                                                    {statusMessage}
                                                </p>
                                            )}
                                            {paymentStatus === 'checking' && (
                                                <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                                                    <h4 className="font-semibold text-blue-800 mb-3 flex items-center">
                                                        📱 Complete Payment on Your Phone
                                                        <span className="ml-2 inline-flex items-center">
                                                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                                                        </span>
                                                    </h4>
                                                    <div className="bg-white p-3 rounded border border-blue-100 mb-3">
                                                        <p className="text-sm text-blue-800 font-medium">
                                                            💡 Follow these steps to complete your payment:
                                                        </p>
                                                    </div>
                                                    <ol className="text-sm text-blue-700 space-y-2">
                                                        <li className="flex items-start">
                                                            <span className="bg-blue-100 text-blue-800 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold mr-2 mt-0.5">1</span>
                                                            Check your phone ({formData.phone}) for M-Pesa payment prompt
                                                        </li>
                                                        <li className="flex items-start">
                                                            <span className="bg-blue-100 text-blue-800 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold mr-2 mt-0.5">2</span>
                                                            Enter your M-Pesa PIN to authorize the payment
                                                        </li>
                                                        <li className="flex items-start">
                                                            <span className="bg-blue-100 text-blue-800 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold mr-2 mt-0.5">3</span>
                                                            Wait for SMS confirmation from M-Pesa
                                                        </li>
                                                        <li className="flex items-start">
                                                            <span className="bg-blue-100 text-blue-800 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold mr-2 mt-0.5">4</span>
                                                            This page will automatically update once payment is confirmed
                                                        </li>
                                                    </ol>
                                                    <div className="mt-3 p-2 bg-blue-100 rounded text-xs text-blue-600">
                                                        ⏱️ Time remaining: {formatTime(timeRemaining)} | Waiting for payment confirmation...
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    )}

                                    <button
                                        type="submit"
                                        disabled={isProcessing || paymentStatus === 'checking'}
                                        className={`w-full py-4 px-6 rounded-lg font-semibold text-white text-lg transition duration-200 ${
                                            (isProcessing || paymentStatus === 'checking') ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-90'
                                        }`}
                                        style={{backgroundColor: '#3A4C2F'}}
                                    >
                                        {isProcessing || paymentStatus === 'checking' ? (
                                            <span className="flex items-center justify-center">
                                                <i className="fas fa-spinner fa-spin mr-2"></i>
                                                {paymentStatus === 'checking' ? 'Waiting for Payment...' : 'Processing...'}
                                            </span>
                                        ) : (
                                            <span className="flex items-center justify-center">
                                                <i className="fas fa-lock mr-2"></i>
                                                Place Order - {formatPrice(total)}
                                            </span>
                                        )}
                                    </button>
                                </form>
                            </div>

                            {/* Order Summary */}
                            <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100 h-fit">
                                <h2 className="text-2xl font-bold mb-6" style={{color: '#3A4C2F', fontFamily: 'Space Grotesk, sans-serif'}}>
                                    Order Summary
                                </h2>
                                
                                <div className="space-y-4 mb-6">
                                    {cartItems.map((item) => (
                                        <div key={item.id} className="flex items-center space-x-4 pb-4 border-b border-gray-100">
                                            <div className="flex-shrink-0 w-16 h-16">
                                                {item.product.primary_image ? (
                                                    <img
                                                        src={item.product.primary_image.url}
                                                        alt={item.product.primary_image.alt_text || item.product.name}
                                                        className="w-full h-full object-cover rounded-lg"
                                                    />
                                                ) : (
                                                    <div className="w-full h-full bg-gray-100 rounded-lg flex items-center justify-center">
                                                        <i className="fas fa-image text-gray-400"></i>
                                                    </div>
                                                )}
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="font-semibold text-sm">{item.product.name}</h3>
                                                <p className="text-gray-600 text-sm">Qty: {item.quantity}</p>
                                            </div>
                                            <div className="text-right">
                                                <p className="font-semibold" style={{color: '#3A4C2F'}}>
                                                    {formatPrice(item.quantity * item.price)}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="space-y-2 mb-6">
                                    <div className="flex justify-between">
                                        <span>Subtotal:</span>
                                        <span>{formatPrice(total)}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Delivery:</span>
                                        <span className="text-green-600">Free</span>
                                    </div>
                                    <div className="border-t pt-2">
                                        <div className="flex justify-between font-bold text-lg">
                                            <span>Total:</span>
                                            <span style={{color: '#3A4C2F'}}>{formatPrice(total)}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="text-sm text-gray-600 space-y-2">
                                    <p className="flex items-center">
                                        <i className="fas fa-truck mr-2 text-green-600"></i>
                                        Free delivery on all orders
                                    </p>
                                    <p className="flex items-center">
                                        <i className="fas fa-shield-alt mr-2 text-green-600"></i>
                                        Secure payment processing
                                    </p>
                                    <p className="flex items-center">
                                        <i className="fas fa-clock mr-2 text-green-600"></i>
                                        Delivery within 2-3 business days
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="py-20 px-4" style={{backgroundColor: '#3A4C2F'}}>
                    <div className="max-w-4xl mx-auto">
                        <Newsletter />
                    </div>
                </div>

                <Footer />
            </div>
        </>
    );
}