import { Head } from '@inertiajs/react';
import Newsletter from '../components/Newsletter';
import Navigation from '../components/Navigation';

export default function Contact() {
    return (
        <>
            <Head title="Contact Us - ZOC Farm">
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
                    background: `linear-gradient(rgba(31, 41, 55, 0.75), rgba(31, 41, 55, 0.75)), linear-gradient(to right, #2E7D32, #7BB661)`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                }}>
                    <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8">
                        <h1 className="text-5xl md:text-6xl font-bold text-white mb-6" style={{fontFamily: 'Space Grotesk, sans-serif'}}>
                            Contact <span style={{color: '#D4AF37', textShadow: '0 2px 10px rgba(212, 175, 55, 0.3)'}}>Us</span>
                        </h1>
                        <p className="text-xl text-gray-200 max-w-3xl mx-auto">
                            Get in touch with us. From farm to table, we're here to inspire the agricultural value chain together.
                        </p>
                    </div>
                </section>

                {/* Contact Form & Information */}
                <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
                    <div className="max-w-7xl mx-auto">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                            {/* Contact Form */}
                            <div>
                                <h2 className="text-5xl md:text-6xl font-bold mb-4" style={{color: '#1F2937', fontFamily: 'Space Grotesk, sans-serif'}}>
                                    Send us a Message
                                </h2>
                                <div className="w-24 h-1 mb-8" style={{backgroundColor: '#D4AF37'}}></div>
                                <form className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                                                First Name *
                                            </label>
                                            <input
                                                type="text"
                                                id="firstName"
                                                name="firstName"
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2"
                                                style={{}}  
                                                onFocus={(e) => e.currentTarget.style.boxShadow = '0 0 0 2px rgba(46, 125, 50, 0.5)'}
                                                onBlur={(e) => e.currentTarget.style.boxShadow = ''}
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
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2"
                                                style={{}}  
                                                onFocus={(e) => e.currentTarget.style.boxShadow = '0 0 0 2px rgba(46, 125, 50, 0.5)'}
                                                onBlur={(e) => e.currentTarget.style.boxShadow = ''}
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                            Email Address *
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2"
                                            style={{}}  
                                            onFocus={(e) => e.currentTarget.style.boxShadow = '0 0 0 2px rgba(46, 125, 50, 0.5)'}
                                            onBlur={(e) => e.currentTarget.style.boxShadow = ''}
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                                            Phone Number
                                        </label>
                                        <input
                                            type="tel"
                                            id="phone"
                                            name="phone"
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2"
                                            style={{}}  
                                            onFocus={(e) => e.currentTarget.style.boxShadow = '0 0 0 2px rgba(46, 125, 50, 0.5)'}
                                            onBlur={(e) => e.currentTarget.style.boxShadow = ''}
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                                            Subject *
                                        </label>
                                        <select
                                            id="subject"
                                            name="subject"
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2"
                                            style={{}}  
                                            onFocus={(e) => e.currentTarget.style.boxShadow = '0 0 0 2px rgba(46, 125, 50, 0.5)'}
                                            onBlur={(e) => e.currentTarget.style.boxShadow = ''}
                                            required
                                        >
                                            <option value="">Select a subject</option>
                                            <option value="general">General Inquiry</option>
                                            <option value="products">Product Information</option>
                                            <option value="services">Service Information</option>
                                            <option value="partnership">Partnership Opportunity</option>
                                            <option value="support">Customer Support</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                                            Message *
                                        </label>
                                        <textarea
                                            id="message"
                                            name="message"
                                            rows={6}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2"
                                            style={{}}  
                                            onFocus={(e) => e.currentTarget.style.boxShadow = '0 0 0 2px rgba(46, 125, 50, 0.5)'}
                                            onBlur={(e) => e.currentTarget.style.boxShadow = ''}
                                            placeholder="Tell us more about your inquiry..."
                                            required
                                        ></textarea>
                                    </div>
                                    <button
                                        type="submit"
                                        className="w-full rounded-lg px-10 py-5 font-semibold text-lg transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1 text-white"
                                        style={{backgroundColor: '#2E7D32', boxShadow: '0 4px 14px rgba(46, 125, 50, 0.39)'}}
                                    >
                                        Send Message
                                    </button>
                                </form>
                            </div>
                            
                            {/* Contact Information */}
                            <div>
                                <h2 className="text-5xl md:text-6xl font-bold mb-4" style={{color: '#1F2937', fontFamily: 'Space Grotesk, sans-serif'}}>
                                    Get in Touch
                                </h2>
                                <div className="w-24 h-1 mb-8" style={{backgroundColor: '#D4AF37'}}></div>
                                <div className="space-y-8">
                                    <div className="flex items-start space-x-4">
                                        <div className="w-20 h-20 rounded-2xl flex items-center justify-center flex-shrink-0" 
                                             style={{backgroundColor: '#E8F5E9'}}>
                                            <i className="fas fa-map-marker-alt text-3xl" style={{color: '#2E7D32'}}></i>
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-semibold mb-2" style={{color: '#1F2937'}}>Our Location</h3>
                                            <p className="text-gray-600">
                                                020 Mutira<br />
                                                Kirinyaga County, Kenya<br />
                                                East Africa
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-start space-x-4">
                                        <div className="w-20 h-20 rounded-2xl flex items-center justify-center flex-shrink-0" 
                                             style={{backgroundColor: '#FFF8E1'}}>
                                            <i className="fas fa-phone text-3xl" style={{color: '#F57F17'}}></i>
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-semibold mb-2" style={{color: '#1F2937'}}>Phone Numbers</h3>
                                            <p className="text-gray-600">
                                                +254-790-344-724<br />
                                                +254-741-122-375<br />
                                                +254-754-919-395
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-start space-x-4">
                                        <div className="w-20 h-20 rounded-2xl flex items-center justify-center flex-shrink-0" 
                                             style={{backgroundColor: '#E3F2FD'}}>
                                            <i className="fas fa-envelope text-3xl" style={{color: '#1565C0'}}></i>
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-semibold mb-2" style={{color: '#1F2937'}}>Email Address</h3>
                                            <p className="text-gray-600">
                                                zedjahorganiccrowdfarms@gmail.com
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-start space-x-4">
                                        <div className="w-20 h-20 rounded-2xl flex items-center justify-center flex-shrink-0" 
                                             style={{backgroundColor: '#FFF3E0'}}>
                                            <i className="fas fa-clock text-3xl" style={{color: '#E65100'}}></i>
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-semibold mb-2" style={{color: '#1F2937'}}>Business Hours</h3>
                                            <p className="text-gray-600">
                                                Monday - Friday: 8:00 AM - 6:00 PM<br />
                                                Saturday: 9:00 AM - 4:00 PM<br />
                                                Sunday: Closed
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Social Media */}
                                <div className="mt-12">
                                    <h3 className="text-xl font-bold mb-6" style={{color: '#1F2937', fontFamily: 'Space Grotesk, sans-serif'}}>
                                        Follow Us
                                    </h3>
                                    <div className="flex space-x-4">
                                        <a href="#" className="w-12 h-12 rounded-full flex items-center justify-center transition-transform hover:scale-110" 
                                           style={{backgroundColor: '#3B5998', color: 'white'}}>
                                            <i className="fab fa-facebook-f text-lg"></i>
                                        </a>
                                        <a href="#" className="w-12 h-12 rounded-full flex items-center justify-center transition-transform hover:scale-110" 
                                           style={{backgroundColor: '#1DA1F2', color: 'white'}}>
                                            <i className="fab fa-twitter text-lg"></i>
                                        </a>
                                        <a href="#" className="w-12 h-12 rounded-full flex items-center justify-center transition-transform hover:scale-110" 
                                           style={{backgroundColor: '#E4405F', color: 'white'}}>
                                            <i className="fab fa-instagram text-lg"></i>
                                        </a>
                                        <a href="#" className="w-12 h-12 rounded-full flex items-center justify-center transition-transform hover:scale-110" 
                                           style={{backgroundColor: '#0077B5', color: 'white'}}>
                                            <i className="fab fa-linkedin-in text-lg"></i>
                                        </a>
                                        <a href="#" className="w-12 h-12 rounded-full flex items-center justify-center transition-transform hover:scale-110" 
                                           style={{backgroundColor: '#25D366', color: 'white'}}>
                                            <i className="fab fa-whatsapp text-lg"></i>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Map Section */}
                <section className="py-24" style={{backgroundColor: '#F9FAFB'}}>
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-20">
                            <h2 className="text-5xl md:text-6xl font-bold mb-4" style={{color: '#1F2937', fontFamily: 'Space Grotesk, sans-serif'}}>
                                Find Us on the Map
                            </h2>
                            <div className="w-24 h-1 mx-auto mb-6" style={{backgroundColor: '#D4AF37'}}></div>
                            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                                Visit our farm in Kirinyaga County to see our sustainable farming practices in action.
                            </p>
                        </div>
                        <div className="bg-gray-200 rounded-2xl h-96 flex items-center justify-center shadow-lg">
                            <div className="text-center">
                                <i className="fas fa-map-marked-alt text-6xl text-gray-400 mb-4"></i>
                                <p className="text-gray-500 text-lg">Interactive Map Coming Soon</p>
                                <p className="text-gray-400 text-sm">Kirinyaga County, Kenya</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* FAQ Section */}
                <section className="py-24 bg-white">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-20">
                            <h2 className="text-5xl md:text-6xl font-bold mb-4" style={{color: '#1F2937', fontFamily: 'Space Grotesk, sans-serif'}}>
                                Frequently Asked Questions
                            </h2>
                            <div className="w-24 h-1 mx-auto mb-6" style={{backgroundColor: '#D4AF37'}}></div>
                            <p className="text-xl text-gray-600">
                                Quick answers to common questions about our products and services.
                            </p>
                        </div>

                        <div className="space-y-6">
                            <div className="rounded-3xl p-10 hover:shadow-2xl transition-all duration-300" style={{backgroundColor: 'white', boxShadow: '0 10px 40px rgba(0,0,0,0.08)', border: '1px solid #E5E7EB'}}>
                                <h3 className="text-lg font-bold mb-3" style={{color: '#1F2937'}}>
                                    What makes your products organic?
                                </h3>
                                <p className="text-gray-600">
                                    Our products are certified organic, meaning they're grown without synthetic pesticides, herbicides, or fertilizers. We use natural farming methods that promote soil health and environmental sustainability.
                                </p>
                            </div>

                            <div className="rounded-3xl p-10 hover:shadow-2xl transition-all duration-300" style={{backgroundColor: 'white', boxShadow: '0 10px 40px rgba(0,0,0,0.08)', border: '1px solid #E5E7EB'}}>
                                <h3 className="text-lg font-bold mb-3" style={{color: '#1F2937'}}>
                                    Do you offer delivery services?
                                </h3>
                                <p className="text-gray-600">
                                    Yes, we offer farm-fresh delivery services throughout Kenya. Products are harvested fresh and delivered directly to your doorstep to maintain quality and freshness.
                                </p>
                            </div>

                            <div className="rounded-3xl p-10 hover:shadow-2xl transition-all duration-300" style={{backgroundColor: 'white', boxShadow: '0 10px 40px rgba(0,0,0,0.08)', border: '1px solid #E5E7EB'}}>
                                <h3 className="text-lg font-bold mb-3" style={{color: '#1F2937'}}>
                                    How can I become a partner farmer?
                                </h3>
                                <p className="text-gray-600">
                                    We welcome new farmers to join our platform. Contact us through the form above or call our partnership team to learn about our training programs, certification support, and market access opportunities.
                                </p>
                            </div>

                            <div className="rounded-3xl p-10 hover:shadow-2xl transition-all duration-300" style={{backgroundColor: 'white', boxShadow: '0 10px 40px rgba(0,0,0,0.08)', border: '1px solid #E5E7EB'}}>
                                <h3 className="text-lg font-bold mb-3" style={{color: '#1F2937'}}>
                                    What payment methods do you accept?
                                </h3>
                                <p className="text-gray-600">
                                    We accept various payment methods including mobile money (M-Pesa, Airtel Money), bank transfers, and cash on delivery for local orders.
                                </p>
                            </div>

                            <div className="rounded-3xl p-10 hover:shadow-2xl transition-all duration-300" style={{backgroundColor: 'white', boxShadow: '0 10px 40px rgba(0,0,0,0.08)', border: '1px solid #E5E7EB'}}>
                                <h3 className="text-lg font-bold mb-3" style={{color: '#1F2937'}}>
                                    Can I visit your farm?
                                </h3>
                                <p className="text-gray-600">
                                    Absolutely! We offer farm tours for individuals, families, schools, and groups. Contact us to schedule a visit and learn about our sustainable farming practices firsthand.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Call to Action */}
                <section className="py-24" style={{backgroundColor: '#1F2937'}}>
                    <div className="max-w-5xl mx-auto text-center px-4 sm:px-6 lg:px-8">
                        <h2 className="text-5xl md:text-6xl font-bold mb-6" style={{color: '#FAFAFA', fontFamily: 'Space Grotesk, sans-serif'}}>
                            Ready to Start Your Organic Journey?
                        </h2>
                        <p className="text-xl mb-8 leading-relaxed" style={{color: '#F9FAFB'}}>
                            Whether you're a consumer looking for fresh organic produce or a farmer interested in sustainable practices, we're here to help. Get in touch today!
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <a href="/products" className="rounded-lg px-10 py-5 font-semibold text-lg transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1 inline-block text-white" style={{backgroundColor: '#2E7D32', boxShadow: '0 4px 14px rgba(46, 125, 50, 0.39)'}}>
                                Shop Now
                            </a>
                            <a href="/services" className="bg-white rounded-lg px-10 py-5 font-semibold text-lg transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1 inline-block" style={{color: '#1F2937', boxShadow: '0 4px 14px rgba(255, 255, 255, 0.2)'}}>
                                Learn About Our Services
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