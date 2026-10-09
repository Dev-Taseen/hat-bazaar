'use client'
import { signIn } from '@/app/lib/auth-client';
import React from 'react';
import { FaGithub, FaGoogle } from 'react-icons/fa';
import { toast } from 'react-toastify';

const SignInPage = () => {
    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const user = Object.fromEntries(formData.entries()) as { email: string, password: string, callBackUrl: string, };

        const { data, error } = await signIn.email({
            ...user,
            callbackURL: "/"
        })

        if (data) {
            toast.success("Succesfully loggedIn")
        } else {
            toast.error(`${error.message}`)
        }
    }
    const handleSocial = async (provider: 'github' | 'google') => {
        await signIn.social({ provider, callbackURL: '/' });
    };

    return (
        <div className='p-10 grid justify-center'>
            <form onSubmit={onSubmit}>
                <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
                    <legend className="fieldset-legend text-2xl font-semibold">সাইন ইন</legend>

                    <label className="label">Email</label>
                    <input name='email' type="email" className="input" placeholder="Email" />

                    <label className="label">Password</label>
                    <input name='password' type="password" className="input" placeholder="Password" />

                    <button type='submit' className="btn btn-neutral mt-4 bg-green-700 border ">সাইন ইন করুন</button>
                </fieldset>
            </form>
            <div className="flex flex-col sm:flex-row gap-3 items-center justify-center w-full max-w-md mx-auto">
                <button
                    onClick={() => handleSocial('google')}
                    className="group flex flex-1 w-full items-center justify-center gap-2.5 rounded-xl border border-gray-200 bg-white px-5 py-2.5 text-sm font-semibold text-gray-700 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-gray-300 hover:bg-gray-50 hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-red-400 focus-visible:ring-offset-2 active:translate-y-0 active:scale-[0.98] cursor-pointer"
                >
                    <FaGoogle className="text-lg text-red-500 transition-transform duration-200 group-hover:scale-110" />
                    <span>Google</span>
                </button>

                <button
                    onClick={() => handleSocial('github')}
                    className="group flex flex-1 w-full items-center justify-center gap-2.5 rounded-xl border border-gray-900 bg-gray-900 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-gray-800 hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-700 focus-visible:ring-offset-2 active:translate-y-0 active:scale-[0.98] cursor-pointer"
                >
                    <FaGithub className="text-lg transition-transform duration-200 group-hover:scale-110" />
                    <span>GitHub</span>
                </button>
            </div>
        </div>
    );
};

export default SignInPage;