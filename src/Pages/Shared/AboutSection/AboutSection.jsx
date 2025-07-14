import React from "react";
import { motion } from "framer-motion";

const AboutSection = () => {
  return (
    <section className="py-16 px-6 md:px-20 mt-15">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-10">
        {/* Image with animation */}
        <motion.div
          className="md:w-1/2"
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <img
            src="https://i.ibb.co/60Q9Y4C2/medium-shot-people-collecting-food.jpg"
            alt="Building"
            className="rounded-lg shadow-lg object-cover w-full h-72 md:h-96"
          />
        </motion.div>

        {/* Text with animation */}
        <motion.div
          className="md:w-1/2"
          initial={{ opacity: 0, x: 100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          <h2 className="text-4xl font-semibold mb-6 text-gray-800">
            About LiveWell Apartments
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed mb-4">
            LiveWell Apartments offers you the perfect blend of modern living
            with serene surroundings. Located in the heart of the city, our
            building features state-of-the-art facilities, spacious apartments,
            and a welcoming community.
          </p>
          <p className="text-gray-600 text-lg leading-relaxed">
            Whether you're looking for a cozy one-bedroom or a spacious family
            apartment, LiveWell has options to fit your lifestyle. Experience
            luxury, comfort, and convenience all in one place.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
