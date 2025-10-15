import { Head } from '@inertiajs/react';
import Newsletter from '../components/Newsletter';

export default function About() {
    return (
        <>
            <Head title="About Us - ZOC Farm">
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
                <nav className="navbar fixed w-full z-30 top-0 start-0 border-b border-gray-200 bg-white">
                    <div className="w-full px-2 py-3">
                        <div className="flex items-center justify-between w-full">
                            <div className="flex items-center pl-2">
                                <a href="/" className="flex items-center space-x-3">
                                    <div className="text-2xl font-bold" style={{color: '#3A4C2F', fontFamily: 'Space Grotesk, sans-serif'}}>
                                        ZOC Farm
                                    </div>
                                </a>
                            </div>

                            <div className="flex items-center space-x-10 pr-8">
                                <div className="hidden md:flex items-center">
                                    <ul className="flex space-x-10 font-medium">
                                        <li>
                                            <a href="/" className="text-gray-700 hover:opacity-80 transition-colors duration-200 text-lg">
                                                Home
                                            </a>
                                        </li>
                                        <li>
                                            <a href="/about" className="font-semibold hover:opacity-80 transition-colors duration-200 text-lg" style={{color: '#3A4C2F'}}>
                                                About
                                            </a>
                                        </li>
                                        <li>
                                            <a href="/services" className="text-gray-700 hover:opacity-80 transition-colors duration-200 text-lg">
                                                Services
                                            </a>
                                        </li>
                                        <li>
                                            <a href="/products" className="text-gray-700 hover:opacity-80 transition-colors duration-200 text-lg">
                                                Products
                                            </a>
                                        </li>
                                        <li>
                                            <a href="/contact" className="text-gray-700 hover:opacity-80 transition-colors duration-200 text-lg">
                                                Contact
                                            </a>
                                        </li>
                                    </ul>
                                </div>

                                <button className="relative p-2 transition-colors duration-200" style={{color: '#3A4C2F'}}>
                                    <i className="fas fa-shopping-cart text-xl"></i>
                                    <span className="absolute -top-1 -right-1 text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium" 
                                          style={{backgroundColor: '#F4C542', color: '#333333'}}>
                                        0
                                    </span>
                                </button>

                                <button type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200">
                                    <span className="sr-only">Open main menu</span>
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 17 14">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </nav>

                {/* Hero Section */}
                <section className="relative min-h-96 flex items-center justify-center pt-20" style={{
                    backgroundImage: `url('/images/aboutHero.jpg')`,
                    backgroundSize: '150%',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat'
                }}>
                    <div className="hero-overlay absolute inset-0" style={{backgroundColor: 'rgba(58, 76, 47, 0.85)'}}></div>
                    <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8">
                        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6" style={{fontFamily: 'Space Grotesk, sans-serif'}}>
                            About <span style={{color: '#F4C542'}}>ZOC Farm</span>
                        </h1>
                        <p className="text-xl text-gray-200 max-w-3xl mx-auto">
                            Learn about our mission, vision, and commitment to transforming agriculture through sustainable practices.
                        </p>
                    </div>
                </section>

                {/* Company Story */}
                <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
                    <div className="max-w-7xl mx-auto">
                        <div className="grid md:grid-cols-2 gap-16 items-center">
                            <div>
                                <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{color: '#3A4C2F', fontFamily: 'Space Grotesk, sans-serif'}}>
                                    Our Story
                                </h2>
                                <p className="text-xl text-gray-600 mb-6 leading-relaxed">
                                    Founded with a vision to revolutionize agriculture in Kenya, Zedjah Organic Crowd Farms Ltd emerged from the recognition that sustainable farming practices could transform not just the land, but entire communities.
                                </p>
                                <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                                    Starting in the fertile lands of Kirinyaga County, we began with a simple yet powerful idea: to create a transparent platform that unites farmers, investors, contractors, and consumers under one sustainable ecosystem.
                                </p>
                                <p className="text-lg text-gray-600 leading-relaxed">
                                    Today, we stand as a testament to what's possible when innovation meets tradition, and when community collaboration drives agricultural excellence.
                                </p>
                            </div>
                            <div className="rounded-2xl h-96 overflow-hidden shadow-lg">
                                <img 
                                    src="/images/companystoryimg.jpg" 
                                    alt="Company Story" 
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>
                    </div>
                </section>

                {/* Mission & Vision */}
                <section className="py-20 px-4 sm:px-6 lg:px-8" style={{backgroundColor: '#FDF8E3'}}>
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{color: '#3A4C2F', fontFamily: 'Space Grotesk, sans-serif'}}>
                                Our Mission & Vision
                            </h2>
                        </div>

                        <div className="grid md:grid-cols-2 gap-12">
                            <div className="bg-white rounded-2xl p-8 shadow-lg">
                                <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6" style={{backgroundColor: '#3A4C2F'}}>
                                    <i className="fas fa-bullseye text-2xl text-white"></i>
                                </div>
                                <h3 className="text-2xl font-bold mb-4 text-center" style={{color: '#3A4C2F', fontFamily: 'Space Grotesk, sans-serif'}}>
                                    Our Mission
                                </h3>
                                <p className="text-gray-600 leading-relaxed text-center">
                                    To champion regenerative farming practices that produce healthy food, protect the environment and uplift smallholder farmers through skills training, technical support and reliable market access. We manage every stage of the food system from sourcing inputs to delivering retail-ready products.
                                </p>
                            </div>

                            <div className="bg-white rounded-2xl p-8 shadow-lg">
                                <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6" style={{backgroundColor: '#7BB661'}}>
                                    <i className="fas fa-eye text-2xl text-white"></i>
                                </div>
                                <h3 className="text-2xl font-bold mb-4 text-center" style={{color: '#3A4C2F', fontFamily: 'Space Grotesk, sans-serif'}}>
                                    Our Vision
                                </h3>
                                <p className="text-gray-600 leading-relaxed text-center">
                                    To transform the agricultural value chain by uniting farmers, investors, contractors and consumers under a single transparent platform, ensuring quality, sustainability and fair margins at every link.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Values */}
                <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{color: '#3A4C2F', fontFamily: 'Space Grotesk, sans-serif'}}>
                                Our Core Values
                            </h2>
                            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                                The principles that guide everything we do
                            </p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-8">
                            <div className="text-center p-6">
                                <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6" style={{backgroundColor: '#F4C542'}}>
                                    <i className="fas fa-leaf text-3xl" style={{color: '#333333'}}></i>
                                </div>
                                <h3 className="text-xl font-bold mb-4" style={{color: '#3A4C2F', fontFamily: 'Space Grotesk, sans-serif'}}>
                                    Sustainability
                                </h3>
                                <p className="text-gray-600">
                                    We prioritize environmental stewardship in all our farming practices, ensuring the land remains fertile for future generations.
                                </p>
                            </div>

                            <div className="text-center p-6">
                                <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6" style={{backgroundColor: '#7BB661'}}>
                                    <i className="fas fa-handshake text-3xl text-white"></i>
                                </div>
                                <h3 className="text-xl font-bold mb-4" style={{color: '#3A4C2F', fontFamily: 'Space Grotesk, sans-serif'}}>
                                    Transparency
                                </h3>
                                <p className="text-gray-600">
                                    We maintain open and honest relationships with all stakeholders, providing full visibility into our processes and practices.
                                </p>
                            </div>

                            <div className="text-center p-6">
                                <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6" style={{backgroundColor: '#6B4E2E'}}>
                                    <i className="fas fa-users text-3xl text-white"></i>
                                </div>
                                <h3 className="text-xl font-bold mb-4" style={{color: '#3A4C2F', fontFamily: 'Space Grotesk, sans-serif'}}>
                                    Community
                                </h3>
                                <p className="text-gray-600">
                                    We believe in the power of community collaboration to drive positive change and shared prosperity.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Statistics */}
                <section className="py-20 px-4 sm:px-6 lg:px-8" style={{backgroundColor: '#3A4C2F'}}>
                    <div className="max-w-7xl mx-auto text-white">
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
                                <div className="text-5xl font-bold mb-4" style={{color: '#F4C542'}}>1,000+</div>
                                <h3 className="text-xl font-semibold mb-2">Farmers United</h3>
                                <p className="text-gray-300">Smallholder farmers empowered through our platform</p>
                            </div>
                            <div className="text-center">
                                <div className="text-5xl font-bold mb-4" style={{color: '#F4C542'}}>50+</div>
                                <h3 className="text-xl font-semibold mb-2">Investors Partnered</h3>
                                <p className="text-gray-300">Strategic investors supporting agricultural innovation</p>
                            </div>
                            <div className="text-center">
                                <div className="text-5xl font-bold mb-4" style={{color: '#F4C542'}}>25+</div>
                                <h3 className="text-xl font-semibold mb-2">Contractors Engaged</h3>
                                <p className="text-gray-300">Professional contractors ensuring quality standards</p>
                            </div>
                            <div className="text-center">
                                <div className="text-5xl font-bold mb-4" style={{color: '#F4C542'}}>5,000+</div>
                                <h3 className="text-xl font-semibold mb-2">Consumers Served</h3>
                                <p className="text-gray-300">Families enjoying fresh, organic produce</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Team Section */}
                <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{color: '#3A4C2F', fontFamily: 'Space Grotesk, sans-serif'}}>
                                Our Leadership Team
                            </h2>
                            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                                Meet the visionaries driving agricultural transformation
                            </p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-8">
                            <div className="text-center">
                                <div className="rounded-2xl h-64 overflow-hidden mb-6">
                                    <img 
                                        src="/images/zacharycto.jpg" 
                                        alt="CEO Photo" 
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <h3 className="text-xl font-bold mb-2" style={{color: '#3A4C2F', fontFamily: 'Space Grotesk, sans-serif'}}>
                                    Zachariah Mwangi
                                </h3>
                                <p className="text-gray-600 mb-2">Chief Executive Officer</p>
                                <p className="text-sm text-gray-500">
                                    20+ years in agricultural innovation and sustainable farming practices.
                                </p>
                            </div>

                            <div className="text-center">
                                <div className="bg-gray-200 rounded-2xl h-64 flex items-center justify-center mb-6">
                                    <span className="text-gray-500">CTO Photo</span>
                                </div>
                                <h3 className="text-xl font-bold mb-2" style={{color: '#3A4C2F', fontFamily: 'Space Grotesk, sans-serif'}}>
                                    Sarah Wanjiku
                                </h3>
                                <p className="text-gray-600 mb-2">Chief Technology Officer</p>
                                <p className="text-sm text-gray-500">
                                    Expert in agricultural technology and digital platform development.
                                </p>
                            </div>

                            <div className="text-center">
                                <div className="bg-gray-200 rounded-2xl h-64 flex items-center justify-center mb-6">
                                    <span className="text-gray-500">COO Photo</span>
                                </div>
                                <h3 className="text-xl font-bold mb-2" style={{color: '#3A4C2F', fontFamily: 'Space Grotesk, sans-serif'}}>
                                    Peter Kimani
                                </h3>
                                <p className="text-gray-600 mb-2">Chief Operations Officer</p>
                                <p className="text-sm text-gray-500">
                                    Operations specialist with focus on supply chain optimization.
                                </p>
                            </div>
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