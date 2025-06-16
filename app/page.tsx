'use client';

export default function Home() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-green-200">
            <div className="w-120 bg-white p-6 rounded-xl border-2 shadow-lg flex flex-col items-center justify-center">
                <header>
                    <h1 className="font-bold text-2xl mt-4">Open Authorization</h1>
                    <p className="text-neutral-500 mt-1 mb-6">Pick what sign in option to use</p>
                </header>

                <div className="flex flex-col w-full">
                    <a
                        href="sign-in/google"
                        className="w-full text-center text-white font-medium rounded-lg mb-3 px-5 py-2.5 hover:shadow-lg"
                        style={{ backgroundColor: '#FFFDDD', color: '#4285F4'}}
                    >
                        Sign in with Google
                    </a>

                    <a
                        href="sign-in/github"
                        className="w-full text-center text-white font-medium rounded-lg mb-3 px-5 py-2.5 hover:shadow-lg"
                        style={{ backgroundColor: '#24292E', color: '#FAFBFC'}}
                    >
                        Sign in with GitHub
                    </a>

                    <a
                        href="sign-in/reddit"
                        className="w-full text-center text-white font-medium rounded-lg mb-3 px-5 py-2.5 hover:shadow-lg"
                        style={{ backgroundColor: '#FF4500', color: '#FFFDDD'}}
                    >
                        Sign in with Reddit
                    </a>
                    <a
                        href="sign-in/spotify"
                        className="w-full text-center font-medium rounded-lg mb-3 px-5 py-2.5 hover:shadow-lg"
                        style={{ backgroundColor: '#212121', color: '#1ED760' }}
                    >
                        Sign in with Spotify
                    </a>
                    <a
                        href="sign-in/discord"
                        className="w-full text-center font-medium rounded-lg mb-3 px-5 py-2.5 hover:shadow-lg"
                        style={{ backgroundColor: '#7289DA', color: '#23272A' }}
                    >
                        Sign in with Discord
                    </a>
                </div>
            </div>
        </div>
    );
}
