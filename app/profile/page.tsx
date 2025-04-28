'use client';

import { useEffect, useState } from 'react';
import { GoogleUser } from '@/lib/types';
import Image from 'next/image';

export default function ProfilePage() {
    const [user, setUser] = useState<Partial<GoogleUser> | null>(null);

    useEffect(() => {

        const urlParams = new URLSearchParams(window.location.search);
        const userParam = urlParams.get('user');

        if (userParam) {
            try {
                const decodedOnce = decodeURIComponent(userParam);
                const decodedTwice = decodeURIComponent(decodedOnce);
                const userObj = JSON.parse(decodedTwice);
                localStorage.setItem('google-user', JSON.stringify(userObj));
                setUser(userObj);
            } catch (err) {
                console.error('Failed to parse userParam:', err);
            }
        } else {
            const stored = localStorage.getItem('google-user');
            if (stored) {
                setUser(JSON.parse(stored));
            }
        }
    }, []);

    if (!user) {
        return <div className="p-8 text-xl">Loading...</div>;
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-green-200 text-center">
            <div className="w-120 bg-white p-6 rounded-xl border-2 shadow-lg flex flex-col items-center justify-center">
                <h1 className="text-3xl font-bold mb-4">Welcome, {user.name}!</h1>
                <Image src="/czech.jpg" alt="Profile" width={60} height={60} className="rounded-full mt-3 mb-4 w-24 h-24 object-cover"/>
                <p className="text-lg">Email: {user.email}</p>
                <p>Signed in with: Google</p>
            </div>
        </div>
    );
}