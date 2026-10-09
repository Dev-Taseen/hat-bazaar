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
            <div className="flex gap-3 items-center justify-center">
                <button onClick={() => handleSocial('google')}
                    className="flex gap-1 items-center font-semibold cursor-pointer py-1 px-2 border rounded text-green-700 border-gray-500">
                    <span><FaGoogle /></span>Google</button>
                <p className="text-2xl">|</p>
                <button onClick={() => handleSocial('github')}
                    className="flex gap-1 items-center font-semibold cursor-pointer py-1 px-2 border rounded text-green-700 border-gray-500">
                    <span><FaGithub /></span>GitHub</button>
            </div>
        </div>
    );
};

export default SignInPage;