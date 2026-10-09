'use client'
import Link from 'next/link';
import { signOut, useSession } from '@/app/lib/auth-client';

const AuthLinks = () => {
    const { data: session } = useSession();

    const handleSignOut = async () => {
        await signOut();
    };

    const user = session?.user;

    return (
        <>
            {user ? (
                <div className='flex gap-3 items-center'>
                    <Link href='/profile' className='flex items-center gap-2'>
                        {user.image ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                                src={user.image}
                                alt={user.name}
                                className='w-9 h-9 rounded-full object-cover border border-gray-300'
                            />
                        ) : (
                            <div className='w-9 h-9 rounded-full bg-green-700 text-white flex items-center justify-center font-semibold'>
                                {user.name?.charAt(0).toUpperCase()}
                            </div>
                        )}
                        <span>{user.name}</span>
                    </Link>

                    <button
                        onClick={handleSignOut}
                        className='inline-flex items-center justify-center rounded-xl border-2 border-green-600 bg-gradient-to-r from-green-600 to-emerald-500 px-5 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:from-green-700 hover:to-emerald-600 hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2 active:translate-y-0 active:scale-[0.98]'
                    >
                        সাইন আউট
                    </button>
                </div>
            ) : (
                <div className="flex items-center gap-2.5">
                    <Link
                        href="/sign_in"
                        className="inline-flex items-center justify-center rounded-xl border-2 border-green-600 bg-transparent px-5 py-2 text-sm font-semibold text-green-700 transition-all duration-200 hover:-translate-y-0.5 hover:bg-green-50 hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2 active:translate-y-0 active:scale-[0.98]"
                    >
                        সাইন ইন
                    </Link>

                    <Link
                        href="/sign_up"
                        className="inline-flex items-center justify-center rounded-xl border-2 border-green-600 bg-gradient-to-r from-green-600 to-emerald-500 px-5 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:from-green-700 hover:to-emerald-600 hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2 active:translate-y-0 active:scale-[0.98]"
                    >
                        সাইন আপ
                    </Link>
                </div>
            )}
        </>
    );
};

export default AuthLinks;