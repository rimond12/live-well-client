import React, { useEffect, useState } from "react";

const bannerImages = [
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1350&q=80",
  "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1350&q=80",
];

const Banner = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % bannerImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full h-[90vh] overflow-hidden mt-0 md:mt-15">
      {bannerImages.map((img, index) => (
        <div
          key={index}
          className={`absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
            index === current ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          <img
            src={img}
            alt={`Banner ${index + 1}`}
            className="w-full h-full object-cover"
          />
          {/* Overlay */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundColor: "rgba(0,0,0,0.3)", 
              pointerEvents: "none",
            }}
          ></div>

          {/* Text Content */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="text-center text-white px-4">
              <h1 className="text-4xl md:text-6xl font-bold font-serif mb-4">
                Experience Luxury Living
              </h1>
              <p className="text-lg md:text-xl text-gray-300 max-w-xl mx-auto">
                LiveWell Apartments - Your Comfort is Our Priority
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Banner;
