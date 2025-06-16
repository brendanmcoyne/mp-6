export default function Home() {
  return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-green-200">
        <div className="w-120 bg-white p-6 rounded-xl border-2 shadow-lg flex flex-col items-center justify-center">
          <header>
            <h1 className="font-bold text-2xl mt-4">Open Authorization</h1>
            <p className="text-neutral-500 mt-1 mb-6">Pick what sign in option to use</p>
          </header>
            <div className="flex-col">
                <a className="w-full flex justify-center text-white bg-green-500 hover:bg-green-700 font-medium rounded-lg mt-3 mb-2 px-5 py-2.5 hover:shadow-lg"
                   href="/sign-in/google">Sign in with Google!</a>
            </div>
            <div className="flex-col">
                <a className="w-full flex justify-center text-white bg-green-500 hover:bg-green-700 font-medium rounded-lg mt-3 mb-2 px-5 py-2.5 hover:shadow-lg"
                   href="/sign-in/github">Sign in with Github!</a>
            </div>
        </div>
      </div>
  );
}
