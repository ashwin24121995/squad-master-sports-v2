export default function AboutUs() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-4xl font-bold mb-8">About StrikePlay</h1>
      
      <div className="prose prose-lg max-w-none space-y-6">
        <section>
          <h2 className="text-2xl font-semibold mt-8 mb-4">Our Mission</h2>
          <p>
            StrikePlay is India's premier <strong>free cricket entertainment platform</strong> dedicated to bringing 
            cricket fans together through fun, competitive team-building experiences. We believe cricket is more than 
            just a sport—it's a passion that unites millions.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mt-8 mb-4">What We Offer</h2>
          <p>
            StrikePlay provides a completely free platform where cricket enthusiasts can:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Build and manage their dream cricket teams</li>
            <li>Compete with friends and fellow cricket fans</li>
            <li>Track performance on leaderboards</li>
            <li>Enjoy cricket entertainment without any financial commitment</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mt-8 mb-4">100% Free, 100% Fun</h2>
          <div className="bg-muted p-6 rounded-lg border my-6">
            <p className="font-semibold text-lg mb-2">⚠️ Important Disclaimer</p>
            <p>
              StrikePlay is <strong>purely for entertainment purposes</strong>. We do NOT involve:
            </p>
            <ul className="list-disc pl-6 mt-3 space-y-1">
              <li>Real money or cash prizes</li>
              <li>Gambling or betting</li>
              <li>Entry fees or deposits</li>
              <li>Any form of monetary transactions</li>
            </ul>
            <p className="mt-3">
              All competitions, leaderboards, and achievements are for bragging rights and entertainment only.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mt-8 mb-4">Our Values</h2>
          <div className="grid md:grid-cols-2 gap-6 my-6">
            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold text-lg mb-2">🎯 Entertainment First</h3>
              <p className="text-sm">
                We prioritize fun and engagement over everything else. Cricket should be enjoyable for everyone.
              </p>
            </div>
            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold text-lg mb-2">🤝 Community Driven</h3>
              <p className="text-sm">
                Building a vibrant community of cricket lovers who share passion and knowledge.
              </p>
            </div>
            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold text-lg mb-2">💯 Transparency</h3>
              <p className="text-sm">
                No hidden fees, no surprises. What you see is what you get—completely free.
              </p>
            </div>
            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold text-lg mb-2">🔒 User Privacy</h3>
              <p className="text-sm">
                We respect your privacy and protect your data with industry-standard security measures.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mt-8 mb-4">How It Works</h2>
          <ol className="list-decimal pl-6 space-y-3">
            <li>
              <strong>Sign Up:</strong> Create your free account in seconds
            </li>
            <li>
              <strong>Build Your Team:</strong> Select your favorite cricket players
            </li>
            <li>
              <strong>Compete:</strong> Join contests and climb the leaderboards
            </li>
            <li>
              <strong>Have Fun:</strong> Enjoy cricket entertainment with friends
            </li>
          </ol>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mt-8 mb-4">Age Requirement</h2>
          <p>
            StrikePlay is intended for users aged <strong>18 years and above</strong>. By using our platform, 
            you confirm that you meet this age requirement.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mt-8 mb-4">Contact Information</h2>
          <div className="bg-muted p-6 rounded-lg my-6">
            <p className="mb-4">
              Have questions, feedback, or need support? We'd love to hear from you!
            </p>
            <div className="space-y-2">
              <p>
                <strong>Email:</strong> <a href="mailto:support@strikeplayhq.com" className="text-primary hover:underline">support@strikeplayhq.com</a>
              </p>
              <p>
                <strong>Website:</strong> <a href="https://strikeplayhq.com" className="text-primary hover:underline">https://strikeplayhq.com</a>
              </p>
              <p>
                <strong>Support Hours:</strong> Monday - Sunday, 9:00 AM - 9:00 PM IST
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mt-8 mb-4">Legal & Compliance</h2>
          <p>
            StrikePlay operates in full compliance with Indian laws and regulations. We are committed to:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Maintaining a safe and secure platform</li>
            <li>Protecting user privacy and data</li>
            <li>Providing transparent terms of service</li>
            <li>Operating as a legitimate entertainment service</li>
          </ul>
          <p className="mt-4">
            For detailed information, please review our{" "}
            <a href="/terms-of-service" className="text-primary hover:underline">Terms of Service</a> and{" "}
            <a href="/privacy-policy" className="text-primary hover:underline">Privacy Policy</a>.
          </p>
        </section>

        <section className="mt-12">
          <div className="bg-primary/10 p-8 rounded-lg text-center">
            <h2 className="text-2xl font-bold mb-4">Join the StrikePlay Community</h2>
            <p className="mb-6">
              Experience the thrill of cricket team management—completely free, forever!
            </p>
            <a 
              href="/auth/signup" 
              className="inline-block bg-primary text-primary-foreground px-8 py-3 rounded-lg font-semibold hover:bg-primary/90 transition"
            >
              Get Started Free
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}
