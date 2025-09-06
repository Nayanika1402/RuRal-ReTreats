import React, { useState } from 'react';
import { Calendar, MapPin, Wifi, Users, Star, ChevronDown, Search, Filter, Heart, Eye } from 'lucide-react';

const Homestays = () => {
  const [selectedLocation, setSelectedLocation] = useState('');
  const [priceRange, setPriceRange] = useState([1000, 10000]);
  const [bedrooms, setBedrooms] = useState('');
  const [rating, setRating] = useState('');
  const [availability, setAvailability] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState('');
  const [destination, setDestination] = useState('');
  const [roomType, setRoomType] = useState('');
  const [expandedFAQ, setExpandedFAQ] = useState(null);

  const homestays = [
    {
      id: 1,
      name: "Traditional Haveli in Rajasthan",
      location: "Rajasthan",
      price: 2500,
      rating: 4.8,
      bedrooms: 1,
      bathrooms: 1,
      sqft: 800,
      available: true,
      features: ["🌾 Organic Farm", "🍽️ Home-Cooked Meals", "📶 WiFi Available", "🐴 Horse Riding"],
      image: "/img/haveli.png"
    },
    {
      id: 2,
      name: "Cozy Cottage in Kerala",
      location: "Kerala",
      price: 1800,
      rating: 4.6,
      bedrooms: 2,
      bathrooms: 1,
      sqft: 1000,
      available: false,
      features: ["🌊 Backwater Views", "🍽️ Local Cuisine", "📶 WiFi Available", "🚴‍♂️ Bicycle Rentals"],
      image: "/img/cozykerla.png"
    },
    {
      id: 3,
      name: "Mountain Retreat in Himachal",
      location: "Himachal Pradesh",
      price: 2200,
      rating: 4.7,
      bedrooms: 1,
      bathrooms: 1,
      sqft: 900,
      available: true,
      features: ["🏞️ Scenic Views", "🔥 Bonfire Area", "📶 WiFi Available", "🧗‍♂️ Trekking Guides"],
      image: "/img/moutainhotel.png"
    },
      {
        id: 4,
        name: "Spacious Villa in Uttarakhand",
        location: "Uttarakhand",
        price: 3000,
        rating: 4.9,
        bedrooms: 3,
        bathrooms: 2,
        sqft: 2000,
        available: true,
        features: ["🌳 Lush Gardens", "🍽️ Chef on Request", "📶 WiFi Available", "🧘‍♀️ Yoga Sessions"],
        image: "/img/SpaciousVilla.png"
      },
    {
      id: 5,
      name: "Heritage Home in Tamil Nadu",
      location: "Tamil Nadu",
      price: 2800,
      rating: 4.6,
      bedrooms: 2,
      bathrooms: 1,
      sqft: 1200,
      available: false,
      features: ["🏺 Cultural Tours", "🍽️ Traditional Cuisine", "📶 WiFi Available", "🌅 Sunset Views"],
      image: "/img/heritagetamil.png"
    },
    
  ];

  const testimonials = [
    { name: "Ananya Das", review: "The homestay was cozy and surrounded by nature. Perfect for a peaceful getaway!", rating: 5 },
    { name: "Rahul Sharma", review: "Amazing hospitality and authentic local cuisine. Highly recommended!", rating: 5 },
    { name: "Priya Patel", review: "Beautiful location with stunning views. The hosts were incredibly welcoming.", rating: 4 }
  ];

  const faqs = [
    { question: "How do I book a homestay?", answer: "Simply select your preferred dates, choose a homestay, and complete the booking process online." },
    { question: "What is the cancellation policy?", answer: "Free cancellation up to 24 hours before check-in. After that, 50% refund is available." },
    { question: "Are pets allowed in the homestay?", answer: "Pet policies vary by homestay. Please check individual property details or contact hosts directly." },
    { question: "What amenities are included?", answer: "Most homestays include WiFi, meals, and basic amenities. Specific amenities are listed for each property." },
    { question: "Is there parking available?", answer: "Most homestays provide free parking. Please confirm with your host during booking." }
  ];

  const calculatePrice = () => {
    if (!checkIn || !checkOut || !guests || !destination) return 0;
    const days = Math.ceil((new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24));
    const basePrice = 2000;
    return days * basePrice * parseInt(guests);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 to-blue-100">
      {/* Header */}
    

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-6 leading-tight">
            Escape to the Heart of
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-600">
              Rural India
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Experience the authentic charm of rural life in our handpicked homestays, 
            offering comfort, culture, and convenience.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-8 py-3 rounded-full hover:from-blue-700 hover:to-cyan-700 transition-all transform hover:scale-105">
              Explore Homestays
            </button>
            <button className="border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-full hover:bg-blue-600 hover:text-white transition-all">
              Book Now
            </button>
          </div>
        </div>
      </section>

      {/* Search Filters */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 mb-16">
        <div className="bg-white rounded-2xl shadow-xl p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
            <Filter className="mr-3 text-blue-600" />
            Filter Your Search
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">📍 Location</label>
              <select 
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
              >
                <option value="">All Locations</option>
                <option value="rajasthan">Rajasthan</option>
                <option value="kerala">Kerala</option>
                <option value="himachal">Himachal Pradesh</option>
                <option value="uttarakhand">Uttarakhand</option>
                <option value="tamil-nadu">Tamil Nadu</option>
                <option value="madhya-pradesh">Madhya Pradesh</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">💰 Price Range (₹)</label>
              <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option>₹1000 - ₹10,000</option>
                <option>₹1000 - ₹3000</option>
                <option>₹3000 - ₹5000</option>
                <option>₹5000 - ₹10000</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">🛏️ Bedrooms</label>
              <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option>Any</option>
                <option>1 Bedroom</option>
                <option>2 Bedrooms</option>
                <option>3 Bedrooms</option>
                <option>4+ Bedrooms</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">⭐ Rating</label>
              <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option>All Ratings</option>
                <option>4 Stars & Above</option>
                <option>3 Stars & Above</option>
              </select>
            </div>
          </div>
          <div className="mt-6 flex justify-center">
            <button className="bg-blue-600 text-white px-8 py-3 rounded-full hover:bg-blue-700 transition-colors flex items-center">
              <Search className="mr-2 w-5 h-5" />
              Apply Filters
            </button>
          </div>
        </div>
      </section>

      {/* Homestays Grid */}
      <section id="homestays" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">🏡 Explore Our Homestays</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {homestays.map((homestay) => (
            <div key={homestay.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="h-48 bg-[url(${homestay.image})] relative bg-cover"  style={{ backgroundImage: `url(${homestay.image || ''})` }}>
                
              {/* ${homestay.image} */}
                <div className="absolute top-4 left-4 bg-white px-3 py-1 rounded-full flex items-center">
                  <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                  <span className="font-semibold">{homestay.rating}</span>
                </div>
                <div className="absolute top-4 right-4 flex space-x-2">
                  <button className="bg-white p-2 rounded-full hover:bg-gray-100 transition-colors">
                    <Heart className="w-5 h-5 text-gray-600" />
                  </button>
                </div>
                <div className={`absolute bottom-4 right-4 px-3 py-1 rounded-full text-sm font-medium ${
                  homestay.available 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {homestay.available ? '✅ Available' : '❌ Unavailable'}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">{homestay.name}</h3>
                <div className="flex items-center text-gray-600 mb-2">
                  <MapPin className="w-4 h-4 mr-1" />
                  <span>{homestay.location}</span>
                </div>
                <div className="text-2xl font-bold text-blue-600 mb-4">
                  ₹{homestay.price.toLocaleString()}/Day
                </div>
                <div className="flex items-center text-sm text-gray-500 mb-4">
                  <span>{homestay.bedrooms} Bedroom • {homestay.bathrooms} Bathroom • {homestay.sqft} sq ft</span>
                </div>
                <div className="space-y-1 mb-6">
                  {homestay.features.map((feature, index) => (
                    <div key={index} className="text-sm text-gray-600">{feature}</div>
                  ))}
                </div>
                <button className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-3 rounded-lg hover:from-blue-700 hover:to-cyan-700 transition-all flex items-center justify-center">
                  <Eye className="mr-2 w-5 h-5" />
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Booking Form */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Book Your Homestay</h2>
          <p className="text-gray-600 text-center mb-8">Experience comfort and luxury at our homestay. Choose your preferences and secure your perfect stay today!</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Check-In Date</label>
              <input 
                type="date" 
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Check-Out Date</label>
              <input 
                type="date" 
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Number of Guests</label>
              <select 
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={guests}
                onChange={(e) => setGuests(e.target.value)}
              >
                <option value="">Select Guests</option>
                <option value="1">1 Guest</option>
                <option value="2">2 Guests</option>
                <option value="3">3 Guests</option>
                <option value="4">4 Guests</option>
                <option value="5">5 Guests</option>
                <option value="6">6+ Guests</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Select Destination</label>
              <select 
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
              >
                <option value="">Select Location</option>
                <option value="rajasthan">Rajasthan</option>
                <option value="kerala">Kerala</option>
                <option value="himachal">Himachal Pradesh</option>
                <option value="uttarakhand">Uttarakhand</option>
                <option value="tamil-nadu">Tamil Nadu</option>
                <option value="madhya-pradesh">Madhya Pradesh</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Room Type</label>
              <select 
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={roomType}
                onChange={(e) => setRoomType(e.target.value)}
              >
                <option value="">Choose a Room Type</option>
                <option value="deluxe">Deluxe Room</option>
                <option value="luxury">Luxury Suite</option>
                <option value="cottage">Private Cottage</option>
                <option value="villa">Beachfront Villa</option>
              </select>
            </div>
            <div className="lg:col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">Estimated Price</label>
              <div className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 text-2xl font-bold text-blue-600">
                ₹{calculatePrice().toLocaleString()}
              </div>
            </div>
          </div>
          
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Any Special Requests?</label>
            <textarea 
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent h-24"
              placeholder="Tell us about any special requirements..."
            ></textarea>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-gray-600 text-white px-8 py-3 rounded-full hover:bg-gray-700 transition-colors">
              Calculate Price
            </button>
            <button className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-8 py-3 rounded-full hover:from-blue-700 hover:to-cyan-700 transition-all transform hover:scale-105">
              Proceed to Booking
            </button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">What Our Travelers Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="flex items-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-600 mb-4 italic">"{testimonial.review}"</p>
              <p className="font-semibold text-gray-800">- {testimonial.name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
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

      {/* Footer */}
    
    </div>
  );
};

export default Homestays;