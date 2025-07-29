'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { User } from '@/lib/types';



export default function ProfilePage() {
    const [user, setUser] = useState<User | null>(null);
    const [showCheck, setShowCheck] = useState(true);
    const [showUserInfo, setShowUserInfo] = useState(false);

    setTimeout(() => {
        setShowCheck(false);
        setTimeout(() => setShowUserInfo(true), 500); // Wait for exit animation to finish
    }, 1800);

    const providers = {
        google: { name: 'Google', src: '/google.jpg', bg: '#FFFFFF', text: '#4285F4' },
        github: { name: 'GitHub', src: '/Github.png', bg: '#24292E', text: '#FAFBFC' },
        yahoo: { name: 'Yahoo', src: '/yahoo.png', bg: '#410093', text: '#FFFFFF' },
        reddit: { name: 'Reddit', src: '/reddit.png', bg: '#DF4500', text: '#FFFDDD' },
        spotify: { name: 'Spotify', src: '/Spotify.png', bg: '#212121', text: '#1ED760' },
        discord: { name: 'Discord', src: '/discord.webp', bg: '#7289DA', text: '#23272A' },
    } as const;

    type ProviderKey = keyof typeof providers;

    function getProviderInfo(provider: string | undefined) {
        if (!provider || !(provider in providers)) return null;
        return providers[provider as ProviderKey];
    }

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const userParam = urlParams.get('user');
        const provider = urlParams.get('provider');

        if (userParam) {
            try {
                const decoded = decodeURIComponent(userParam);
                const userObj = JSON.parse(decoded);
                if (provider) {
                    userObj.provider = provider;
                }

                setTimeout(() => {
                    setUser(userObj);
                    setTimeout(() => setShowCheck(false), 1800);
                }, 500);
            } catch (err) {
                console.error('Failed to parse userParam:', err);
            }
        }
    }, []);

    const providerInfo = getProviderInfo(user?.provider);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-300 text-center px-4">
            <div className="flex flex-col min-h-[120px] items-center justify-center">
                <AnimatePresence>
                    {showCheck && (
                        <motion.div
                            key="check"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            transition={{ duration: 0.5 }}
                            className="flex flex-col items-center gap-4 bg-gray-300 text-gray-700 text-4xl px-6 py-4"
                        >
                            <Image
                                src="/czech.jpg"
                                alt="Czech Flag"
                                width={200}
                                height={200}
                                className="rounded-full object-cover"
                            />
                            <p>Authentication Complete!</p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {showUserInfo && user && (
                <motion.div
                    key="profile"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="mt-10 px-6 py-8 bg-white/80 backdrop-blur-md rounded-2xl drop-shadow-md flex flex-col items-center w-full max-w-xl"
                >
                    {providerInfo && (
                        <Image
                            src={providerInfo.src}
                            alt={`${providerInfo.name} logo`}
                            width={72}
                            height={72}
                            className="rounded-full mb-4 object-cover"
                        />
                    )}

                    <h1 className="text-3xl font-semibold text-gray-800 mb-4 text-center">
                        Welcome,{' '}
                        {user.provider === 'google'
                            ? user.name
                            : user.provider === 'github'
                                ? user.login
                                : user.provider === 'reddit'
                                    ? user.name
                                    : user.provider === 'spotify'
                                        ? user.display_name
                                        : user.provider === 'discord'
                                            ? user.username
                                            : user.provider === 'yahoo'
                                                ? user.name
                                                : 'User'}
                        !
                    </h1>

                    <div className="flex flex-col gap-3 text-lg text-gray-700 w-full">
                        {user.provider === 'google' && (
                            <>
                                <p><strong>Email:</strong> {user.email}</p>
                                <p><strong>Email Verified:</strong> {user.verified_email ? 'Yes' : 'No'}</p>
                                <p><strong>Picture:</strong> <a href={user.picture} className="text-blue-500 underline" target="_blank">View</a></p>
                            </>
                        )}

                        {user.provider === 'github' && (
                            <>
                                <p><strong>Username:</strong> {user.login}</p>
                                {user.name && <p><strong>Name:</strong> {user.name}</p>}
                                {user.bio && <p><strong>Bio:</strong> {user.bio}</p>}
                                <p><strong>GitHub Profile:</strong> <a href={user.html_url} className="text-blue-500 underline" target="_blank">{user.html_url}</a></p>
                                <p><strong>Public Repos:</strong> {user.public_repos}</p>
                                <p><strong>Followers:</strong> {user.followers}</p>
                                <p><strong>Following:</strong> {user.following}</p>
                            </>
                        )}

                        {user.provider === 'reddit' && (
                            <>
                                <p><strong>Username:</strong> {user.name}</p>
                                <p><strong>Reddit ID:</strong> {user.id}</p>
                                <p><strong>Link Karma:</strong> {user.link_karma}</p>
                                <p><strong>Comment Karma:</strong> {user.comment_karma}</p>
                                <p><strong>Verified:</strong> {user.verified ? 'Yes' : 'No'}</p>
                                <p><strong>Premium:</strong> {user.is_gold ? 'Yes' : 'No'}</p>
                            </>
                        )}

                        {user.provider === 'spotify' && (
                            <>
                                <p><strong>Display Name:</strong> {user.display_name}</p>
                                <p><strong>Email:</strong> {user.email}</p>
                                <p><strong>Country:</strong> {user.country}</p>
                                <p><strong>Product:</strong> {user.product}</p>
                                {user.external_urls?.spotify && (
                                    <p>
                                        <strong>Spotify Profile:</strong>{' '}
                                        <a href={user.external_urls.spotify} className="text-blue-500 underline" target="_blank">
                                            {user.external_urls.spotify}
                                        </a>
                                    </p>
                                )}
                            </>
                        )}

                        {user.provider === 'discord' && (
                            <>
                                <p><strong>Username:</strong> {user.username}</p>
                                <p><strong>Email:</strong> {user.email}</p>
                                <p><strong>ID:</strong> {user.id}</p>
                                <p><strong>Verified:</strong> {user.verified ? 'Yes' : 'No'}</p>
                                <p><strong>Locale:</strong> {user.locale}</p>
                            </>
                        )}

                        {user.provider === 'yahoo' && (
                            <>
                                <p><strong>Name:</strong> {user.name}</p>
                                <p><strong>Email:</strong> {user.email}</p>
                                <p><strong>Email Verified:</strong> {user.email_verified ? 'Yes' : 'No'}</p>
                                <p><strong>Yahoo ID:</strong> {user.sub}</p>
                            </>
                        )}

                    </div>
                    <p className="mt-2"><strong>Signed in with:</strong> {providerInfo?.name ?? 'Unknown'}</p>
                </motion.div>
            )}

            {showUserInfo && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="mt-6"
                >
                    <Link href="/">
                        <div className="inline-block px-6 py-3 bg-gray-400 text-white rounded-lg hover:bg-gray-600 shadow-lg transition">
                            Back to Home
                        </div>
                    </Link>
                </motion.div>
            )}
        </div>
    );
}
