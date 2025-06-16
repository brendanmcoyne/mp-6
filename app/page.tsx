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
                        className="w-full text-center text-white bg-green-500 hover:bg-green-700 font-medium rounded-lg mb-3 px-5 py-2.5 hover:shadow-lg"
                    >
                        Sign in with Google
                    </a>

                    <a
                        href="sign-in/github"
                        className="w-full text-center text-white bg-gray-800 hover:bg-gray-900 font-medium rounded-lg px-5 py-2.5 hover:shadow-lg"
                    >
                        Sign in with GitHub
                    </a>
                </div>
            </div>
        </div>
    );
}
