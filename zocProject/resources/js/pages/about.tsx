import { Head } from '@inertiajs/react';
import Newsletter from '../components/Newsletter';
import Navigation from '../components/Navigation';

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
                backgroundColor: '#FAFAFA',
                color: '#1F2937'
            }}>
                {/* Header & Navigation */}
                <Navigation />

                {/* Hero Section */}
                <section className="relative min-h-96 flex items-center justify-center pt-20" style={{
                    backgroundImage: `url('/images/more_imgs/about_img.png')`,
                    backgroundSize: '150%',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat'
                }}>
                    <div className="hero-overlay absolute inset-0" style={{backgroundColor: 'rgba(31, 41, 55, 0.75)'}}></div>
                    <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8">
                        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6" style={{fontFamily: 'Space Grotesk, sans-serif'}}>
                            About <span style={{color: '#D4AF37', textShadow: '0 2px 10px rgba(212, 175, 55, 0.3)'}}>Zedjah Organic Crowd Farms</span>
                        </h1>
                        <p className="text-xl text-gray-200 max-w-3xl mx-auto">
                            Inspiring the agricultural value chain with organic food production and farm management from farm to table.
                        </p>
                    </div>
                </section>

                {/* Company Story */}
                <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
                    <div className="max-w-7xl mx-auto">
                        <div className="grid md:grid-cols-2 gap-16 items-center">
                            <div>
                                <h2 className="text-5xl md:text-6xl font-bold mb-6" style={{color: '#1F2937', fontFamily: 'Space Grotesk, sans-serif'}}>
                                    Our Story
                                </h2>
                                <p className="text-xl text-gray-600 mb-6 leading-relaxed">
                                    Zedjah Organic Crowd Farms is a farm management company and organic food producing entity founded in 2016, with a foundation history in early agriculture. We are a systemized regenerative farming company operating in the organic farming model.
                                </p>
                                <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                                    Starting from 020 Mutira, Kirinyaga County, Kenya, our journey has been guided by a commitment to safe and healthy foods for nutrition and community resilience in our agribusiness value chain.
                                </p>
                                <p className="text-lg text-gray-600 leading-relaxed">
                                    Today, we stand as a leader in sustainable agriculture, prioritizing agroecology and regenerative farming practices that benefit both people and the planet.
                                </p>
                            </div>
                            <div className="rounded-2xl h-96 overflow-hidden shadow-lg">
                                <img 
                                    src="/images/more_imgs/our_story.jpeg" 
                                    alt="Our Story" 
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>
                    </div>
                </section>

                {/* Mission & Vision */}
                <section className="py-24 px-4 sm:px-6 lg:px-8" style={{backgroundColor: '#F9FAFB'}}>
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-20">
                            <h2 className="text-5xl md:text-6xl font-bold mb-4" style={{color: '#1F2937', fontFamily: 'Space Grotesk, sans-serif'}}>
                                Our Mission & Vision
                            </h2>
                            <div className="w-24 h-1 mx-auto mb-6" style={{backgroundColor: '#D4AF37'}}></div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-12">
                            <div className="bg-white rounded-3xl p-10 hover:shadow-2xl transition-all duration-300" style={{boxShadow: '0 10px 40px rgba(0,0,0,0.08)', border: '1px solid #E5E7EB'}}>
                                <div className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-8" style={{backgroundColor: '#E8F5E9'}}>
                                    <i className="fas fa-bullseye text-3xl" style={{color: '#2E7D32'}}></i>
                                </div>
                                <h3 className="text-2xl font-bold mb-6 text-center" style={{color: '#1F2937', fontFamily: 'Space Grotesk, sans-serif'}}>
                                    Our Mission
                                </h3>
                                <p className="text-gray-600 leading-relaxed text-center">
                                    To serve as an agricultural organization with accountability, innovation, integrity and value for money, with social economic values at the heart of agroecology. We champion regenerative farming practices that produce healthy food, protect the environment and uplift communities through sustainable agribusiness.
                                </p>
                            </div>

                            <div className="bg-white rounded-3xl p-10 hover:shadow-2xl transition-all duration-300" style={{boxShadow: '0 10px 40px rgba(0,0,0,0.08)', border: '1px solid #E5E7EB'}}>
                                <div className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-8" style={{backgroundColor: '#FFF8E1'}}>
                                    <i className="fas fa-eye text-3xl" style={{color: '#F57F17'}}></i>
                                </div>
                                <h3 className="text-2xl font-bold mb-6 text-center" style={{color: '#1F2937', fontFamily: 'Space Grotesk, sans-serif'}}>
                                    Our Vision
                                </h3>
                                <p className="text-gray-600 leading-relaxed text-center">
                                    To be the leading farm management and organic food industry in sustainable agriculture, prioritizing agroecology for the world we need to create.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Values */}
                <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
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

                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
                            <div className="group text-center p-8 bg-white rounded-3xl hover:shadow-2xl transition-all duration-300" style={{boxShadow: '0 10px 40px rgba(0,0,0,0.06)', border: '1px solid #E5E7EB'}}>
                                <div className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300" style={{backgroundColor: '#E8F5E9'}}>
                                    <i className="fas fa-balance-scale text-3xl" style={{color: '#2E7D32'}}></i>
                                </div>
                                <h3 className="text-xl font-bold mb-4" style={{color: '#1F2937', fontFamily: 'Space Grotesk, sans-serif'}}>
                                    Accountability
                                </h3>
                                <p className="text-gray-600">
                                    Being transparent in every value chain through the engagement level.
                                </p>
                            </div>

                            <div className="group text-center p-8 bg-white rounded-3xl hover:shadow-2xl transition-all duration-300" style={{boxShadow: '0 10px 40px rgba(0,0,0,0.06)', border: '1px solid #E5E7EB'}}>
                                <div className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300" style={{backgroundColor: '#FFF8E1'}}>
                                    <i className="fas fa-lightbulb text-3xl" style={{color: '#F57F17'}}></i>
                                </div>
                                <h3 className="text-xl font-bold mb-4" style={{color: '#1F2937', fontFamily: 'Space Grotesk, sans-serif'}}>
                                    Innovation
                                </h3>
                                <p className="text-gray-600">
                                    To remain steadfast at intuitive solution thinking to remain sustainable.
                                </p>
                            </div>

                            <div className="group text-center p-8 bg-white rounded-3xl hover:shadow-2xl transition-all duration-300" style={{boxShadow: '0 10px 40px rgba(0,0,0,0.06)', border: '1px solid #E5E7EB'}}>
                                <div className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300" style={{backgroundColor: '#E3F2FD'}}>
                                    <i className="fas fa-handshake text-3xl" style={{color: '#1565C0'}}></i>
                                </div>
                                <h3 className="text-xl font-bold mb-4" style={{color: '#1F2937', fontFamily: 'Space Grotesk, sans-serif'}}>
                                    Integrity
                                </h3>
                                <p className="text-gray-600">
                                    To accommodate humanity and orders of human rights in the peace of freedom and democracy.
                                </p>
                            </div>

                            <div className="group text-center p-8 bg-white rounded-3xl hover:shadow-2xl transition-all duration-300" style={{boxShadow: '0 10px 40px rgba(0,0,0,0.06)', border: '1px solid #E5E7EB'}}>
                                <div className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300" style={{backgroundColor: '#FFF3E0'}}>
                                    <i className="fas fa-dollar-sign text-3xl" style={{color: '#E65100'}}></i>
                                </div>
                                <h3 className="text-xl font-bold mb-4" style={{color: '#1F2937', fontFamily: 'Space Grotesk, sans-serif'}}>
                                    Value For Money
                                </h3>
                                <p className="text-gray-600">
                                    To assure and credit return on investment (ROI) reducing and sustaining risks for prospective agribusiness.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Statistics */}
                <section className="py-24 px-4 sm:px-6 lg:px-8" style={{backgroundColor: '#1F2937'}}>
                    <div className="max-w-7xl mx-auto text-white">
                        <div className="text-center mb-20">
                            <h2 className="text-5xl md:text-6xl font-bold mb-4" style={{fontFamily: 'Space Grotesk, sans-serif'}}>
                                Our Impact in Numbers
                            </h2>
                            <div className="w-24 h-1 mx-auto mb-6" style={{backgroundColor: '#D4AF37'}}></div>
                            <p className="text-xl text-gray-200">
                                Measurable results that speak to our commitment to excellence
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
                            <div className="text-center p-6 rounded-2xl transition-transform duration-300 hover:-translate-y-2">
                                <div className="text-6xl font-bold mb-4" style={{color: '#D4AF37', textShadow: '0 2px 10px rgba(212, 175, 55, 0.3)'}}>1,000+</div>
                                <h3 className="text-xl font-semibold mb-2">Farmers United</h3>
                                <p className="text-gray-300">Smallholder farmers empowered through our platform</p>
                            </div>
                            <div className="text-center p-6 rounded-2xl transition-transform duration-300 hover:-translate-y-2">
                                <div className="text-6xl font-bold mb-4" style={{color: '#D4AF37', textShadow: '0 2px 10px rgba(212, 175, 55, 0.3)'}}>50+</div>
                                <h3 className="text-xl font-semibold mb-2">Investors Partnered</h3>
                                <p className="text-gray-300">Strategic investors supporting agricultural innovation</p>
                            </div>
                            <div className="text-center p-6 rounded-2xl transition-transform duration-300 hover:-translate-y-2">
                                <div className="text-6xl font-bold mb-4" style={{color: '#D4AF37', textShadow: '0 2px 10px rgba(212, 175, 55, 0.3)'}}>25+</div>
                                <h3 className="text-xl font-semibold mb-2">Contractors Engaged</h3>
                                <p className="text-gray-300">Professional contractors ensuring quality standards</p>
                            </div>
                            <div className="text-center p-6 rounded-2xl transition-transform duration-300 hover:-translate-y-2">
                                <div className="text-6xl font-bold mb-4" style={{color: '#D4AF37', textShadow: '0 2px 10px rgba(212, 175, 55, 0.3)'}}>5,000+</div>
                                <h3 className="text-xl font-semibold mb-2">Consumers Served</h3>
                                <p className="text-gray-300">Families enjoying fresh, organic produce</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Team Section */}
                <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-20">
                            <h2 className="text-5xl md:text-6xl font-bold mb-4" style={{color: '#1F2937', fontFamily: 'Space Grotesk, sans-serif'}}>
                                Our Leadership Team
                            </h2>
                            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                                Meet the visionaries driving agricultural transformation
                            </p>
                        </div>

                        <div className="grid md:grid-cols-1 lg:grid-cols-1 gap-8 max-w-md mx-auto">
                            <div className="text-center">
                                <div className="rounded-2xl h-80 overflow-hidden mb-6">
                                    <img 
                                        src="/images/zacharycto.jpg" 
                                        alt="Founder Photo" 
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <h3 className="text-2xl font-bold mb-2" style={{color: '#1F2937', fontFamily: 'Space Grotesk, sans-serif'}}>
                                    Zacharian Mwangi Muriuki
                                </h3>
                                <p className="text-gray-600 mb-4 text-lg">Founder & General Manager</p>
                                <p className="text-base text-gray-600 leading-relaxed">
                                    A young developing proxy businessman, humanitarian, innovator and agroecologist. He's passionate about safe and healthy foods for nutrition and community resilience in his agribusiness value chain.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Footer */}
                <footer className="text-white py-20" style={{backgroundColor: '#1A1A1A'}}>
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