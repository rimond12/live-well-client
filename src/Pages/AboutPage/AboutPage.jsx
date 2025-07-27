import React from "react";
import Lottie from "lottie-react";
import aboutAnimation from "../../lotties/About.json";
const AboutPage = () => {
  return (
    <div className="bg-gradient-to-b from-[#f9f7f3] to-[#e5ddd1]  flex flex-col items-center justify-center px-6 py-12">
      <div className="max-w-4xl mx-auto text-center space-y-8">
        {/* Lottie Animation */}
        <div className="w-60 mx-auto">
          <Lottie animationData={aboutAnimation} loop={true} />
        </div>

        {/* Heading */}
        <h1 className="text-4xl md:text-5xl font-bold text-[#3b2f2f] drop-shadow-md">
          About <span className="text-[#ccbead]">Us</span>
        </h1>

        {/* Description */}
        <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
          Welcome to{" "}
          <span className="font-semibold text-[#a38966]">Our Platform</span>,
          where we believe in creating meaningful connections and delivering
          high-quality services. Our mission is to make your life simpler, more
          exciting, and deeply connected to the things you love. Whether you’re
          exploring new experiences or growing your community, we are here to
          support you every step of the way.
        </p>

        {/* Fancy Box Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
          <div className="bg-white rounded-2xl shadow-lg p-6 hover:scale-105 transition-transform">
            <h3 className="text-2xl font-semibold text-[#ccbead] mb-4">
              Our Vision
            </h3>
            <p className="text-gray-600">
              Building an innovative digital ecosystem that empowers people to
              share and grow.
            </p>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-6 hover:scale-105 transition-transform">
            <h3 className="text-2xl font-semibold text-[#ccbead] mb-4">
              Our Mission
            </h3>
            <p className="text-gray-600">
              Making interactions effortless and memorable with technology and
              creativity.
            </p>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-6 hover:scale-105 transition-transform">
            <h3 className="text-2xl font-semibold text-[#ccbead] mb-4">
              Our Values
            </h3>
            <p className="text-gray-600">
              Innovation, Integrity, and Inclusion form the backbone of
              everything we do.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
