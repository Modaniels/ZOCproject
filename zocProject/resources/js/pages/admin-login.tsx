import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler, useState } from 'react';

export default function AdminLogin() {
    const { data, setData, post, processing, errors } = useForm({
        username: '',
        password: '',
    });

    const [showPassword, setShowPassword] = useState(false);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        console.log('Form submitted with data:', data);
        post('/admin/login', {
            preserveScroll: true,
            onError: (errors) => {
                console.error('Login errors:', errors);
            },
            onSuccess: () => {
                console.log('Login successful');
            },
            onBefore: () => {
                console.log('Starting login request...');
            },
            onFinish: () => {
                console.log('Login request finished');
            },
        });
    };

    return (
        <>
            <Head title="Admin Login - ZOC Farm">
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
            <div className="min-h-screen flex items-center justify-center" style={{
                fontFamily: 'Inter, sans-serif',
                backgroundColor: '#FAFAFA'
            }}>
                <div className="w-full max-w-md px-4">
                    <div className="bg-white rounded-3xl shadow-2xl p-8" style={{boxShadow: '0 20px 60px rgba(0,0,0,0.1)'}}>
                        {/* Logo/Header */}
                        <div className="text-center mb-8">
                            <div className="flex items-center justify-center mb-4">
                                <img src="/images/logo.png" alt="ZOC Farm" className="h-16" />
                            </div>
                            <h1 className="text-3xl font-bold mb-2" style={{color: '#1F2937', fontFamily: 'Space Grotesk, sans-serif'}}>
                                Admin Portal
                            </h1>
                            <p className="text-gray-600">Enter your credentials to continue</p>
                        </div>

                        {/* Error Message */}
                        {errors.username && (
                            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                                <p className="text-red-600 text-sm font-medium">{errors.username}</p>
                            </div>
                        )}

                        {/* Login Form */}
                        <form onSubmit={submit}>
                            <div className="mb-6">
                                <label htmlFor="username" className="block text-sm font-semibold mb-2" style={{color: '#1F2937'}}>
                                    Username
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <i className="fas fa-user text-gray-400"></i>
                                    </div>
                                    <input
                                        id="username"
                                        type="text"
                                        value={data.username}
                                        onChange={(e) => setData('username', e.target.value)}
                                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-opacity-50 text-gray-900"
                                        style={{fontSize: '16px'}}
                                        onFocus={(e) => {
                                            e.currentTarget.style.boxShadow = '0 0 0 2px rgba(46, 125, 50, 0.5)';
                                            e.currentTarget.style.borderColor = '#2E7D32';
                                        }}
                                        onBlur={(e) => {
                                            e.currentTarget.style.boxShadow = '';
                                            e.currentTarget.style.borderColor = '#D1D5DB';
                                        }}
                                        placeholder="Enter your username"
                                        required
                                        autoFocus
                                        autoComplete="username"
                                    />
                                </div>
                            </div>

                            <div className="mb-6">
                                <label htmlFor="password" className="block text-sm font-semibold mb-2" style={{color: '#1F2937'}}>
                                    Password
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <i className="fas fa-lock text-gray-400"></i>
                                    </div>
                                    <input
                                        id="password"
                                        type={showPassword ? 'text' : 'password'}
                                        value={data.password}
                                        onChange={(e) => setData('password', e.target.value)}
                                        className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-opacity-50 text-gray-900"
                                        style={{fontSize: '16px'}}
                                        onFocus={(e) => {
                                            e.currentTarget.style.boxShadow = '0 0 0 2px rgba(46, 125, 50, 0.5)';
                                            e.currentTarget.style.borderColor = '#2E7D32';
                                        }}
                                        onBlur={(e) => {
                                            e.currentTarget.style.boxShadow = '';
                                            e.currentTarget.style.borderColor = '#D1D5DB';
                                        }}
                                        placeholder="Enter your password"
                                        required
                                        autoComplete="current-password"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700 focus:outline-none"
                                    >
                                        <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                                    </button>
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full py-3 rounded-lg font-semibold text-white transition-all duration-300 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                                style={{backgroundColor: '#2E7D32', boxShadow: '0 4px 14px rgba(46, 125, 50, 0.39)'}}
                            >
                                {processing ? (
                                    <span className="flex items-center justify-center">
                                        <i className="fas fa-spinner fa-spin mr-2"></i>
                                        Signing in...
                                    </span>
                                ) : (
                                    <span className="flex items-center justify-center">
                                        <i className="fas fa-sign-in-alt mr-2"></i>
                                        Sign In
                                    </span>
                                )}
                            </button>
                        </form>

                        {/* Back to site link */}
                        <div className="mt-6 text-center">
                            <a 
                                href="/"
                                className="text-sm font-medium transition-colors"
                                style={{color: '#2E7D32'}}
                                onMouseEnter={(e) => e.currentTarget.style.color = '#1F5F23'}
                                onMouseLeave={(e) => e.currentTarget.style.color = '#2E7D32'}
                            >
                                <i className="fas fa-arrow-left mr-1"></i>
                                Back to Website
                            </a>
                        </div>
                    </div>

                    {/* Security Notice */}
                    <div className="mt-4 text-center">
                        <p className="text-sm font-medium" style={{color: '#6B7280'}}>
                            <i className="fas fa-shield-alt mr-1"></i>
                            Authorized personnel only
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}
