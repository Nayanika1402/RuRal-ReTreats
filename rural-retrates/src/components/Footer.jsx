import { useState } from 'react';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube, Send } from 'lucide-react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [language, setLanguage] = useState('English');

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      alert(`Thank you for subscribing with: ${email}`);
      setEmail('');
    }
  };

  const quickLinks = [
    'Home', 'About Us', 'Services', 'Hotels & Homestays', 
    'Travel Guides', 'FAQs', 'Contact Us'
  ];

  const languages = [
    'English', 'Bengali', 'Hindi', 'French', 'Spanish', 'German'
  ];

  const socialIcons = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Youtube, href: '#', label: 'YouTube' }
  ];

  return (
    <footer className="bg-gradient-to-br from-sky-50 to-blue-100 text-gray-800">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Company Info */}
          <div className="lg:col-span-1">
            <h2 className="text-2xl font-bold text-sky-800 mb-4">Rural Retreats</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              We offer budget-friendly tours, curated travel experiences, and luxury escapes worldwide.
            </p>
            
            {/* Language Selector */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Language
              </label>
              <select 
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="w-full px-3 py-2 border border-sky-200 rounded-lg bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent"
              >
                {languages.map((lang) => (
                  <option key={lang} value={lang}>{lang}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-1">
            <h3 className="text-xl font-bold text-sky-800 mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a 
                    href="#" 
                    className="text-gray-700 hover:text-sky-600 transition-colors duration-200 flex items-center"
                  >
                    <span className="w-1.5 h-1.5 bg-sky-400 rounded-full mr-3"></span>
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Support */}
          <div className="lg:col-span-1">
            <h3 className="text-xl font-bold text-sky-800 mb-4">Customer Support</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Mail className="w-5 h-5 text-sky-600 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-gray-700">
                    <a href="mailto:support@ruralretreats.com" className="hover:text-sky-600 transition-colors">
                      support@ruralretreats.com
                    </a>
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <Phone className="w-5 h-5 text-sky-600 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-gray-700">
                    <a href="tel:+916291234567" className="hover:text-sky-600 transition-colors">
                      +91 629XX XXXXX
                    </a>
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-sky-600 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-gray-700">
                    Q University Institute Of Technology,<br />
                    Burdwan-713104, West Bengal
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Newsletter & Social */}
          <div className="lg:col-span-1">
            <h3 className="text-xl font-bold text-sky-800 mb-4">Newsletter</h3>
            <p className="text-gray-700 mb-4">Subscribe for exclusive travel deals!</p>
            
            <form onSubmit={handleSubscribe} className="mb-6">
              <div className="flex">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="flex-1 px-3 py-2 border border-sky-200 rounded-l-lg bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent"
                  required
                />
                <button
                  type="submit"
                  className="bg-sky-500 hover:bg-sky-600 text-white px-4 py-2 rounded-r-lg transition-colors duration-200 flex items-center justify-center"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </form>

            {/* Social Media */}
            <div>
              <h4 className="text-lg font-semibold text-sky-800 mb-3">Follow Us</h4>
              <div className="flex space-x-3">
                {socialIcons.map((social, index) => {
                  const IconComponent = social.icon;
                  return (
                    <a
                      key={index}
                      href={social.href}
                      aria-label={social.label}
                      className="w-10 h-10 bg-sky-500 hover:bg-sky-600 text-white rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
                    >
                      <IconComponent className="w-5 h-5" />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-sky-200 bg-sky-100">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0">
            <p className="text-gray-700 text-sm text-center md:text-left">
              © 2025 Rural Retreats. All rights reserved.
            </p>
            <div className="flex space-x-4 text-sm">
              <a href="#" className="text-gray-700 hover:text-sky-600 transition-colors">
                Privacy Policy
              </a>
              <span className="text-gray-400">|</span>
              <a href="#" className="text-gray-700 hover:text-sky-600 transition-colors">
                Terms & Conditions
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}