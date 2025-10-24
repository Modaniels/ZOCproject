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
                backgroundColor: '#FDF8E3',
                color: '#333333'
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
                    <div className="hero-overlay absolute inset-0" style={{backgroundColor: 'rgba(58, 76, 47, 0.85)'}}></div>
                    <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8">
                        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6" style={{fontFamily: 'Space Grotesk, sans-serif'}}>
                            Our <span style={{color: '#F4C542'}}>Services</span>
                        </h1>
                        <p className="text-xl text-gray-200 max-w-3xl mx-auto">
                            Comprehensive agricultural solutions for sustainable farming and transparent value chains.
                        </p>
                    </div>
                </section>

                {/* Main Services Grid */}
                <section className="py-20 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{color: '#3A4C2F', fontFamily: 'Space Grotesk, sans-serif'}}>
                                Five Strategic Growth Opportunities
                            </h2>
                            <p className="text-xl text-gray-600 max-w-4xl mx-auto">
                                Each area strengthens our integrated value chain by guaranteeing transparent sourcing, efficient market access and environmental stewardship
                            </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 sm:gap-8 mb-16">
                            <div className="text-center p-8 rounded-2xl transition-transform hover:scale-105 border-2" 
                                 style={{backgroundColor: '#FDF8E3', borderColor: '#3A4C2F'}}>
                                <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6" 
                                     style={{backgroundColor: '#3A4C2F', color: 'white'}}>
                                    <i className="fas fa-leaf text-2xl"></i>
                                </div>
                                <h3 className="text-lg font-bold mb-4" style={{color: '#3A4C2F', fontFamily: 'Space Grotesk, sans-serif'}}>
                                    Organic Food Production
                                </h3>
                                <p className="text-gray-600 text-sm">
                                    Complete organic food production systems ensuring quality, sustainability and traceability.
                                </p>
                            </div>

                            <div className="text-center p-8 rounded-2xl transition-transform hover:scale-105 border-2" 
                                 style={{backgroundColor: '#FDF8E3', borderColor: '#F4C542'}}>
                                <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6" 
                                     style={{backgroundColor: '#F4C542', color: '#333333'}}>
                                    <i className="fas fa-tractor text-2xl"></i>
                                </div>
                                <h3 className="text-lg font-bold mb-4" style={{color: '#3A4C2F', fontFamily: 'Space Grotesk, sans-serif'}}>
                                    General Agriculture Development
                                </h3>
                                <p className="text-gray-600 text-sm">
                                    Modernizing farming practices through technology integration and cooperative development.
                                </p>
                            </div>

                            <div className="text-center p-8 rounded-2xl transition-transform hover:scale-105 border-2" 
                                 style={{backgroundColor: '#FDF8E3', borderColor: '#7BB661'}}>
                                <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6" 
                                     style={{backgroundColor: '#7BB661', color: 'white'}}>
                                    <i className="fas fa-carrot text-2xl"></i>
                                </div>
                                <h3 className="text-lg font-bold mb-4" style={{color: '#3A4C2F', fontFamily: 'Space Grotesk, sans-serif'}}>
                                    Vegetable Cultivation
                                </h3>
                                <p className="text-gray-600 text-sm">
                                    High-value vegetable production with greenhouse technology and direct restaurant supply.
                                </p>
                            </div>

                            <div className="text-center p-8 rounded-2xl transition-transform hover:scale-105 border-2" 
                                 style={{backgroundColor: '#FDF8E3', borderColor: '#6B4E2E'}}>
                                <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6" 
                                     style={{backgroundColor: '#6B4E2E', color: 'white'}}>
                                    <i className="fas fa-store text-2xl"></i>
                                </div>
                                <h3 className="text-lg font-bold mb-4" style={{color: '#3A4C2F', fontFamily: 'Space Grotesk, sans-serif'}}>
                                    Retail Distribution Networks
                                </h3>
                                <p className="text-gray-600 text-sm">
                                    Strategic partnerships connecting organic produce directly to consumers through digital marketplaces.
                                </p>
                            </div>

                            <div className="text-center p-8 rounded-2xl transition-transform hover:scale-105 border-2" 
                                 style={{backgroundColor: '#FDF8E3', borderColor: '#333333'}}>
                                <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6" 
                                     style={{backgroundColor: '#333333', color: 'white'}}>
                                    <i className="fas fa-truck text-2xl"></i>
                                </div>
                                <h3 className="text-lg font-bold mb-4" style={{color: '#3A4C2F', fontFamily: 'Space Grotesk, sans-serif'}}>
                                    Logistics Optimization
                                </h3>
                                <p className="text-gray-600 text-sm">
                                    Advanced supply chain solutions with cold storage and real-time tracking systems.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Detailed Services */}
                <section className="py-20 px-4 sm:px-6 lg:px-8" style={{backgroundColor: '#FDF8E3'}}>
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{color: '#3A4C2F', fontFamily: 'Space Grotesk, sans-serif'}}>
                                Comprehensive Agricultural Solutions
                            </h2>
                        </div>

                        <div className="space-y-16">
                            {/* Service 1 */}
                            <div className="grid md:grid-cols-2 gap-12 items-center">
                                <div>
                                    <h3 className="text-3xl font-bold mb-6" style={{color: '#3A4C2F', fontFamily: 'Space Grotesk, sans-serif'}}>
                                        Farm Development & Training
                                    </h3>
                                    <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                                        We provide comprehensive training programs for smallholder farmers, covering modern agricultural techniques, sustainable farming practices, and business management skills.
                                    </p>
                                    <ul className="space-y-3">
                                        <li className="flex items-center">
                                            <i className="fas fa-check-circle mr-3" style={{color: '#7BB661'}}></i>
                                            <span className="text-gray-600">Soil health assessment and improvement</span>
                                        </li>
                                        <li className="flex items-center">
                                            <i className="fas fa-check-circle mr-3" style={{color: '#7BB661'}}></i>
                                            <span className="text-gray-600">Organic certification support</span>
                                        </li>
                                        <li className="flex items-center">
                                            <i className="fas fa-check-circle mr-3" style={{color: '#7BB661'}}></i>
                                            <span className="text-gray-600">Financial literacy and business planning</span>
                                        </li>
                                    </ul>
                                </div>
                                <div className="bg-gray-200 rounded-2xl h-80 flex items-center justify-center shadow-lg">
                                    <span className="text-gray-500 text-lg">Farm Training Image</span>
                                </div>
                            </div>

                            {/* Service 2 */}
                            <div className="grid md:grid-cols-2 gap-12 items-center">
                                <div className="bg-gray-200 rounded-2xl h-80 flex items-center justify-center shadow-lg">
                                    <span className="text-gray-500 text-lg">Technology Solutions Image</span>
                                </div>
                                <div>
                                    <h3 className="text-3xl font-bold mb-6" style={{color: '#3A4C2F', fontFamily: 'Space Grotesk, sans-serif'}}>
                                        Technology & Innovation
                                    </h3>
                                    <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                                        Our technology platform connects all stakeholders in the agricultural value chain, providing real-time data, market insights, and transparent transactions.
                                    </p>
                                    <ul className="space-y-3">
                                        <li className="flex items-center">
                                            <i className="fas fa-check-circle mr-3" style={{color: '#7BB661'}}></i>
                                            <span className="text-gray-600">Digital marketplace for direct sales</span>
                                        </li>
                                        <li className="flex items-center">
                                            <i className="fas fa-check-circle mr-3" style={{color: '#7BB661'}}></i>
                                            <span className="text-gray-600">Real-time crop monitoring systems</span>
                                        </li>
                                        <li className="flex items-center">
                                            <i className="fas fa-check-circle mr-3" style={{color: '#7BB661'}}></i>
                                            <span className="text-gray-600">Supply chain transparency tools</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            {/* Service 3 */}
                            <div className="grid md:grid-cols-2 gap-12 items-center">
                                <div>
                                    <h3 className="text-3xl font-bold mb-6" style={{color: '#3A4C2F', fontFamily: 'Space Grotesk, sans-serif'}}>
                                        Quality Assurance & Certification
                                    </h3>
                                    <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                                        We ensure all products meet the highest quality standards through rigorous testing, certification processes, and continuous monitoring throughout the supply chain.
                                    </p>
                                    <ul className="space-y-3">
                                        <li className="flex items-center">
                                            <i className="fas fa-check-circle mr-3" style={{color: '#7BB661'}}></i>
                                            <span className="text-gray-600">Organic certification assistance</span>
                                        </li>
                                        <li className="flex items-center">
                                            <i className="fas fa-check-circle mr-3" style={{color: '#7BB661'}}></i>
                                            <span className="text-gray-600">Regular quality inspections</span>
                                        </li>
                                        <li className="flex items-center">
                                            <i className="fas fa-check-circle mr-3" style={{color: '#7BB661'}}></i>
                                            <span className="text-gray-600">Traceability documentation</span>
                                        </li>
                                    </ul>
                                </div>
                                <div className="bg-gray-200 rounded-2xl h-80 flex items-center justify-center shadow-lg">
                                    <span className="text-gray-500 text-lg">Quality Assurance Image</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Service Packages */}
                <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{color: '#3A4C2F', fontFamily: 'Space Grotesk, sans-serif'}}>
                                Service Packages
                            </h2>
                            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                                Choose the package that best fits your agricultural needs
                            </p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-8">
                            {/* Starter Package */}
                            <div className="bg-white border-2 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow" style={{borderColor: '#7BB661'}}>
                                <div className="text-center mb-8">
                                    <h3 className="text-2xl font-bold mb-4" style={{color: '#3A4C2F', fontFamily: 'Space Grotesk, sans-serif'}}>
                                        Starter Package
                                    </h3>
                                    <div className="text-4xl font-bold mb-2" style={{color: '#7BB661'}}>
                                        KSh 15,000
                                    </div>
                                    <p className="text-gray-600">per farm/month</p>
                                </div>
                                <ul className="space-y-3 mb-8">
                                    <li className="flex items-center">
                                        <i className="fas fa-check mr-3" style={{color: '#7BB661'}}></i>
                                        <span className="text-gray-600">Basic farm assessment</span>
                                    </li>
                                    <li className="flex items-center">
                                        <i className="fas fa-check mr-3" style={{color: '#7BB661'}}></i>
                                        <span className="text-gray-600">Soil testing</span>
                                    </li>
                                    <li className="flex items-center">
                                        <i className="fas fa-check mr-3" style={{color: '#7BB661'}}></i>
                                        <span className="text-gray-600">Basic training sessions</span>
                                    </li>
                                    <li className="flex items-center">
                                        <i className="fas fa-check mr-3" style={{color: '#7BB661'}}></i>
                                        <span className="text-gray-600">Market access support</span>
                                    </li>
                                </ul>
                                <button className="w-full py-3 px-6 rounded-full font-semibold text-white transition-transform hover:scale-105" 
                                        style={{backgroundColor: '#7BB661'}}>
                                    Get Started
                                </button>
                            </div>

                            {/* Professional Package */}
                            <div className="bg-white border-2 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow relative" style={{borderColor: '#F4C542'}}>
                                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                                    <span className="px-4 py-2 rounded-full text-sm font-bold text-white" style={{backgroundColor: '#F4C542'}}>
                                        Most Popular
                                    </span>
                                </div>
                                <div className="text-center mb-8">
                                    <h3 className="text-2xl font-bold mb-4" style={{color: '#3A4C2F', fontFamily: 'Space Grotesk, sans-serif'}}>
                                        Professional Package
                                    </h3>
                                    <div className="text-4xl font-bold mb-2" style={{color: '#F4C542'}}>
                                        KSh 35,000
                                    </div>
                                    <p className="text-gray-600">per farm/month</p>
                                </div>
                                <ul className="space-y-3 mb-8">
                                    <li className="flex items-center">
                                        <i className="fas fa-check mr-3" style={{color: '#F4C542'}}></i>
                                        <span className="text-gray-600">Everything in Starter</span>
                                    </li>
                                    <li className="flex items-center">
                                        <i className="fas fa-check mr-3" style={{color: '#F4C542'}}></i>
                                        <span className="text-gray-600">Advanced technology tools</span>
                                    </li>
                                    <li className="flex items-center">
                                        <i className="fas fa-check mr-3" style={{color: '#F4C542'}}></i>
                                        <span className="text-gray-600">Organic certification support</span>
                                    </li>
                                    <li className="flex items-center">
                                        <i className="fas fa-check mr-3" style={{color: '#F4C542'}}></i>
                                        <span className="text-gray-600">Dedicated consultant</span>
                                    </li>
                                    <li className="flex items-center">
                                        <i className="fas fa-check mr-3" style={{color: '#F4C542'}}></i>
                                        <span className="text-gray-600">Premium market access</span>
                                    </li>
                                </ul>
                                <button className="w-full py-3 px-6 rounded-full font-semibold text-white transition-transform hover:scale-105" 
                                        style={{backgroundColor: '#F4C542'}}>
                                    Choose Professional
                                </button>
                            </div>

                            {/* Enterprise Package */}
                            <div className="bg-white border-2 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow" style={{borderColor: '#3A4C2F'}}>
                                <div className="text-center mb-8">
                                    <h3 className="text-2xl font-bold mb-4" style={{color: '#3A4C2F', fontFamily: 'Space Grotesk, sans-serif'}}>
                                        Enterprise Package
                                    </h3>
                                    <div className="text-4xl font-bold mb-2" style={{color: '#3A4C2F'}}>
                                        KSh 75,000
                                    </div>
                                    <p className="text-gray-600">per farm/month</p>
                                </div>
                                <ul className="space-y-3 mb-8">
                                    <li className="flex items-center">
                                        <i className="fas fa-check mr-3" style={{color: '#3A4C2F'}}></i>
                                        <span className="text-gray-600">Everything in Professional</span>
                                    </li>
                                    <li className="flex items-center">
                                        <i className="fas fa-check mr-3" style={{color: '#3A4C2F'}}></i>
                                        <span className="text-gray-600">Complete farm automation</span>
                                    </li>
                                    <li className="flex items-center">
                                        <i className="fas fa-check mr-3" style={{color: '#3A4C2F'}}></i>
                                        <span className="text-gray-600">International certification</span>
                                    </li>
                                    <li className="flex items-center">
                                        <i className="fas fa-check mr-3" style={{color: '#3A4C2F'}}></i>
                                        <span className="text-gray-600">Export market access</span>
                                    </li>
                                    <li className="flex items-center">
                                        <i className="fas fa-check mr-3" style={{color: '#3A4C2F'}}></i>
                                        <span className="text-gray-600">24/7 support</span>
                                    </li>
                                </ul>
                                <button className="w-full py-3 px-6 rounded-full font-semibold text-white transition-transform hover:scale-105" 
                                        style={{backgroundColor: '#3A4C2F'}}>
                                    Contact Sales
                                </button>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Call to Action */}
                <section className="py-20" style={{backgroundColor: '#F4C542'}}>
                    <div className="max-w-5xl mx-auto text-center px-4 sm:px-6 lg:px-8">
                        <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{color: '#333333', fontFamily: 'Space Grotesk, sans-serif'}}>
                            Ready to Transform Your Farm?
                        </h2>
                        <p className="text-xl mb-8 leading-relaxed" style={{color: '#333333'}}>
                            Join thousands of farmers who have already transformed their agricultural practices with our comprehensive services. Start your journey towards sustainable and profitable farming today.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <a href="/contact" className="px-8 py-4 rounded-full font-semibold text-lg transition-transform hover:scale-105 inline-block text-white" style={{backgroundColor: '#3A4C2F'}}>
                                Get Started Today
                            </a>
                            <a href="/products" className="bg-white border-2 px-8 py-4 rounded-full font-semibold text-lg transition-transform hover:scale-105 inline-block" style={{color: '#3A4C2F', borderColor: '#3A4C2F'}}>
                                View Our Products
                            </a>
                        </div>
                    </div>
                </section>

                {/* Footer */}
                <footer className="text-white py-16" style={{backgroundColor: '#333333'}}>
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        {/* Newsletter Section */}
                        <Newsletter />

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            <div>
                                <div className="flex items-center space-x-3 mb-6">
                                    <div className="text-2xl font-bold" style={{color: '#F4C542', fontFamily: 'Space Grotesk, sans-serif'}}>
                                        ZOC Farm
                                    </div>
                                </div>
                                <p className="text-gray-400 mb-6 leading-relaxed">
                                    Transforming the agricultural value chain through sustainable practices and transparent partnerships.
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
                                        Kirinyaga, Kenya
                                    </li>
                                    <li className="text-gray-400">
                                        <i className="fas fa-phone mr-2"></i>
                                        +254 700 123 456
                                    </li>
                                    <li className="text-gray-400">
                                        <i className="fas fa-envelope mr-2"></i>
                                        info@zocfarms.co.ke
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