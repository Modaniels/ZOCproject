import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { CheckCircleIcon } from '@heroicons/react/24/outline';
import Navigation from '../components/Navigation';
import Newsletter from '../components/Newsletter';

interface Props {
    orderNumber?: string;
    email?: string;
}

export default function CheckoutSuccess({ orderNumber = 'ZOC-' + Date.now(), email }: Props) {
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

    return (
        <>
            <Head title="Order Successful - ZOC Farm">
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

                <div className="pt-24 pb-16 px-4">
                    <div className="max-w-4xl mx-auto text-center">
                        <div className="bg-white rounded-xl shadow-lg p-12 border border-gray-100 mb-8">
                            <CheckCircleIcon className="w-24 h-24 mx-auto mb-6" style={{color: '#3A4C2F'}} />
                            
                            <h1 className="text-4xl font-bold mb-4" style={{color: '#3A4C2F', fontFamily: 'Space Grotesk, sans-serif'}}>
                                Order Successful!
                            </h1>
                            
                            <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                                Thank you for your order! We've received your payment and will start preparing your items for delivery.
                            </p>

                            <div className="bg-gray-50 rounded-lg p-6 mb-8">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                                    <div>
                                        <h3 className="font-semibold mb-2" style={{color: '#3A4C2F'}}>Order Number</h3>
                                        <p className="text-gray-600 font-mono text-lg">{orderNumber}</p>
                                    </div>
                                    {email && (
                                        <div>
                                            <h3 className="font-semibold mb-2" style={{color: '#3A4C2F'}}>Confirmation Email</h3>
                                            <p className="text-gray-600">Sent to {email}</p>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                                <div className="bg-green-50 rounded-lg p-6">
                                    <i className="fas fa-check-circle text-3xl mb-3" style={{color: '#3A4C2F'}}></i>
                                    <h3 className="font-semibold mb-2" style={{color: '#3A4C2F'}}>Order Confirmed</h3>
                                    <p className="text-gray-600 text-sm">Your order has been successfully placed</p>
                                </div>
                                <div className="bg-yellow-50 rounded-lg p-6">
                                    <i className="fas fa-box text-3xl mb-3" style={{color: '#F4C542'}}></i>
                                    <h3 className="font-semibold mb-2" style={{color: '#3A4C2F'}}>Processing</h3>
                                    <p className="text-gray-600 text-sm">We're preparing your items for shipment</p>
                                </div>
                                <div className="bg-blue-50 rounded-lg p-6">
                                    <i className="fas fa-truck text-3xl mb-3" style={{color: '#3A4C2F'}}></i>
                                    <h3 className="font-semibold mb-2" style={{color: '#3A4C2F'}}>Delivery</h3>
                                    <p className="text-gray-600 text-sm">Expected within 2-3 business days</p>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <h3 className="text-xl font-semibold mb-4" style={{color: '#3A4C2F', fontFamily: 'Space Grotesk, sans-serif'}}>
                                    What's Next?
                                </h3>
                                <div className="text-left space-y-3 text-gray-600">
                                    <p className="flex items-start">
                                        <i className="fas fa-envelope mr-3 mt-1" style={{color: '#3A4C2F'}}></i>
                                        You'll receive an email confirmation with your order details and tracking information
                                    </p>
                                    <p className="flex items-start">
                                        <i className="fas fa-phone mr-3 mt-1" style={{color: '#3A4C2F'}}></i>
                                        Our team will contact you to confirm delivery details and schedule
                                    </p>
                                    <p className="flex items-start">
                                        <i className="fas fa-truck mr-3 mt-1" style={{color: '#3A4C2F'}}></i>
                                        Your fresh products will be delivered within 2-3 business days
                                    </p>
                                    <p className="flex items-start">
                                        <i className="fas fa-headset mr-3 mt-1" style={{color: '#3A4C2F'}}></i>
                                        Need help? Contact our customer support team anytime
                                    </p>
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
                                <Link
                                    href="/products"
                                    className="inline-flex items-center px-6 py-3 bg-gray-200 text-gray-800 font-semibold rounded-lg hover:bg-gray-300 transition duration-200"
                                >
                                    <i className="fas fa-shopping-bag mr-2"></i>
                                    Continue Shopping
                                </Link>
                                <Link
                                    href="/contact"
                                    className="inline-flex items-center px-6 py-3 text-white font-semibold rounded-lg hover:opacity-90 transition duration-200"
                                    style={{backgroundColor: '#3A4C2F'}}
                                >
                                    <i className="fas fa-phone mr-2"></i>
                                    Contact Support
                                </Link>
                            </div>
                        </div>

                        {/* Additional Information */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                                <h3 className="text-xl font-bold mb-4" style={{color: '#3A4C2F', fontFamily: 'Space Grotesk, sans-serif'}}>
                                    Delivery Information
                                </h3>
                                <ul className="text-left space-y-2 text-gray-600">
                                    <li>• Free delivery on all orders</li>
                                    <li>• Delivery within Nairobi: 1-2 business days</li>
                                    <li>• Delivery outside Nairobi: 2-3 business days</li>
                                    <li>• Fresh products delivered in insulated packaging</li>
                                    <li>• Delivery tracking available via SMS</li>
                                </ul>
                            </div>
                            
                            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                                <h3 className="text-xl font-bold mb-4" style={{color: '#3A4C2F', fontFamily: 'Space Grotesk, sans-serif'}}>
                                    Need Help?
                                </h3>
                                <div className="text-left space-y-3 text-gray-600">
                                    <p>
                                        <strong>Customer Support:</strong><br />
                                        Phone: +254 712 345 678<br />
                                        Email: support@zocfarm.com
                                    </p>
                                    <p>
                                        <strong>Business Hours:</strong><br />
                                        Monday - Friday: 8:00 AM - 6:00 PM<br />
                                        Saturday: 9:00 AM - 4:00 PM
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