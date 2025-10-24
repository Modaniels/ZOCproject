import React from 'react';
import { Head, useForm, usePage, Link } from '@inertiajs/react';
import { UserIcon } from '@heroicons/react/24/outline';
import Navigation from '../../components/Navigation';

interface User {
    id: number;
    name: string;
    email: string;
    phone?: string;
    address?: string;
    city?: string;
    county?: string;
    email_verified_at?: string;
}

interface ProfileProps {
    mustVerifyEmail: boolean;
    status?: string;
}

export default function Profile({ mustVerifyEmail, status }: ProfileProps) {
    const { auth } = usePage<{ auth: { user: User } }>().props;
    
    const { data, setData, patch, errors, processing, recentlySuccessful } = useForm({
        name: auth.user?.name || '',
        email: auth.user?.email || '',
        phone: auth.user?.phone || '',
        address: auth.user?.address || '',
        city: auth.user?.city || '',
        county: auth.user?.county || '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        patch('/settings/profile');
    };

    return (
        <>
            <Head title="Profile Settings" />
            
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
                                        <span className="ml-4 text-gray-900 font-medium">Profile</span>
                                    </li>
                                </ol>
                            </nav>
                            
                            <div className="mt-4">
                                <h1 className="text-2xl font-bold" style={{fontFamily: 'Space Grotesk, sans-serif', color: '#3A4C2F'}}>Profile Settings</h1>
                                <p className="text-gray-600">Update your personal information and account details.</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                            {/* Sidebar */}
                            <div className="lg:col-span-1">
                                <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                                    <nav className="space-y-1">
                                        <Link
                                            href="/settings/profile"
                                            className="flex items-center text-sm font-medium px-3 py-2 rounded-lg border-l-4 border-opacity-100"
                                            style={{backgroundColor: '#3A4C2F', color: 'white', borderColor: '#F4C542'}}
                                        >
                                            <UserIcon className="mr-3 h-5 w-5" style={{color: '#F4C542'}} />
                                            Profile
                                        </Link>
                                        <Link
                                            href="/settings/password"
                                            className="border-transparent text-gray-900 hover:bg-gray-50 hover:text-gray-900 group border-l-4 px-3 py-2 flex items-center text-sm font-medium rounded-lg"
                                        >
                                            <svg className="text-gray-400 group-hover:text-gray-500 mr-3 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                            </svg>
                                            Password
                                        </Link>
                                    </nav>
                                </div>
                            </div>

                            {/* Main Content */}
                            <div className="lg:col-span-3">
                                <div className="bg-white rounded-xl shadow-lg border border-gray-100">
                                    <div className="px-6 py-4 border-b border-gray-200">
                                        <h2 className="text-lg font-medium" style={{fontFamily: 'Space Grotesk, sans-serif', color: '#3A4C2F'}}>Personal Information</h2>
                                        <p className="text-sm text-gray-600">Update your account's profile information and email address.</p>
                                    </div>
                                    
                                    <form onSubmit={submit} className="p-6 space-y-6">
                                        {/* Name */}
                                        <div>
                                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                                Full Name
                                            </label>
                                            <input
                                                id="name"
                                                type="text"
                                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:border-transparent"
                                                style={{'--focus-ring-color': '#3A4C2F', 'focusRingColor': '#3A4C2F'} as React.CSSProperties}
                                                value={data.name}
                                                onChange={(e) => setData('name', e.target.value)}
                                                required
                                                autoComplete="name"
                                                onFocus={(e) => e.target.style.borderColor = '#3A4C2F'}
                                                onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                                            />
                                            {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                                        </div>

                                        {/* Email */}
                                        <div>
                                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                                Email Address
                                            </label>
                                            <input
                                                id="email"
                                                type="email"
                                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:border-transparent"
                                                style={{'--focus-ring-color': '#3A4C2F'} as React.CSSProperties}
                                                value={data.email}
                                                onChange={(e) => setData('email', e.target.value)}
                                                required
                                                autoComplete="email"
                                                onFocus={(e) => e.target.style.borderColor = '#3A4C2F'}
                                                onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                                            />
                                            {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                                            
                                            {mustVerifyEmail && auth.user.email_verified_at === null && (
                                                <div className="mt-2">
                                                    <p className="text-sm text-gray-800">
                                                        Your email address is unverified.
                                                        <Link
                                                            href="/email/verification-notification"
                                                            method="post"
                                                            as="button"
                                                            className="ml-1 underline text-sm text-gray-600 hover:text-gray-900"
                                                        >
                                                            Click here to re-send the verification email.
                                                        </Link>
                                                    </p>
                                                    {status === 'verification-link-sent' && (
                                                        <div className="mt-2 text-sm font-medium text-green-600">
                                                            A new verification link has been sent to your email address.
                                                        </div>
                                                    )}
                                                </div>
                                            )}
                                        </div>

                                        {/* Phone */}
                                        <div>
                                            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                                                Phone Number
                                            </label>
                                            <input
                                                id="phone"
                                                type="tel"
                                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:border-transparent"
                                                style={{'--focus-ring-color': '#3A4C2F'} as React.CSSProperties}
                                                value={data.phone}
                                                onChange={(e) => setData('phone', e.target.value)}
                                                autoComplete="tel"
                                                placeholder="e.g. +254 712 345 678"
                                                onFocus={(e) => e.target.style.borderColor = '#3A4C2F'}
                                                onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                                            />
                                            {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
                                        </div>

                                        {/* Address */}
                                        <div>
                                            <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                                                Address
                                            </label>
                                            <textarea
                                                id="address"
                                                rows={3}
                                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:border-transparent"
                                                style={{'--focus-ring-color': '#3A4C2F'} as React.CSSProperties}
                                                value={data.address}
                                                onChange={(e) => setData('address', e.target.value)}
                                                placeholder="Enter your full address"
                                                onFocus={(e) => e.target.style.borderColor = '#3A4C2F'}
                                                onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                                            />
                                            {errors.address && <p className="mt-1 text-sm text-red-600">{errors.address}</p>}
                                        </div>

                                        {/* City and County */}
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div>
                                                <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                                                    City
                                                </label>
                                                <input
                                                    id="city"
                                                    type="text"
                                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:border-transparent"
                                                    style={{'--focus-ring-color': '#3A4C2F'} as React.CSSProperties}
                                                    value={data.city}
                                                    onChange={(e) => setData('city', e.target.value)}
                                                    placeholder="e.g. Nairobi"
                                                    onFocus={(e) => e.target.style.borderColor = '#3A4C2F'}
                                                    onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                                                />
                                                {errors.city && <p className="mt-1 text-sm text-red-600">{errors.city}</p>}
                                            </div>

                                            <div>
                                                <label htmlFor="county" className="block text-sm font-medium text-gray-700">
                                                    County
                                                </label>
                                                <input
                                                    id="county"
                                                    type="text"
                                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:border-transparent"
                                                    style={{'--focus-ring-color': '#3A4C2F'} as React.CSSProperties}
                                                    value={data.county}
                                                    onChange={(e) => setData('county', e.target.value)}
                                                    placeholder="e.g. Nairobi County"
                                                    onFocus={(e) => e.target.style.borderColor = '#3A4C2F'}
                                                    onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                                                />
                                                {errors.county && <p className="mt-1 text-sm text-red-600">{errors.county}</p>}
                                            </div>
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
                                                    {processing ? 'Saving...' : 'Save Changes'}
                                                </button>

                                                {recentlySuccessful && (
                                                    <p className="ml-3 text-sm" style={{color: '#3A4C2F'}}>
                                                        Saved successfully.
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    </form>
                                </div>

                                {/* Delete Account Section */}
                                <div className="mt-8 bg-white rounded-xl shadow-lg border border-gray-100">
                                    <div className="px-6 py-4 border-b border-gray-200">
                                        <h2 className="text-lg font-medium" style={{fontFamily: 'Space Grotesk, sans-serif', color: '#3A4C2F'}}>Delete Account</h2>
                                        <p className="text-sm text-gray-600">Permanently delete your account and all associated data.</p>
                                    </div>
                                    
                                    <div className="p-6">
                                        <p className="text-sm text-gray-600 mb-4">
                                            Once your account is deleted, all of your resources and data will be permanently deleted. 
                                            Before deleting your account, please download any data or information that you wish to retain.
                                        </p>
                                        
                                        <button
                                            type="button"
                                            className="inline-flex items-center px-4 py-2 bg-red-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-red-700 focus:bg-red-700 active:bg-red-900 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition ease-in-out duration-150"
                                            onClick={() => {
                                                if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
                                                    // Handle account deletion
                                                }
                                            }}
                                        >
                                            Delete Account
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}