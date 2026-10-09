'use client'
import { signOut, updateUser, useSession } from '@/app/lib/auth-client';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const fileToBase64 = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });

const ProfilePage = () => {
    const router = useRouter();
    const { data: session, isPending } = useSession();

    const [editing, setEditing] = useState(false);
    const [saving, setSaving] = useState(false);
    const [file, setFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);

    // logged in না থাকলে sign-in এ পাঠাও
    useEffect(() => {
        if (!isPending && !session) router.push('/sign-in');
    }, [isPending, session, router]);

    // preview URL cleanup
    useEffect(() => {
        return () => {
            if (preview) URL.revokeObjectURL(preview);
        };
    }, [preview]);

    if (isPending || !session) {
        return (
            <div className="max-w-2xl mx-auto my-10 px-4 animate-pulse">
                <div className="h-36 bg-gray-200 rounded-t-2xl" />
                <div className="h-64 bg-gray-100 rounded-b-2xl" />
            </div>
        );
    }

    const user = session.user;
    const joined = new Date(user.createdAt).toLocaleDateString('bn-BD', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selected = e.target.files?.[0];
        if (!selected) return;

        if (selected.size > 200 * 1024) {
            toast.error('ছবি সর্বোচ্চ 200KB হতে পারবে');
            e.target.value = '';
            return;
        }
        setFile(selected);
        setPreview(URL.createObjectURL(selected));
    };

    const closeEdit = () => {
        setEditing(false);
        setFile(null);
        setPreview(null);
    };

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const name = (formData.get('name') as string).trim();

        const updates: { name?: string; image?: string } = {};
        if (name && name !== user.name) updates.name = name;
        if (file) updates.image = await fileToBase64(file);

        if (Object.keys(updates).length === 0) {
            toast.info('কিছু পরিবর্তন করা হয়নি');
            return;
        }

        setSaving(true);
        const { error } = await updateUser(updates);
        setSaving(false);

        if (error) {
            toast.error(error.message ?? 'Something went wrong');
            return;
        }
        toast.success('প্রোফাইল আপডেট হয়েছে');
        closeEdit();
    };

    const handleSignOut = async () => {
        await signOut({ fetchOptions: { onSuccess: () => router.push('/') } });
    };

    const avatarSrc = preview || user.image;

    return (
        <div className="max-w-2xl mx-auto my-10 px-4 pb-10 pt-5">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
                {/* Cover */}
                <div className="h-36 bg-linear-to-r from-green-700 via-green-600 to-green-500" />

                {/* Avatar + actions */}
                <div className="px-6 pb-6">
                    <div className="flex items-end justify-between -mt-14">
                        <div className="relative group">
                            {avatarSrc ? (
                                // eslint-disable-next-line @next/next/no-img-element
                                <img
                                    src={avatarSrc}
                                    alt={user.name}
                                    className="w-28 h-28 rounded-full object-cover border-4 border-white shadow-md bg-white"
                                />
                            ) : (
                                <div className="w-28 h-28 rounded-full border-4 border-white shadow-md bg-green-700 text-white flex items-center justify-center text-4xl font-bold">
                                    {user.name?.charAt(0).toUpperCase()}
                                </div>
                            )}

                            {editing && (
                                <label
                                    htmlFor="photo-input"
                                    className="absolute inset-0 rounded-full bg-black/50 text-white text-xs font-medium flex items-center justify-center cursor-pointer opacity-0 group-hover:opacity-100 transition"
                                >
                                    📷 ছবি বদলান
                                </label>
                            )}
                        </div>

                        {!editing && (
                            <div className="flex gap-2 mb-2">
                                <button
                                    onClick={() => setEditing(true)}
                                    className="px-4 py-2 text-sm font-semibold rounded-lg bg-green-700 text-white hover:bg-green-800 transition cursor-pointer"
                                >
                                    ✏️ Edit Profile
                                </button>
                                <button
                                    onClick={handleSignOut}
                                    className="px-4 py-2 text-sm font-semibold rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition cursor-pointer"
                                >
                                    সাইন আউট
                                </button>
                            </div>
                        )}
                    </div>

                    {/* View mode */}
                    {!editing ? (
                        <>
                            <div className="mt-4">
                                <h1 className="text-2xl font-bold text-gray-900">{user.name}</h1>
                                <p className="text-gray-500">{user.email}</p>
                            </div>

                            <div className="grid sm:grid-cols-3 gap-3 mt-6">
                                <InfoCard label="নাম" value={user.name} />
                                <InfoCard label="ইমেইল" value={user.email} />
                                <InfoCard label="যোগ দিয়েছেন" value={joined} />
                            </div>

                            <div className="mt-4">
                                <span
                                    className={`inline-block text-xs font-semibold px-3 py-1 rounded-full ${
                                        user.emailVerified
                                            ? 'bg-green-100 text-green-700'
                                            : 'bg-yellow-100 text-yellow-700'
                                    }`}
                                >
                                    {user.emailVerified ? '✓ Email Verified' : 'Email Not Verified'}
                                </span>
                            </div>
                        </>
                    ) : (
                        /* Edit mode */
                        <form onSubmit={onSubmit} className="mt-6 space-y-4">
                            <input
                                id="photo-input"
                                type="file"
                                accept="image/*"
                                onChange={handleFileChange}
                                className="hidden"
                            />

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">নাম</label>
                                <input
                                    name="name"
                                    type="text"
                                    defaultValue={user.name}
                                    className="input input-bordered w-full"
                                    placeholder="আপনার নাম"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">ইমেইল</label>
                                <input
                                    type="email"
                                    value={user.email}
                                    disabled
                                    className="input input-bordered w-full bg-gray-100 cursor-not-allowed"
                                />
                            </div>

                            <div className="flex items-center gap-3">
                                <label
                                    htmlFor="photo-input"
                                    className="px-4 py-2 text-sm rounded-lg border border-gray-300 cursor-pointer hover:bg-gray-100"
                                >
                                    ছবি বাছাই করুন
                                </label>
                                <span className="text-xs text-gray-500">
                                    {file ? file.name : 'সর্বোচ্চ 200KB'}
                                </span>
                            </div>

                            <div className="flex gap-2 pt-2">
                                <button
                                    type="submit"
                                    disabled={saving}
                                    className="px-5 py-2 text-sm font-semibold rounded-lg bg-green-700 text-white hover:bg-green-800 disabled:opacity-60 cursor-pointer"
                                >
                                    {saving ? 'সেভ হচ্ছে...' : 'সেভ করুন'}
                                </button>
                                <button
                                    type="button"
                                    onClick={closeEdit}
                                    className="px-5 py-2 text-sm font-semibold rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 cursor-pointer"
                                >
                                    বাতিল
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};

const InfoCard = ({ label, value }: { label: string; value: string }) => (
    <div className="rounded-xl bg-gray-50 border border-gray-100 p-4">
        <p className="text-xs uppercase tracking-wide text-gray-400">{label}</p>
        <p className="mt-1 font-medium text-gray-800 break-words">{value}</p>
    </div>
);

export default ProfilePage;