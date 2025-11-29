import { Head } from '@inertiajs/react';
import Newsletter from '../components/Newsletter';
import Navigation from '../components/Navigation';

export default function Services() {
    return (
        <>
            <Head title="Services - ZOC Farm">
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
                {/* Header & Navigation */}
                <Navigation />

                {/* Hero Section */}
                <section className="relative min-h-96 flex items-center justify-center pt-20" style={{
                    backgroundImage: `url('/images/serviceshero.jpg')`,
                    backgroundSize: '150%',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat'
                }}>
                    <div className="hero-overlay absolute inset-0" style={{backgroundColor: 'rgba(31, 41, 55, 0.75)'}}></div>
                    <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8">
                        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6" style={{fontFamily: 'Space Grotesk, sans-serif'}}>
                            Our <span style={{color: '#D4AF37', textShadow: '0 2px 10px rgba(212, 175, 55, 0.3)'}}>Services</span>
                        </h1>
                        <p className="text-xl text-gray-200 max-w-3xl mx-auto">
                            From farm to table, we deliver organic food production and farm management with transparency and sustainability.
                        </p>
                    </div>
                </section>

                {/* Main Services Grid */}
                <section className="py-24 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-20">
                            <h2 className="text-5xl md:text-6xl font-bold mb-4" style={{color: '#1F2937', fontFamily: 'Space Grotesk, sans-serif'}}>
                                Core Services
                            </h2>
                            <div className="w-24 h-1 mx-auto mb-6" style={{backgroundColor: '#D4AF37'}}></div>
                            <p className="text-xl text-gray-600 max-w-4xl mx-auto">
                                Our integrated approach to farm management and organic food production
                            </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-16">
                            <div className="group text-center p-10 rounded-3xl hover:shadow-2xl transition-all duration-300" style={{backgroundColor: 'white', boxShadow: '0 10px 40px rgba(0,0,0,0.08)', border: '1px solid #E5E7EB'}}>
                                <div className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300" style={{backgroundColor: '#E8F5E9'}}>
                                    <i className="fas fa-seedling text-3xl" style={{color: '#2E7D32'}}></i>
                                </div>
                                <h3 className="text-lg font-bold mb-4" style={{color: '#1F2937', fontFamily: 'Space Grotesk, sans-serif'}}>
                                    Farm Management
                                </h3>
                                <p className="text-gray-600 text-sm">
                                    Comprehensive farm management services including planning, implementation, and monitoring of regenerative farming practices.
                                </p>
                            </div>

                            <div className="group text-center p-10 rounded-3xl hover:shadow-2xl transition-all duration-300" style={{backgroundColor: 'white', boxShadow: '0 10px 40px rgba(0,0,0,0.08)', border: '1px solid #E5E7EB'}}>
                                <div className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300" style={{backgroundColor: '#FFF8E1'}}>
                                    <i className="fas fa-leaf text-3xl" style={{color: '#F57F17'}}></i>
                                </div>
                                <h3 className="text-lg font-bold mb-4" style={{color: '#1F2937', fontFamily: 'Space Grotesk, sans-serif'}}>
                                    Organic Food Production
                                </h3>
                                <p className="text-gray-600 text-sm">
                                    Complete organic food production from sourcing inputs to delivering retail-ready products with full traceability.
                                </p>
                            </div>

                            <div className="group text-center p-10 rounded-3xl hover:shadow-2xl transition-all duration-300" style={{backgroundColor: 'white', boxShadow: '0 10px 40px rgba(0,0,0,0.08)', border: '1px solid #E5E7EB'}}>
                                <div className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300" style={{backgroundColor: '#E3F2FD'}}>
                                    <i className="fas fa-carrot text-3xl" style={{color: '#1565C0'}}></i>
                                </div>
                                <h3 className="text-lg font-bold mb-4" style={{color: '#1F2937', fontFamily: 'Space Grotesk, sans-serif'}}>
                                    Crop Cultivation
                                </h3>
                                <p className="text-gray-600 text-sm">
                                    Specialized organic crop cultivation with modern techniques and direct market access.
                                </p>
                            </div>

                            <div className="group text-center p-10 rounded-3xl hover:shadow-2xl transition-all duration-300" style={{backgroundColor: 'white', boxShadow: '0 10px 40px rgba(0,0,0,0.08)', border: '1px solid #E5E7EB'}}>
                                <div className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300" style={{backgroundColor: '#FFF3E0'}}>
                                    <i className="fas fa-users text-3xl" style={{color: '#E65100'}}></i>
                                </div>
                                <h3 className="text-lg font-bold mb-4" style={{color: '#1F2937', fontFamily: 'Space Grotesk, sans-serif'}}>
                                    Training & Consulting
                                </h3>
                                <p className="text-gray-600 text-sm">
                                    Expert guidance on agroecology, regenerative farming practices, and sustainable agribusiness development.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Detailed Services */}
                <section className="py-24 px-4 sm:px-6 lg:px-8" style={{backgroundColor: '#F9FAFB'}}>
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-20">
                            <h2 className="text-5xl md:text-6xl font-bold mb-4" style={{color: '#1F2937', fontFamily: 'Space Grotesk, sans-serif'}}>
                                Comprehensive Agricultural Solutions
                            </h2>
                            <div className="w-24 h-1 mx-auto mb-6" style={{backgroundColor: '#D4AF37'}}></div>
                        </div>

                        <div className="space-y-16">
                            {/* Service 1 */}
                            <div className="grid md:grid-cols-2 gap-12 items-center">
                                <div>
                                    <h3 className="text-3xl font-bold mb-6" style={{color: '#1F2937', fontFamily: 'Space Grotesk, sans-serif'}}>
                                        Farm Development & Training
                                    </h3>
                                    <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                                        We provide comprehensive training programs for smallholder farmers, covering modern agricultural techniques, sustainable farming practices, and business management skills.
                                    </p>
                                    <ul className="space-y-3">
                                        <li className="flex items-center">
                                            <i className="fas fa-check-circle mr-3" style={{color: '#2E7D32'}}></i>
                                            <span className="text-gray-600">Soil health assessment and improvement</span>
                                        </li>
                                        <li className="flex items-center">
                                            <i className="fas fa-check-circle mr-3" style={{color: '#2E7D32'}}></i>
                                            <span className="text-gray-600">Organic certification support</span>
                                        </li>
                                        <li className="flex items-center">
                                            <i className="fas fa-check-circle mr-3" style={{color: '#2E7D32'}}></i>
                                            <span className="text-gray-600">Financial literacy and business planning</span>
                                        </li>
                                    </ul>
                                </div>
                                <div className="rounded-2xl h-80 overflow-hidden shadow-lg">
                                    <img 
                                        src="/images/more_imgs/farm_dev_training.jpeg" 
                                        alt="Farm Development & Training" 
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            </div>

                            {/* Service 2 */}
                            <div className="grid md:grid-cols-2 gap-12 items-center">
                                <div className="rounded-2xl h-80 overflow-hidden shadow-lg">
                                    <img 
                                        src="/images/more_imgs/tech_innovate.jpeg" 
                                        alt="Technology & Innovation" 
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div>
                                    <h3 className="text-3xl font-bold mb-6" style={{color: '#1F2937', fontFamily: 'Space Grotesk, sans-serif'}}>
                                        Technology & Innovation
                                    </h3>
                                    <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                                        Our technology platform connects all stakeholders in the agricultural value chain, providing real-time data, market insights, and transparent transactions.
                                    </p>
                                    <ul className="space-y-3">
                                        <li className="flex items-center">
                                            <i className="fas fa-check-circle mr-3" style={{color: '#2E7D32'}}></i>
                                            <span className="text-gray-600">Digital marketplace for direct sales</span>
                                        </li>
                                        <li className="flex items-center">
                                            <i className="fas fa-check-circle mr-3" style={{color: '#2E7D32'}}></i>
                                            <span className="text-gray-600">Real-time crop monitoring systems</span>
                                        </li>
                                        <li className="flex items-center">
                                            <i className="fas fa-check-circle mr-3" style={{color: '#2E7D32'}}></i>
                                            <span className="text-gray-600">Supply chain transparency tools</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            {/* Service 3 */}
                            <div className="grid md:grid-cols-2 gap-12 items-center">
                                <div>
                                    <h3 className="text-3xl font-bold mb-6" style={{color: '#1F2937', fontFamily: 'Space Grotesk, sans-serif'}}>
                                        Quality Assurance & Certification
                                    </h3>
                                    <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                                        We ensure all products meet the highest quality standards through rigorous testing, certification processes, and continuous monitoring throughout the supply chain.
                                    </p>
                                    <ul className="space-y-3">
                                        <li className="flex items-center">
                                            <i className="fas fa-check-circle mr-3" style={{color: '#2E7D32'}}></i>
                                            <span className="text-gray-600">Organic certification assistance</span>
                                        </li>
                                        <li className="flex items-center">
                                            <i className="fas fa-check-circle mr-3" style={{color: '#2E7D32'}}></i>
                                            <span className="text-gray-600">Regular quality inspections</span>
                                        </li>
                                        <li className="flex items-center">
                                            <i className="fas fa-check-circle mr-3" style={{color: '#2E7D32'}}></i>
                                            <span className="text-gray-600">Traceability documentation</span>
                                        </li>
                                    </ul>
                                </div>
                                <div className="rounded-2xl h-80 overflow-hidden shadow-lg">
                                    <img 
                                        src="/images/more_imgs/QA.jpeg" 
                                        alt="Quality Assurance & Certification" 
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Service Packages */}
                <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-20">
                            <h2 className="text-5xl md:text-6xl font-bold mb-4" style={{color: '#1F2937', fontFamily: 'Space Grotesk, sans-serif'}}>
                                Service Packages
                            </h2>
                            <div className="w-24 h-1 mx-auto mb-6" style={{backgroundColor: '#D4AF37'}}></div>
                            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                                Choose the package that best fits your agricultural needs
                            </p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-10">
                            {/* Starter Package */}
                            <div className="bg-white rounded-3xl p-10 hover:shadow-2xl transition-all duration-300" style={{boxShadow: '0 10px 40px rgba(0,0,0,0.08)', border: '1px solid #E5E7EB'}}>
                                <div className="text-center mb-8">
                                    <h3 className="text-2xl font-bold mb-4" style={{color: '#1F2937', fontFamily: 'Space Grotesk, sans-serif'}}>
                                        Starter Package
                                    </h3>
                                    <div className="text-4xl font-bold mb-2" style={{color: '#2E7D32'}}>
                                        KSh 15,000
                                    </div>
                                    <p className="text-gray-600">per farm/month</p>
                                </div>
                                <ul className="space-y-3 mb-8">
                                    <li className="flex items-center">
                                        <i className="fas fa-check mr-3" style={{color: '#2E7D32'}}></i>
                                        <span className="text-gray-600">Basic farm assessment</span>
                                    </li>
                                    <li className="flex items-center">
                                        <i className="fas fa-check mr-3" style={{color: '#2E7D32'}}></i>
                                        <span className="text-gray-600">Soil testing</span>
                                    </li>
                                    <li className="flex items-center">
                                        <i className="fas fa-check mr-3" style={{color: '#2E7D32'}}></i>
                                        <span className="text-gray-600">Basic training sessions</span>
                                    </li>
                                    <li className="flex items-center">
                                        <i className="fas fa-check mr-3" style={{color: '#2E7D32'}}></i>
                                        <span className="text-gray-600">Market access support</span>
                                    </li>
                                </ul>
                                <button className="w-full rounded-lg px-10 py-5 font-semibold text-white transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1" 
                                        style={{backgroundColor: '#2E7D32', boxShadow: '0 4px 14px rgba(46, 125, 50, 0.39)'}}>
                                    Get Started
                                </button>
                            </div>

                            {/* Professional Package */}
                            <div className="bg-white rounded-3xl p-10 hover:shadow-2xl transition-all duration-300 relative" style={{boxShadow: '0 10px 40px rgba(0,0,0,0.08)', border: '1px solid #E5E7EB'}}>
                                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                                    <span className="px-4 py-2 rounded-full text-sm font-bold text-white" style={{backgroundColor: '#D4AF37', textShadow: '0 2px 10px rgba(212, 175, 55, 0.3)'}}>
                                        Most Popular
                                    </span>
                                </div>
                                <div className="text-center mb-8">
                                    <h3 className="text-2xl font-bold mb-4" style={{color: '#1F2937', fontFamily: 'Space Grotesk, sans-serif'}}>
                                        Professional Package
                                    </h3>
                                    <div className="text-4xl font-bold mb-2" style={{color: '#D4AF37', textShadow: '0 2px 10px rgba(212, 175, 55, 0.3)'}}>
                                        KSh 35,000
                                    </div>
                                    <p className="text-gray-600">per farm/month</p>
                                </div>
                                <ul className="space-y-3 mb-8">
                                    <li className="flex items-center">
                                        <i className="fas fa-check mr-3" style={{color: '#2E7D32'}}></i>
                                        <span className="text-gray-600">Everything in Starter</span>
                                    </li>
                                    <li className="flex items-center">
                                        <i className="fas fa-check mr-3" style={{color: '#2E7D32'}}></i>
                                        <span className="text-gray-600">Advanced technology tools</span>
                                    </li>
                                    <li className="flex items-center">
                                        <i className="fas fa-check mr-3" style={{color: '#2E7D32'}}></i>
                                        <span className="text-gray-600">Organic certification support</span>
                                    </li>
                                    <li className="flex items-center">
                                        <i className="fas fa-check mr-3" style={{color: '#2E7D32'}}></i>
                                        <span className="text-gray-600">Dedicated consultant</span>
                                    </li>
                                    <li className="flex items-center">
                                        <i className="fas fa-check mr-3" style={{color: '#2E7D32'}}></i>
                                        <span className="text-gray-600">Premium market access</span>
                                    </li>
                                </ul>
                                <button className="w-full rounded-lg px-10 py-5 font-semibold text-white transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1" 
                                        style={{backgroundColor: '#2E7D32', boxShadow: '0 4px 14px rgba(46, 125, 50, 0.39)'}}>
                                    Choose Professional
                                </button>
                            </div>

                            {/* Enterprise Package */}
                            <div className="bg-white rounded-3xl p-10 hover:shadow-2xl transition-all duration-300" style={{boxShadow: '0 10px 40px rgba(0,0,0,0.08)', border: '1px solid #E5E7EB'}}>
                                <div className="text-center mb-8">
                                    <h3 className="text-2xl font-bold mb-4" style={{color: '#1F2937', fontFamily: 'Space Grotesk, sans-serif'}}>
                                        Enterprise Package
                                    </h3>
                                    <div className="text-4xl font-bold mb-2" style={{color: '#2E7D32'}}>
                                        KSh 75,000
                                    </div>
                                    <p className="text-gray-600">per farm/month</p>
                                </div>
                                <ul className="space-y-3 mb-8">
                                    <li className="flex items-center">
                                        <i className="fas fa-check mr-3" style={{color: '#2E7D32'}}></i>
                                        <span className="text-gray-600">Everything in Professional</span>
                                    </li>
                                    <li className="flex items-center">
                                        <i className="fas fa-check mr-3" style={{color: '#2E7D32'}}></i>
                                        <span className="text-gray-600">Complete farm automation</span>
                                    </li>
                                    <li className="flex items-center">
                                        <i className="fas fa-check mr-3" style={{color: '#2E7D32'}}></i>
                                        <span className="text-gray-600">International certification</span>
                                    </li>
                                    <li className="flex items-center">
                                        <i className="fas fa-check mr-3" style={{color: '#2E7D32'}}></i>
                                        <span className="text-gray-600">Export market access</span>
                                    </li>
                                    <li className="flex items-center">
                                        <i className="fas fa-check mr-3" style={{color: '#2E7D32'}}></i>
                                        <span className="text-gray-600">24/7 support</span>
                                    </li>
                                </ul>
                                <button className="w-full rounded-lg px-10 py-5 font-semibold text-white transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1" 
                                        style={{backgroundColor: '#2E7D32', boxShadow: '0 4px 14px rgba(46, 125, 50, 0.39)'}}>
                                    Contact Sales
                                </button>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Call to Action */}
                <section className="py-24" style={{backgroundColor: '#1F2937'}}>
                    <div className="max-w-5xl mx-auto text-center px-4 sm:px-6 lg:px-8">
                        <h2 className="text-5xl md:text-6xl font-bold mb-6" style={{color: '#FAFAFA', fontFamily: 'Space Grotesk, sans-serif'}}>
                            Ready to Transform Your Farm?
                        </h2>
                        <p className="text-xl mb-8 leading-relaxed" style={{color: '#F9FAFB'}}>
                            Join thousands of farmers who have already transformed their agricultural practices with our comprehensive services. Start your journey towards sustainable and profitable farming today.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <a href="/contact" className="rounded-lg px-10 py-5 font-semibold text-lg transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1 inline-block text-white" style={{backgroundColor: '#2E7D32', boxShadow: '0 4px 14px rgba(46, 125, 50, 0.39)'}}>
                                Get Started Today
                            </a>
                            <a href="/products" className="bg-white rounded-lg px-10 py-5 font-semibold text-lg transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1 inline-block" style={{color: '#1F2937', boxShadow: '0 4px 14px rgba(255, 255, 255, 0.2)'}}>
                                View Our Products
                            </a>
                        </div>
                    </div>
                </section>

                {/* Footer */}
                <footer className="text-white py-16" style={{backgroundColor: '#1A1A1A'}}>
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        {/* Newsletter Section */}
                        <Newsletter />

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
                                    <li><a href="/" className="text-gray-400 hover:text-white transition-colors">Home</a></li>
                                    <li><a href="/about" className="text-gray-400 hover:text-white transition-colors">About Us</a></li>
                                    <li><a href="/services" className="text-gray-400 hover:text-white transition-colors">Services</a></li>
                                    <li><a href="/products" className="text-gray-400 hover:text-white transition-colors">Products</a></li>
                                    <li><a href="/contact" className="text-gray-400 hover:text-white transition-colors">Contact</a></li>
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
            </div>
        </>
    );
}