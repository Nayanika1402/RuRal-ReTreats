import { Heart, MessageCircle, Copy, X } from 'lucide-react';

export default function TwitterTestimonials() {
   const testimonials = [
   
    {
      id: 2,
      name: "Arjun Patel",
      username: "@wanderer_arjun",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      verified: false,
      content: "Rural Retreats made my Himachal Pradesh trek unforgettable! 🏔️\n\nProfessional guides, comfortable homestays, and breathtaking mountain views. Worth every penny!",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=250&fit=crop",
      time: "10:45 AM • Dec 12, 2024",
      likes: 692,
      replies: 41,
      hasImage: true
    },
    {
      id: 3,
      name: "Priya Sharma",
      username: "@priya_explorer",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      verified: true,
      content: "Things I loved about my Rajasthan heritage tour:\n\n- Stayed in authentic havelis\n- Camel safari in Thar desert was magical\n- Local cultural performances every evening\n- Guide knew every historical detail\n\nAlready planning my next trip! 🐪",
      time: "6:20 PM • Dec 10, 2024",
      likes: 934,
      replies: 67,
      hasImage: false
    },
    {
      id: 4,
      name: "Mike Thompson",
      username: "@mike_backpacks",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      verified: false,
      content: "First solo trip to India and Rural Retreats took care of everything! 🇮🇳\n\nFrom airport pickup to local experiences in Goa. Felt safe and had the time of my life. #SoloTravel #GoaVibes",
      image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=400&h=300&fit=crop",
      time: "4:15 PM • Dec 8, 2024",
      likes: 758,
      replies: 89,
      hasImage: true
    },
    {
      id: 5,
      name: "Ananya Das",
      username: "@ananya_journeys",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face",
      verified: true,
      content: "My family trip to Darjeeling with Rural Retreats was perfect! 🚂\n\n- Kids loved the toy train ride\n- Tea garden tours were educational\n- Homestay family treated us like relatives\n- Sunrise at Tiger Hill = priceless moment\n\nHighly recommend for families! ❤️",
      time: "11:30 AM • Dec 5, 2024",
      likes: 1247,
      replies: 156,
      hasImage: false
    },
    {
      id: 6,
      name: "Rahul Mehta",
      username: "@rahul_adventures",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
      verified: false,
      content: "Beach lovers, listen up! 🏖️\n\nRural Retreats' Andaman package was incredible. Crystal clear waters, water sports, and the most relaxing beach huts.\n\nBooking my Lakshadweep trip with them next! 🐠",
      image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=250&fit=crop",
      time: "7:45 PM • Dec 3, 2024",
      likes: 623,
      replies: 94,
      hasImage: true
    }
  ];

  const formatNumber = (num) => {
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`;
    }
    return num.toString();
  };

  const TestimonialCard = ({ testimonial }) => (
    <div className="bg-blue-200 rounded-2xl p-6 border border-black hover:border-gray-600 transition-all duration-300">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <img 
            src={testimonial.avatar} 
            alt={testimonial.name}
            className="w-12 h-12 rounded-full object-cover"
          />
          <div>
            <div className="flex items-center space-x-1">
              <h3 className="text-black font-semibold">{testimonial.name}</h3>
              {testimonial.verified && (
                <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-black text-xs">✓</span>
                </div>
              )}
            </div>
            <p className="text-black-400 text-sm">{testimonial.username}</p>
          </div>
        </div>
        <X className="w-5 h-5 text-black-500" />
      </div>

      <p className="text-black leading-relaxed mb-4 whitespace-pre-line">
        {testimonial.content}
      </p>

      {testimonial.hasImage && testimonial.image && (
        <div className="mb-4 rounded-xl overflow-hidden">
          <img 
            src={testimonial.image} 
            alt="Post content"
            className="w-full h-48 object-cover"
          />
        </div>
      )}

      <div className="text-black-500 text-sm mb-4">
        {testimonial.time}
      </div>

      <div className="flex items-center justify-between text-black-400">
        <div className="flex items-center space-x-1 hover:text-red-400 cursor-pointer transition-colors">
          <Heart className="w-5 h-5" />
          <span className="text-sm">{formatNumber(testimonial.likes)}</span>
        </div>
        <div className="flex items-center space-x-1 hover:text-blue-400 cursor-pointer transition-colors">
          <MessageCircle className="w-5 h-5" />
          <span className="text-sm">Reply</span>
        </div>
        <div className="flex items-center space-x-1 hover:text-green-400 cursor-pointer transition-colors">
          <Copy className="w-5 h-5" />
          <span className="text-sm">Copy link</span>
        </div>
      </div>

      {testimonial.replies > 0 && (
        <div className="mt-4 pt-4 border-t border-gray-700">
          <button className="text-blue-400 text-sm hover:underline">
            Read {testimonial.replies} replies
          </button>
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12 rounded-2xl p-4 bg-blue-300">
          <h2 className="text-4xl font-bold text-black mb-4">What Our Customers Say</h2>
          <p className="text-black text-lg">Real testimonials from our community</p>
        </div>

        <div className="max-h-[600px] overflow-y-auto scrollbar-hide">
          <style jsx>{`
            .scrollbar-hide {
              -ms-overflow-style: none;
              scrollbar-width: none;
            }
            .scrollbar-hide::-webkit-scrollbar {
              display: none;
            }
          `}</style>
          <div className="grid text-black grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Column 1 */}
            <div className="flex flex-col space-y-6">
              {testimonials.slice(0, 3).map((testimonial) => (
                <TestimonialCard key={`col1-${testimonial.id}`} testimonial={testimonial} />
              ))}
              {testimonials.slice(4, 6).map((testimonial) => (
                <TestimonialCard key={`col1-extra-${testimonial.id}`} testimonial={testimonial} />
              ))}
            </div>

            {/* Column 2 */}
            <div className="hidden md:flex flex-col space-y-6 mt-12">
              {testimonials.slice(1, 4).map((testimonial) => (
                <TestimonialCard key={`col2-${testimonial.id}`} testimonial={testimonial} />
              ))}
              {testimonials.slice(0, 1).map((testimonial) => (
                <TestimonialCard key={`col2-extra-${testimonial.id}`} testimonial={testimonial} />
              ))}
              {testimonials.slice(6, 6).map((testimonial) => (
                <TestimonialCard key={`col2-last-${testimonial.id}`} testimonial={testimonial} />
              ))}
                
            </div>

            {/* Column 3 */}
            <div className="hidden lg:flex flex-col space-y-6 mt-6">
              {testimonials.slice(2, 6).map((testimonial) => (
                <TestimonialCard key={`col3-${testimonial.id}`} testimonial={testimonial} />
              ))}
              {testimonials.slice(0, 1).map((testimonial) => (
                <TestimonialCard key={`col3-extra-${testimonial.id}`} testimonial={testimonial} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}