'use client';
import { signIn } from '@/app/lib/auth-client';
import Link from 'next/link';
import React, { useState } from 'react';
import { FaGithub, FaGoogle } from 'react-icons/fa';
import { FiHome, FiUserPlus } from 'react-icons/fi';
import { toast } from 'react-toastify';

const SignInPage = () => {
    const [loading, setLoading] = useState(false);

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const email = formData.get('email') as string;
        const password = formData.get('password') as string;

        setLoading(true);
        try {
            const { data, error } = await signIn.email({
                email,
                password,
                callbackURL: '/',
            });

            if (data) {
                toast.success('সফলভাবে সাইন ইন হয়েছে');
            } else {
                toast.error(error?.message ?? 'কিছু একটা সমস্যা হয়েছে');
            }
        } finally {
            setLoading(false);
        }
    };

    const handleSocial = async (provider: 'github' | 'google') => {
        await signIn.social({ provider, callbackURL: '/' });
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-white to-emerald-50 px-4 py-10">
            <div className="w-full max-w-md rounded-2xl border border-gray-100 bg-white p-6 shadow-xl sm:p-8">
                {/* Header */}
                <div className="mb-6 text-center">
                    <h1 className="text-3xl font-bold text-gray-800">সাইন ইন</h1>
                    <p className="mt-2 text-sm text-gray-500">
                        আপনার অ্যাকাউন্টে প্রবেশ করতে তথ্য দিন
                    </p>
                </div>

                {/* Form */}
                <form onSubmit={onSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-gray-700">
                            ইমেইল
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            required
                            placeholder="example@email.com"
                            className="input input-bordered w-full bg-gray-50 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200"
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-gray-700">
                            পাসওয়ার্ড
                        </label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            required
                            placeholder="••••••••"
                            className="input input-bordered w-full bg-gray-50 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full cursor-pointer rounded-xl bg-green-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-green-700 hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2 active:translate-y-0 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
                    >
                        {loading ? 'অপেক্ষা করুন...' : 'সাইন ইন করুন'}
                    </button>
                </form>

                {/* Divider */}
                <div className="my-6 flex items-center gap-3">
                    <span className="h-px flex-1 bg-gray-200" />
                    <span className="text-xs font-medium text-gray-400">অথবা</span>
                    <span className="h-px flex-1 bg-gray-200" />
                </div>

                {/* Social buttons */}
                <div className="flex flex-col gap-3 sm:flex-row">
                    <button
                        type="button"
                        onClick={() => handleSocial('google')}
                        className="group flex w-full flex-1 cursor-pointer items-center justify-center gap-2.5 rounded-xl border border-gray-200 bg-white px-5 py-2.5 text-sm font-semibold text-gray-700 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-gray-300 hover:bg-gray-50 hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-red-400 focus-visible:ring-offset-2 active:translate-y-0 active:scale-[0.98]"
                    >
                        <FaGoogle className="text-lg text-red-500 transition-transform duration-200 group-hover:scale-110" />
                        <span>গুগল</span>
                    </button>

                    <button
                        type="button"
                        onClick={() => handleSocial('github')}
                        className="group flex w-full flex-1 cursor-pointer items-center justify-center gap-2.5 rounded-xl border border-gray-900 bg-gray-900 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-gray-800 hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-700 focus-visible:ring-offset-2 active:translate-y-0 active:scale-[0.98]"
                    >
                        <FaGithub className="text-lg transition-transform duration-200 group-hover:scale-110" />
                        <span>গিটহাব</span>
                    </button>
                </div>

                {/* New here? */}
                <div className="mt-6 text-center">
                    <p className="mb-3 text-sm text-gray-500">নতুন ব্যবহারকারী?</p>
                    <Link
                        href="/sign_up"
                        className="flex w-full items-center justify-center gap-2 rounded-xl border border-green-600 px-5 py-2.5 text-sm font-semibold text-green-700 transition-all duration-200 hover:-translate-y-0.5 hover:bg-green-50 hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2 active:translate-y-0 active:scale-[0.98]"
                    >
                        <FiUserPlus className="text-lg" />
                        <span>সাইন আপ করুন</span>
                    </Link>
                </div>

                {/* Back to home */}
                <div className="mt-4">
                    <Link
                        href="/"
                        className="flex w-full items-center justify-center gap-2 rounded-xl bg-gray-100 px-5 py-2.5 text-sm font-semibold text-gray-700 transition-all duration-200 hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-offset-2 active:scale-[0.98]"
                    >
                        <FiHome className="text-lg" />
                        <span>হোমে ফিরে যান</span>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default SignInPage;