export default function TermsOfService() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
      
      <div className="prose prose-lg max-w-none space-y-6">
        <p className="text-muted-foreground">
          <strong>Last Updated:</strong> February 22, 2026
        </p>

        <section>
          <h2 className="text-2xl font-semibold mt-8 mb-4">1. Entertainment Only Platform</h2>
          <p>
            StrikePlay is a <strong>100% free entertainment platform</strong> for cricket enthusiasts. 
            This platform is designed solely for entertainment purposes and does not involve any real money, 
            gambling, betting, or prizes of monetary value.
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>No deposits required</li>
            <li>No entry fees</li>
            <li>No cash prizes or monetary rewards</li>
            <li>Purely for fun and entertainment</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mt-8 mb-4">2. Age Requirement</h2>
          <p>
            You must be <strong>18 years or older</strong> to use StrikePlay. By accessing this platform, 
            you confirm that you meet this age requirement.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mt-8 mb-4">3. User Accounts</h2>
          <p>
            To use StrikePlay, you must create an account. You are responsible for:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Maintaining the confidentiality of your account credentials</li>
            <li>All activities that occur under your account</li>
            <li>Providing accurate and truthful information</li>
            <li>Notifying us immediately of any unauthorized use</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mt-8 mb-4">4. Acceptable Use</h2>
          <p>You agree NOT to:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Use the platform for any illegal purposes</li>
            <li>Attempt to hack, disrupt, or damage the platform</li>
            <li>Create multiple accounts to gain unfair advantages</li>
            <li>Harass, abuse, or harm other users</li>
            <li>Use automated bots or scripts</li>
            <li>Sell, trade, or transfer your account</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mt-8 mb-4">5. No Gambling or Real Money</h2>
          <p>
            StrikePlay is <strong>NOT a gambling platform</strong>. We do not:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Accept any form of payment for participation</li>
            <li>Offer cash prizes or monetary rewards</li>
            <li>Facilitate betting or wagering</li>
            <li>Convert points or achievements into real money</li>
          </ul>
          <p className="mt-4">
            All competitions, leaderboards, and achievements are purely for entertainment and bragging rights.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mt-8 mb-4">6. Intellectual Property</h2>
          <p>
            All content on StrikePlay, including logos, designs, text, and graphics, is owned by StrikePlay 
            and protected by intellectual property laws. You may not copy, reproduce, or distribute any content 
            without written permission.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mt-8 mb-4">7. Disclaimer of Warranties</h2>
          <p>
            StrikePlay is provided "as is" without warranties of any kind. We do not guarantee:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Uninterrupted or error-free service</li>
            <li>Accuracy of cricket statistics or data</li>
            <li>Compatibility with all devices</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mt-8 mb-4">8. Limitation of Liability</h2>
          <p>
            StrikePlay and its operators shall not be liable for any indirect, incidental, or consequential 
            damages arising from your use of the platform.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mt-8 mb-4">9. Termination</h2>
          <p>
            We reserve the right to suspend or terminate your account at any time for:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Violation of these Terms of Service</li>
            <li>Fraudulent or suspicious activity</li>
            <li>Any reason at our sole discretion</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mt-8 mb-4">10. Changes to Terms</h2>
          <p>
            We may update these Terms of Service at any time. Continued use of the platform after changes 
            constitutes acceptance of the new terms.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mt-8 mb-4">11. Governing Law</h2>
          <p>
            These Terms are governed by the laws of India. Any disputes shall be resolved in the courts of India.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mt-8 mb-4">12. Contact Us</h2>
          <p>
            If you have questions about these Terms of Service, please contact us at:
          </p>
          <p className="mt-2">
            <strong>Email:</strong> support@strikeplayhq.com<br />
            <strong>Website:</strong> https://strikeplayhq.com
          </p>
        </section>

        <div className="mt-12 p-6 bg-muted rounded-lg border">
          <p className="font-semibold text-lg mb-2">🎯 Remember:</p>
          <p>
            StrikePlay is 100% FREE and for ENTERTAINMENT ONLY. No real money involved. 
            Just pure cricket fun!
          </p>
        </div>
      </div>
    </div>
  );
}
