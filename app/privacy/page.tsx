export default function PrivacyPage() {
    return (
        <main className="max-w-3xl mx-auto p-8">
            <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
            <p>Last updated: June 2025</p>

            <section className="mt-4">
                <h2 className="text-xl font-semibold mb-2">Information we collect:</h2>
                <p>We only collect information necessary to authenticate you via Google OAuth (your name, email, and profile info).</p>
            </section>

            <section className="mt-4">
                <h2 className="text-xl font-semibold mb-2">How we use your information:</h2>
                <p>To authenticate and personalize your experience on our app.</p>
            </section>

            <section className="mt-4">
                <h2 className="text-xl font-semibold mb-2">Data sharing:</h2>
                <p>We do not share your information with any third parties.</p>
            </section>

            <section className="mt-4">
                <h2 className="text-xl font-semibold mb-2">Data security:</h2>
                <p>We implement reasonable security measures to protect your information.</p>
            </section>

            <section className="mt-4">
                <p>If you have any questions, please contact us at: <a href="mailto:bmcoyne@bu.edu" className="text-blue-600 underline">your-email@example.com</a></p>
            </section>
        </main>
    );
}
