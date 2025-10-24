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
                backgroundColor: '#FDF8E3',
                color: '#333333'
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
                    <div className="hero-overlay absolute inset-0" style={{backgroundColor: 'rgba(58, 76, 47, 0.85)'}}></div>
                    
                    {/* Content */}
                    <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8">
                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 animate-fade-in-up" style={{fontFamily: 'Space Grotesk, sans-serif'}}>
                            Inspiring the <br />
                            <span style={{color: '#F4C542'}}>Agricultural Value Chain</span>
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-4xl mx-auto leading-relaxed animate-fade-in-up" style={{animationDelay: '0.2s'}}>
                            Uniting farmers, investors, contractors and consumers under a single transparent platform. We specialize in organic food production from sourcing inputs to delivering retail-ready products.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up" style={{animationDelay: '0.4s'}}>
                            <a
                                href="/products"
                                className="px-8 py-4 rounded-full font-semibold text-lg transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-yellow-400/30 inline-block transform hover:-translate-y-1"
                                style={{backgroundColor: '#F4C542', color: '#333333'}}
                            >
                                Shop Now
                            </a>
                            <a
                                href="/contact"
                                className="px-8 py-4 rounded-full font-semibold text-lg transition-all duration-500 hover:scale-105 hover:bg-white hover:text-gray-800 hover:shadow-2xl hover:shadow-white/30 inline-block border-2 border-white text-white transform hover:-translate-y-1"
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

                {/* Company Introduction */}
                <section id="about" className="py-20 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{color: '#3A4C2F', fontFamily: 'Space Grotesk, sans-serif'}}>
                                Cultivating Excellence Since Day One
                            </h2>
                            <p className="text-xl text-gray-600 max-w-4xl mx-auto">
                                At Zedjah Organic Crowd Farms Ltd, we're more than just farmers –
                                we're innovators, community builders, and environmental stewards
                                committed to revolutionizing agriculture through sustainable
                                practices and cutting-edge technology.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-12 items-center">
                            <div>
                                <h3 className="text-2xl font-bold mb-4" style={{color: '#3A4C2F', fontFamily: 'Space Grotesk, sans-serif'}}>
                                    Our Mission
                                </h3>
                                <p className="text-gray-600 mb-6 leading-relaxed">
                                    To champion regenerative farming practices that produce healthy food, protect the environment and uplift smallholder farmers through skills training, technical support and reliable market access. We manage every stage of the food system from sourcing inputs to delivering retail-ready products.
                                </p>

                                <h3 className="text-2xl font-bold mb-4" style={{color: '#3A4C2F', fontFamily: 'Space Grotesk, sans-serif'}}>
                                    Our Vision
                                </h3>
                                <p className="text-gray-600 leading-relaxed">
                                    To transform the agricultural value chain by uniting farmers, investors, contractors and consumers under a single transparent platform, ensuring quality, sustainability and fair margins at every link.
                                </p>
                            </div>

                            <div className="bg-white rounded-2xl p-8 shadow-lg transition-transform hover:scale-105">
                                <div className="grid grid-cols-2 gap-6 text-center">
                                    <div>
                                        <div className="text-3xl font-bold mb-2" style={{color: '#F4C542'}}>
                                            1,000+
                                        </div>
                                        <div className="text-gray-600">Farmers United</div>
                                    </div>
                                    <div>
                                        <div className="text-3xl font-bold mb-2" style={{color: '#7BB661'}}>
                                            50+
                                        </div>
                                        <div className="text-gray-600">Investors Partnered</div>
                                    </div>
                                    <div>
                                        <div className="text-3xl font-bold mb-2" style={{color: '#6B4E2E'}}>25+</div>
                                        <div className="text-gray-600">Contractors Engaged</div>
                                    </div>
                                    <div>
                                        <div className="text-3xl font-bold mb-2" style={{color: '#3A4C2F'}}>
                                            5,000+
                                        </div>
                                        <div className="text-gray-600">Consumers Served</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Investment Focus Areas */}
                <section id="services" className="py-20 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{color: '#3A4C2F', fontFamily: 'Space Grotesk, sans-serif'}}>
                                Five Strategic Growth Opportunities
                            </h2>
                            <p className="text-xl text-gray-600 max-w-4xl mx-auto">
                                Each area strengthens our integrated value chain by guaranteeing transparent sourcing, efficient market access and environmental stewardship
                            </p>
                        </div>

                        <div className="grid md:grid-cols-1 lg:grid-cols-5 gap-8">
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

                        <div className="text-center mt-12">
                            <a
                                href="/services"
                                className="px-8 py-4 rounded-full font-semibold transition-transform hover:scale-105 inline-block text-white"
                                style={{backgroundColor: '#3A4C2F'}}
                            >
                                Explore Strategic Opportunities
                            </a>
                        </div>
                    </div>
                </section>

                {/* Impact Snapshot */}
                <section className="py-20 text-white" style={{backgroundColor: '#3A4C2F'}}>
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{fontFamily: 'Space Grotesk, sans-serif'}}>
                                Our Impact in Numbers
                            </h2>
                            <p className="text-xl text-gray-200">
                                Measurable results that speak to our commitment to excellence
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                            <div className="text-center">
                                <div className="text-6xl font-bold mb-4" style={{color: '#F4C542'}}>
                                    +40%
                                </div>
                                <h3 className="text-xl font-semibold mb-2">Yield Increase</h3>
                                <p className="text-gray-300">
                                    Average improvement in crop yields through our farming methods
                                </p>
                            </div>

                            <div className="text-center">
                                <div className="text-6xl font-bold mb-4" style={{color: '#F4C542'}}>
                                    +25%
                                </div>
                                <h3 className="text-xl font-semibold mb-2">Price Premium</h3>
                                <p className="text-gray-300">
                                    Higher market prices for organic certified products
                                </p>
                            </div>

                            <div className="text-center">
                                <div className="text-6xl font-bold mb-4" style={{color: '#F4C542'}}>85%</div>
                                <h3 className="text-xl font-semibold mb-2">Soil Health</h3>
                                <p className="text-gray-300">
                                    Improvement in soil quality and nutrient content
                                </p>
                            </div>

                            <div className="text-center">
                                <div className="text-6xl font-bold mb-4" style={{color: '#F4C542'}}>50%</div>
                                <h3 className="text-xl font-semibold mb-2">Water Savings</h3>
                                <p className="text-gray-300">
                                    Reduction in water usage through efficient irrigation
                                </p>
                            </div>
                        </div>

                        <div className="text-center mt-12">
                            <a
                                href="/about"
                                className="bg-white px-8 py-4 rounded-full font-semibold transition-transform hover:scale-105 inline-block"
                                style={{color: '#3A4C2F'}}
                            >
                                View Full Impact Report
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
                                    Zedjah Organic Crowd Farms Ltd - Transforming the agricultural value chain by uniting farmers, investors, contractors and consumers under a single transparent platform from Kirinyaga County.
                                </p>
                                <div className="flex space-x-4">
                                    <a href="#" className="text-gray-400 transition-colors" style={{'--hover-color': '#F4C542'} as React.CSSProperties}>
                                        <i className="fab fa-facebook-f text-xl"></i>
                                    </a>
                                    <a href="#" className="text-gray-400 transition-colors" style={{'--hover-color': '#F4C542'} as React.CSSProperties}>
                                        <i className="fab fa-twitter text-xl"></i>
                                    </a>
                                    <a href="#" className="text-gray-400 transition-colors" style={{'--hover-color': '#F4C542'} as React.CSSProperties}>
                                        <i className="fab fa-instagram text-xl"></i>
                                    </a>
                                    <a href="#" className="text-gray-400 transition-colors" style={{'--hover-color': '#F4C542'} as React.CSSProperties}>
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