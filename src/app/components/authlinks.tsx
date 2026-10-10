'use client'
import Link from 'next/link';
import { signOut, useSession } from '@/app/lib/auth-client';

const primaryBtn =
    'inline-flex items-center justify-center whitespace-nowrap rounded-lg sm:rounded-xl border-2 border-green-600 bg-gradient-to-r from-green-600 to-emerald-500 px-3 py-1.5 text-xs sm:px-5 sm:py-2 sm:text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:from-green-700 hover:to-emerald-600 hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2 active:translate-y-0 active:scale-[0.98]';

const outlineBtn =
    'inline-flex items-center justify-center whitespace-nowrap rounded-lg sm:rounded-xl border-2 border-green-600 bg-transparent px-3 py-1.5 text-xs sm:px-5 sm:py-2 sm:text-sm font-semibold text-green-700 transition-all duration-200 hover:-translate-y-0.5 hover:bg-green-50 hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2 active:translate-y-0 active:scale-[0.98]';

const AuthLinks = () => {
    const { data: session } = useSession();

    const handleSignOut = async () => {
        await signOut();
    };

    const user = session?.user;

    return (
        <>
            {user ? (
                <div className='flex items-center gap-2 sm:gap-3'>
                    <Link
                        href='/profile'
                        title={user.name}
                        className='flex min-w-0 items-center gap-2'
                    >
                        {user.image ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                                src={user.image}
                                alt={user.name}
                                className='h-8 w-8 sm:h-9 sm:w-9 shrink-0 rounded-full border border-gray-300 object-cover'
                            />
                        ) : (
                            <div className='flex h-8 w-8 sm:h-9 sm:w-9 shrink-0 items-center justify-center rounded-full bg-green-700 text-sm font-semibold text-white'>
                                {user.name?.charAt(0).toUpperCase()}
                            </div>
                        )}
                        <span className='hidden max-w-[8rem] truncate md:inline lg:max-w-[12rem]'>
                            {user.name}
                        </span>
                    </Link>

                    <button onClick={handleSignOut} className={primaryBtn}>
                        সাইন আউট
                    </button>
                </div>
            ) : (
                <div className='flex items-center gap-2 sm:gap-2.5'>
                    <Link href='/sign_in' className={outlineBtn}>
                        সাইন ইন
                    </Link>

                    <Link href='/sign_up' className={primaryBtn}>
                        সাইন আপ
                    </Link>
                </div>
            )}
        </>
    );
};

export default AuthLinks;