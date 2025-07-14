import React from "react";
import { motion } from "framer-motion";

const coupons = [
  {
    code: "LIVEWELL10",
    discount: 10,
    description: "Get 10% off on your first month’s rent!",
  },
  {
    code: "SUMMER15",
    discount: 15,
    description: "Enjoy 15% off for July bookings!",
  },
  {
    code: "FAMILY20",
    discount: 20,
    description: "Book a family apartment & save 20%!",
  },
];

const CouponSection = () => {
  return (
    <section className="py-16 bg-gradient-to-b from-white to-green-50 px-6 md:px-20">
      <div className="max-w-6xl mx-auto text-center">
        <motion.h2
          className="text-4xl font-bold mb-10 text-gray-800"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          💸 Available Coupons
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {coupons.map((coupon, index) => (
            <motion.div
              key={index}
              className="bg-white border border-green-200 rounded-2xl shadow-lg p-6 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold text-green-700 mb-2">
                {coupon.code}
              </h3>
              <p className="text-xl font-semibold text-green-600 mb-1">
                {coupon.discount}% OFF
              </p>
              <p className="text-gray-600 text-sm">{coupon.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CouponSection;
