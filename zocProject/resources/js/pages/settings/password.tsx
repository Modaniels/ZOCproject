import React, { useRef } from 'react';
import { Head, useForm, Link } from '@inertiajs/react';
import { LockClosedIcon } from '@heroicons/react/24/outline';
import Navigation from '../../components/Navigation';

export default function Password() {
    const passwordInput = useRef<HTMLInputElement>(null);
    const currentPasswordInput = useRef<HTMLInputElement>(null);

    const { data, setData, put, errors, processing, recentlySuccessful, reset } = useForm({
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        
        put('/settings/password', {
            preserveScroll: true,
            onSuccess: () => reset(),
            onError: (errors) => {
                if (errors.password) {
                    reset('password', 'password_confirmation');
                    passwordInput.current?.focus();
                }

                if (errors.current_password) {
                    reset('current_password');
                    currentPasswordInput.current?.focus();
                }
            },
        });
    };

    return (
        <>
            <Head title="Password Settings" />
            
            <div className="min-h-screen bg-gray-50">
                <Navigation showAccount={true} />
                
                <div className="pt-20 pb-12">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                        {/* Header */}
                        <div className="mb-8">
                            <nav className="flex" aria-label="Breadcrumb">
                                <ol className="flex items-center space-x-4">
                                    <li>
                                        <Link href="/" className="text-gray-400 hover:text-gray-500">
                                            Home
                                        </Link>
                                    </li>
                                    <li className="flex items-center">
                                        <svg className="h-5 w-5 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                        </svg>
                                        <span className="ml-4 text-gray-500">Settings</span>
                                    </li>
                                    <li className="flex items-center">
                                        <svg className="h-5 w-5 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                        </svg>
                                        <span className="ml-4 text-gray-900 font-medium">Password</span>
                                    </li>
                                </ol>
                            </nav>
                            
                            <div className="mt-4">
                                <h1 className="text-2xl font-bold" style={{fontFamily: 'Space Grotesk, sans-serif', color: '#3A4C2F'}}>Password Settings</h1>
                                <p className="text-gray-600">Ensure your account is using a long, random password to stay secure.</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                            {/* Sidebar */}
                            <div className="lg:col-span-1">
                                <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                                    <nav className="space-y-1">
                                        <Link
                                            href="/settings/profile"
                                            className="border-transparent text-gray-900 hover:bg-gray-50 hover:text-gray-900 group border-l-4 px-3 py-2 flex items-center text-sm font-medium rounded-lg"
                                        >
                                            <svg className="text-gray-400 group-hover:text-gray-500 mr-3 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                            </svg>
                                            Profile
                                        </Link>
                                        <Link
                                            href="/settings/password"
                                            className="flex items-center text-sm font-medium px-3 py-2 rounded-lg border-l-4 border-opacity-100"
                                            style={{backgroundColor: '#3A4C2F', color: 'white', borderColor: '#F4C542'}}
                                        >
                                            <LockClosedIcon className="mr-3 h-5 w-5" style={{color: '#F4C542'}} />
                                            Password
                                        </Link>
                                    </nav>
                                </div>
                            </div>

                            {/* Main Content */}
                            <div className="lg:col-span-3">
                                <div className="bg-white rounded-xl shadow-lg border border-gray-100">
                                    <div className="px-6 py-4 border-b border-gray-200">
                                        <h2 className="text-lg font-medium" style={{fontFamily: 'Space Grotesk, sans-serif', color: '#3A4C2F'}}>Update Password</h2>
                                        <p className="text-sm text-gray-600">Ensure your account is using a long, random password to stay secure.</p>
                                    </div>
                                    
                                    <form onSubmit={submit} className="p-6 space-y-6">
                                        {/* Current Password */}
                                        <div>
                                            <label htmlFor="current_password" className="block text-sm font-medium text-gray-700">
                                                Current Password
                                            </label>
                                            <input
                                                id="current_password"
                                                ref={currentPasswordInput}
                                                type="password"
                                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:border-transparent"
                                                style={{'--focus-ring-color': '#3A4C2F'} as React.CSSProperties}
                                                value={data.current_password}
                                                onChange={(e) => setData('current_password', e.target.value)}
                                                autoComplete="current-password"
                                                onFocus={(e) => e.target.style.borderColor = '#3A4C2F'}
                                                onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                                            />
                                            {errors.current_password && (
                                                <p className="mt-1 text-sm text-red-600">{errors.current_password}</p>
                                            )}
                                        </div>

                                        {/* New Password */}
                                        <div>
                                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                                New Password
                                            </label>
                                            <input
                                                id="password"
                                                ref={passwordInput}
                                                type="password"
                                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:border-transparent"
                                                style={{'--focus-ring-color': '#3A4C2F'} as React.CSSProperties}
                                                value={data.password}
                                                onChange={(e) => setData('password', e.target.value)}
                                                autoComplete="new-password"
                                                onFocus={(e) => e.target.style.borderColor = '#3A4C2F'}
                                                onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                                            />
                                            {errors.password && (
                                                <p className="mt-1 text-sm text-red-600">{errors.password}</p>
                                            )}
                                        </div>

                                        {/* Confirm Password */}
                                        <div>
                                            <label htmlFor="password_confirmation" className="block text-sm font-medium text-gray-700">
                                                Confirm Password
                                            </label>
                                            <input
                                                id="password_confirmation"
                                                type="password"
                                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:border-transparent"
                                                style={{'--focus-ring-color': '#3A4C2F'} as React.CSSProperties}
                                                value={data.password_confirmation}
                                                onChange={(e) => setData('password_confirmation', e.target.value)}
                                                autoComplete="new-password"
                                                onFocus={(e) => e.target.style.borderColor = '#3A4C2F'}
                                                onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                                            />
                                            {errors.password_confirmation && (
                                                <p className="mt-1 text-sm text-red-600">{errors.password_confirmation}</p>
                                            )}
                                        </div>

                                        {/* Submit Button */}
                                        <div className="flex items-center justify-between pt-4">
                                            <div className="flex items-center">
                                                <button
                                                    type="submit"
                                                    disabled={processing}
                                                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest focus:outline-none focus:ring-2 focus:ring-offset-2 transition ease-in-out duration-150 disabled:opacity-50"
                                                    style={{backgroundColor: '#3A4C2F', focusRingColor: '#3A4C2F'}}
                                                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#2D3B22'}
                                                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#3A4C2F'}
                                                >
                                                    {processing ? 'Saving...' : 'Save'}
                                                </button>

                                                {recentlySuccessful && (
                                                    <p className="ml-3 text-sm" style={{color: '#3A4C2F'}}>
                                                        Saved.
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}