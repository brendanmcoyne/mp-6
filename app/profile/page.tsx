'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

type User = {
    name?: string;
    email?: string;
    verified_email?: boolean;
    login?: string; // GitHub username
    avatar_url?: string; // GitHub avatar
    provider?: 'google' | 'github';
};

export default function ProfilePage() {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const userParam = urlParams.get('user');
        const provider = urlParams.get('provider'); // optional, pass from callback redirect

        if (userParam) {
            try {
                const decoded = decodeURIComponent(userParam);
                const userObj = JSON.parse(decoded);
                if (provider) {
                    userObj.provider = provider;
                }
                setUser(userObj);
            } catch (err) {
                console.error('Failed to parse userParam:', err);
            }
        }
    }, []);

    if (!user) {
        return <div className="p-8 text-xl">Loading...</div>;
    }

    const isGoogle = user.provider === 'google';
    const isGithub = user.provider === 'github';

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-green-200 text-center">
            {isGoogle && (
                <Image
                    src="/czech.jpg" // or user.picture if you add that from Google response
                    alt="Profile"
                    width={96}
                    height={96}
                    className="rounded-full mt-3 mb-4 w-24 h-24 object-cover"
                />
            )}
            {isGithub && user.avatar_url && (
                <Image
                    src={user.avatar_url}
                    alt="GitHub Avatar"
                    width={96}
                    height={96}
                    className="rounded-full mt-3 mb-4 w-24 h-24 object-cover"
                />
            )}

            <div className="w-120 bg-white p-6 rounded-xl border-2 shadow-lg flex flex-col items-center justify-center">
                <h1 className="text-3xl font-bold mb-4">
                    Welcome, {isGoogle ? user.name : isGithub ? user.login : 'User'}!
                </h1>
                {isGoogle && (
                    <>
                        <p className="text-lg">Email: {user.email}</p>
                        <p className="text-lg">Email Verified: {user.verified_email ? 'Yes' : 'No'}</p>
                    </>
                )}
                {isGithub && (
                    <p className="text-lg">GitHub Username: {user.login}</p>
                )}
                <p>Signed in with: {isGoogle ? 'Google' : isGithub ? 'GitHub' : 'Unknown'}</p>
            </div>

            <div className="mt-6">
                <Link href="/">
                    <div className="inline-block px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-700 shadow-lg transition">
                        Back to Home
                    </div>
                </Link>
            </div>
        </div>
    );
}