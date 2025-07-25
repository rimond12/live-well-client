import React from "react";
import { motion } from "framer-motion";

const AboutSection = () => {
  return (
    <section className="relative py-20 px-6 md:px-20 my-20 overflow-visible">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12">
        {/* Image with fancy glow & border */}
        <motion.div
          className="md:w-1/2 relative group"
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Glow & Border */}
          <div className="absolute inset-0 rounded-lg border-4 border-[#c7b39a] opacity-30 group-hover:opacity-70 transition-opacity duration-300 shadow-[0_0_40px_rgba(199,179,154,0.6)]"></div>
          <img
            src="https://i.ibb.co/QFyDpzZD/istockphoto-479842074-612x612.jpg"
            alt="Building"
            className="relative rounded-lg object-cover w-full h-72 md:h-96 transform group-hover:scale-105 transition-transform duration-500 shadow-[0_10px_30px_rgba(199,179,154,0.5)]"
          />
        </motion.div>

        {/* Text content */}
        <motion.div
          className="md:w-1/2"
          initial={{ opacity: 0, x: 100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          <h2 className="text-4xl font-semibold mb-6 text-[#111111] relative">
            About <span className="text-[#f0a448]">LiveWell</span> Apartments
            <span className="absolute left-0 -bottom-2 w-24 h-1 rounded-full bg-gradient-to-r from-[#c7b39a] via-[#a4917f] to-[#c7b39a]"></span>
          </h2>
          <p className="text-[#222222] text-lg leading-relaxed mb-5">
            LiveWell Apartments offers you the perfect blend of{" "}
            <span className="text-[#f0a448] font-medium">modern living</span>{" "}
            with serene surroundings. Located in the heart of the city, our
            building features{" "}
            <span className="text-[#f0a448] font-medium">
              state-of-the-art facilities
            </span>
            , spacious apartments, and a welcoming community.
          </p>
          <p className="text-[#222222] text-lg leading-relaxed">
            Whether you're looking for a cozy one-bedroom or a spacious family
            apartment, LiveWell has options to fit your lifestyle. Experience{" "}
            <span className="text-[#f0a448] font-medium">luxury, comfort,</span>{" "}
            and <span className="text-[#f0a448] font-medium">convenience</span>{" "}
            all in one place.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
