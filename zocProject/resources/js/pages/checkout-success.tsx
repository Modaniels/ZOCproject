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
        <footer className="text-white py-16" style={{backgroundColor: '#1A1A1A'}}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <div>
                        <div className="flex items-center space-x-3 mb-6">
                            <div className="text-2xl font-bold" style={{color: '#D4AF37', fontFamily: 'Space Grotesk, sans-serif'}}>
                                ZOC Farm
                            </div>
                        </div>
                        <p className="text-gray-400 mb-6 leading-relaxed">
                            Zedjah Organic Crowd Farms - A systemized regenerative farming company specializing in organic food production and farm management from Kirinyaga County, Kenya.
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
                        <h3 className="text-lg font-bold mb-6" style={{fontFamily: 'Space Grotesk, sans-serif'}}>Quick Links</h3>
                        <ul className="space-y-3">
                            <li><Link href="/" className="text-gray-400 hover:text-white transition-colors">Home</Link></li>
                            <li><Link href="/about" className="text-gray-400 hover:text-white transition-colors">About Us</Link></li>
                            <li><Link href="/services" className="text-gray-400 hover:text-white transition-colors">Services</Link></li>
                            <li><Link href="/products" className="text-gray-400 hover:text-white transition-colors">Products</Link></li>
                            <li><Link href="/contact" className="text-gray-400 hover:text-white transition-colors">Contact</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-lg font-bold mb-6" style={{fontFamily: 'Space Grotesk, sans-serif'}}>Contact Info</h3>
                        <ul className="space-y-3">
                            <li className="text-gray-400">
                                <i className="fas fa-map-marker-alt mr-2"></i>
                                020 Mutira, Kirinyaga County, Kenya
                            </li>
                            <li className="text-gray-400">
                                <i className="fas fa-phone mr-2"></i>
                                +254-790-344-724
                            </li>
                            <li className="text-gray-400">
                                <i className="fas fa-phone mr-2"></i>
                                +254-741-122-375
                            </li>
                            <li className="text-gray-400">
                                <i className="fas fa-phone mr-2"></i>
                                +254-754-919-395
                            </li>
                            <li className="text-gray-400">
                                <i className="fas fa-envelope mr-2"></i>
                                zedjahorganiccrowdfarms@gmail.com
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-700 mt-12 pt-8 text-center">
                    <p className="text-gray-400">
                        &copy; 2025 Zedjah Organic Crowd Farms Ltd. All rights reserved.
                    </p>
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
                backgroundColor: '#FAFAFA',
                color: '#1F2937'
            }}>
                <Navigation />

                <div className="pt-24 pb-16 px-4">
                    <div className="max-w-4xl mx-auto text-center">
                        <div className="bg-white rounded-3xl p-12 mb-8 hover:shadow-2xl transition-all duration-300" style={{boxShadow: '0 10px 40px rgba(0,0,0,0.08)', border: '1px solid #E5E7EB'}}>
                            <CheckCircleIcon className="w-24 h-24 mx-auto mb-6" style={{color: '#2E7D32'}} />
                            
                            <h1 className="text-5xl md:text-6xl font-bold mb-4" style={{color: '#1F2937', fontFamily: 'Space Grotesk, sans-serif'}}>
                                Order Successful!
                            </h1>
                            <div className="w-24 h-1 mx-auto mb-6" style={{backgroundColor: '#D4AF37'}}></div>
                            
                            <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                                Thank you for your order! We've received your payment and will start preparing your items for delivery.
                            </p>

                            <div className="bg-gray-50 rounded-lg p-6 mb-8">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                                    <div>
                                        <h3 className="font-semibold mb-2" style={{color: '#1F2937'}}>Order Number</h3>
                                        <p className="text-gray-600 font-mono text-lg">{orderNumber}</p>
                                    </div>
                                    {email && (
                                        <div>
                                            <h3 className="font-semibold mb-2" style={{color: '#1F2937'}}>Confirmation Email</h3>
                                            <p className="text-gray-600">Sent to {email}</p>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                                <div className="rounded-lg p-6" style={{backgroundColor: '#E8F5E9'}}>
                                    <i className="fas fa-check-circle text-3xl mb-3" style={{color: '#2E7D32'}}></i>
                                    <h3 className="font-semibold mb-2" style={{color: '#1F2937'}}>Order Confirmed</h3>
                                    <p className="text-gray-600 text-sm">Your order has been successfully placed</p>
                                </div>
                                <div className="rounded-lg p-6" style={{backgroundColor: '#FFF8E1'}}>
                                    <i className="fas fa-box text-3xl mb-3" style={{color: '#F57F17'}}></i>
                                    <h3 className="font-semibold mb-2" style={{color: '#1F2937'}}>Processing</h3>
                                    <p className="text-gray-600 text-sm">We're preparing your items for shipment</p>
                                </div>
                                <div className="rounded-lg p-6" style={{backgroundColor: '#E3F2FD'}}>
                                    <i className="fas fa-truck text-3xl mb-3" style={{color: '#1565C0'}}></i>
                                    <h3 className="font-semibold mb-2" style={{color: '#1F2937'}}>Delivery</h3>
                                    <p className="text-gray-600 text-sm">Expected within 2-3 business days</p>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <h3 className="text-xl font-semibold mb-4" style={{color: '#1F2937', fontFamily: 'Space Grotesk, sans-serif'}}>
                                    What's Next?
                                </h3>
                                <div className="text-left space-y-3 text-gray-600">
                                    <p className="flex items-start">
                                        <i className="fas fa-envelope mr-3 mt-1" style={{color: '#2E7D32'}}></i>
                                        You'll receive an email confirmation with your order details and tracking information
                                    </p>
                                    <p className="flex items-start">
                                        <i className="fas fa-phone mr-3 mt-1" style={{color: '#2E7D32'}}></i>
                                        Our team will contact you to confirm delivery details and schedule
                                    </p>
                                    <p className="flex items-start">
                                        <i className="fas fa-truck mr-3 mt-1" style={{color: '#2E7D32'}}></i>
                                        Your fresh products will be delivered within 2-3 business days
                                    </p>
                                    <p className="flex items-start">
                                        <i className="fas fa-headset mr-3 mt-1" style={{color: '#2E7D32'}}></i>
                                        Need help? Contact our customer support team anytime
                                    </p>
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
                                <Link
                                    href="/products"
                                    className="inline-flex items-center rounded-lg px-10 py-5 text-white font-semibold transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1"
                                    style={{backgroundColor: '#2E7D32', boxShadow: '0 4px 14px rgba(46, 125, 50, 0.39)'}}
                                >
                                    <i className="fas fa-shopping-bag mr-2"></i>
                                    Continue Shopping
                                </Link>
                                <Link
                                    href="/contact"
                                    className="inline-flex items-center bg-white rounded-lg px-10 py-5 font-semibold transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1"
                                    style={{color: '#1F2937', boxShadow: '0 4px 14px rgba(255, 255, 255, 0.2)'}}
                                >
                                    <i className="fas fa-phone mr-2"></i>
                                    Contact Support
                                </Link>
                            </div>
                        </div>

                        {/* Additional Information */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                            <div className="bg-white rounded-3xl p-10 hover:shadow-2xl transition-all duration-300" style={{boxShadow: '0 10px 40px rgba(0,0,0,0.08)', border: '1px solid #E5E7EB'}}>
                                <h3 className="text-xl font-bold mb-4" style={{color: '#1F2937', fontFamily: 'Space Grotesk, sans-serif'}}>
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
                            
                            <div className="bg-white rounded-3xl p-10 hover:shadow-2xl transition-all duration-300" style={{boxShadow: '0 10px 40px rgba(0,0,0,0.08)', border: '1px solid #E5E7EB'}}>
                                <h3 className="text-xl font-bold mb-4" style={{color: '#1F2937', fontFamily: 'Space Grotesk, sans-serif'}}>
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

                <div className="py-24 px-4" style={{backgroundColor: '#1F2937'}}>
                    <div className="max-w-4xl mx-auto">
                        <Newsletter />
                    </div>
                </div>

                <Footer />
            </div>
        </>
    );
}