'use client';

import { useEffect, useState } from 'react';
import { GoogleUser } from '@/lib/types';
import Image from 'next/image';
import Link from 'next/link';

export default function ProfilePage() {
    const [user, setUser] = useState<Partial<GoogleUser> | null>(null);;

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const userParam = urlParams.get('user');

        if (userParam) {
            try {
                const decoded = decodeURIComponent(userParam);
                const userObj = JSON.parse(decoded);
                setUser(userObj);
            } catch (err) {
                console.error('Failed to parse userParam:', err);
            }
        }
    }, []);

    if (!user) {
        return <div className="p-8 text-xl">Loading...</div>;
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-green-200 text-center">
            <Image src="/czech.jpg" alt="Profile" width={60} height={60} className="rounded-full mt-3 mb-4 w-24 h-24 object-cover"/>
            <div className="w-120 bg-white p-6 rounded-xl border-2 shadow-lg flex flex-col items-center justify-center">
                <h1 className="text-3xl font-bold mb-4">Welcome, {user.name}!</h1>
                <p className="text-lg">Email: {user.email}</p>
                <p className="text-lg">Email Verified: {user.verified_email ? 'Yes' : 'No'}</p>
                <p>Signed in with: Google</p>
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