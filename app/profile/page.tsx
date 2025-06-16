'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { User } from '@/lib/types';

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
    const isReddit = user.provider === 'reddit';
    const isSpotify = user.provider === 'spotify';
    const isDiscord = user.provider === 'discord';

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-green-200 text-center">
            {isGoogle && (
                <Image
                    src="/czech.jpg"
                    alt="Profile"
                    width={96}
                    height={96}
                    className="rounded-full mt-3 mb-4 w-24 h-24 object-cover"
                />
            )}
            {isGithub && (
                <Image
                    src="/czech.jpg"
                    alt="Profile"
                    width={96}
                    height={96}
                    className="rounded-full mt-3 mb-4 w-24 h-24 object-cover"
                />
            )}
            {isReddit && (
                <Image
                    src="/czech.jpg"
                    alt="Profile"
                    width={96}
                    height={96}
                    className="rounded-full mt-3 mb-4 w-24 h-24 object-cover"
                />
            )}
            {isSpotify && (
                <Image
                    src="/czech.jpg"
                    alt="Profile"
                    width={96}
                    height={96}
                    className="rounded-full mt-3 mb-4 w-24 h-24 object-cover"
                />
            )}
            {isDiscord && (
                <Image
                    src="/czech.jpg"
                    alt="Profile"
                    width={96}
                    height={96}
                    className="rounded-full mt-3 mb-4 w-24 h-24 object-cover"
                />
            )}
            <div className="w-120 bg-white p-6 rounded-xl border-2 shadow-lg flex flex-col items-center justify-center">
                <h1 className="text-3xl font-bold mb-4">
                    Welcome, {isGoogle ? user.name : isGithub ? user.login : isReddit ? user.name : isSpotify ? user.display_name : 'User'}!
                </h1>
                {isGoogle && (
                    <>
                        <p className="text-lg">Email: {user.email}</p>
                        <p className="text-lg">Email Verified: {user.verified_email ? 'Yes' : 'No'}</p>
                    </>
                )}
                {isGithub && (
                    <>
                        <p className="text-lg">GitHub Username: {user.login}</p>
                        {user.name && <p className="text-lg">Name: {user.name}</p>}
                        {user.bio && <p className="text-lg">Bio: {user.bio}</p>}
                        {user.location && <p className="text-lg">Location: {user.location}</p>}
                        {user.html_url && (
                            <p className="text-lg">
                                GitHub Profile:{' '}
                                <a href={user.html_url} className="text-blue-600 underline" target="_blank">
                                    {user.html_url}
                                </a>
                            </p>
                        )}
                        <p className="text-lg">Public Repos: {user.public_repos}</p>
                    </>
                )}
                {isReddit && (
                    <>
                        <p className="text-lg">Reddit ID: {user.id}</p>
                    </>
                )}
                {isSpotify && (
                    <>
                        <p className="text-lg">Display Name: {user.display_name}</p>
                        <p className="text-lg">Email: {user.email}</p>
                    </>
                )}
                {isDiscord && (
                    <>
                        <p className="text-lg">username: {user.username}</p>
                        <p className="text-lg">Email: {user.email}</p>
                        <p className="text-lg">#{user.discriminator}</p>
                    </>
                )}
                <p>Signed in with: {isGoogle ? 'Google' : isGithub ? 'GitHub' : isReddit ? 'Reddit' : isSpotify ? 'Spotify' : isDiscord ? 'Discord' : 'Unknown'}</p>
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