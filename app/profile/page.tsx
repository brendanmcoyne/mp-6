'use client';

import { useEffect, useState } from 'react';
import { GoogleUser } from '@/lib/types';

export default function ProfilePage() {
    const [user, setUser] = useState<Partial<GoogleUser> | null>(null);

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const userParam = urlParams.get('user');
        if (userParam) {
            const userObj = JSON.parse(decodeURIComponent(userParam));
            localStorage.setItem('google-user', JSON.stringify(userObj));
            setUser(userObj);
        } else {
            const stored = localStorage.getItem('google-user');
            if (stored) setUser(JSON.parse(stored));
        }
    }, []);
    if (!user) {
        return <div className="p-8 text-xl">Loading...</div>;
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-green-100 text-center">
            <h1 className="text-3xl font-bold mb-4">Welcome, {user.name}!</h1>
            <p className="text-lg">Email: {user.email}</p>
            <img src={user.picture} alt="Profile" className="rounded-full mt-4 w-24 h-24" />
        </div>
    );
}