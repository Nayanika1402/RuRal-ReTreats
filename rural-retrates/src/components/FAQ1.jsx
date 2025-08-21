import { ChevronDown } from 'lucide-react';
import React, { useState } from 'react'

function FAQ1 () {
  
  const faqs = [
    { question: "How do I book a homestay?", answer: "Simply select your preferred dates, choose a homestay, and complete the booking process online." },
    { question: "What is the cancellation policy?", answer: "Free cancellation up to 24 hours before check-in. After that, 50% refund is available." },
    { question: "Are pets allowed in the homestay?", answer: "Pet policies vary by homestay. Please check individual property details or contact hosts directly." },
    { question: "What amenities are included?", answer: "Most homestays include WiFi, meals, and basic amenities. Specific amenities are listed for each property." },
    { question: "Is there parking available?", answer: "Most homestays provide free parking. Please confirm with your host during booking." }
  ];
    const [expandedFAQ, setExpandedFAQ] = useState(null);

  return (
    <div>
     <section className=" pb-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Frequently Asked Questions</h2>
        <div className="bg-white rounded-2xl shadow-xl">
          {faqs.map((faq, index) => (
            <div key={index} className="border-b border-gray-200 last:border-b-0">
              <button
                className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
                onClick={() => setExpandedFAQ(expandedFAQ === index ? null : index)}
              >
                <span className="font-semibold text-gray-800">{faq.question}</span>
                <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform ${expandedFAQ === index ? 'transform rotate-180' : ''}`} />
              </button>
              {expandedFAQ === index && (
                <div className="px-6 pb-4">
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default FAQ1
