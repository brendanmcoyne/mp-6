export default function TermsPage() {
    return (
        <main className="max-w-3xl mx-auto p-8">
            <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>
            <p>Last updated: June 2025</p>

            <section className="mt-4">
                <p>By using this application, you agree to the following terms:</p>
                <ul className="list-disc list-inside mt-2">
                    <li>You agree to use this app responsibly and in compliance with all applicable laws.</li>
                    <li>We provide this app "as is" without warranties of any kind.</li>
                    <li>We are not responsible for any data loss or damages resulting from your use of the app.</li>
                    <li>We reserve the right to update these terms at any time.</li>
                </ul>
            </section>

            <section className="mt-4">
                <p>If you have any questions, please contact us at: <a href="mailto:bmcoyne@bu.edu" className="text-blue-600 underline">your-email@example.com</a></p>
            </section>
        </main>
    );
}
