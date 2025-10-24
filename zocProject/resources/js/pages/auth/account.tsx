import React, { useState } from 'react';
import { Head, Link, useForm, router } from '@inertiajs/react';
import { UserIcon, LockClosedIcon, EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';

interface AccountProps {
    status?: string;
    canResetPassword: boolean;
}

export default function Account({ status, canResetPassword }: AccountProps) {
    const [isLogin, setIsLogin] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    
    const loginForm = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const registerForm = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const handleLoginSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        loginForm.post('/login', {
            onFinish: () => loginForm.reset('password'),
        });
    };

    const handleRegisterSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        registerForm.post('/register', {
            onFinish: () => registerForm.reset('password', 'password_confirmation'),
        });
    };

    return (
        <>
            <Head title={isLogin ? "Login" : "Register"} />
            
            <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-md">
                    <div className="text-center">
                        <Link href="/" className="text-2xl font-bold text-green-800">
                            ZOC Farm
                        </Link>
                        <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
                            {isLogin ? "Sign in to your account" : "Create your account"}
                        </h2>
                    </div>
                </div>

                <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                    <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                        {status && (
                            <div className="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
                                {status}
                            </div>
                        )}

                        {/* Toggle Login/Register */}
                        <div className="flex mb-6 bg-gray-100 rounded-lg p-1">
                            <button
                                type="button"
                                onClick={() => setIsLogin(true)}
                                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                                    isLogin
                                        ? 'bg-white text-green-800 shadow-sm'
                                        : 'text-gray-600 hover:text-gray-800'
                                }`}
                            >
                                Login
                            </button>
                            <button
                                type="button"
                                onClick={() => setIsLogin(false)}
                                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                                    !isLogin
                                        ? 'bg-white text-green-800 shadow-sm'
                                        : 'text-gray-600 hover:text-gray-800'
                                }`}
                            >
                                Register
                            </button>
                        </div>

                        {isLogin ? (
                            /* Login Form */
                            <form onSubmit={handleLoginSubmit} className="space-y-6">
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                        Email address
                                    </label>
                                    <div className="mt-1 relative">
                                        <input
                                            id="email"
                                            name="email"
                                            type="email"
                                            autoComplete="email"
                                            required
                                            value={loginForm.data.email}
                                            onChange={(e) => loginForm.setData('email', e.target.value)}
                                            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                                            placeholder="Enter your email"
                                        />
                                        <UserIcon className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
                                    </div>
                                    {loginForm.errors.email && (
                                        <p className="mt-1 text-sm text-red-600">{loginForm.errors.email}</p>
                                    )}
                                </div>

                                <div>
                                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                        Password
                                    </label>
                                    <div className="mt-1 relative">
                                        <input
                                            id="password"
                                            name="password"
                                            type={showPassword ? "text" : "password"}
                                            autoComplete="current-password"
                                            required
                                            value={loginForm.data.password}
                                            onChange={(e) => loginForm.setData('password', e.target.value)}
                                            className="appearance-none block w-full px-3 py-2 pr-10 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                                            placeholder="Enter your password"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-3 top-2.5 h-5 w-5 text-gray-400 hover:text-gray-600"
                                        >
                                            {showPassword ? <EyeSlashIcon /> : <EyeIcon />}
                                        </button>
                                    </div>
                                    {loginForm.errors.password && (
                                        <p className="mt-1 text-sm text-red-600">{loginForm.errors.password}</p>
                                    )}
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className="flex items-center">
                                        <input
                                            id="remember"
                                            name="remember"
                                            type="checkbox"
                                            checked={loginForm.data.remember}
                                            onChange={(e) => loginForm.setData('remember', e.target.checked)}
                                            className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                                        />
                                        <label htmlFor="remember" className="ml-2 block text-sm text-gray-900">
                                            Remember me
                                        </label>
                                    </div>

                                    {canResetPassword && (
                                        <div className="text-sm">
                                            <Link
                                                href="/forgot-password"
                                                className="font-medium text-green-600 hover:text-green-500"
                                            >
                                                Forgot your password?
                                            </Link>
                                        </div>
                                    )}
                                </div>

                                <div>
                                    <button
                                        type="submit"
                                        disabled={loginForm.processing}
                                        className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {loginForm.processing ? 'Signing in...' : 'Sign in'}
                                    </button>
                                </div>
                            </form>
                        ) : (
                            /* Register Form */
                            <form onSubmit={handleRegisterSubmit} className="space-y-6">
                                <div>
                                    <label htmlFor="register-name" className="block text-sm font-medium text-gray-700">
                                        Full Name
                                    </label>
                                    <div className="mt-1">
                                        <input
                                            id="register-name"
                                            name="name"
                                            type="text"
                                            autoComplete="name"
                                            required
                                            value={registerForm.data.name}
                                            onChange={(e) => registerForm.setData('name', e.target.value)}
                                            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                                            placeholder="Enter your full name"
                                        />
                                    </div>
                                    {registerForm.errors.name && (
                                        <p className="mt-1 text-sm text-red-600">{registerForm.errors.name}</p>
                                    )}
                                </div>

                                <div>
                                    <label htmlFor="register-email" className="block text-sm font-medium text-gray-700">
                                        Email address
                                    </label>
                                    <div className="mt-1">
                                        <input
                                            id="register-email"
                                            name="email"
                                            type="email"
                                            autoComplete="email"
                                            required
                                            value={registerForm.data.email}
                                            onChange={(e) => registerForm.setData('email', e.target.value)}
                                            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                                            placeholder="Enter your email"
                                        />
                                    </div>
                                    {registerForm.errors.email && (
                                        <p className="mt-1 text-sm text-red-600">{registerForm.errors.email}</p>
                                    )}
                                </div>

                                <div>
                                    <label htmlFor="register-password" className="block text-sm font-medium text-gray-700">
                                        Password
                                    </label>
                                    <div className="mt-1">
                                        <input
                                            id="register-password"
                                            name="password"
                                            type="password"
                                            autoComplete="new-password"
                                            required
                                            value={registerForm.data.password}
                                            onChange={(e) => registerForm.setData('password', e.target.value)}
                                            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                                            placeholder="Enter your password"
                                        />
                                    </div>
                                    {registerForm.errors.password && (
                                        <p className="mt-1 text-sm text-red-600">{registerForm.errors.password}</p>
                                    )}
                                </div>

                                <div>
                                    <label htmlFor="register-password-confirmation" className="block text-sm font-medium text-gray-700">
                                        Confirm Password
                                    </label>
                                    <div className="mt-1">
                                        <input
                                            id="register-password-confirmation"
                                            name="password_confirmation"
                                            type="password"
                                            autoComplete="new-password"
                                            required
                                            value={registerForm.data.password_confirmation}
                                            onChange={(e) => registerForm.setData('password_confirmation', e.target.value)}
                                            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                                            placeholder="Confirm your password"
                                        />
                                    </div>
                                    {registerForm.errors.password_confirmation && (
                                        <p className="mt-1 text-sm text-red-600">{registerForm.errors.password_confirmation}</p>
                                    )}
                                </div>

                                <div>
                                    <button
                                        type="submit"
                                        disabled={registerForm.processing}
                                        className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {registerForm.processing ? 'Creating account...' : 'Create account'}
                                    </button>
                                </div>
                            </form>
                        )}

                        <div className="mt-6 text-center">
                            <Link
                                href="/products"
                                className="text-sm text-green-600 hover:text-green-500"
                            >
                                ← Back to shopping
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}