import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function HorizontalCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Detailed carousel items
  const images = [
    {
      id: 1,
      src: '/img/3.jpg',
      alt: 'Heritage Town',
      name: 'Heritage Town',
      location: "📍 Pondicherry",
      about: "With its French colonial architecture, charming beaches, and vibrant café culture, Pondicherry is a perfect blend of history and leisure.",
      button: "Learn More"
    },
    {
      id: 2,
      src: '/img/4.jpg', // make sure this image exists in /img folder
      alt: 'Healing Himalayas',
      name: 'Healing Himalayas',
      location: "📍 Himachal Pradesh",
      about: "Escape to the serene Himalayas and rejuvenate your mind, body, and soul. Enjoy peaceful treks, meditation retreats, and breathtaking views surrounded by nature.",
      button: "Explore Now"
    },
    {
      id: 3,
      src: '/img/5.jpg',
      alt: 'Ocean Waves',
      name: 'Ocean Waves',
      location: "📍 Goa",
      about: "Relax at pristine beaches, enjoy water sports, and soak in the lively coastal vibes of Goa.",
      button: "Learn More"
    },
    {
      id: 4,
      src: '/img/7.jpg',
      alt: 'Mountain View',
      name: 'Mountain Retreat',
      location: "📍 Manali",
      about: "Escape to snow-capped mountains, serene valleys, and cozy homestays nestled in nature.",
      button: "Learn More"
    },
    {
      id: 5,
      src: '/img/20.jpg',
      alt: 'Traditional Village Life',
      name: 'Traditional Village Life',
      location: "📍 India (Hilly Region)",
      about: "tep into the charm of rural India, where life moves at a gentle pace. Experience the authenticity of traditional village life with mud-brick houses, open courtyards, and winding paths surrounded by lush hills.",
      button: "Learn More"
    }
  ];

  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % images.length);
  const prevSlide = () => setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  const goToSlide = (index) => setCurrentIndex(index);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-4xl font-bold text-center mb-10 text-gray-800">Featured Homestays</h1>

      <div className="relative bg-white rounded-xl shadow-xl overflow-hidden">
        {/* Carousel */}
        <div className="relative h-[500px] overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-in-out h-full"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {images.map((image, index) => (
              <div key={image.id} className="min-w-full h-full relative">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

                {/* Info Box */}
                <div className="absolute bottom-8 left-8 max-w-xl text-white">
                  <h2 className="text-2xl font-bold">{image.name}</h2>
                  <p className="mt-1 text-sm opacity-90">{image.location}</p>
                  <p className="mt-2 text-base opacity-80">{image.about}</p>
                  <button className="mt-4 bg-green-600 hover:bg-green-500 transition-colors text-white px-4 py-2 rounded-lg font-medium">
                    {image.button}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 rounded-full p-2 shadow-lg transition-all duration-200 hover:scale-110"
        >
          <ChevronLeft size={28} />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 rounded-full p-2 shadow-lg transition-all duration-200 hover:scale-110"
        >
          <ChevronRight size={28} />
        </button>

        {/* Dots */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {images.map((_, idx) => (
            <button
              key={idx}
              onClick={() => goToSlide(idx)}
              className={`w-3 h-3 rounded-full transition-all duration-200 ${idx === currentIndex ? 'bg-white scale-125' : 'bg-white/50 hover:bg-white/70'
                }`}
            />
          ))}
        </div>
      </div>

      {/* Thumbnails */}
      <div className="flex justify-center space-x-3 mt-6">
        {images.map((image, idx) => (
          <button
            key={image.id}
            onClick={() => goToSlide(idx)}
            className={`overflow-hidden rounded-lg transition-transform duration-200 ${idx === currentIndex ? 'ring-2 ring-green-500 scale-105' : 'opacity-70 hover:opacity-100 hover:scale-102'
              }`}
          >
            <img src={image.src} alt={image.alt} className="w-20 h-12 object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
}
