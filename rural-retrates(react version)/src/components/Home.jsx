  import React, { useEffect } from "react";
  import CarouselSection from "./CarouselSection";
  import { Button } from "@material-tailwind/react";
  import HorizontalCarousel from "./CarouselSection";
  import Testimonials from "./Testimonials";
  import Loader from "./Loader";
  // import windChimes from "./assets/wind-chimes-1.mp3"; // adjust path as needed


  const Home = () => {
    useEffect(() => {
      const splash = document.querySelector(".splash-screen");
      const audio = document.querySelector(".audio-splash");
      if (audio) audio.play().catch(() => { });
      const timer = setTimeout(() => {
        if (splash) splash.style.display = "none";
      }, 3000);
      return () => clearTimeout(timer);
    }, []);

    return (
      <>
        {/* Splash Screen */}
        <div className="splash-screen fixed inset-0 bg-white flex flex-col justify-center items-center z-50">
        
        <Loader/>
        </div>

        {/* Navigation Bar */}


        {/* Hero Section */}
        <section className="bg-cover bg-center h-[500px] flex items-center justify-center text-center text-white" style={{ backgroundImage: "url('./img/4.jpg')" }}>
          <div className=" bg-opacity-50 p-8 rounded-xl">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">Discover Rural Retreats</h1>
            <p className="text-lg md:text-2xl mb-6">Find your perfect homestay in the heart of nature.</p>
            <a href="/services#homestays" className="bg-yellow-400 text-black px-6 py-3 rounded-lg font-semibold hover:bg-yellow-300">Explore Now</a>
          </div>
        </section>

        {/* About Us Section */}
        <section className="py-16 bg-gray-100">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center px-20">
            <div>
              <h2 className="text-3xl font-bold mb-4">About Us</h2>
              <p className="mb-6 text-gray-700">
                Experience the charm of countryside and beachside homestays with <b>Rural Retreats</b>. Enjoy <b> cultural heritage</b>, <b>local cuisines</b>, and <b>breathtaking landscapes</b> while staying in handpicked accommodations at <b>affordable prices</b>.

                Book your <b> bus tickets</b> and plan your stay in peaceful rural homestays or rejuvenating beachside cottages. Immerse yourself in <b>local traditions</b>, scenic beauty, and adventure while making <b>unforgettable memories</b>.
              </p>
              <a href="/about" className="bg-blue-700 text-white px-5 py-2 rounded-lg hover:bg-green-600">Learn More</a>
            </div>
            <img src="/img/about.png" alt="About Rural Retreats" className="rounded-xl shadow-lg" />

          </div>
        </section>

        <section>
          <HorizontalCarousel />
        </section>
        {/* Destination Showcase */}
      
        <section>
          <div className="testomonials">
  <Testimonials/>
          </div>
        </section>
      </>
    );
  };

  export default Home;
