const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-[#050505] font-sora text-white">
      <div className="mx-auto max-w-4xl px-6 pb-32 pt-24 lg:px-0">
        <h1 className="mb-6 text-5xl font-bold tracking-tight">
          Privacy Policy
        </h1>
        <p className="mb-16 text-sm font-medium text-gray-500">
          Last Updated: 28 Jan 2025
        </p>

        <div className="space-y-12">
          <section>
            <h2 className="mb-5 text-2xl font-bold tracking-tight">
              Introduction
            </h2>
            <p className="text-base leading-relaxed text-gray-400">
              Welcome to AmbaLay Maps. We respect your privacy and are committed
              to protecting your personal data. This Privacy Policy explains how
              we collect, use, and safeguard your information when you use our
              website.
            </p>
          </section>

          <section>
            <h2 className="mb-5 text-2xl font-bold tracking-tight">
              Data We Collect
            </h2>
            <ul className="space-y-4">
              <li className="flex gap-3 text-gray-400">
                <span className="text-[#8cff2e]">•</span>
                <span>
                  <strong>Personal Information:</strong> Name, email address,
                  phone number, payment details (if applicable), and other
                  identifiers you voluntarily provide.
                </span>
              </li>
              <li className="flex gap-3 text-gray-400">
                <span className="text-[#8cff2e]">•</span>
                <span>
                  <strong>Non-Personal Information:</strong> Browser type, IP
                  address, device information, cookies, and usage data (e.g.,
                  pages visited).
                </span>
              </li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  )
}

export default PrivacyPolicy
