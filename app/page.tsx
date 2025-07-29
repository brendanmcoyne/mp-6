'use client';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function Home() {
    const providers = [
        { name: 'Google', src: 'google.jpg', href: 'sign-in/google', bg: '#FFFFFF', text: '#4285F4' },
        { name: 'GitHub', src: 'Github.png', href: 'sign-in/github', bg: '#24292E', text: '#FAFBFC' },
        { name: 'Yahoo', src: 'yahoo.png', href: 'sign-in/yahoo', bg: '#410093', text: '#FFFFFF' },
        { name: 'Reddit', src: 'reddit.png', href: 'sign-in/reddit', bg: '#DF4500', text: '#FFFDDD' },
        { name: 'Spotify', src: 'Spotify.png', href: 'sign-in/spotify', bg: '#212121', text: '#1ED760' },
        { name: 'Discord', src: 'discord.webp', href: 'sign-in/discord', bg: '#7289DA', text: '#23272A' },
    ];

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-300 px-4">
            <motion.div
                className="w-full max-w-5xl p-6 flex flex-col items-center"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
            >
                <header>
                    <h1 className="font-bold text-5xl mt-4 text-center">Open Authorization</h1>
                    <p className="text-xl text-neutral-500 mt-1 mb-6 text-center">
                        Pick what sign in option to use
                    </p>
                </header>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 justify-items-center w-full">
                    {providers.map((provider, index) => (
                        <motion.a
                            key={provider.name}
                            href={provider.href}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1, ease: 'easeOut' }}
                            className="flex flex-col items-center justify-center text-center font-medium rounded-lg shadow hover:shadow-lg"
                            style={{
                                backgroundColor: provider.bg,
                                color: provider.text,
                                height: '175px',
                                width: '300px',
                            }}
                        >
                            <Image src={`/${provider.src}`} alt={provider.name} width={40} height={40} />
                            <span className="mt-2 text-xl">{provider.name}</span>
                        </motion.a>
                    ))}
                </div>
            </motion.div>
        </div>
    );
}
