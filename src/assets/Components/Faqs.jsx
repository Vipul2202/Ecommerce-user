import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const Faqs = () => {
  const [expandedItems, setExpandedItems] = useState({});

  const toggleItem = (index) => {
    setExpandedItems(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const faqData = [
    {
      question: "Why to clean your cars every couple of weeks?",
      answer: "Regular car cleaning is essential for maintaining your vehicle's appearance, protecting its value, and ensuring optimal performance. Clean cars not only look better but also help prevent rust, corrosion, and damage from environmental contaminants."
    },
    {
      question: "How ceramic coating works and protects?",
      answer: "Ceramic coating creates a protective layer on your car's paint that bonds chemically with the vehicle's factory paint. This coating provides superior protection against UV rays, chemical stains, and minor scratches while making the car easier to clean and maintain."
    },
    {
      question: "Why steam clean or details cars?",
      answer: "Steam cleaning is an eco-friendly method that uses high-temperature steam to sanitize and clean your vehicle without harsh chemicals. It effectively removes dirt, grime, and bacteria from all surfaces while being gentle on your car's materials."
    },
    {
      question: "Why air-con treatment is required?",
      answer: "Your car's air conditioning system does more than just cool the air—it also affects air quality and overall driving comfort. Regular air-con treatment is essential for the following reasons:",
      details: [
        {
          title: "Eliminates Bad Odors",
          points: [
            "Over time, bacteria, mold, and mildew can build up in the air-con system, causing musty or unpleasant smells.",
            "Treatment removes these contaminants, leaving fresh, clean air in your car."
          ]
        },
        {
          title: "Improves Air Quality",
          points: [
            "Dust, pollen, and allergens accumulate in the system and can affect passengers, especially those with allergies or respiratory issues.",
            "Professional treatment helps purify the airflow, making it healthier to breathe."
          ]
        },
        {
          title: "Prevents Bacterial Growth & Mold",
          points: [
            "The moist environment in the A/C system is the perfect breeding ground for bacteria and fungi.",
            "A proper treatment disinfects the system, preventing mold buildup and potential health risks."
          ]
        },
        {
          title: "Enhances Cooling Efficiency",
          points: [
            "A clean system works more efficiently, providing better cooling performance, making the A/C work harder and use more fuel.",
            "Treatment ensures optimal airflow and cooling efficiency."
          ]
        },
        {
          title: "Extends A/C System Lifespan",
          points: [
            "Regular maintenance helps prevent blockages, damage, and costly repairs.",
            "Keeps the entire system and other components running smoothly for longer."
          ]
        },
        {
          title: "Health and Safety Benefits",
          points: [
            "Every 6 to 12 months or whenever you notice bad smells, weak airflow, or allergy symptoms while driving.",
            "Regular air-con treatment keeps your cabin air fresh, your system running efficiently, and your drives more comfortable!"
          ]
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header Section */}
      <div className="bg-white py-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-black mb-4">
            Frequently Asked Questions
          </h1>
          <div className="flex items-center justify-center space-x-2 text-black">
            <a href="#" className="hover:text-white transition-colors">Home</a>
            <span>/</span>
            <span>FAQ</span>
          </div>
        </div>
      </div>

      {/* FAQ Content Section */}
      <div className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Welcome Section */}
          <div className="text-center mb-12">
            <p className="text-white text-lg font-semibold tracking-wider uppercase mb-4">
              Welcome to Our FAQ Section
            </p>
            <p className="text-gray-300 text-lg leading-relaxed max-w-3xl mx-auto">
              Here, you'll find answers to common questions about our services, policies, and 
              how CarSaloon.com.au can assist you.
            </p>
          </div>

          {/* FAQ Items */}
          <div className="space-y-4">
            {faqData.map((faq, index) => (
              <div 
                key={index} 
                className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden"
              >
                {/* Question Header */}
                <button
                  onClick={() => toggleItem(index)}
                  className="w-full px-6 py-5 text-left flex items-center justify-between hover:bg-gray-750 transition-colors duration-200"
                >
                  <h3 className="text-lg font-semibold text-white pr-4">
                    {faq.question}
                  </h3>
                  <div className="flex-shrink-0">
                    {expandedItems[index] ? (
                      <ChevronUp className="w-6 h-6 text-[#00a0db]" />
                    ) : (
                      <ChevronDown className="w-6 h-6 text-[#00a0db]" />
                    )}
                  </div>
                </button>

                {/* Answer Content */}
                {expandedItems[index] && (
                  <div className="px-6 pb-6">
                    <div className="border-t border-gray-700 pt-4">
                      <p className="text-gray-300 leading-relaxed mb-4">
                        {faq.answer}
                      </p>
                      
                      {/* Detailed Points (for air-con treatment question) */}
                      {faq.details && (
                        <div className="space-y-6 mt-6">
                          {faq.details.map((detail, detailIndex) => (
                            <div key={detailIndex} className="ml-4">
                              <h4 className="text-[#00a0db] font-semibold mb-3 text-lg">
                                {detailIndex + 1}. {detail.title}
                              </h4>
                              <ul className="space-y-2 ml-4">
                                {detail.points.map((point, pointIndex) => (
                                  <li key={pointIndex} className="flex items-start">
                                    <span className="text-[#00a0db] mr-3 mt-1">•</span>
                                    <span className="text-gray-300 leading-relaxed">
                                      {point}
                                    </span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Additional Help Section */}
          <div className="mt-16 bg-gradient-to-r from-gray-800 to-gray-700 rounded-lg p-8 text-center border border-gray-600">
            <h3 className="text-2xl font-bold text-white mb-4">
              Still Have Questions?
            </h3>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Can't find the answer you're looking for? Our customer support team is here to help. 
              Contact us directly for personalized assistance with your car care needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="mailto:info@carsaloon.com.au" 
                className="bg-[#00a0db] text-white font-semibold px-8 py-3 rounded-lg transition-colors duration-300"
              >
                Email Support
              </a>
              <a 
                href="tel:+61234567890" 
                className="bg-[#00a0db] hover:text-white font-semibold px-8 py-3 rounded-lg transition-all duration-300"
              >
                Call Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Faqs;