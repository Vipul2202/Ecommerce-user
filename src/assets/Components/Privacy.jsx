import React from 'react';

const Privacy = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header Section */}
      <div className="bg-white py-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-black mb-4">Privacy Policy</h1>
          <div className="flex items-center justify-center space-x-2 text-black">
            <a href="#" className="hover:text-white transition-colors">Home</a>
            <span>/</span>
            <span>Privacy Policy</span>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Last Updated */}
          <div className="text-center mb-12">
            <p className="text-[#00a0db] text-lg font-semibold tracking-wider uppercase">
              Last Updated: 25th February, 2025
            </p>
          </div>

          {/* Welcome Text */}
          <div className="mb-12">
            <p className="text-gray-300 text-lg leading-relaxed">
              Welcome to CarSaloon.com.au ("Website," "we," "our," or "us"). We are committed to protecting your privacy and ensuring that your personal information is handled securely and responsibly. This Privacy Policy outlines how we collect, use, disclose, and protect your information.
            </p>
          </div>

          {/* Privacy Policy Content */}
          <div className="space-y-12">
            {/* 1. Information We Collect */}
            <section>
              <h2 className="text-2xl font-bold text-[#00a0db] mb-6">1. Information We Collect</h2>
              <ul className="space-y-4 text-gray-300">
                <li className="flex items-start">
                  <span className="text-[#00a0db] mr-3 mt-1">•</span>
                  <div>
                    <strong className="text-white">Personal Information:</strong> When you use our Website, we may collect personal information such as your name, email address, phone number, postal address, and payment details.
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-[#00a0db] mr-3 mt-1">•</span>
                  <div>
                    <strong className="text-white">Vehicle Information:</strong> If you use our car-related services, we may collect details about your vehicle, such as make, model, registration number, and service history.
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-[#00a0db] mr-3 mt-1">•</span>
                  <div>
                    <strong className="text-white">Usage Data:</strong> We collect information about your interactions with our Website, including IP address, browser type, pages visited, and time spent on the site.
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-[#00a0db] mr-3 mt-1">•</span>
                  <div>
                    <strong className="text-white">Cookies and Tracking Technologies:</strong> We use cookies to enhance your experience, analyze website traffic, and personalize content. You can manage cookie preferences through your browser settings.
                  </div>
                </li>
              </ul>
            </section>

            {/* 2. How We Use Your Information */}
            <section>
              <h2 className="text-2xl font-bold text-[#00a0db] mb-6">2. How We Use Your Information</h2>
              <ul className="space-y-4 text-gray-300">
                <li className="flex items-start">
                  <span className="text-[#00a0db] mr-3 mt-1">•</span>
                  <span>To provide and improve our services, including vehicle listings, car wash services, and maintenance bookings.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#00a0db] mr-3 mt-1">•</span>
                  <span>To process transactions, payments, and appointment scheduling.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#00a0db] mr-3 mt-1">•</span>
                  <span>To communicate with you about promotions, updates, and customer service inquiries.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#00a0db] mr-3 mt-1">•</span>
                  <span>To analyze user behavior and improve website functionality.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#00a0db] mr-3 mt-1">•</span>
                  <span>To comply with legal obligations and prevent fraud or misuse of our services.</span>
                </li>
              </ul>
            </section>

            {/* 3. Sharing Your Information */}
            <section>
              <h2 className="text-2xl font-bold text-[#00a0db] mb-6">3. Sharing Your Information</h2>
              <ul className="space-y-4 text-gray-300">
                <li className="flex items-start">
                  <span className="text-[#00a0db] mr-3 mt-1">•</span>
                  <span>We do not sell your personal information to third parties.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#00a0db] mr-3 mt-1">•</span>
                  <div>
                    <span>We may share your information with:</span>
                    <ul className="mt-3 ml-4 space-y-2">
                      <li className="flex items-start">
                        <span className="text-[#00a0db] mr-2 mt-1">◦</span>
                        <span>Service providers and partners who assist in delivering our services (e.g., payment processors, car wash providers, mechanics).</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-[#00a0db] mr-2 mt-1">◦</span>
                        <span>Legal authorities if required by law or to protect our rights.</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-[#00a0db] mr-2 mt-1">◦</span>
                        <span>Third-party analytics and advertising platforms to enhance website performance.</span>
                      </li>
                    </ul>
                  </div>
                </li>
              </ul>
            </section>

            {/* 4. Data Security */}
            <section>
              <h2 className="text-2xl font-bold text-[#00a0db] mb-6">4. Data Security</h2>
              <ul className="space-y-4 text-gray-300">
                <li className="flex items-start">
                  <span className="text-[#00a0db] mr-3 mt-1">•</span>
                  <span>We implement appropriate security measures to protect your data from unauthorized access, alteration, or disclosure.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#00a0db] mr-3 mt-1">•</span>
                  <span>While we strive to protect your personal information, no online platform can guarantee complete security. You are responsible for maintaining the confidentiality of your login credentials.</span>
                </li>
              </ul>
            </section>

            {/* 5. Your Rights and Choices */}
            <section>
              <h2 className="text-2xl font-bold text-[#00a0db] mb-6">5. Your Rights and Choices</h2>
              <ul className="space-y-4 text-gray-300">
                <li className="flex items-start">
                  <span className="text-[#00a0db] mr-3 mt-1">•</span>
                  <span>You may access, update, or delete your personal information by contacting us at <a href="mailto:info@carsaloon.com.au" className="text-[#00a0db] hover:text-orange-300 underline">info@carsaloon.com.au</a>.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#00a0db] mr-3 mt-1">•</span>
                  <span>You can opt out of marketing communications by following the unsubscribe instructions in our emails.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#00a0db] mr-3 mt-1">•</span>
                  <span>You may request details about the personal data we hold about you and how it is processed.</span>
                </li>
              </ul>
            </section>

            {/* 6. Third-Party Links */}
            <section>
              <h2 className="text-2xl font-bold text-[#00a0db] mb-6">6. Third-Party Links</h2>
              <ul className="space-y-4 text-gray-300">
                <li className="flex items-start">
                  <span className="text-[#00a0db] mr-3 mt-1">•</span>
                  <span>Our Website may contain links to third-party sites. We are not responsible for the privacy practices of these external websites.</span>
                </li>
              </ul>
            </section>

            {/* 7. Changes to This Privacy Policy */}
            <section>
              <h2 className="text-2xl font-bold text-[#00a0db] mb-6">7. Changes to This Privacy Policy</h2>
              <ul className="space-y-4 text-gray-300">
                <li className="flex items-start">
                  <span className="text-[#00a0db] mr-3 mt-1">•</span>
                  <span>We may update this Privacy Policy from time to time. The latest version will be posted on this page with the "Last Updated" date.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#00a0db] mr-3 mt-1">•</span>
                  <span>Your continued use of our Website constitutes acceptance of the revised Privacy Policy.</span>
                </li>
              </ul>
            </section>

            {/* 8. Contact Us */}
            <section>
              <h2 className="text-2xl font-bold text-[#00a0db] mb-6">8. Contact Us</h2>
              <ul className="space-y-4 text-gray-300">
                <li className="flex items-start">
                  <span className="text-[#00a0db] mr-3 mt-1">•</span>
                  <span>If you have any questions or concerns about this Privacy Policy, please contact us at <a href="mailto:info@carsaloon.com.au" className="text-[#00a0db] hover:text-orange-300 underline">info@carsaloon.com.au</a>.</span>
                </li>
              </ul>
            </section>

            {/* Final Statement */}
            <section className="bg-gray-800 rounded-lg p-8 border border-gray-700">
              <p className="text-gray-300 text-lg leading-relaxed">
                By using CarSaloon.com.au, you acknowledge that you have read, understood, and agreed to this Privacy Policy.
              </p>
            </section>
          </div>
        </div>
      </div>

      {/* Footer CTA Section */}
      <div className="bg-[#00a0db] py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-2xl font-bold text-white mb-4">
            Questions About Our Privacy Policy?
          </h3>
          <p className="text-orange-100 mb-6">
            We're here to help. Contact us for any privacy-related inquiries.
          </p>
          <a 
            href="mailto:info@carsaloon.com.au" 
            className="inline-block bg-white text-black font-semibold px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors duration-300"
          >
            Contact Us
          </a>
        </div>
      </div>
    </div>
  );
};

export default Privacy;