import { Head } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import Newsletter from '../components/Newsletter';
import Navigation from '../components/Navigation';

export default function ZOCFarm() {
    // Array of hero images
    const heroImages = [
        '/images/hero/WhatsApp Image 2025-10-24 at 11.36.01_1c0b2344.jpg',
        '/images/hero/WhatsApp Image 2025-10-24 at 11.36.01_27093596.jpg',
        '/images/hero/WhatsApp Image 2025-10-24 at 11.36.01_c5d20757.jpg',
        '/images/hero/WhatsApp Image 2025-10-24 at 11.36.02_017adedd.jpg',
        '/images/hero/WhatsApp Image 2025-10-24 at 11.36.02_7841d8ad.jpg',
        '/images/hero/WhatsApp Image 2025-10-24 at 11.36.02_9214911d.jpg',
        '/images/hero/WhatsApp Image 2025-10-24 at 11.36.02_c5428d84.jpg',
        '/images/hero/WhatsApp Image 2025-10-24 at 11.36.03_98660ba5.jpg',
        '/images/hero/WhatsApp Image 2025-10-24 at 11.36.03_d75f4050.jpg',
        '/images/hero/WhatsApp Image 2025-10-24 at 11.36.03_dc69d40a.jpg',
        '/images/hero/WhatsApp Image 2025-10-24 at 11.36.04_c802ffff.jpg'
    ];

    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    // Simple auto-slide effect - 5 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) => 
                prevIndex === heroImages.length - 1 ? 0 : prevIndex + 1
            );
        }, 5000); // 5 seconds

        return () => clearInterval(interval);
    }, [heroImages.length]);

    return (
        <>
            <Head title="ZOC Farm - Transforming Land, Growing Futures">
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
                <style>
                    {`
                        @keyframes fadeInUp {
                            from {
                                opacity: 0;
                                transform: translateY(30px);
                            }
                            to {
                                opacity: 1;
                                transform: translateY(0);
                            }
                        }
                        
                        .animate-fade-in-up {
                            animation: fadeInUp 1s ease-out forwards;
                            opacity: 0;
                        }
                        
                        @keyframes slideIn {
                            from {
                                transform: scale(1.1);
                                opacity: 0;
                            }
                            to {
                                transform: scale(1);
                                opacity: 1;
                            }
                        }
                        
                        .hero-image-slide {
                            animation: slideIn 1s ease-out;
                        }
                        
                        @keyframes pulse {
                            0%, 100% {
                                transform: scale(1);
                            }
                            50% {
                                transform: scale(1.05);
                            }
                        }
                        
                        .animate-pulse-subtle {
                            animation: pulse 3s ease-in-out infinite;
                        }
                        
                        @keyframes smoothZoom {
                            0% {
                                transform: scale(1);
                            }
                            100% {
                                transform: scale(1.08);
                            }
                        }
                    `}
                </style>
            </Head>
            <div className="min-h-screen bg-cream-white font-body text-charcoal" style={{
                fontFamily: 'Inter, sans-serif',
                backgroundColor: '#FAFAFA',
                color: '#1F2937'
            } as React.CSSProperties}>
                {/* Header & Navigation */}
                <Navigation />

                {/* Hero Section */}
                <section
                    id="home"
                    className="relative min-h-screen flex items-center justify-center overflow-hidden"
                >
                    {/* Background Images with Smooth Zoom Animation */}
                    <div className="absolute inset-0">
                        {heroImages.map((image, index) => (
                            <div
                                key={index}
                                className={`absolute inset-0 transition-opacity duration-[2000ms] ease-in-out ${
                                    index === currentImageIndex ? 'opacity-100' : 'opacity-0'
                                }`}
                                style={{
                                    backgroundImage: `url('${image}')`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                    backgroundRepeat: 'no-repeat',
                                    animation: index === currentImageIndex ? 'smoothZoom 5s cubic-bezier(0.25, 0.46, 0.45, 0.94)' : 'none'
                                }}
                            />
                        ))}
                    </div>
                    
                    {/* Overlay */}
                    <div className="hero-overlay absolute inset-0" style={{backgroundColor: 'rgba(31, 41, 55, 0.75)'}}></div>
                    
                    {/* Content */}
                    <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8">
                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 animate-fade-in-up" style={{fontFamily: 'Space Grotesk, sans-serif'}}>
                            Inspiring the <br />
                            <span style={{color: '#D4AF37', textShadow: '0 2px 10px rgba(212, 175, 55, 0.3)'}}>Agricultural Value Chain</span>
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-4xl mx-auto leading-relaxed animate-fade-in-up" style={{animationDelay: '0.2s'}}>
                            From farm to table, we deliver organic food production and farm management with transparency, sustainability, and community at heart.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up" style={{animationDelay: '0.4s'}}>
                            <a
                                href="/products"
                                className="px-10 py-4 rounded-lg font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl inline-block transform hover:-translate-y-1"
                                style={{backgroundColor: '#2E7D32', color: '#FFFFFF', boxShadow: '0 4px 14px 0 rgba(46, 125, 50, 0.39)'}}
                            >
                                Shop Now
                            </a>
                            <a
                                href="/contact"
                                className="px-10 py-4 rounded-lg font-semibold text-lg transition-all duration-300 hover:scale-105 hover:bg-white hover:shadow-2xl inline-block border-2 border-white text-white transform hover:-translate-y-1 hover:text-gray-800"
                            >
                                Partner With Us
                            </a>
                        </div>
                    </div>

                    {/* Scroll indicator */}
                    <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
                        <div className="animate-bounce">
                            <i className="fas fa-chevron-down text-white text-2xl"></i>
                        </div>
                    </div>
                </section>

                {/* What We Do */}
                {/* What We Do */}
                <section id="about" className="py-24 px-4 sm:px-6 lg:px-8" style={{backgroundColor: '#FFFFFF'}}>
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-20">
                            <h2 className="text-5xl md:text-6xl font-bold mb-4" style={{color: '#1F2937', fontFamily: 'Space Grotesk, sans-serif'}}>
                                What We Do
                            </h2>
                            <div className="w-24 h-1 mx-auto" style={{backgroundColor: '#D4AF37'}}></div>
                        </div>

                        <div className="grid md:grid-cols-3 gap-10">
                            {/* Farm Management Card */}
                            <div className="group bg-white p-10 rounded-3xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2" style={{boxShadow: '0 10px 40px rgba(0,0,0,0.08)', border: '1px solid #F3F4F6'}}>
                                <div className="w-20 h-20 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300" style={{backgroundColor: '#E8F5E9'}}>
                                    <i className="fas fa-seedling text-3xl" style={{color: '#2E7D32'}}></i>
                                </div>
                                <h3 className="text-2xl font-bold mb-5" style={{color: '#1F2937', fontFamily: 'Space Grotesk, sans-serif'}}>
                                    Farm Management
                                </h3>
                                <p className="text-gray-600 leading-relaxed">
                                    Comprehensive farm management services implementing regenerative practices and agroecology principles for sustainable agriculture.
                                </p>
                            </div>

                            {/* Organic Food Production Card */}
                            <div className="group bg-white p-10 rounded-3xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2" style={{boxShadow: '0 10px 40px rgba(0,0,0,0.08)', border: '1px solid #F3F4F6'}}>
                                <div className="w-20 h-20 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300" style={{backgroundColor: '#FFF8E1'}}>
                                    <i className="fas fa-leaf text-3xl" style={{color: '#F57F17'}}></i>
                                </div>
                                <h3 className="text-2xl font-bold mb-5" style={{color: '#1F2937', fontFamily: 'Space Grotesk, sans-serif'}}>
                                    Organic Food Production
                                </h3>
                                <p className="text-gray-600 leading-relaxed">
                                    Complete organic food production from sourcing quality inputs to delivering retail-ready products with full traceability.
                                </p>
                            </div>

                            {/* Training & Consulting Card */}
                            <div className="group bg-white p-10 rounded-3xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2" style={{boxShadow: '0 10px 40px rgba(0,0,0,0.08)', border: '1px solid #F3F4F6'}}>
                                <div className="w-20 h-20 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300" style={{backgroundColor: '#E3F2FD'}}>
                                    <i className="fas fa-users text-3xl" style={{color: '#1565C0'}}></i>
                                </div>
                                <h3 className="text-2xl font-bold mb-5" style={{color: '#1F2937', fontFamily: 'Space Grotesk, sans-serif'}}>
                                    Training & Consulting
                                </h3>
                                <p className="text-gray-600 leading-relaxed">
                                    Expert guidance on sustainable farming practices, helping communities build resilience through safe and healthy food production.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Our Core Values */}
                <section className="py-24 px-4 sm:px-6 lg:px-8" style={{backgroundColor: '#F9FAFB'}}>
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-20">
                            <h2 className="text-5xl md:text-6xl font-bold mb-4" style={{color: '#1F2937', fontFamily: 'Space Grotesk, sans-serif'}}>
                                Our Core Values
                            </h2>
                            <div className="w-24 h-1 mx-auto mb-6" style={{backgroundColor: '#D4AF37'}}></div>
                            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                                The principles that guide everything we do
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
                            {/* Sustainability Card */}
                            <div className="group bg-white p-8 rounded-3xl hover:shadow-2xl transition-all duration-300" style={{boxShadow: '0 10px 40px rgba(0,0,0,0.06)', border: '1px solid #E5E7EB'}}>
                                <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300" style={{backgroundColor: '#E8F5E9'}}>
                                    <i className="fas fa-leaf text-2xl" style={{color: '#2E7D32'}}></i>
                                </div>
                                <h3 className="text-xl font-bold mb-4 text-center" style={{color: '#1F2937', fontFamily: 'Space Grotesk, sans-serif'}}>
                                    Accountability
                                </h3>
                                <p className="text-gray-600 text-sm leading-relaxed">
                                    Transparent in every value chain through the engagement level.
                                </p>
                            </div>

                            {/* Innovation Card */}
                            <div className="group bg-white p-8 rounded-3xl hover:shadow-2xl transition-all duration-300" style={{boxShadow: '0 10px 40px rgba(0,0,0,0.06)', border: '1px solid #E5E7EB'}}>
                                <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300" style={{backgroundColor: '#FFF8E1'}}>
                                    <i className="fas fa-lightbulb text-2xl" style={{color: '#F57F17'}}></i>
                                </div>
                                <h3 className="text-xl font-bold mb-4 text-center" style={{color: '#1F2937', fontFamily: 'Space Grotesk, sans-serif'}}>
                                    Innovation
                                </h3>
                                <p className="text-gray-600 text-sm leading-relaxed">
                                    Steadfast at intuitive solution thinking to remain sustainable.
                                </p>
                            </div>

                            {/* Community Card */}
                            <div className="group bg-white p-8 rounded-3xl hover:shadow-2xl transition-all duration-300" style={{boxShadow: '0 10px 40px rgba(0,0,0,0.06)', border: '1px solid #E5E7EB'}}>
                                <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300" style={{backgroundColor: '#E3F2FD'}}>
                                    <i className="fas fa-handshake text-2xl" style={{color: '#1565C0'}}></i>
                                </div>
                                <h3 className="text-xl font-bold mb-4 text-center" style={{color: '#1F2937', fontFamily: 'Space Grotesk, sans-serif'}}>
                                    Integrity
                                </h3>
                                <p className="text-gray-600 text-sm leading-relaxed">
                                    Accommodating humanity and human rights in peace, freedom and democracy.
                                </p>
                            </div>

                            {/* Quality Card */}
                            <div className="group bg-white p-8 rounded-3xl hover:shadow-2xl transition-all duration-300" style={{boxShadow: '0 10px 40px rgba(0,0,0,0.06)', border: '1px solid #E5E7EB'}}>
                                <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300" style={{backgroundColor: '#FFF3E0'}}>
                                    <i className="fas fa-dollar-sign text-2xl" style={{color: '#E65100'}}></i>
                                </div>
                                <h3 className="text-xl font-bold mb-4 text-center" style={{color: '#1F2937', fontFamily: 'Space Grotesk, sans-serif'}}>
                                    Value For Money
                                </h3>
                                <p className="text-gray-600 text-sm leading-relaxed">
                                    Assuring ROI, reducing and sustaining risks for prospective agribusiness.
                                </p>
                            </div>
                        </div>

                        {/* Our Commitment */}
                        <div className="max-w-4xl mx-auto text-center">
                            <div className="bg-white p-12 rounded-3xl" style={{boxShadow: '0 20px 60px rgba(0,0,0,0.1)', border: '1px solid #E5E7EB'}}>
                                <div className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-8" style={{backgroundColor: '#E8F5E9'}}>
                                    <i className="fas fa-bullseye text-3xl" style={{color: '#2E7D32'}}></i>
                                </div>
                                <h3 className="text-3xl font-bold mb-6" style={{color: '#1F2937', fontFamily: 'Space Grotesk, sans-serif'}}>
                                    Our Commitment
                                </h3>
                                <p className="text-lg text-gray-600 leading-relaxed">
                                    To be the leading farm management and organic food industry in sustainable agriculture, prioritizing agroecology for the world we need to create.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Products Showcase */}
                <section id="products" className="py-24 px-4 sm:px-6 lg:px-8" style={{backgroundColor: '#FFFFFF'}}>
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-16">
                            <h2 className="text-5xl md:text-6xl font-bold mb-4" style={{color: '#1F2937', fontFamily: 'Space Grotesk, sans-serif'}}>
                                Our Store
                            </h2>
                            <div className="w-24 h-1 mx-auto mb-6" style={{backgroundColor: '#D4AF37'}}></div>
                            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                                Everything you need for modern sustainable farming—from organic food products and farm inputs to tools, machinery, and innovative farming technology
                            </p>
                        </div>

                        <div className="text-center">
                            <a
                                href="/products"
                                className="inline-block px-10 py-5 rounded-lg font-semibold transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1 text-white"
                                style={{
                                    backgroundColor: '#2E7D32',
                                    boxShadow: '0 4px 14px rgba(46, 125, 50, 0.39)'
                                }}
                            >
                                Explore Our Store
                            </a>
                        </div>
                    </div>
                </section>

                {/* Impact Snapshot */}
                <section className="py-24 px-4 sm:px-6 lg:px-8 text-white" style={{backgroundColor: '#1F2937'}}>
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-20">
                            <h2 className="text-5xl md:text-6xl font-bold mb-4" style={{fontFamily: 'Space Grotesk, sans-serif'}}>
                                Our Impact in Numbers
                            </h2>
                            <div className="w-24 h-1 mx-auto mb-6" style={{backgroundColor: '#D4AF37'}}></div>
                            <p className="text-xl text-gray-300">
                                Measurable results that speak to our commitment to excellence
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
                            <div className="text-center p-6 rounded-2xl transition-transform duration-300 hover:-translate-y-2">
                                <div className="text-6xl font-bold mb-4" style={{color: '#D4AF37', textShadow: '0 2px 10px rgba(212, 175, 55, 0.3)'}}>
                                    +40%
                                </div>
                                <h3 className="text-xl font-semibold mb-2">Yield Increase</h3>
                                <p className="text-gray-300">
                                    Average improvement in crop yields through our farming methods
                                </p>
                            </div>

                            <div className="text-center p-6 rounded-2xl transition-transform duration-300 hover:-translate-y-2">
                                <div className="text-6xl font-bold mb-4" style={{color: '#D4AF37', textShadow: '0 2px 10px rgba(212, 175, 55, 0.3)'}}>
                                    +25%
                                </div>
                                <h3 className="text-xl font-semibold mb-2">Price Premium</h3>
                                <p className="text-gray-300">
                                    Higher market prices for organic certified products
                                </p>
                            </div>

                            <div className="text-center p-6 rounded-2xl transition-transform duration-300 hover:-translate-y-2">
                                <div className="text-6xl font-bold mb-4" style={{color: '#D4AF37', textShadow: '0 2px 10px rgba(212, 175, 55, 0.3)'}}>85%</div>
                                <h3 className="text-xl font-semibold mb-2">Soil Health</h3>
                                <p className="text-gray-300">
                                    Improvement in soil quality and nutrient content
                                </p>
                            </div>

                            <div className="text-center p-6 rounded-2xl transition-transform duration-300 hover:-translate-y-2">
                                <div className="text-6xl font-bold mb-4" style={{color: '#D4AF37', textShadow: '0 2px 10px rgba(212, 175, 55, 0.3)'}}>50%</div>
                                <h3 className="text-xl font-semibold mb-2">Water Savings</h3>
                                <p className="text-gray-300">
                                    Reduction in water usage through efficient irrigation
                                </p>
                            </div>
                        </div>

                        <div className="text-center mt-16">
                            <a
                                href="/about"
                                className="inline-block bg-white px-10 py-5 rounded-lg font-semibold transition-all duration-300 transform hover:-translate-y-1 hover:shadow-2xl"
                                style={{color: '#1F2937', boxShadow: '0 4px 14px rgba(255, 255, 255, 0.2)'}}
                            >
                                View Full Impact Report
                            </a>
                        </div>
                    </div>
                </section>

                {/* Footer */}
                <footer className="text-white py-20" style={{backgroundColor: '#1A1A1A'}}>
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        {/* Newsletter Section */}
                        <Newsletter />

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
                            <div>
                                <div className="flex items-center space-x-3 mb-6">
                                    <img 
                                        src="/images/logo.png" 
                                        alt="ZOC Farm Logo" 
                                        className="h-12 w-auto"
                                    />
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
                                    <li>
                                        <a href="#about" className="text-gray-400 hover:text-white transition-colors">
                                            About Us
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#services" className="text-gray-400 hover:text-white transition-colors">
                                            Services
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#products" className="text-gray-400 hover:text-white transition-colors">
                                            Products
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#contact" className="text-gray-400 hover:text-white transition-colors">
                                            Contact
                                        </a>
                                    </li>
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