import React from 'react';

const PromoTerms = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header Section */}
      <div className="bg-white py-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-black mb-4">Promotional Messages Terms & Conditions</h1>
          <div className="flex items-center justify-center space-x-2 text-black">
            <a href="/" className="hover:text-[#00a0db] transition-colors">Home</a>
            <span>/</span>
            <span>Promotional Messages Terms & Conditions</span>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Last Updated */}
          <div className="text-center mb-12">
            <p className="text-[#00a0db] text-lg font-semibold tracking-wider uppercase">
              Last Updated: 31st August, 2026
            </p>
          </div>

          {/* Welcome Text */}
          <div className="mb-12">
            <p className="text-gray-300 text-lg leading-relaxed">
              These Promotional Messages Terms & Conditions ("Terms") explain how carsaloon.com.au ("Car Saloon," "we," "our," or "us") sends promotional and marketing communications by SMS and email, and how you can manage or opt out of them. These Terms apply in addition to our <a href="/terms" className="text-[#00a0db] underline">Terms of Use</a> and <a href="/privacy" className="text-[#00a0db] underline">Privacy Policy</a>.
            </p>
          </div>

          <div className="space-y-12">
            {/* 1. Consent */}
            <section>
              <h2 className="text-2xl font-bold text-[#00a0db] mb-6">1. Your Consent</h2>
              <ul className="space-y-4 text-gray-300">
                <li className="flex items-start">
                  <span className="text-[#00a0db] mr-3 mt-1">•</span>
                  <div>
                    We will only send you promotional or marketing messages if you have given us your express consent — for example, by ticking an opt-in box on our booking form, at checkout, or when signing up on our Website.
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-[#00a0db] mr-3 mt-1">•</span>
                  <div>
                    Where you are an existing customer, we may infer consent to send you reasonably related promotional messages based on our existing relationship, in accordance with the Spam Act 2003 (Cth).
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-[#00a0db] mr-3 mt-1">•</span>
                  <div>
                    You must be at least 18 years old to provide consent to receive promotional messages from us.
                  </div>
                </li>
              </ul>
            </section>

            {/* 2. Types of Messages */}
            <section>
              <h2 className="text-2xl font-bold text-[#00a0db] mb-6">2. What You May Receive</h2>
              <ul className="space-y-4 text-gray-300">
                <li className="flex items-start">
                  <span className="text-[#00a0db] mr-3 mt-1">•</span>
                  <span>Special offers, discounts, and seasonal promotions on our washing, detailing, and premium services.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#00a0db] mr-3 mt-1">•</span>
                  <span>Reminders about upcoming or recommended services for your vehicle.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#00a0db] mr-3 mt-1">•</span>
                  <span>Updates about new services, opening hours, or locations.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#00a0db] mr-3 mt-1">•</span>
                  <span>These are separate from transactional messages (such as booking confirmations or approvals), which we may send regardless of your marketing preferences as they relate directly to a service you have requested.</span>
                </li>
              </ul>
            </section>

            {/* 3. Channels & Frequency */}
            <section>
              <h2 className="text-2xl font-bold text-[#00a0db] mb-6">3. How and How Often We Contact You</h2>
              <ul className="space-y-4 text-gray-300">
                <li className="flex items-start">
                  <span className="text-[#00a0db] mr-3 mt-1">•</span>
                  <span>We may send promotional messages via SMS/text message and/or email, using the phone number and email address you provide to us.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#00a0db] mr-3 mt-1">•</span>
                  <span>We will only send promotional messages at a reasonable frequency and will not share your contact details with unrelated third parties for their own marketing purposes.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#00a0db] mr-3 mt-1">•</span>
                  <span>Standard message and data charges from your mobile carrier may apply to SMS messages.</span>
                </li>
              </ul>
            </section>

            {/* 4. Sender Identification */}
            <section>
              <h2 className="text-2xl font-bold text-[#00a0db] mb-6">4. Who Is Sending These Messages</h2>
              <ul className="space-y-4 text-gray-300">
                <li className="flex items-start">
                  <span className="text-[#00a0db] mr-3 mt-1">•</span>
                  <div>
                    All promotional messages will clearly identify Car Saloon as the sender and include our contact details:
                    <div className="mt-3 ml-4 text-white">
                      Car Saloon<br />
                      Email: <a href="mailto:info@carsaloon.com.au" className="text-[#00a0db] underline">info@carsaloon.com.au</a><br />
                      Midland: 0478 551 640 &nbsp;|&nbsp; Myaree: 0430 170 164
                    </div>
                  </div>
                </li>
              </ul>
            </section>

            {/* 5. Opt Out */}
            <section>
              <h2 className="text-2xl font-bold text-[#00a0db] mb-6">5. Opting Out / Unsubscribing</h2>
              <ul className="space-y-4 text-gray-300">
                <li className="flex items-start">
                  <span className="text-[#00a0db] mr-3 mt-1">•</span>
                  <span>You can withdraw your consent and stop receiving promotional messages at any time, free of charge.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#00a0db] mr-3 mt-1">•</span>
                  <span>For SMS messages, reply <strong className="text-white">STOP</strong> to any message you receive from us.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#00a0db] mr-3 mt-1">•</span>
                  <span>For emails, click the "unsubscribe" link included at the bottom of the message.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#00a0db] mr-3 mt-1">•</span>
                  <span>You can also opt out at any time by emailing <a href="mailto:info@carsaloon.com.au" className="text-[#00a0db] underline">info@carsaloon.com.au</a> or calling one of our locations.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#00a0db] mr-3 mt-1">•</span>
                  <span>We will not ask you for any extra personal information or require you to log in to an account in order to unsubscribe, and we will action your request within 5 business days, in line with the Spam Act 2003 (Cth).</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#00a0db] mr-3 mt-1">•</span>
                  <span>Opting out of promotional messages will not affect transactional messages relating to a booking you have made with us.</span>
                </li>
              </ul>
            </section>

            {/* 6. Use of Your Information */}
            <section>
              <h2 className="text-2xl font-bold text-[#00a0db] mb-6">6. How We Use Your Information</h2>
              <ul className="space-y-4 text-gray-300">
                <li className="flex items-start">
                  <span className="text-[#00a0db] mr-3 mt-1">•</span>
                  <span>Your phone number and email address will only be used to send you the promotional messages you have consented to and will not be sold to third parties.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#00a0db] mr-3 mt-1">•</span>
                  <span>For more detail on how we collect, store, and protect your personal information, please see our <a href="/privacy" className="text-[#00a0db] underline">Privacy Policy</a>.</span>
                </li>
              </ul>
            </section>

            {/* 7. Promo Code Terms */}
            <section>
              <h2 className="text-2xl font-bold text-[#00a0db] mb-6">7. Promo Code Terms</h2>
              <ul className="space-y-4 text-gray-300">
                <li className="flex items-start">
                  <span className="text-[#00a0db] mr-3 mt-1">•</span>
                  <span>Any promo code sent to you as part of a promotional message is valid only for the period stated in that message and will automatically expire after that date.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#00a0db] mr-3 mt-1">•</span>
                  <span>Promo codes are for single use per customer only, unless otherwise stated in the message.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#00a0db] mr-3 mt-1">•</span>
                  <span>Promo codes are personal to the recipient of the message and are not transferable to any other person.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#00a0db] mr-3 mt-1">•</span>
                  <span>Promo codes must be mentioned or applied at the time of booking. We are not able to apply a promo code retroactively to a booking that has already been made or completed.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#00a0db] mr-3 mt-1">•</span>
                  <span>Unless expressly stated otherwise, promo codes cannot be combined with any other offer, discount, or promotion.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#00a0db] mr-3 mt-1">•</span>
                  <span>Promo codes have no cash value and cannot be redeemed for cash, credit, or applied to services other than those specified in the message.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#00a0db] mr-3 mt-1">•</span>
                  <span>We reserve the right to modify, suspend, or cancel any promo code at any time without prior notice, and to refuse a promo code where we reasonably suspect fraudulent, abusive, or unauthorised use.</span>
                </li>
              </ul>
            </section>

            {/* 8. Vehicle Condition & Additional Charges */}
            <section>
              <h2 className="text-2xl font-bold text-[#00a0db] mb-6">8. Vehicle Condition & Additional Charges</h2>
              <ul className="space-y-4 text-gray-300">
                <li className="flex items-start">
                  <span className="text-[#00a0db] mr-3 mt-1">•</span>
                  <span>We reserve the right to charge an additional cost for vehicles that are excessively dirty (for example, mud, sand, pet hair, stains, rubbish, or biohazards) beyond normal wear and use.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#00a0db] mr-3 mt-1">•</span>
                  <span>Any such additional charge will be assessed and communicated to you at the beginning of the service, before we start cleaning your vehicle.</span>
                </li>
              </ul>
            </section>

            {/* 9. Changes */}
            <section>
              <h2 className="text-2xl font-bold text-[#00a0db] mb-6">9. Changes to These Terms</h2>
              <ul className="space-y-4 text-gray-300">
                <li className="flex items-start">
                  <span className="text-[#00a0db] mr-3 mt-1">•</span>
                  <span>We may update these Terms from time to time to reflect changes in our practices or applicable law. The latest version will always be posted on this page with the "Last Updated" date.</span>
                </li>
              </ul>
            </section>

            {/* 8. Contact */}
            <section>
              <h2 className="text-2xl font-bold text-[#00a0db] mb-6">10. Contact Us</h2>
              <ul className="space-y-4 text-gray-300">
                <li className="flex items-start">
                  <span className="text-[#00a0db] mr-3 mt-1">•</span>
                  <span>If you have any questions about these Terms or how we handle promotional communications, please contact us at <a href="mailto:info@carsaloon.com.au" className="text-[#00a0db] underline">info@carsaloon.com.au</a>.</span>
                </li>
              </ul>
            </section>

            {/* Final Statement */}
            <section className="bg-[#00a0db] rounded-lg p-8 border border-gray-700">
              <p className="text-white text-lg leading-relaxed">
                By opting in to receive promotional messages from Car Saloon, you acknowledge that you have read, understood, and agreed to these Terms.
              </p>
            </section>
          </div>
        </div>
      </div>

      {/* Footer CTA Section */}
      <div className="bg-[#00a0db] py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-2xl font-bold text-white mb-4">
            Questions About Our Promotional Messages?
          </h3>
          <p className="text-white/90 mb-6">
            We're here to help. Contact us for any marketing-related inquiries.
          </p>
          <a
            href="/contact"
            className="inline-block bg-white text-black font-semibold px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors duration-300"
          >
            Contact Us
          </a>
        </div>
      </div>
    </div>
  );
};

export default PromoTerms;
