'use client';

export default function Home() {
    const providers = [
        { name: 'Google', href: 'sign-in/google', bg: '#FFFFFF', text: '#4285F4' },
        { name: 'GitHub', href: 'sign-in/github', bg: '#24292E', text: '#FAFBFC' },
        { name: 'Reddit', href: 'sign-in/reddit', bg: '#FF4500', text: '#FFFDDD' },
        { name: 'Spotify', href: 'sign-in/spotify', bg: '#212121', text: '#1ED760' },
        { name: 'Discord', href: 'sign-in/discord', bg: '#7289DA', text: '#23272A' },
        { name: 'Dropbox', href: 'sign-in/dropbox', bg: '#007EE5', text: '#FFFFFF' },
    ];

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-green-200 px-4">
            <div className="w-full max-w-xl bg-white p-6 rounded-xl border-2 shadow-lg flex flex-col items-center">
                <header>
                    <h1 className="font-bold text-2xl mt-4 text-center">Open Authorization</h1>
                    <p className="text-neutral-500 mt-1 mb-6 text-center">
                        Pick what sign in option to use
                    </p>
                </header>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 w-full">
                    {providers.map((provider) => (
                        <a
                            key={provider.name}
                            href={provider.href}
                            className="flex items-center justify-center text-center font-medium rounded-lg shadow hover:shadow-lg transition-all duration-200"
                            style={{
                                backgroundColor: provider.bg,
                                color: provider.text,
                                height: '6rem',
                                width: '100%',
                            }}
                        >
                            {provider.name}
                        </a>
                    ))}
                </div>
            </div>
        </div>
    );
}
