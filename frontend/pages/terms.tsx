import Head from "next/head"

export default function Terms() {
  return (
    <>
      <Head>
        <title>Terms of Service | CardGenius</title>
      </Head>
      <div className="max-w-3xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>
        <p className="mb-4">
          <strong>Effective Date:</strong> {new Date().getFullYear()}-05-14
        </p>
        <p className="mb-4">
          By using CardGenius, you agree to these Terms of Service. If you do not agree, please do not use the application.
        </p>
        <h2 className="text-xl font-semibold mt-8 mb-2">Use of Service</h2>
        <p className="mb-4">
          You must be at least 18 years old to use this service. You agree to use the app only for lawful purposes.
        </p>
        <h2 className="text-xl font-semibold mt-8 mb-2">User Data</h2>
        <p className="mb-4">
          You are responsible for the accuracy of the information you provide. We do not guarantee the accuracy of recommendations.
        </p>
        <h2 className="text-xl font-semibold mt-8 mb-2">Account Security</h2>
        <p className="mb-4">
          You are responsible for maintaining the confidentiality of your account and credentials.
        </p>
        <h2 className="text-xl font-semibold mt-8 mb-2">Limitation of Liability</h2>
        <p className="mb-4">
          CardGenius is provided “as is” without warranties of any kind. We are not liable for any damages arising from your use of the app.
        </p>
        <h2 className="text-xl font-semibold mt-8 mb-2">Changes to Terms</h2>
        <p className="mb-4">
          We may update these Terms at any time. Continued use of the app means you accept the new Terms.
        </p>
        <h2 className="text-xl font-semibold mt-8 mb-2">Contact Us</h2>
        <p>
          For questions about these Terms, contact us at <a href="mailto:tanmayikade10@gmail.com" className="text-primary-600 underline">tanmayikade10@gmail.com</a>.
        </p>
      </div>
    </>
  )
}