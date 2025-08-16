// Testimonials.jsx
import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaStar } from "react-icons/fa";

const testimonials = [
  { id: 1, name: "Rifat Hossain", image: "https://i.ibb.co.com/3YRwkWZC/portrait-interesting-young-man-winter-clothes-1.jpg", review: "I love living in LiveWell Apartments! Great location and friendly staff.", rating: 5 },
  { id: 2, name: "Sadia Rahman", image: "https://i.ibb.co.com/gZQbRVVL/2148204587.jpg", review: "Spacious apartments with excellent amenities. Highly recommend to families.", rating: 4 },
  { id: 3, name: "Tanvir Alam", image: "https://i.ibb.co.com/Z6fnX60T/male-lawyer-working-table-office-closeup-1311477-100646.jpg", review: "Perfect apartment for professionals. Safe and clean environment.", rating: 5 },
];

const Testimonials = () => {
  const [current, setCurrent] = useState(0);
  const length = testimonials.length;

  // Auto-slide
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % length);
    }, 4000); // 4 seconds
    return () => clearInterval(timer);
  }, [length]);

  return (
    <section className="py-20 relative px-6 md:px-2 bg-[#111111] overflow-hidden my-12">
      <div className="max-w-7xl mx-auto text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-white">What Our Tenants Say</h2>
        <p className="text-gray-300 mt-3">Real reviews from our satisfied tenants</p>
      </div>

      <div className="relative max-w-7xl mx-auto flex overflow-hidden">
        <AnimatePresence>
          <motion.div
            key={testimonials[current].id}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.8 }}
            className="bg-[#1a1a1a] text-white rounded-xl p-6 flex flex-col items-center shadow-md mx-2 min-w-full"
          >
            <img
              src={testimonials[current].image}
              alt={testimonials[current].name}
              className="w-20 h-20 rounded-full object-cover mb-4"
            />
            <h3 className="font-semibold text-lg mb-2">{testimonials[current].name}</h3>
            <div className="flex mb-3">
              {Array(testimonials[current].rating)
                .fill(0)
                .map((_, i) => (
                  <FaStar key={i} className="text-[#a38966]" />
                ))}
            </div>
            <p className="text-gray-300 text-center">{testimonials[current].review}</p>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Testimonials;
