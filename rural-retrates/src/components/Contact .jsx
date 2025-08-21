import React, { useState } from "react";
import { FaBars, FaSearch, FaPhone, FaEnvelope, FaMapMarkerAlt, FaFacebook, FaInstagram, FaTwitter, FaGithub, FaLinkedin, FaWhatsapp, FaCommentDots, FaPaperPlane, FaMicrophone, FaTrashAlt, FaChevronDown, FaTimes } from "react-icons/fa";

const ContactPage = () => {
  const [chatOpen, setChatOpen] = useState(false);

  // const handleSubscribe = () => {
  //   alert("Subscribed to newsletter!");
  // };

  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="relative font-sans">
      {/* Navbar */}
    

      {/* Contact Section */}
      <main className=" bg-gray-50">
        <section className="max-w-7xl mx-auto px-4 py-12">
          <h1 className="text-4xl font-bold text-center mb-12">Let’s Plan Your Next Escape – Contact Us!</h1>
          <div className="flex flex-col lg:flex-row gap-12">
            
            {/* Contact Info */}
            <div className="flex-1 space-y-6">
              <h2 className="text-2xl font-semibold">📞 Get in Touch</h2>
              <p>Have questions? Reach out to us! We are here to help you plan your next adventure.</p>

              <div className="space-y-4">
                <div className="flex items-center gap-2"><FaPhone className="text-blue-600" /><span>Phone:</span> <a href="tel:+911234567890" className="text-blue-600">+91 629XX XXXXX</a></div>
                <div className="flex items-center gap-2"><FaEnvelope className="text-blue-600" /><span>Email:</span> <a href="mailto:info@ruralretreats.com" className="text-blue-600">support@ruralretreats.com</a></div>
                <div className="flex items-start gap-2"><FaMapMarkerAlt className="text-blue-600 mt-1" /><span>Address:</span>
                  <p>University Institute Of Technology, <br />The University of Burdwan, Golapbag (North), Burdwan-713104, West Bengal.</p>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-semibold">Follow Us</h2>
                <div className="flex gap-3 mt-2 text-blue-600 text-2xl">
                  <FaFacebook /><FaInstagram /><FaTwitter /><FaGithub /><FaLinkedin /><FaWhatsapp />
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="flex-1 bg-white p-6 rounded shadow-md">
              <h2 className="text-2xl font-semibold mb-4">📧 Send Us a Message</h2>
              <form className="space-y-4" id="contactForm">
                <input type="text" placeholder="Full Name" className="w-full border px-3 py-2 rounded" required />
                <input type="email" placeholder="Email Address" className="w-full border px-3 py-2 rounded" required />
                <input type="tel" placeholder="Phone Number" maxLength="10" className="w-full border px-3 py-2 rounded" required />
                <textarea placeholder="Your Message" className="w-full border px-3 py-2 rounded h-32" required></textarea>
                <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded">Send Message</button>
              </form>
            </div>
          </div>

          {/* Map */}
          <div className="mt-12">
            <h2 className="text-2xl font-semibold mb-4">📌 Our Location on Map</h2>
            <iframe
              title="University Institute Of Technology, BU Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d440.8922897465497!2d87.84638435772243!3d23.257253946971375!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f8361a58dcc565%3A0x37a42f6b23df16cd!2sUniversity%20Institute%20Of%20Technology%2C%20BU!5e0!3m2!1sen!2sin!4v1739904222629!5m2!1sen!2sin"
              className="w-full h-96 rounded"
              allowFullScreen
            ></iframe>
          </div>
        </section>
      </main>

      {/* Footer */}
      

      {/* Back to Top Button */}
      <button
        onClick={handleBackToTop}
        className="fixed bottom-8 right-8 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700"
      >
        ↑
      </button>

      {/* Chatbot */}
      <div>
        <button
          className="fixed bottom-20 right-8 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 z-50"
          onClick={() => setChatOpen(true)}
        >
          <FaCommentDots size={20} />
        </button>

        {chatOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end">
            <div className="bg-white w-80 h-[500px] flex flex-col rounded shadow-lg m-4">
              {/* Header */}
              <div className="flex justify-between items-center p-4 border-b">
                <h3 className="font-semibold">Chat with Us</h3>
                <button onClick={() => setChatOpen(false)}><FaTimes /></button>
              </div>
              {/* Body */}
              <div className="flex-1 p-4 overflow-y-auto" id="chatMessages"></div>
              <div className="flex p-4 border-t gap-2">
                <input type="text" placeholder="Type your message..." className="flex-1 border rounded px-2 py-1" />
                <button className="p-2 bg-blue-600 text-white rounded"><FaPaperPlane /></button>
                <button className="p-2 bg-gray-200 rounded"><FaMicrophone /></button>
                <button className="p-2 bg-red-500 text-white rounded"><FaTrashAlt /></button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactPage;
