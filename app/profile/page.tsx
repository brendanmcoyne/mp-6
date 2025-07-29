'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { User } from '@/lib/types';

export default function ProfilePage() {
    const [user, setUser] = useState<User | null>(null);
    const [showCheck, setShowCheck] = useState(true);

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

                // Simulate slight delay for animation
                setTimeout(() => {
                    setUser(userObj);
                    setTimeout(() => setShowCheck(false), 1800); // Hide checkmark after delay
                }, 500);
            } catch (err) {
                console.error('Failed to parse userParam:', err);
            }
        }
    }, []);

    const isGoogle = user?.provider === 'google';
    const isGithub = user?.provider === 'github';
    const isReddit = user?.provider === 'reddit';
    const isSpotify = user?.provider === 'spotify';
    const isDiscord = user?.provider === 'discord';
    const isYahoo = user?.provider === 'yahoo';

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-300 text-center">
            <AnimatePresence>
                {showCheck && (
                    <motion.div
                        key="check"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.5 }}
                        className="bg-green-500 text-white text-2xl px-6 py-4 rounded-full shadow-lg flex items-center gap-3"
                    >
                        ✅ Authentication Complete
                    </motion.div>
                )}
            </AnimatePresence>

            {!showCheck && user && (
                <motion.div
                    key="profile"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="w-120 bg-white p-6 mt-6 rounded-xl border-2 shadow-lg flex flex-col items-center justify-center"
                >
                    {(isGoogle || isGithub || isReddit || isSpotify || isDiscord || isYahoo) && (
                        <Image
                            src="/czech.jpg"
                            alt="Profile"
                            width={96}
                            height={96}
                            className="rounded-full mt-3 mb-4 w-24 h-24 object-cover"
                        />
                    )}

                    <h1 className="text-3xl font-bold mb-4">
                        Welcome,{' '}
                        {isGoogle
                            ? user.name
                            : isGithub
                                ? user.login
                                : isReddit
                                    ? user.name
                                    : isSpotify
                                        ? user.display_name
                                        : isDiscord
                                            ? user.username
                                            : isYahoo
                                                ? user.name
                                                : 'User'}
                        !
                    </h1>

                    {/* User-specific content */}
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

                    {isReddit && <p className="text-lg">Reddit ID: {user.id}</p>}
                    {isSpotify && (
                        <>
                            <p className="text-lg">Display Name: {user.display_name}</p>
                            <p className="text-lg">Email: {user.email}</p>
                        </>
                    )}
                    {isDiscord && (
                        <>
                            <p className="text-lg">Username: {user.username}</p>
                            <p className="text-lg">Email: {user.email}</p>
                        </>
                    )}
                    {isYahoo && (
                        <>
                            <p className="text-lg">Yahoo Name: {user.name}</p>
                            <p className="text-lg">Email: {user.email}</p>
                            <p className="text-lg">Email Verified: {user.email_verified ? 'Yes' : 'No'}</p>
                            <p className="text-lg">Yahoo ID: {user.sub}</p>
                        </>
                    )}

                    <p className="mt-2">
                        Signed in with:{' '}
                        {isGoogle
                            ? 'Google'
                            : isGithub
                                ? 'GitHub'
                                : isReddit
                                    ? 'Reddit'
                                    : isSpotify
                                        ? 'Spotify'
                                        : isDiscord
                                            ? 'Discord'
                                            : isYahoo
                                                ? 'Yahoo'
                                                : 'Unknown'}
                    </p>
                </motion.div>
            )}

            {!showCheck && (
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
