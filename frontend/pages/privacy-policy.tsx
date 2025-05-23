import Head from "next/head"

export default function PrivacyPolicy() {
  return (
    <>
      <Head>
        <title>Privacy Policy | CardGenius</title>
      </Head>
      <div className="max-w-3xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
        <p className="mb-4">
          <strong>Effective Date:</strong> {new Date().getFullYear()}-05-14
        </p>
        <p className="mb-4">
          CardGenius (“we”, “us”, or “our”) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your information when you use our application.
        </p>
        <h2 className="text-xl font-semibold mt-8 mb-2">Information We Collect</h2>
        <ul className="list-disc ml-6 mb-4">
          <li>Your email address and basic profile information via Google OAuth</li>
          <li>Spending data from Gmail e-statements (with your consent)</li>
          <li>Any information you manually enter in the app</li>
        </ul>
        <h2 className="text-xl font-semibold mt-8 mb-2">How We Use Your Information</h2>
        <ul className="list-disc ml-6 mb-4">
          <li>To provide personalized credit card recommendations</li>
          <li>To improve our services</li>
          <li>To communicate with you if necessary</li>
        </ul>
        <h2 className="text-xl font-semibold mt-8 mb-2">Data Security</h2>
        <p className="mb-4">
          We use industry-standard security measures to protect your data. Your information is never sold or shared with third parties except as required by law.
        </p>
        <h2 className="text-xl font-semibold mt-8 mb-2">Third-Party Services</h2>
        <p className="mb-4">
          We use Google APIs for authentication and data access. Please review Google’s privacy policy for more information.
        </p>
        <h2 className="text-xl font-semibold mt-8 mb-2">Your Choices</h2>
        <p className="mb-4">
          You may disconnect your Google account and delete your data at any time by contacting us.
        </p>
        <h2 className="text-xl font-semibold mt-8 mb-2">Contact Us</h2>
        <p>
          If you have any questions about this Privacy Policy, please contact us at <a href="mailto:tanmayikade10@gmail.com" className="text-primary-600 underline">tanmayikade10@gmail.com</a>.
        </p>
      </div>
    </>
  )
}