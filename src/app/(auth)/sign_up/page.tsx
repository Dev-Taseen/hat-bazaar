'use client';
import { signIn, signUp } from '@/app/lib/auth-client';
import { useRouter } from 'next/navigation';
import React from 'react';
import { toast } from 'react-toastify';

const fileToBase64 = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });

const SignUpPage = () => {
    const router = useRouter();

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        const name = formData.get('name') as string;
        const email = formData.get('email') as string;
        const password = formData.get('password') as string;
        const photo = formData.get('photo') as File;

        // only convert if a file was actually chosen
        const image = photo && photo.size > 0 ? await fileToBase64(photo) : undefined;

        const { data, error } = await signUp.email({
            name,
            email,
            password,
            image,
        });

        if (error) {
            toast.error(error.message ?? 'Something went wrong');
            return;
        }

        toast.success('Account created successfully');
        router.push('/');
    };

    const handleSocial = async (provider: 'github' | 'google') => {
        await signIn.social({ provider, callbackURL: '/' });
    };

    return (
        <div className="p-10 grid justify-center ">
            <form onSubmit={onSubmit}>
                <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
                    <legend className="fieldset-legend text-2xl font-semibold">সাইন আপ</legend>

                    <label className="label">Name</label>
                    <input name="name" type="text" className="input" placeholder="Name" />

                    <label className="label">Photo</label>
                    <input name="photo" type="file" accept="image/*" className="file-input" />

                    <label className="label">Email</label>
                    <input name='email' type="email" className="input" placeholder="Email" />

                    <label className="label">Password</label>
                    <input name='password' type="password" className="input" placeholder="Password" />

                    <button type='submit' className="btn btn-neutral mt-4 bg-green-600">সাইন আপ করুন</button>

                </fieldset>
            </form>
            <div className="flex gap-3 items-center justify-center">
                <button onClick={() => handleSocial('google')} className="font-semibold cursor-pointer py-1 px-2 border rounded text-red-700 border-gray-500">Google</button>
                <p className="text-2xl">|</p>
                <button onClick={() => handleSocial('github')} className="font-semibold cursor-pointer py-1 px-2 border rounded text-red-700 border-gray-500">GitHub</button>
            </div>
        </div>
    );
};

export default SignUpPage;