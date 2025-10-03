import { Head } from '@inertiajs/react';

export default function Products() {
    return (
        <>
            <Head title="Products - ZOC Farm">
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
                                            <a href="/products" className="font-semibold hover:opacity-80 transition-colors duration-200 text-lg" style={{color: '#3A4C2F'}}>
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
                    background: `linear-gradient(rgba(58, 76, 47, 0.8), rgba(58, 76, 47, 0.8)), linear-gradient(to right, #3A4C2F, #7BB661)`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                }}>
                    <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8">
                        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6" style={{fontFamily: 'Space Grotesk, sans-serif'}}>
                            Our <span style={{color: '#F4C542'}}>Products</span>
                        </h1>
                        <p className="text-xl text-gray-200 max-w-3xl mx-auto">
                            Premium organic products straight from our farms to your table.
                        </p>
                    </div>
                </section>

                {/* Product Categories */}
                <section className="py-20 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{color: '#3A4C2F', fontFamily: 'Space Grotesk, sans-serif'}}>
                                Product Categories
                            </h2>
                            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                                Explore our wide range of organic products carefully grown with sustainable practices
                            </p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-8 mb-16">
                            <div className="text-center p-8 rounded-2xl transition-transform hover:scale-105 border-2" 
                                 style={{backgroundColor: '#FDF8E3', borderColor: '#7BB661'}}>
                                <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6" 
                                     style={{backgroundColor: '#7BB661', color: 'white'}}>
                                    <i className="fas fa-carrot text-3xl"></i>
                                </div>
                                <h3 className="text-xl font-bold mb-4" style={{color: '#3A4C2F', fontFamily: 'Space Grotesk, sans-serif'}}>
                                    Fresh Vegetables
                                </h3>
                                <p className="text-gray-600">
                                    Organic vegetables harvested at peak freshness, free from pesticides and chemicals.
                                </p>
                            </div>

                            <div className="text-center p-8 rounded-2xl transition-transform hover:scale-105 border-2" 
                                 style={{backgroundColor: '#FDF8E3', borderColor: '#F4C542'}}>
                                <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6" 
                                     style={{backgroundColor: '#F4C542', color: '#333333'}}>
                                    <i className="fas fa-apple-alt text-3xl"></i>
                                </div>
                                <h3 className="text-xl font-bold mb-4" style={{color: '#3A4C2F', fontFamily: 'Space Grotesk, sans-serif'}}>
                                    Organic Fruits
                                </h3>
                                <p className="text-gray-600">
                                    Sweet, nutritious fruits grown with natural farming methods for optimal flavor and nutrition.
                                </p>
                            </div>

                            <div className="text-center p-8 rounded-2xl transition-transform hover:scale-105 border-2" 
                                 style={{backgroundColor: '#FDF8E3', borderColor: '#6B4E2E'}}>
                                <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6" 
                                     style={{backgroundColor: '#6B4E2E', color: 'white'}}>
                                    <i className="fas fa-seedling text-3xl"></i>
                                </div>
                                <h3 className="text-xl font-bold mb-4" style={{color: '#3A4C2F', fontFamily: 'Space Grotesk, sans-serif'}}>
                                    Grains & Cereals
                                </h3>
                                <p className="text-gray-600">
                                    High-quality grains and cereals providing essential nutrients for healthy living.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Featured Products Grid */}
                <section className="py-20 px-4 sm:px-6 lg:px-8" style={{backgroundColor: '#FDF8E3'}}>
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{color: '#3A4C2F', fontFamily: 'Space Grotesk, sans-serif'}}>
                                Featured Products
                            </h2>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {/* Product 1 */}
                            <div className="bg-white rounded-2xl overflow-hidden shadow-lg transition-transform hover:scale-105">
                                <div className="h-48 overflow-hidden">
                                    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                                        <span className="text-gray-500">Organic Tomatoes</span>
                                    </div>
                                </div>
                                <div className="p-6">
                                    <h3 className="text-lg font-bold mb-2" style={{color: '#3A4C2F', fontFamily: 'Space Grotesk, sans-serif'}}>
                                        Organic Tomatoes
                                    </h3>
                                    <p className="text-gray-600 text-sm mb-4">
                                        Fresh, juicy tomatoes perfect for salads and cooking.
                                    </p>
                                    <div className="flex justify-between items-center">
                                        <span className="text-xl font-bold" style={{color: '#7BB661'}}>
                                            KSh 180/kg
                                        </span>
                                        <button className="px-3 py-2 rounded-full text-sm transition-transform hover:scale-105" 
                                                style={{backgroundColor: '#F4C542', color: '#333333'}}>
                                            Add to Cart
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Product 2 */}
                            <div className="bg-white rounded-2xl overflow-hidden shadow-lg transition-transform hover:scale-105">
                                <div className="h-48 overflow-hidden">
                                    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                                        <span className="text-gray-500">Fresh Spinach</span>
                                    </div>
                                </div>
                                <div className="p-6">
                                    <h3 className="text-lg font-bold mb-2" style={{color: '#3A4C2F', fontFamily: 'Space Grotesk, sans-serif'}}>
                                        Fresh Spinach
                                    </h3>
                                    <p className="text-gray-600 text-sm mb-4">
                                        Nutrient-rich leafy greens packed with vitamins.
                                    </p>
                                    <div className="flex justify-between items-center">
                                        <span className="text-xl font-bold" style={{color: '#7BB661'}}>
                                            KSh 120/bunch
                                        </span>
                                        <button className="px-3 py-2 rounded-full text-sm transition-transform hover:scale-105" 
                                                style={{backgroundColor: '#F4C542', color: '#333333'}}>
                                            Add to Cart
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Product 3 */}
                            <div className="bg-white rounded-2xl overflow-hidden shadow-lg transition-transform hover:scale-105">
                                <div className="h-48 overflow-hidden">
                                    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                                        <span className="text-gray-500">Organic Carrots</span>
                                    </div>
                                </div>
                                <div className="p-6">
                                    <h3 className="text-lg font-bold mb-2" style={{color: '#3A4C2F', fontFamily: 'Space Grotesk, sans-serif'}}>
                                        Organic Carrots
                                    </h3>
                                    <p className="text-gray-600 text-sm mb-4">
                                        Sweet, crunchy carrots rich in beta-carotene.
                                    </p>
                                    <div className="flex justify-between items-center">
                                        <span className="text-xl font-bold" style={{color: '#7BB661'}}>
                                            KSh 160/kg
                                        </span>
                                        <button className="px-3 py-2 rounded-full text-sm transition-transform hover:scale-105" 
                                                style={{backgroundColor: '#F4C542', color: '#333333'}}>
                                            Add to Cart
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Product 4 */}
                            <div className="bg-white rounded-2xl overflow-hidden shadow-lg transition-transform hover:scale-105">
                                <div className="h-48 overflow-hidden">
                                    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                                        <span className="text-gray-500">Organic Apples</span>
                                    </div>
                                </div>
                                <div className="p-6">
                                    <h3 className="text-lg font-bold mb-2" style={{color: '#3A4C2F', fontFamily: 'Space Grotesk, sans-serif'}}>
                                        Organic Apples
                                    </h3>
                                    <p className="text-gray-600 text-sm mb-4">
                                        Crisp, sweet apples perfect for snacking.
                                    </p>
                                    <div className="flex justify-between items-center">
                                        <span className="text-xl font-bold" style={{color: '#7BB661'}}>
                                            KSh 280/kg
                                        </span>
                                        <button className="px-3 py-2 rounded-full text-sm transition-transform hover:scale-105" 
                                                style={{backgroundColor: '#F4C542', color: '#333333'}}>
                                            Add to Cart
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Product 5 */}
                            <div className="bg-white rounded-2xl overflow-hidden shadow-lg transition-transform hover:scale-105">
                                <div className="h-48 overflow-hidden">
                                    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                                        <span className="text-gray-500">Organic Rice</span>
                                    </div>
                                </div>
                                <div className="p-6">
                                    <h3 className="text-lg font-bold mb-2" style={{color: '#3A4C2F', fontFamily: 'Space Grotesk, sans-serif'}}>
                                        Organic Rice
                                    </h3>
                                    <p className="text-gray-600 text-sm mb-4">
                                        Premium quality rice grown with organic methods.
                                    </p>
                                    <div className="flex justify-between items-center">
                                        <span className="text-xl font-bold" style={{color: '#7BB661'}}>
                                            KSh 140/kg
                                        </span>
                                        <button className="px-3 py-2 rounded-full text-sm transition-transform hover:scale-105" 
                                                style={{backgroundColor: '#F4C542', color: '#333333'}}>
                                            Add to Cart
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Product 6 */}
                            <div className="bg-white rounded-2xl overflow-hidden shadow-lg transition-transform hover:scale-105">
                                <div className="h-48 overflow-hidden">
                                    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                                        <span className="text-gray-500">Organic Bananas</span>
                                    </div>
                                </div>
                                <div className="p-6">
                                    <h3 className="text-lg font-bold mb-2" style={{color: '#3A4C2F', fontFamily: 'Space Grotesk, sans-serif'}}>
                                        Organic Bananas
                                    </h3>
                                    <p className="text-gray-600 text-sm mb-4">
                                        Sweet, ripe bananas rich in potassium.
                                    </p>
                                    <div className="flex justify-between items-center">
                                        <span className="text-xl font-bold" style={{color: '#7BB661'}}>
                                            KSh 200/kg
                                        </span>
                                        <button className="px-3 py-2 rounded-full text-sm transition-transform hover:scale-105" 
                                                style={{backgroundColor: '#F4C542', color: '#333333'}}>
                                            Add to Cart
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Product 7 */}
                            <div className="bg-white rounded-2xl overflow-hidden shadow-lg transition-transform hover:scale-105">
                                <div className="h-48 overflow-hidden">
                                    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                                        <span className="text-gray-500">Fresh Herbs</span>
                                    </div>
                                </div>
                                <div className="p-6">
                                    <h3 className="text-lg font-bold mb-2" style={{color: '#3A4C2F', fontFamily: 'Space Grotesk, sans-serif'}}>
                                        Fresh Herbs
                                    </h3>
                                    <p className="text-gray-600 text-sm mb-4">
                                        Aromatic herbs for cooking and seasoning.
                                    </p>
                                    <div className="flex justify-between items-center">
                                        <span className="text-xl font-bold" style={{color: '#7BB661'}}>
                                            KSh 80/bunch
                                        </span>
                                        <button className="px-3 py-2 rounded-full text-sm transition-transform hover:scale-105" 
                                                style={{backgroundColor: '#F4C542', color: '#333333'}}>
                                            Add to Cart
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Product 8 */}
                            <div className="bg-white rounded-2xl overflow-hidden shadow-lg transition-transform hover:scale-105">
                                <div className="h-48 overflow-hidden">
                                    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                                        <span className="text-gray-500">Organic Maize</span>
                                    </div>
                                </div>
                                <div className="p-6">
                                    <h3 className="text-lg font-bold mb-2" style={{color: '#3A4C2F', fontFamily: 'Space Grotesk, sans-serif'}}>
                                        Organic Maize
                                    </h3>
                                    <p className="text-gray-600 text-sm mb-4">
                                        Premium quality maize for various uses.
                                    </p>
                                    <div className="flex justify-between items-center">
                                        <span className="text-xl font-bold" style={{color: '#7BB661'}}>
                                            KSh 100/kg
                                        </span>
                                        <button className="px-3 py-2 rounded-full text-sm transition-transform hover:scale-105" 
                                                style={{backgroundColor: '#F4C542', color: '#333333'}}>
                                            Add to Cart
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Product Benefits */}
                <section className="py-20 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{color: '#3A4C2F', fontFamily: 'Space Grotesk, sans-serif'}}>
                                Why Choose Our Products?
                            </h2>
                        </div>

                        <div className="grid md:grid-cols-3 gap-8">
                            <div className="text-center p-6">
                                <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6" 
                                     style={{backgroundColor: '#7BB661'}}>
                                    <i className="fas fa-certificate text-2xl text-white"></i>
                                </div>
                                <h3 className="text-xl font-bold mb-4" style={{color: '#3A4C2F', fontFamily: 'Space Grotesk, sans-serif'}}>
                                    Certified Organic
                                </h3>
                                <p className="text-gray-600">
                                    All our products are certified organic, ensuring they're free from harmful pesticides and chemicals.
                                </p>
                            </div>

                            <div className="text-center p-6">
                                <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6" 
                                     style={{backgroundColor: '#F4C542'}}>
                                    <i className="fas fa-truck text-2xl" style={{color: '#333333'}}></i>
                                </div>
                                <h3 className="text-xl font-bold mb-4" style={{color: '#3A4C2F', fontFamily: 'Space Grotesk, sans-serif'}}>
                                    Farm Fresh Delivery
                                </h3>
                                <p className="text-gray-600">
                                    Products are harvested fresh and delivered directly to your doorstep to maintain quality and freshness.
                                </p>
                            </div>

                            <div className="text-center p-6">
                                <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6" 
                                     style={{backgroundColor: '#6B4E2E'}}>
                                    <i className="fas fa-leaf text-2xl text-white"></i>
                                </div>
                                <h3 className="text-xl font-bold mb-4" style={{color: '#3A4C2F', fontFamily: 'Space Grotesk, sans-serif'}}>
                                    Sustainably Grown
                                </h3>
                                <p className="text-gray-600">
                                    Our farming practices focus on environmental sustainability and soil health for long-term productivity.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Call to Action */}
                <section className="py-20" style={{backgroundColor: '#F4C542'}}>
                    <div className="max-w-5xl mx-auto text-center px-4 sm:px-6 lg:px-8">
                        <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{color: '#333333', fontFamily: 'Space Grotesk, sans-serif'}}>
                            Ready to Order Fresh Organic Products?
                        </h2>
                        <p className="text-xl mb-8 leading-relaxed" style={{color: '#333333'}}>
                            Experience the difference of farm-fresh, organic produce. Order now and taste the quality that comes from sustainable farming practices.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <a href="/contact" className="px-8 py-4 rounded-full font-semibold text-lg transition-transform hover:scale-105 inline-block text-white" style={{backgroundColor: '#3A4C2F'}}>
                                Place Your Order
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
                                    Premium organic products straight from our farms to your table.
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