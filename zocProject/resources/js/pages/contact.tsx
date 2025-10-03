import { Head } from '@inertiajs/react';

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
                                            <a href="/about" className="text-gray-700 hover:opacity-80 transition-colors duration-200 text-lg">
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
                                            <a href="/contact" className="font-semibold hover:opacity-80 transition-colors duration-200 text-lg" style={{color: '#3A4C2F'}}>
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
                    background: `linear-gradient(rgba(58, 76, 47, 0.8), rgba(58, 76, 47, 0.8)), linear-gradient(to right, #3A4C2F, #7BB661)`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                }}>
                    <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8">
                        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6" style={{fontFamily: 'Space Grotesk, sans-serif'}}>
                            Contact <span style={{color: '#F4C542'}}>Us</span>
                        </h1>
                        <p className="text-xl text-gray-200 max-w-3xl mx-auto">
                            Get in touch with us to learn more about our services or to place an order.
                        </p>
                    </div>
                </section>

                {/* Contact Form & Information */}
                <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
                    <div className="max-w-7xl mx-auto">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                            {/* Contact Form */}
                            <div>
                                <h2 className="text-3xl font-bold mb-8" style={{color: '#3A4C2F', fontFamily: 'Space Grotesk, sans-serif'}}>
                                    Send us a Message
                                </h2>
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
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
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
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
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
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
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
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                                            Subject *
                                        </label>
                                        <select
                                            id="subject"
                                            name="subject"
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
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
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                                            placeholder="Tell us more about your inquiry..."
                                            required
                                        ></textarea>
                                    </div>
                                    <button
                                        type="submit"
                                        className="w-full py-4 px-8 rounded-lg font-semibold text-lg transition-transform hover:scale-105 text-white"
                                        style={{backgroundColor: '#3A4C2F'}}
                                    >
                                        Send Message
                                    </button>
                                </form>
                            </div>
                            
                            {/* Contact Information */}
                            <div>
                                <h2 className="text-3xl font-bold mb-8" style={{color: '#3A4C2F', fontFamily: 'Space Grotesk, sans-serif'}}>
                                    Get in Touch
                                </h2>
                                <div className="space-y-8">
                                    <div className="flex items-start space-x-4">
                                        <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0" 
                                             style={{backgroundColor: '#7BB661'}}>
                                            <i className="fas fa-map-marker-alt text-white text-lg"></i>
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-semibold mb-2" style={{color: '#3A4C2F'}}>Our Location</h3>
                                            <p className="text-gray-600">
                                                Kirinyaga County, Kenya<br />
                                                Central Kenya Region<br />
                                                East Africa
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-start space-x-4">
                                        <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0" 
                                             style={{backgroundColor: '#F4C542'}}>
                                            <i className="fas fa-phone text-lg" style={{color: '#333333'}}></i>
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-semibold mb-2" style={{color: '#3A4C2F'}}>Phone Numbers</h3>
                                            <p className="text-gray-600">
                                                Main: +254 700 123 456<br />
                                                Sales: +254 701 234 567<br />
                                                Support: +254 702 345 678
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-start space-x-4">
                                        <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0" 
                                             style={{backgroundColor: '#6B4E2E'}}>
                                            <i className="fas fa-envelope text-white text-lg"></i>
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-semibold mb-2" style={{color: '#3A4C2F'}}>Email Addresses</h3>
                                            <p className="text-gray-600">
                                                General: info@zocfarms.co.ke<br />
                                                Sales: sales@zocfarms.co.ke<br />
                                                Support: support@zocfarms.co.ke
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-start space-x-4">
                                        <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0" 
                                             style={{backgroundColor: '#3A4C2F'}}>
                                            <i className="fas fa-clock text-white text-lg"></i>
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-semibold mb-2" style={{color: '#3A4C2F'}}>Business Hours</h3>
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
                                    <h3 className="text-xl font-bold mb-6" style={{color: '#3A4C2F', fontFamily: 'Space Grotesk, sans-serif'}}>
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
                <section className="py-20" style={{backgroundColor: '#FDF8E3'}}>
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-12">
                            <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{color: '#3A4C2F', fontFamily: 'Space Grotesk, sans-serif'}}>
                                Find Us on the Map
                            </h2>
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
                <section className="py-20 bg-white">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{color: '#3A4C2F', fontFamily: 'Space Grotesk, sans-serif'}}>
                                Frequently Asked Questions
                            </h2>
                            <p className="text-xl text-gray-600">
                                Quick answers to common questions about our products and services.
                            </p>
                        </div>

                        <div className="space-y-6">
                            <div className="border border-gray-200 rounded-lg p-6">
                                <h3 className="text-lg font-bold mb-3" style={{color: '#3A4C2F'}}>
                                    What makes your products organic?
                                </h3>
                                <p className="text-gray-600">
                                    Our products are certified organic, meaning they're grown without synthetic pesticides, herbicides, or fertilizers. We use natural farming methods that promote soil health and environmental sustainability.
                                </p>
                            </div>

                            <div className="border border-gray-200 rounded-lg p-6">
                                <h3 className="text-lg font-bold mb-3" style={{color: '#3A4C2F'}}>
                                    Do you offer delivery services?
                                </h3>
                                <p className="text-gray-600">
                                    Yes, we offer farm-fresh delivery services throughout Kenya. Products are harvested fresh and delivered directly to your doorstep to maintain quality and freshness.
                                </p>
                            </div>

                            <div className="border border-gray-200 rounded-lg p-6">
                                <h3 className="text-lg font-bold mb-3" style={{color: '#3A4C2F'}}>
                                    How can I become a partner farmer?
                                </h3>
                                <p className="text-gray-600">
                                    We welcome new farmers to join our platform. Contact us through the form above or call our partnership team to learn about our training programs, certification support, and market access opportunities.
                                </p>
                            </div>

                            <div className="border border-gray-200 rounded-lg p-6">
                                <h3 className="text-lg font-bold mb-3" style={{color: '#3A4C2F'}}>
                                    What payment methods do you accept?
                                </h3>
                                <p className="text-gray-600">
                                    We accept various payment methods including mobile money (M-Pesa, Airtel Money), bank transfers, and cash on delivery for local orders.
                                </p>
                            </div>

                            <div className="border border-gray-200 rounded-lg p-6">
                                <h3 className="text-lg font-bold mb-3" style={{color: '#3A4C2F'}}>
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
                <section className="py-20" style={{backgroundColor: '#F4C542'}}>
                    <div className="max-w-5xl mx-auto text-center px-4 sm:px-6 lg:px-8">
                        <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{color: '#333333', fontFamily: 'Space Grotesk, sans-serif'}}>
                            Ready to Start Your Organic Journey?
                        </h2>
                        <p className="text-xl mb-8 leading-relaxed" style={{color: '#333333'}}>
                            Whether you're a consumer looking for fresh organic produce or a farmer interested in sustainable practices, we're here to help. Get in touch today!
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <a href="/products" className="px-8 py-4 rounded-full font-semibold text-lg transition-transform hover:scale-105 inline-block text-white" style={{backgroundColor: '#3A4C2F'}}>
                                Shop Now
                            </a>
                            <a href="/services" className="bg-white border-2 px-8 py-4 rounded-full font-semibold text-lg transition-transform hover:scale-105 inline-block" style={{color: '#3A4C2F', borderColor: '#3A4C2F'}}>
                                Learn About Our Services
                            </a>
                        </div>
                    </div>
                </section>

                {/* Footer */}
                <footer className="text-white py-16" style={{backgroundColor: '#333333'}}>
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            <div>
                                <div className="flex items-center space-x-3 mb-6">
                                    <div className="text-2xl font-bold" style={{color: '#F4C542', fontFamily: 'Space Grotesk, sans-serif'}}>
                                        ZOC Farm
                                    </div>
                                </div>
                                <p className="text-gray-400 mb-6 leading-relaxed">
                                    Connect with us and join our mission to transform agriculture through sustainable practices and transparent partnerships.
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