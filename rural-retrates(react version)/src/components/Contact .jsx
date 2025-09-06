import React, { useState } from "react";
import { FaBars, FaSearch, FaPhone, FaEnvelope, FaMapMarkerAlt, FaFacebook, FaInstagram, FaTwitter, FaGithub, FaLinkedin, FaWhatsapp, FaCommentDots, FaPaperPlane, FaMicrophone, FaTrashAlt, FaChevronDown, FaTimes } from "react-icons/fa";

const ContactPage = () => {
  const [chatOpen, setChatOpen] = useState(false);

  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="relative font-sans">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-sky-400 via-blue-500 to-indigo-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
            Let's Plan Your Next Escape
          </h1>
          <p className="text-xl opacity-90">Contact us and start your adventure today!</p>
        </div>
      </div>

      {/* Contact Section */}
      <main className="bg-gradient-to-b from-slate-50 to-blue-50 min-h-screen">
        <section className="max-w-7xl mx-auto px-4 py-16">
          <div className="flex flex-col lg:flex-row gap-12">
            
            {/* Contact Info */}
            <div className="flex-1 space-y-8">
              <div className="bg-white p-8 rounded-2xl shadow-xl border border-blue-100">
                <h2 className="text-3xl font-bold text-sky-800 mb-6 flex items-center gap-3">
                  <span className="text-4xl">📞</span> Get in Touch
                </h2>
                <p className="text-gray-600 mb-8 text-lg">
                  Have questions? Reach out to us! We are here to help you plan your next adventure.
                </p>

                <div className="space-y-6">
                  <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-sky-50 to-blue-50 rounded-xl border-l-4 border-sky-500">
                    <FaPhone className="text-sky-600 text-xl" />
                    <div>
                      <span className="font-semibold text-gray-700">Phone:</span>
                      <a href="tel:+911234567890" className="text-sky-600 hover:text-sky-800 transition-colors ml-2 font-medium">
                        +91 629XX XXXXX
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-sky-50 to-blue-50 rounded-xl border-l-4 border-sky-500">
                    <FaEnvelope className="text-sky-600 text-xl" />
                    <div>
                      <span className="font-semibold text-gray-700">Email:</span>
                      <a href="mailto:support@ruralretreats.com" className="text-sky-600 hover:text-sky-800 transition-colors ml-2 font-medium">
                        support@ruralretreats.com
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4 p-4 bg-gradient-to-r from-sky-50 to-blue-50 rounded-xl border-l-4 border-sky-500">
                    <FaMapMarkerAlt className="text-sky-600 text-xl mt-1" />
                    <div>
                      <span className="font-semibold text-gray-700">Address:</span>
                      <p className="text-gray-600 mt-1 leading-relaxed">
                        University Institute Of Technology, <br />
                        The University of Burdwan, Golapbag (North), <br />
                        Burdwan-713104, West Bengal.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Media Section */}
              <div className="bg-white p-8 rounded-2xl shadow-xl border border-blue-100">
                <h2 className="text-2xl font-bold text-sky-800 mb-6">Follow Us</h2>
                <div className="flex gap-4 flex-wrap">
                  <a href="#" className="p-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all transform hover:scale-105 shadow-lg">
                    <FaFacebook size={20} />
                  </a>
                  <a href="#" className="p-3 bg-gradient-to-r from-pink-500 to-pink-600 text-white rounded-xl hover:from-pink-600 hover:to-pink-700 transition-all transform hover:scale-105 shadow-lg">
                    <FaInstagram size={20} />
                  </a>
                  <a href="#" className="p-3 bg-gradient-to-r from-sky-500 to-sky-600 text-white rounded-xl hover:from-sky-600 hover:to-sky-700 transition-all transform hover:scale-105 shadow-lg">
                    <FaTwitter size={20} />
                  </a>
                  <a href="#" className="p-3 bg-gradient-to-r from-gray-800 to-gray-900 text-white rounded-xl hover:from-gray-900 hover:to-black transition-all transform hover:scale-105 shadow-lg">
                    <FaGithub size={20} />
                  </a>
                  <a href="#" className="p-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all transform hover:scale-105 shadow-lg">
                    <FaLinkedin size={20} />
                  </a>
                  <a href="#" className="p-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl hover:from-green-600 hover:to-green-700 transition-all transform hover:scale-105 shadow-lg">
                    <FaWhatsapp size={20} />
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="flex-1">
              <div className="bg-white p-8 rounded-2xl shadow-xl border border-blue-100 sticky top-8">
                <h2 className="text-3xl font-bold text-sky-800 mb-6 flex items-center gap-3">
                  <span className="text-4xl">📧</span> Send Us a Message
                </h2>
                <form className="space-y-6" id="contactForm">
                  <div>
                    <input 
                      type="text" 
                      placeholder="Full Name" 
                      className="w-full border-2 border-blue-100 focus:border-sky-500 px-4 py-3 rounded-xl outline-none transition-colors bg-blue-50/30 focus:bg-white" 
                      required 
                    />
                  </div>
                  <div>
                    <input 
                      type="email" 
                      placeholder="Email Address" 
                      className="w-full border-2 border-blue-100 focus:border-sky-500 px-4 py-3 rounded-xl outline-none transition-colors bg-blue-50/30 focus:bg-white" 
                      required 
                    />
                  </div>
                  <div>
                    <input 
                      type="tel" 
                      placeholder="Phone Number" 
                      maxLength="10" 
                      className="w-full border-2 border-blue-100 focus:border-sky-500 px-4 py-3 rounded-xl outline-none transition-colors bg-blue-50/30 focus:bg-white" 
                      required 
                    />
                  </div>
                  <div>
                    <textarea 
                      placeholder="Your Message" 
                      className="w-full border-2 border-blue-100 focus:border-sky-500 px-4 py-3 rounded-xl h-32 outline-none transition-colors bg-blue-50/30 focus:bg-white resize-none" 
                      required
                    ></textarea>
                  </div>
                  <button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-sky-600 to-blue-600 text-white px-6 py-4 rounded-xl font-semibold text-lg hover:from-sky-700 hover:to-blue-700 transition-all transform hover:scale-105 shadow-lg"
                  >
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>

          {/* Map */}
          <div className="mt-16">
            <div className="bg-white p-8 rounded-2xl shadow-xl border border-blue-100">
              <h2 className="text-3xl font-bold text-sky-800 mb-8 flex items-center gap-3">
                <span className="text-4xl">📌</span> Our Location on Map
              </h2>
              <div className="rounded-2xl overflow-hidden shadow-lg border-4 border-blue-100">
                <iframe
                  title="University Institute Of Technology, BU Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d440.8922897465497!2d87.84638435772243!3d23.257253946971375!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f8361a58dcc565%3A0x37a42f6b23df16cd!2sUniversity%20Institute%20Of%20Technology%2C%20BU!5e0!3m2!1sen!2sin!4v1739904222629!5m2!1sen!2sin"
                  className="w-full h-96"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Back to Top Button */}
      <button
        onClick={handleBackToTop}
        className="fixed bottom-8 right-8 bg-gradient-to-r from-sky-600 to-blue-600 text-white p-4 rounded-full shadow-xl hover:from-sky-700 hover:to-blue-700 transition-all transform hover:scale-110 z-40"
      >
        <span className="text-xl font-bold">↑</span>
      </button>

      {/* Chatbot */}
      <div>
        <button
          className="fixed bottom-24 right-8 bg-gradient-to-r from-sky-600 to-blue-600 text-white p-4 rounded-full shadow-xl hover:from-sky-700 hover:to-blue-700 z-50 transition-all transform hover:scale-110"
          onClick={() => setChatOpen(true)}
        >
          <FaCommentDots size={24} />
        </button>

        {chatOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-end backdrop-blur-sm">
            <div className="bg-white w-96 h-[600px] flex flex-col rounded-2xl shadow-2xl m-4 border border-blue-100 overflow-hidden">
              {/* Header */}
              <div className="flex justify-between items-center p-6 bg-gradient-to-r from-sky-600 to-blue-600 text-white">
                <h3 className="font-bold text-lg">Chat with Us</h3>
                <button 
                  onClick={() => setChatOpen(false)}
                  className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                >
                  <FaTimes size={18} />
                </button>
              </div>
              
              {/* Body */}
              <div className="flex-1 p-6 overflow-y-auto bg-gradient-to-b from-blue-50/30 to-white" id="chatMessages">
                <div className="bg-blue-100 p-4 rounded-2xl mb-4 max-w-xs">
                  <p className="text-gray-700">Hello! How can I help you today?</p>
                </div>
              </div>
              
              {/* Footer */}
              <div className="flex p-4 border-t border-blue-100 gap-3 bg-white">
                <input 
                  type="text" 
                  placeholder="Type your message..." 
                  className="flex-1 border-2 border-blue-100 focus:border-sky-500 rounded-xl px-4 py-2 outline-none transition-colors" 
                />
                <button className="p-3 bg-gradient-to-r from-sky-600 to-blue-600 text-white rounded-xl hover:from-sky-700 hover:to-blue-700 transition-all">
                  <FaPaperPlane />
                </button>
                <button className="p-3 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-xl transition-colors">
                  <FaMicrophone />
                </button>
                <button className="p-3 bg-red-100 hover:bg-red-200 text-red-600 rounded-xl transition-colors">
                  <FaTrashAlt />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactPage;