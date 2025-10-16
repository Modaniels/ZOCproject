import React, { useState, useEffect } from 'react';import React, { useState, useEffect } from 'react';

import { Head, Link, router } from '@inertiajs/react';import { Head, Link, router } from '@inertiajs/react';

import { MinusIcon, PlusIcon, TrashIcon, ShoppingCartIcon } from '@heroicons/react/24/outline';import { MinusIcon, PlusIcon, TrashIcon, ShoppingCartIcon } from '@heroicons/react/24/outline';

import Newsletter from '../components/Newsletter';import Newsletter from '../components/Newsletter';



interface CartItem {interface CartItem {

    id: number;    id: number;

    product_id: number;    product_id: number;

    quantity: number;    quantity: number;

    price: number;    price: number;

    total: number;    total: number;

    product: {    product: {

        id: number;        id: number;

        name: string;        name: string;

        slug: string;        slug: string;

        price: number;        price: number;

        formatted_price: string;        formatted_price: string;

        weight: string;        weight: string;

        primary_image?: {        primary_image?: {

            image_path: string;            image_path: string;

            alt_text: string;            alt_text: string;

            url: string;            url: string;

        };        };

    };    };

}}



interface Props {interface Props {

    cartItems: CartItem[];    cartItems: CartItem[];

    total: number;    total: number;

}}



export default function Cart({ cartItems: initialCartItems, total: initialTotal }: Props) {export default function Cart({ cartItems: initialCartItems, total: initialTotal }: Props) {

    const [cartItems, setCartItems] = useState(initialCartItems);    const [cartItems, setCartItems] = useState(initialCartItems);

    const [total, setTotal] = useState(initialTotal);    const [total, setTotal] = useState(initialTotal);

    const [isUpdating, setIsUpdating] = useState<number | null>(null);    const [isUpdating, setIsUpdating] = useState<number | null>(null);



    // Get CSRF token safely    // Get CSRF token safely

    const getCsrfToken = () => {    const getCsrfToken = () => {

        if (typeof document !== 'undefined') {        if (typeof document !== 'undefined') {

            return document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '';            return document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '';

        }        }

        return '';        return '';

    };    };



    const updateQuantity = async (cartItemId: number, newQuantity: number) => {    const updateQuantity = async (cartItemId: number, newQuantity: number) => {

        if (newQuantity < 1) return;        if (newQuantity < 1) return;

                

        setIsUpdating(cartItemId);        setIsUpdating(cartItemId);

                

        try {        try {

            const response = await fetch(`/cart/${cartItemId}`, {            const response = await fetch(`/cart/${cartItemId}`, {

                method: 'PUT',                method: 'PUT',

                headers: {                headers: {

                    'Content-Type': 'application/json',                    'Content-Type': 'application/json',

                    'X-CSRF-TOKEN': getCsrfToken(),                    'X-CSRF-TOKEN': getCsrfToken(),

                },                },

                body: JSON.stringify({ quantity: newQuantity }),                body: JSON.stringify({ quantity: newQuantity }),

            });            });



            const data = await response.json();            const data = await response.json();

                        

            if (response.ok) {            if (response.ok) {

                setCartItems(prevItems =>                 setCartItems(prevItems => 

                    prevItems.map(item =>                     prevItems.map(item => 

                        item.id === cartItemId                         item.id === cartItemId 

                            ? { ...item, quantity: newQuantity, total: newQuantity * item.price }                            ? { ...item, quantity: newQuantity, total: newQuantity * item.price }

                            : item                            : item

                    )                    )

                );                );

                setTotal(data.total);                setTotal(data.total);

            } else {            } else {

                alert(data.message || 'Error updating cart');                alert(data.message || 'Error updating cart');

            }            }

        } catch (error) {        } catch (error) {

            console.error('Error updating cart:', error);            console.error('Error updating cart:', error);

            alert('Error updating cart');            alert('Error updating cart');

        } finally {        } finally {

            setIsUpdating(null);            setIsUpdating(null);

        }        }

    };    };



    const removeItem = async (cartItemId: number) => {    const removeItem = async (cartItemId: number) => {

        try {        try {

            const response = await fetch(`/cart/${cartItemId}`, {            const response = await fetch(`/cart/${cartItemId}`, {

                method: 'DELETE',                method: 'DELETE',

                headers: {                headers: {

                    'X-CSRF-TOKEN': getCsrfToken(),                    'X-CSRF-TOKEN': getCsrfToken(),

                },                },

            });            });



            const data = await response.json();            const data = await response.json();

                        

            if (response.ok) {            if (response.ok) {

                setCartItems(prevItems => prevItems.filter(item => item.id !== cartItemId));                setCartItems(prevItems => prevItems.filter(item => item.id !== cartItemId));

                const newTotal = cartItems                const newTotal = cartItems

                    .filter(item => item.id !== cartItemId)                    .filter(item => item.id !== cartItemId)

                    .reduce((sum, item) => sum + (item.quantity * item.price), 0);                    .reduce((sum, item) => sum + (item.quantity * item.price), 0);

                setTotal(newTotal);                setTotal(newTotal);

            } else {            } else {

                alert(data.message || 'Error removing item');                alert(data.message || 'Error removing item');

            }            }

        } catch (error) {        } catch (error) {

            console.error('Error removing item:', error);            console.error('Error removing item:', error);

            alert('Error removing item');            alert('Error removing item');

        }        }

    };    };



    const clearCart = async () => {    const clearCart = async () => {

        if (!confirm('Are you sure you want to clear your cart?')) return;        if (!confirm('Are you sure you want to clear your cart?')) return;

                

        try {        try {

            const response = await fetch('/cart', {            const response = await fetch('/cart', {

                method: 'DELETE',                method: 'DELETE',

                headers: {                headers: {

                    'X-CSRF-TOKEN': getCsrfToken(),                    'X-CSRF-TOKEN': getCsrfToken(),

                },                },

            });            });



            const data = await response.json();            const data = await response.json();

                        

            if (response.ok) {            if (response.ok) {

                setCartItems([]);                setCartItems([]);

                setTotal(0);                setTotal(0);

            } else {            } else {

                alert(data.message || 'Error clearing cart');                alert(data.message || 'Error clearing cart');

            }            }

        } catch (error) {        } catch (error) {

            console.error('Error clearing cart:', error);            console.error('Error clearing cart:', error);

            alert('Error clearing cart');            alert('Error clearing cart');

        }        }

    };    };



    const formatPrice = (price: number) => {    const formatPrice = (price: number) => {

        return `KSh ${price.toLocaleString()}`;        return `KSh ${price.toLocaleString()}`;

    };    };



    const Navigation = () => (    const Navigation = () => (

        <nav className="navbar fixed w-full z-30 top-0 start-0 border-b border-gray-200 bg-white">        <nav className="navbar fixed w-full z-30 top-0 start-0 border-b border-gray-200 bg-white">

            <div className="w-full px-2 py-3">            <div className="w-full px-2 py-3">

                <div className="flex items-center justify-between w-full">                <div className="flex items-center justify-between w-full">

                    <div className="flex items-center pl-2">                    <div className="flex items-center pl-2">

                        <a href="/" className="flex items-center space-x-3">                        <a href="/" className="flex items-center space-x-3">

                            <div className="text-2xl font-bold" style={{color: '#3A4C2F', fontFamily: 'Space Grotesk, sans-serif'}}>                            <div className="text-2xl font-bold" style={{color: '#3A4C2F', fontFamily: 'Space Grotesk, sans-serif'}}>

                                ZOC Farm                                ZOC Farm

                            </div>                            </div>

                        </a>                        </a>

                    </div>                    </div>



                    <div className="flex items-center space-x-10 pr-8">                    <div className="flex items-center space-x-10 pr-8">

                        <div className="hidden md:flex items-center">                        <div className="hidden md:flex items-center">

                            <ul className="flex space-x-10 font-medium">                            <ul className="flex space-x-10 font-medium">

                                <li>                                <li>

                                    <a href="/" className="text-gray-700 hover:opacity-80 transition-colors duration-200 text-lg">                                    <a href="/" className="text-gray-700 hover:opacity-80 transition-colors duration-200 text-lg">

                                        Home                                        Home

                                    </a>                                    </a>

                                </li>                                </li>

                                <li>                                <li>

                                    <a href="/about" className="text-gray-700 hover:opacity-80 transition-colors duration-200 text-lg">                                    <a href="/about" className="text-gray-700 hover:opacity-80 transition-colors duration-200 text-lg">

                                        About                                        About

                                    </a>                                    </a>

                                </li>                                </li>

                                <li>                                <li>

                                    <a href="/services" className="text-gray-700 hover:opacity-80 transition-colors duration-200 text-lg">                                    <a href="/services" className="text-gray-700 hover:opacity-80 transition-colors duration-200 text-lg">

                                        Services                                        Services

                                    </a>                                    </a>

                                </li>                                </li>

                                <li>                                <li>

                                    <a href="/products" className="text-gray-700 hover:opacity-80 transition-colors duration-200 text-lg">                                    <a href="/products" className="text-gray-700 hover:opacity-80 transition-colors duration-200 text-lg">

                                        Products                                        Products

                                    </a>                                    </a>

                                </li>                                </li>

                                <li>                                <li>

                                    <a href="/contact" className="text-gray-700 hover:opacity-80 transition-colors duration-200 text-lg">                                    <a href="/contact" className="text-gray-700 hover:opacity-80 transition-colors duration-200 text-lg">

                                        Contact                                        Contact

                                    </a>                                    </a>

                                </li>                                </li>

                            </ul>                            </ul>

                        </div>                        </div>



                        <div className="flex items-center space-x-4">                        <div className="flex items-center space-x-4">

                            <Link href="/cart" className="relative p-2 hover:text-yellow-600 transition-colors"                            <Link href="/cart" className="relative p-2 hover:text-yellow-600 transition-colors"

                                  style={{color: '#3A4C2F'}}>                                  style={{color: '#3A4C2F'}}>

                                <ShoppingCartIcon className="w-6 h-6" />                                <ShoppingCartIcon className="w-6 h-6" />

                                <span className="absolute -top-1 -right-1 text-xs rounded-full h-5 w-5 flex items-center justify-center text-white font-medium"                                 <span className="absolute -top-1 -right-1 text-xs rounded-full h-5 w-5 flex items-center justify-center text-white font-medium" 

                                      style={{backgroundColor: '#F4C542', color: '#333333'}}>                                      style={{backgroundColor: '#F4C542', color: '#333333'}}>

                                    {cartItems.reduce((sum, item) => sum + item.quantity, 0)}                                    {cartItems.reduce((sum, item) => sum + item.quantity, 0)}

                                </span>                                </span>

                            </Link>                            </Link>

                        </div>                        </div>



                        <div className="md:hidden">                        <div className="md:hidden">

                            <button type="button" className="text-gray-500 hover:text-gray-600">                            <button type="button" className="text-gray-500 hover:text-gray-600">

                                <span className="sr-only">Open main menu</span>                                <span className="sr-only">Open main menu</span>

                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">

                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />

                                </svg>                                </svg>

                            </button>                            </button>

                        </div>                        </div>

                    </div>                    </div>

                </div>                </div>

            </div>            </div>

        </nav>        </nav>

    );    );



    const Footer = () => (    const Footer = () => (

        <footer className="py-16 px-4" style={{backgroundColor: '#1A1A1A', color: '#EDEDEC'}}>        <footer className="py-16 px-4" style={{backgroundColor: '#1A1A1A', color: '#EDEDEC'}}>

            <div className="max-w-6xl mx-auto">            <div className="max-w-6xl mx-auto">

                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

                    <div className="md:col-span-2">                    <div className="md:col-span-2">

                        <div className="text-3xl font-bold mb-4" style={{color: '#F4C542', fontFamily: 'Space Grotesk, sans-serif'}}>                        <div className="text-3xl font-bold mb-4" style={{color: '#F4C542', fontFamily: 'Space Grotesk, sans-serif'}}>

                            ZOC Farm                            ZOC Farm

                        </div>                        </div>

                        <p className="text-gray-400 mb-6 leading-relaxed">                        <p className="text-gray-400 mb-6 leading-relaxed">

                            Connecting farmers, investors, contractors and consumers through transparency,                             Connecting farmers, investors, contractors and consumers through transparency, 

                            sustainability, and community-driven agriculture.                            sustainability, and community-driven agriculture.

                        </p>                        </p>

                        <div className="flex space-x-4">                        <div className="flex space-x-4">

                            <a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors">                            <a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors">

                                <i className="fab fa-facebook-f text-xl"></i>                                <i className="fab fa-facebook-f text-xl"></i>

                            </a>                            </a>

                            <a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors">                            <a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors">

                                <i className="fab fa-twitter text-xl"></i>                                <i className="fab fa-twitter text-xl"></i>

                            </a>                            </a>

                            <a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors">                            <a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors">

                                <i className="fab fa-instagram text-xl"></i>                                <i className="fab fa-instagram text-xl"></i>

                            </a>                            </a>

                            <a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors">                            <a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors">

                                <i className="fab fa-linkedin-in text-xl"></i>                                <i className="fab fa-linkedin-in text-xl"></i>

                            </a>                            </a>

                        </div>                        </div>

                    </div>                    </div>

                                        

                    <div>                    <div>

                        <h4 className="text-lg font-semibold mb-4" style={{fontFamily: 'Space Grotesk, sans-serif'}}>Quick Links</h4>                        <h4 className="text-lg font-semibold mb-4" style={{fontFamily: 'Space Grotesk, sans-serif'}}>Quick Links</h4>

                        <ul className="space-y-2">                        <ul className="space-y-2">

                            <li><a href="/" className="text-gray-400 hover:text-yellow-400 transition-colors">Home</a></li>                            <li><a href="/" className="text-gray-400 hover:text-yellow-400 transition-colors">Home</a></li>

                            <li><a href="/about" className="text-gray-400 hover:text-yellow-400 transition-colors">About</a></li>                            <li><a href="/about" className="text-gray-400 hover:text-yellow-400 transition-colors">About</a></li>

                            <li><a href="/services" className="text-gray-400 hover:text-yellow-400 transition-colors">Services</a></li>                            <li><a href="/services" className="text-gray-400 hover:text-yellow-400 transition-colors">Services</a></li>

                            <li><a href="/products" className="text-gray-400 hover:text-yellow-400 transition-colors">Products</a></li>                            <li><a href="/products" className="text-gray-400 hover:text-yellow-400 transition-colors">Products</a></li>

                            <li><a href="/contact" className="text-gray-400 hover:text-yellow-400 transition-colors">Contact</a></li>                            <li><a href="/contact" className="text-gray-400 hover:text-yellow-400 transition-colors">Contact</a></li>

                        </ul>                        </ul>

                    </div>                    </div>

                                        

                    <div>                    <div>

                        <h4 className="text-lg font-semibold mb-4" style={{fontFamily: 'Space Grotesk, sans-serif'}}>Contact Info</h4>                        <h4 className="text-lg font-semibold mb-4" style={{fontFamily: 'Space Grotesk, sans-serif'}}>Contact Info</h4>

                        <ul className="space-y-2 text-gray-400">                        <ul className="space-y-2 text-gray-400">

                            <li>                            <li>

                                <i className="fas fa-map-marker-alt mr-2"></i>                                <i className="fas fa-map-marker-alt mr-2"></i>

                                123 Farm Road, Green Valley                                123 Farm Road, Green Valley

                            </li>                            </li>

                            <li>                            <li>

                                <i className="fas fa-phone mr-2"></i>                                <i className="fas fa-phone mr-2"></i>

                                +1 (555) 123-4567                                +1 (555) 123-4567

                            </li>                            </li>

                            <li>                            <li>

                                <i className="fas fa-envelope mr-2"></i>                                <i className="fas fa-envelope mr-2"></i>

                                info@zocfarm.com                                info@zocfarm.com

                            </li>                            </li>

                        </ul>                        </ul>

                    </div>                    </div>

                </div>                </div>

                                

                <div className="border-t border-gray-700 mt-12 pt-8 text-center text-gray-400">                <div className="border-t border-gray-700 mt-12 pt-8 text-center text-gray-400">

                    <p>&copy; 2024 ZOC Farm. All rights reserved.</p>                    <p>&copy; 2024 ZOC Farm. All rights reserved.</p>

                </div>                </div>

            </div>            </div>

        </footer>        </footer>

    );    );



    if (cartItems.length === 0) {    if (cartItems.length === 0) {

        return (        return (

            <>            <>

                <Head title="Shopping Cart - ZOC Farm">                <Head title="Shopping Cart - ZOC Farm">

                    <link rel="preconnect" href="https://fonts.googleapis.com" />                    <link rel="preconnect" href="https://fonts.googleapis.com" />

                    <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />                    <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

                    <link                    <link

                        href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600;700&display=swap"                        href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600;700&display=swap"

                        rel="stylesheet"                        rel="stylesheet"

                    />                    />

                    <link                    <link

                        rel="stylesheet"                        rel="stylesheet"

                        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"                        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"

                    />                    />

                    <meta name="csrf-token" content={getCsrfToken()} />                    <meta name="csrf-token" content={getCsrfToken()} />

                </Head>                </Head>

                                

                <div className="min-h-screen" style={{                <div className="min-h-screen" style={{

                    fontFamily: 'Inter, sans-serif',                    fontFamily: 'Inter, sans-serif',

                    backgroundColor: '#FDF8E3',                    backgroundColor: '#FDF8E3',

                    color: '#333333'                    color: '#333333'

                }}>                }}>

                    <Navigation />                    <Navigation />



                    <div className="pt-24 pb-16 px-4">                    <div className="pt-24 pb-16 px-4">

                        <div className="max-w-4xl mx-auto text-center">                        <div className="max-w-4xl mx-auto text-center">

                            <div className="bg-white rounded-xl shadow-lg p-12 border border-gray-100">                            <div className="bg-white rounded-xl shadow-lg p-12 border border-gray-100">

                                <ShoppingCartIcon className="w-24 h-24 mx-auto mb-6" style={{color: '#3A4C2F'}} />                                <ShoppingCartIcon className="w-24 h-24 mx-auto mb-6" style={{color: '#3A4C2F'}} />

                                <h2 className="text-4xl font-bold mb-4" style={{color: '#3A4C2F', fontFamily: 'Space Grotesk, sans-serif'}}>                                <h2 className="text-4xl font-bold mb-4" style={{color: '#3A4C2F', fontFamily: 'Space Grotesk, sans-serif'}}>

                                    Your cart is empty                                    Your cart is empty

                                </h2>                                </h2>

                                <p className="text-gray-600 text-lg mb-8 leading-relaxed">                                <p className="text-gray-600 text-lg mb-8 leading-relaxed">

                                    Looks like you haven't added any items to your cart yet.                                     Looks like you haven't added any items to your cart yet. 

                                    Start shopping to discover our amazing products!                                    Start shopping to discover our amazing products!

                                </p>                                </p>

                                <Link                                <Link

                                    href="/products"                                    href="/products"

                                    className="inline-flex items-center px-8 py-4 text-white font-semibold rounded-lg hover:opacity-90 transition duration-200 transform hover:scale-105"                                    className="inline-flex items-center px-8 py-4 text-white font-semibold rounded-lg hover:opacity-90 transition duration-200 transform hover:scale-105"

                                    style={{backgroundColor: '#3A4C2F'}}                                    style={{backgroundColor: '#3A4C2F'}}

                                >                                >

                                    <i className="fas fa-shopping-bag mr-2"></i>                                    <i className="fas fa-shopping-bag mr-2"></i>

                                    Continue Shopping                                    Continue Shopping

                                </Link>                                </Link>

                            </div>                            </div>

                        </div>                        </div>

                    </div>                    </div>



                    <div className="py-20 px-4" style={{backgroundColor: '#3A4C2F'}}>                    <div className="py-20 px-4" style={{backgroundColor: '#3A4C2F'}}>

                        <div className="max-w-4xl mx-auto">                        <div className="max-w-4xl mx-auto">

                            <Newsletter />                            <Newsletter />

                        </div>                        </div>

                    </div>                    </div>



                    <Footer />                    <Footer />

                </div>                </div>

            </>            </>

        );        );

    }    }



    return (    return (

        <>        <>

            <Head title="Shopping Cart - ZOC Farm">            <Head title="Shopping Cart - ZOC Farm">

                <link rel="preconnect" href="https://fonts.googleapis.com" />                <link rel="preconnect" href="https://fonts.googleapis.com" />

                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

                <link                <link

                    href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600;700&display=swap"                    href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600;700&display=swap"

                    rel="stylesheet"                    rel="stylesheet"

                />                />

                <link                <link

                    rel="stylesheet"                    rel="stylesheet"

                    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"                    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"

                />                />

                <meta name="csrf-token" content={getCsrfToken()} />                <meta name="csrf-token" content={getCsrfToken()} />

            </Head>            </Head>

                        

            <div className="min-h-screen" style={{            <div className="min-h-screen" style={{

                fontFamily: 'Inter, sans-serif',                fontFamily: 'Inter, sans-serif',

                backgroundColor: '#FDF8E3',                backgroundColor: '#FDF8E3',

                color: '#333333'                color: '#333333'

            }}>            }}>

                <Navigation />                <Navigation />



                <div className="pt-24 pb-16 px-4">                <div className="pt-24 pb-16 px-4">

                    <div className="max-w-6xl mx-auto">                    <div className="max-w-6xl mx-auto">

                        <div className="bg-white rounded-xl shadow-lg border border-gray-100 mb-8">                        <div className="bg-white rounded-xl shadow-lg border border-gray-100 mb-8">

                            <div className="px-8 py-6 border-b border-gray-100">                            <div className="px-8 py-6 border-b border-gray-100">

                                <div className="flex justify-between items-center">                                <div className="flex justify-between items-center">

                                    <h1 className="text-3xl font-bold" style={{color: '#3A4C2F', fontFamily: 'Space Grotesk, sans-serif'}}>                                    <h1 className="text-3xl font-bold" style={{color: '#3A4C2F', fontFamily: 'Space Grotesk, sans-serif'}}>

                                        Shopping Cart                                        Shopping Cart

                                    </h1>                                    </h1>

                                    <button                                    <button

                                        onClick={clearCart}                                        onClick={clearCart}

                                        className="text-red-600 hover:text-red-800 text-sm font-semibold transition-colors px-4 py-2 rounded-lg hover:bg-red-50"                                        className="text-red-600 hover:text-red-800 text-sm font-semibold transition-colors px-4 py-2 rounded-lg hover:bg-red-50"

                                    >                                    >

                                        <i className="fas fa-trash mr-2"></i>                                        <i className="fas fa-trash mr-2"></i>

                                        Clear Cart                                        Clear Cart

                                    </button>                                    </button>

                                </div>                                </div>

                            </div>                            </div>



                            <div className="divide-y divide-gray-100">                            <div className="divide-y divide-gray-100">

                                {cartItems.map((item) => (                                {cartItems.map((item) => (

                                    <div key={item.id} className="p-6 hover:bg-gray-50 transition-colors">                                    <div key={item.id} className="p-6 hover:bg-gray-50 transition-colors">

                                        <div className="flex items-center space-x-6">                                        <div className="flex items-center space-x-6">

                                            <div className="flex-shrink-0 w-24 h-24">                                            <div className="flex-shrink-0 w-24 h-24">

                                                {item.product.primary_image ? (                                                {item.product.primary_image ? (

                                                    <img                                                    <img

                                                        src={item.product.primary_image.url}                                                        src={item.product.primary_image.url}

                                                        alt={item.product.primary_image.alt_text || item.product.name}                                                        alt={item.product.primary_image.alt_text || item.product.name}

                                                        className="w-full h-full object-cover rounded-lg shadow-md"                                                        className="w-full h-full object-cover rounded-lg shadow-md"

                                                    />                                                    />

                                                ) : (                                                ) : (

                                                    <div className="w-full h-full bg-gray-100 rounded-lg flex items-center justify-center border border-gray-200">                                                    <div className="w-full h-full bg-gray-100 rounded-lg flex items-center justify-center border border-gray-200">

                                                        <i className="fas fa-image text-2xl text-gray-400"></i>                                                        <i className="fas fa-image text-2xl text-gray-400"></i>

                                                    </div>                                                    </div>

                                                )}                                                )}

                                            </div>                                            </div>



                                            <div className="flex-1">                                            <div className="flex-1">

                                                <div className="flex justify-between items-start">                                                <div className="flex justify-between items-start">

                                                    <div className="space-y-2">                                                    <div className="space-y-2">

                                                        <h3 className="text-xl font-bold" style={{fontFamily: 'Space Grotesk, sans-serif'}}>                                                        <h3 className="text-xl font-bold" style={{fontFamily: 'Space Grotesk, sans-serif'}}>

                                                            <Link                                                             <Link 

                                                                href={`/products/${item.product.slug}`}                                                                href={`/products/${item.product.slug}`}

                                                                className="hover:opacity-80 transition-opacity"                                                                className="hover:opacity-80 transition-opacity"

                                                                style={{color: '#3A4C2F'}}                                                                style={{color: '#3A4C2F'}}

                                                            >                                                            >

                                                                {item.product.name}                                                                {item.product.name}

                                                            </Link>                                                            </Link>

                                                        </h3>                                                        </h3>

                                                        {item.product.weight && (                                                        {item.product.weight && (

                                                            <p className="text-sm text-gray-600 font-medium">                                                            <p className="text-sm text-gray-600 font-medium">

                                                                <i className="fas fa-weight mr-1"></i>                                                                <i className="fas fa-weight mr-1"></i>

                                                                {item.product.weight}                                                                {item.product.weight}

                                                            </p>                                                            </p>

                                                        )}                                                        )}

                                                        <p className="text-lg font-bold" style={{color: '#3A4C2F'}}>                                                        <p className="text-lg font-bold" style={{color: '#3A4C2F'}}>

                                                            {formatPrice(item.price)} each                                                            {formatPrice(item.price)} each

                                                        </p>                                                        </p>

                                                    </div>                                                    </div>



                                                    <div className="flex items-center space-x-6">                                                    <div className="flex items-center space-x-6">

                                                        <div className="flex items-center border-2 border-gray-200 rounded-lg overflow-hidden">                                                        <div className="flex items-center border-2 border-gray-200 rounded-lg overflow-hidden">

                                                            <button                                                            <button

                                                                onClick={() => updateQuantity(item.id, item.quantity - 1)}                                                                onClick={() => updateQuantity(item.id, item.quantity - 1)}

                                                                disabled={item.quantity <= 1 || isUpdating === item.id}                                                                disabled={item.quantity <= 1 || isUpdating === item.id}

                                                                className="p-3 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"                                                                className="p-3 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"

                                                            >                                                            >

                                                                <MinusIcon className="w-4 h-4" />                                                                <MinusIcon className="w-4 h-4" />

                                                            </button>                                                            </button>

                                                            <span className="px-6 py-3 font-bold text-lg min-w-[3rem] text-center" style={{color: '#3A4C2F'}}>                                                            <span className="px-6 py-3 font-bold text-lg min-w-[3rem] text-center" style={{color: '#3A4C2F'}}>

                                                                {item.quantity}                                                                {item.quantity}

                                                            </span>                                                            </span>

                                                            <button                                                            <button

                                                                onClick={() => updateQuantity(item.id, item.quantity + 1)}                                                                onClick={() => updateQuantity(item.id, item.quantity + 1)}

                                                                disabled={isUpdating === item.id}                                                                disabled={isUpdating === item.id}

                                                                className="p-3 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"                                                                className="p-3 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"

                                                            >                                                            >

                                                                <PlusIcon className="w-4 h-4" />                                                                <PlusIcon className="w-4 h-4" />

                                                            </button>                                                            </button>

                                                        </div>                                                        </div>



                                                        <div className="text-right min-w-[6rem]">                                                        <div className="text-right min-w-[6rem]">

                                                            <p className="text-xl font-bold" style={{color: '#3A4C2F'}}>                                                            <p className="text-xl font-bold" style={{color: '#3A4C2F'}}>

                                                                {formatPrice(item.quantity * item.price)}                                                                {formatPrice(item.quantity * item.price)}

                                                            </p>                                                            </p>

                                                        </div>                                                        </div>



                                                        <button                                                        <button

                                                            onClick={() => removeItem(item.id)}                                                            onClick={() => removeItem(item.id)}

                                                            className="p-3 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-all"                                                            className="p-3 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-all"

                                                        >                                                        >

                                                            <TrashIcon className="w-5 h-5" />                                                            <TrashIcon className="w-5 h-5" />

                                                        </button>                                                        </button>

                                                    </div>                                                    </div>

                                                </div>                                                </div>

                                            </div>                                            </div>

                                        </div>                                        </div>

                                    </div>                                    </div>

                                ))}                                ))}

                            </div>                            </div>



                            <div className="px-8 py-6 border-t border-gray-100" style={{backgroundColor: '#F8F9FA'}}>                            <div className="px-8 py-6 border-t border-gray-100" style={{backgroundColor: '#F8F9FA'}}>

                                <div className="flex justify-between items-center mb-6">                                <div className="flex justify-between items-center mb-6">

                                    <span className="text-2xl font-bold" style={{color: '#3A4C2F', fontFamily: 'Space Grotesk, sans-serif'}}>                                    <span className="text-2xl font-bold" style={{color: '#3A4C2F', fontFamily: 'Space Grotesk, sans-serif'}}>

                                        Total:                                        Total:

                                    </span>                                    </span>

                                    <span className="text-3xl font-bold" style={{color: '#3A4C2F', fontFamily: 'Space Grotesk, sans-serif'}}>                                    <span className="text-3xl font-bold" style={{color: '#3A4C2F', fontFamily: 'Space Grotesk, sans-serif'}}>

                                        {formatPrice(total)}                                        {formatPrice(total)}

                                    </span>                                    </span>

                                </div>                                </div>

                                                                

                                <div className="flex flex-col sm:flex-row gap-4">                                <div className="flex flex-col sm:flex-row gap-4">

                                    <Link                                    <Link

                                        href="/products"                                        href="/products"

                                        className="flex-1 bg-gray-200 text-gray-800 py-4 px-6 rounded-lg text-center font-semibold hover:bg-gray-300 transition duration-200"                                        className="flex-1 bg-gray-200 text-gray-800 py-4 px-6 rounded-lg text-center font-semibold hover:bg-gray-300 transition duration-200"

                                    >                                    >

                                        <i className="fas fa-arrow-left mr-2"></i>                                        <i className="fas fa-arrow-left mr-2"></i>

                                        Continue Shopping                                        Continue Shopping

                                    </Link>                                    </Link>

                                    <button className="flex-1 text-white py-4 px-6 rounded-lg font-semibold hover:opacity-90 transition duration-200 transform hover:scale-105"                                    <button className="flex-1 text-white py-4 px-6 rounded-lg font-semibold hover:opacity-90 transition duration-200 transform hover:scale-105"

                                            style={{backgroundColor: '#3A4C2F'}}>                                            style={{backgroundColor: '#3A4C2F'}}>

                                        <i className="fas fa-credit-card mr-2"></i>                                        <i className="fas fa-credit-card mr-2"></i>

                                        Proceed to Checkout                                        Proceed to Checkout

                                    </button>                                    </button>

                                </div>                                </div>

                            </div>                            </div>

                        </div>                        </div>

                    </div>                    </div>

                </div>                </div>



                <div className="py-20 px-4" style={{backgroundColor: '#3A4C2F'}}>                <div className="py-20 px-4" style={{backgroundColor: '#3A4C2F'}}>

                    <div className="max-w-4xl mx-auto">                    <div className="max-w-4xl mx-auto">

                        <Newsletter />                        <Newsletter />

                    </div>                    </div>

                </div>                </div>



                <Footer />                <Footer />

            </div>            </div>

        </>        </>

    );    );

}}