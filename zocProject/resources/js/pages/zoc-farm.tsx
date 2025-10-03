import { Head } from '@inertiajs/react';

export default function ZOCFarm() {
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
            </Head>
            <div className="min-h-screen bg-cream-white font-body text-charcoal" style={{
                fontFamily: 'Inter, sans-serif',
                backgroundColor: '#FDF8E3',
                color: '#333333'
            } as React.CSSProperties}>
                {/* Header & Navigation */}
                <nav className="navbar fixed w-full z-30 top-0 start-0 border-b border-gray-200 bg-white">
                    <div className="w-full px-2 py-3">
                        <div className="flex items-center justify-between w-full">
                            {/* Logo - Almost to Left Margin */}
                            <div className="flex items-center pl-2">
                                <a href="#home" className="flex items-center space-x-3">
                                    <div className="text-2xl font-bold" style={{color: '#3A4C2F', fontFamily: 'Space Grotesk, sans-serif'}}>
                                        ZOC Farm
                                    </div>
                                </a>
                            </div>

                            {/* Navigation Links & Cart - Really Far Right */}
                            <div className="flex items-center space-x-10 pr-8">
                                {/* Desktop Navigation */}
                                <div className="hidden md:flex items-center">
                                    <ul className="flex space-x-10 font-medium">
                                        <li>
                                            <a
                                                href="/"
                                                className="font-semibold hover:opacity-80 transition-colors duration-200 text-lg"
                                                style={{color: '#3A4C2F'}}
                                            >
                                                Home
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                href="/about"
                                                className="text-gray-700 hover:opacity-80 transition-colors duration-200 text-lg"
                                            >
                                                About
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                href="/services"
                                                className="text-gray-700 hover:opacity-80 transition-colors duration-200 text-lg"
                                            >
                                                Services
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                href="/products"
                                                className="text-gray-700 hover:opacity-80 transition-colors duration-200 text-lg"
                                            >
                                                Products
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                href="/contact"
                                                className="text-gray-700 hover:opacity-80 transition-colors duration-200 text-lg"
                                            >
                                                Contact
                                            </a>
                                        </li>
                                    </ul>
                                </div>

                                {/* Cart Button */}
                                <button className="relative p-2 transition-colors duration-200" style={{color: '#3A4C2F'}}>
                                    <i className="fas fa-shopping-cart text-xl"></i>
                                    <span className="absolute -top-1 -right-1 text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium" 
                                          style={{backgroundColor: '#F4C542', color: '#333333'}}>
                                        0
                                    </span>
                                </button>

                                {/* Mobile Menu Button */}
                                <button
                                    type="button"
                                    className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
                                >
                                    <span className="sr-only">Open main menu</span>
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 17 14">
                                        <path
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M1 1h15M1 7h15M1 13h15"
                                        />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </nav>

                {/* Hero Section */}
                <section
                    id="home"
                    className="relative min-h-screen flex items-center justify-center"
                    style={{
                        background: `linear-gradient(rgba(58, 76, 47, 0.7), rgba(58, 76, 47, 0.7)), linear-gradient(to right, #3A4C2F, #7BB661)`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                    }}
                >
                    <div className="hero-overlay absolute inset-0"></div>
                    <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8">
                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6" style={{fontFamily: 'Space Grotesk, sans-serif'}}>
                            Transforming the <br />
                            <span style={{color: '#F4C542'}}>Agricultural Value Chain</span>
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-4xl mx-auto leading-relaxed">
                            Uniting farmers, investors, contractors and consumers under a single transparent platform. We specialize in organic food production from sourcing inputs to delivering retail-ready products.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <a
                                href="/products"
                                className="px-8 py-4 rounded-full font-semibold text-lg transition-transform hover:scale-105 inline-block"
                                style={{backgroundColor: '#F4C542', color: '#333333'}}
                            >
                                Shop Now
                            </a>
                            <a
                                href="/contact"
                                className="px-8 py-4 rounded-full font-semibold text-lg transition-transform hover:scale-105 inline-block border-2 border-white text-white hover:bg-white"
                                style={{'--hover-color': '#3A4C2F'} as React.CSSProperties}
                            >
                                Partner With Us
                            </a>
                        </div>
                    </div>

                    {/* Scroll indicator */}
                    <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
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

                {/* Featured Products */}
                <section id="products" className="py-20 bg-gray-50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{color: '#3A4C2F', fontFamily: 'Space Grotesk, sans-serif'}}>
                                Featured Products
                            </h2>
                            <p className="text-xl text-gray-600">
                                Premium organic products straight from our farms
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            <div className="bg-white rounded-2xl overflow-hidden shadow-lg transition-transform hover:scale-105">
                                <div className="h-64 overflow-hidden">
                                    <div className="w-full h-full bg-gray-200 flex items-center justify-center transition-transform duration-300 hover:scale-105">
                                        <span className="text-gray-500">Fresh Organic Vegetables</span>
                                    </div>
                                </div>
                                <div className="p-6">
                                    <h3 className="text-xl font-bold mb-2" style={{color: '#3A4C2F', fontFamily: 'Space Grotesk, sans-serif'}}>
                                        Organic Vegetables
                                    </h3>
                                    <p className="text-gray-600 mb-4">
                                        Fresh, pesticide-free vegetables grown using sustainable organic methods.
                                    </p>
                                    <div className="flex justify-between items-center">
                                        <span className="text-2xl font-bold" style={{color: '#7BB661'}}>
                                            KSh 200/kg
                                        </span>
                                        <button
                                            className="px-4 py-2 rounded-full text-sm transition-transform hover:scale-105"
                                            style={{backgroundColor: '#F4C542', color: '#333333'}}
                                        >
                                            Add to Cart
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white rounded-2xl overflow-hidden shadow-lg transition-transform hover:scale-105">
                                <div className="h-64 overflow-hidden">
                                    <div className="w-full h-full bg-gray-200 flex items-center justify-center transition-transform duration-300 hover:scale-105">
                                        <span className="text-gray-500">Fresh Organic Fruits</span>
                                    </div>
                                </div>
                                <div className="p-6">
                                    <h3 className="text-xl font-bold mb-2" style={{color: '#3A4C2F', fontFamily: 'Space Grotesk, sans-serif'}}>
                                        Organic Fruits
                                    </h3>
                                    <p className="text-gray-600 mb-4">
                                        Sweet, nutritious fruits cultivated with care and organic practices.
                                    </p>
                                    <div className="flex justify-between items-center">
                                        <span className="text-2xl font-bold" style={{color: '#7BB661'}}>
                                            KSh 300/kg
                                        </span>
                                        <button
                                            className="px-4 py-2 rounded-full text-sm transition-transform hover:scale-105"
                                            style={{backgroundColor: '#F4C542', color: '#333333'}}
                                        >
                                            Add to Cart
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white rounded-2xl overflow-hidden shadow-lg transition-transform hover:scale-105">
                                <div className="h-64 overflow-hidden">
                                    <div className="w-full h-full bg-gray-200 flex items-center justify-center transition-transform duration-300 hover:scale-105">
                                        <span className="text-gray-500">Organic Grains</span>
                                    </div>
                                </div>
                                <div className="p-6">
                                    <h3 className="text-xl font-bold mb-2" style={{color: '#3A4C2F', fontFamily: 'Space Grotesk, sans-serif'}}>
                                        Organic Grains
                                    </h3>
                                    <p className="text-gray-600 mb-4">
                                        High-quality grains and cereals for nutritious, wholesome meals.
                                    </p>
                                    <div className="flex justify-between items-center">
                                        <span className="text-2xl font-bold" style={{color: '#7BB661'}}>
                                            KSh 150/kg
                                        </span>
                                        <button
                                            className="px-4 py-2 rounded-full text-sm transition-transform hover:scale-105"
                                            style={{backgroundColor: '#F4C542', color: '#333333'}}
                                        >
                                            Add to Cart
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="text-center mt-12">
                            <a
                                href="/products"
                                className="px-8 py-4 rounded-full font-semibold transition-transform hover:scale-105 inline-block text-white"
                                style={{backgroundColor: '#3A4C2F'}}
                            >
                                Shop All Products
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
                        <div className="text-center mb-12">
                            <h3 className="text-2xl font-bold mb-4" style={{fontFamily: 'Space Grotesk, sans-serif'}}>Join Our Platform</h3>
                            <p className="text-gray-400 mb-6">
                                Subscribe to connect with farmers, investors, contractors and consumers on our transparent agricultural platform.
                            </p>
                            <form className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
                                <input
                                    type="email"
                                    id="newsletter-email"
                                    placeholder="Enter your email"
                                    className="flex-1 px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none"
                                    style={{'--focus-border-color': '#F4C542'} as React.CSSProperties}
                                />
                                <button
                                    type="button"
                                    className="px-6 py-2 rounded-lg font-semibold transition-colors"
                                    style={{backgroundColor: '#F4C542', color: '#333333'}}
                                >
                                    Subscribe
                                </button>
                            </form>
                        </div>

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