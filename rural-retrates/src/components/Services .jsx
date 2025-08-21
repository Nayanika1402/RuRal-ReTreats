import { useState } from 'react';
import { 
  Home, Users, Heart, MapPin, Mountain, Waves, Camera, 
  Bus, Calendar, Star, Clock, Wifi, Coffee, Car, Shield,
  ChevronRight, Play, CheckCircle, ArrowRight, Phone, Mail
} from 'lucide-react';

export default function Services() {
  const [activeService, setActiveService] = useState('homestays');
  const [selectedPackage, setSelectedPackage] = useState(null);

  const mainServices = [
    {
      id: 'homestays',
      icon: Home,
      title: 'HomeStay Network',
      description: 'Creating a robust and flexible platform connecting diverse homestays in rural areas, offering a wide range of authentic, local experiences.',
      color: 'bg-green-500',
      features: ['Verified & Handpicked Stays', 'Close to Nature', 'Organic Home-Cooked Food', 'Local Culture & Traditions']
    },
    {
      id: 'cultural',
      icon: Users,
      title: 'Cultural Immersion',
      description: 'Emphasize cultural exchange by facilitating interactions between guests and local hosts, fostering deeper understanding of community heritage.',
      color: 'bg-purple-500',
      features: ['Traditional Workshops', 'Folk Music & Dance', 'Local Festivals', 'Craft Learning']
    },
    {
      id: 'community',
      icon: Heart,
      title: 'Community Building',
      description: 'Encourage responsible tourism by channeling bookings back into local projects, infrastructure, and education for positive community impact.',
      color: 'bg-blue-500',
      features: ['Sustainable Tourism', 'Local Development', 'Educational Programs', 'Infrastructure Support']
    }
  ];

  const holidayPackages = [
    {
      id: 1,
      title: 'The Rustic Village Life Experience',
      duration: '3 Days, 2 Nights',
      bestFor: 'Cultural Enthusiasts, Families',
      price: 7999,
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop',
      features: [
        'Stay in authentic village homestays',
        'Participate in local farming activities',
        'Experience folk music & dance performances'
      ]
    },
    {
      id: 2,
      title: 'Himalayan Adventure & Trekking Tour',
      duration: '5 Days, 4 Nights',
      bestFor: 'Adventure Seekers, Nature Lovers',
      price: 12499,
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop',
      features: [
        'Scenic treks through lush valleys & forests',
        'Camping under the stars with bonfire',
        'River rafting & mountain biking'
      ]
    },
    {
      id: 3,
      title: 'Coastal Escape - Beach & Fishing Village',
      duration: '4 Days, 3 Nights',
      bestFor: 'Beach Lovers, Seafood Enthusiasts',
      price: 10499,
      image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=300&fit=crop',
      features: [
        'Stay in seaside eco-lodges & bamboo cottages',
        'Learn traditional fishing techniques',
        'Dolphin watching & mangrove boat rides'
      ]
    },
    {
      id: 4,
      title: 'Wildlife Safari & Eco-Tourism Retreat',
      duration: '3 Days, 2 Nights',
      bestFor: 'Wildlife Enthusiasts, Photographers',
      price: 9999,
      image: 'https://images.unsplash.com/photo-1564760055775-d63b17a55c44?w=400&h=300&fit=crop',
      features: [
        'Jeep safaris to spot tigers & elephants',
        'Stay in eco-resorts inside the jungle',
        'Campfire storytelling with conservationists'
      ]
    }
  ];

  const workshops = [
    {
      icon: '🎨',
      title: 'Handicraft & Pottery',
      description: 'Discover the art of handmade pottery, weaving, and traditional painting from skilled village artisans.'
    },
    {
      icon: '🍲',
      title: 'Farm-to-Table Cooking',
      description: 'Learn the secrets of authentic rural cuisine, from sourcing organic ingredients to traditional cooking methods.'
    },
    {
      icon: '🌿',
      title: 'Herbal & Ayurveda',
      description: 'Gain knowledge about natural healing, organic farming, and Ayurveda-based wellness practices.'
    },
    {
      icon: '🎶',
      title: 'Folk Music & Dance',
      description: 'Experience the magic of local folk dance, traditional drumming, and musical instruments.'
    }
  ];

  const localExperiences = [
    {
      icon: '🎉',
      title: 'Cultural Festivals',
      description: 'Participate in traditional dances, folk music, and community celebrations.'
    },
    {
      icon: '🎨',
      title: 'Handicraft Workshops',
      description: 'Learn pottery, weaving, and hand-crafted art from local artisans.'
    },
    {
      icon: '🌾',
      title: 'Farm-to-Table Dining',
      description: 'Cook and enjoy organic meals using fresh ingredients from local farms.'
    },
    {
      icon: '🚶',
      title: 'Guided Village Walks',
      description: 'Explore scenic countryside trails and interact with local farmers and artisans.'
    }
  ];

  const busFeatures = [
    { icon: '🛋', text: 'Comfortable AC & Sleeper Coaches' },
    { icon: '🔄', text: 'Flexible Rescheduling Options' },
    { icon: '💳', text: 'Secure & Instant Online Payment' },
    { icon: '📍', text: 'Multiple Pick-up & Drop Points' },
    { icon: '🛑', text: 'Live Bus Tracking & Notifications' },
    { icon: '🎟', text: 'Instant E-Ticket Confirmation' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 to-blue-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-sky-600 to-blue-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-5xl font-bold mb-4">Our Services</h1>
          <p className="text-xl opacity-90">Discover authentic rural experiences and sustainable tourism</p>
        </div>
      </div>

      {/* Main Focus Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-4 text-gray-800">Our Main Focus</h2>
          <p className="text-center text-gray-600 mb-12 text-lg">Creating meaningful connections between travelers and rural communities</p>
          
          <div className="grid md:grid-cols-3 gap-8">
            {mainServices.map((service) => {
              const IconComponent = service.icon;
              return (
                <div key={service.id} className="bg-gradient-to-br from-white to-gray-50 p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
                  <div className={`${service.color} w-16 h-16 rounded-full flex items-center justify-center mb-6`}>
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-gray-800">{service.title}</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">{service.description}</p>
                  <ul className="space-y-2">
                    {service.features.map((feature, index) => (
                      <li key={index} className="flex items-center text-gray-700">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <button className="mt-6 bg-sky-500 hover:bg-sky-600 text-white px-6 py-3 rounded-lg transition-colors duration-200 flex items-center">
                    Learn More <ArrowRight className="w-4 h-4 ml-2" />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Holiday Packages */}
      <div className="py-16 bg-gradient-to-br from-sky-50 to-blue-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-gray-800">🌍 Guided Tours & Holiday Packages</h2>
            <p className="text-xl text-gray-600">Immerse yourself in the charm of rural tourism, nature's wonders, and cultural adventures</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
            {holidayPackages.map((pkg) => (
              <div key={pkg.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300">
                <div className="relative">
                  <img src={pkg.image} alt={pkg.title} className="w-full h-64 object-cover" />
                  <div className="absolute top-4 right-4 bg-sky-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    ₹{pkg.price.toLocaleString()}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-2 text-gray-800">{pkg.title}</h3>
                  <div className="flex items-center text-gray-600 mb-2">
                    <Clock className="w-4 h-4 mr-2" />
                    {pkg.duration}
                  </div>
                  <div className="flex items-center text-gray-600 mb-4">
                    <Star className="w-4 h-4 mr-2" />
                    Best For: {pkg.bestFor}
                  </div>
                  <ul className="space-y-2 mb-6">
                    {pkg.features.map((feature, index) => (
                      <li key={index} className="flex items-start text-gray-700">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <button className="w-full bg-sky-500 hover:bg-sky-600 text-white py-3 rounded-lg font-semibold transition-colors duration-200">
                    📌 Book Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Workshops Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-gray-800">🌟 Hands-On Workshops</h2>
            <p className="text-xl text-gray-600">Learn from experienced artisans and connect with rural heritage</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {workshops.map((workshop, index) => (
              <div key={index} className="bg-gradient-to-br from-white to-gray-50 p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 text-center">
                <div className="text-4xl mb-4">{workshop.icon}</div>
                <h3 className="text-xl font-bold mb-3 text-gray-800">{workshop.title}</h3>
                <p className="text-gray-600 leading-relaxed">{workshop.description}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <button className="bg-sky-500 hover:bg-sky-600 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors duration-200">
              🎟️ Join a Workshop Now →
            </button>
          </div>
        </div>
      </div>

      {/* Local Experiences */}
      <div className="py-16 bg-gradient-to-br from-sky-50 to-blue-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-gray-800">Authentic Local Experiences</h2>
            <p className="text-xl text-gray-600">Immerse yourself in rich traditions and vibrant rural culture</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {localExperiences.map((experience, index) => (
              <div key={index} className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 text-center">
                <div className="text-4xl mb-4">{experience.icon}</div>
                <h3 className="text-xl font-bold mb-3 text-gray-800">{experience.title}</h3>
                <p className="text-gray-600 leading-relaxed">{experience.description}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <button className="bg-sky-500 hover:bg-sky-600 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors duration-200">
              Discover Local Experiences →
            </button>
          </div>
        </div>
      </div>

      {/* Bus Booking Service */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-gray-800">🚍 Seamless Bus Booking</h2>
            <p className="text-xl text-gray-600">Travel with ease and comfort with our hassle-free online booking</p>
          </div>

          <div className="bg-gradient-to-br from-sky-50 to-blue-100 rounded-2xl p-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
              {busFeatures.map((feature, index) => (
                <div key={index} className="flex items-center bg-white p-4 rounded-lg shadow-sm">
                  <span className="text-2xl mr-3">{feature.icon}</span>
                  <span className="text-gray-700 font-medium">{feature.text}</span>
                </div>
              ))}
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-2xl font-bold mb-4 text-gray-800">Service Details</h3>
              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">📍 Popular Cities</h4>
                  <p className="text-gray-600">Madhya Pradesh, Tamil Nadu, Uttarakhand, Himachal Pradesh, Kerala, Rajasthan</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">🕒 Service Hours</h4>
                  <p className="text-gray-600">24/7 Availability</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">💺 Available Seats</h4>
                  <p className="text-gray-600">AC | Non-AC | Sleeper</p>
                </div>
              </div>
            </div>

            <div className="text-center mt-8">
              <button className="bg-sky-500 hover:bg-sky-600 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors duration-200">
                🚌 Book a Bus →
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Contact CTA */}
      <div className="py-16 bg-gradient-to-r from-sky-600 to-blue-700 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Start Your Rural Adventure?</h2>
          <p className="text-xl mb-8 opacity-90">Contact our travel experts to plan your perfect getaway</p>
          
          <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
            <div className="flex items-center">
              <Phone className="w-6 h-6 mr-3" />
              <span className="text-lg">+91 629XX XXXXX</span>
            </div>
            <div className="flex items-center">
              <Mail className="w-6 h-6 mr-3" />
              <span className="text-lg">support@ruralretreats.com</span>
            </div>
          </div>
          
          <button className="mt-8 bg-white text-sky-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors duration-200">
            Get Started Today
          </button>
        </div>
      </div>
    </div>
  );
}