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
                        className='text-[14px] rounded p-1.5 border border-gray-400 bg-green-700 text-white cursor-pointer'
                    >
                        সাইন আউট
                    </button>
                </div>
            ) : (
                <div className=' flex gap-2.5'>
                    <Link href='/sign_in'><button className='btn rounded'>সাইন ইন</button></Link>
                    <Link href='/sign_up'><button className='btn bg-green-600 text-white rounded'>সাইন আপ</button></Link>
                </div>
            )}
        </>
    );
};

export default AuthLinks;