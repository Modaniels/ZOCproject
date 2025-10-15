import React from 'react';

export default function Newsletter() {
    return (
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
    );
}