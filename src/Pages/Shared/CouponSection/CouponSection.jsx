import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaTag, FaPercent, FaGift, FaCopy, FaCheckCircle } from "react-icons/fa";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const CouponSection = () => {
  const [coupons, setCoupons] = useState([]);
  const [copiedCode, setCopiedCode] = useState("");
  const axiosSecure = useAxiosSecure();
 

  useEffect(() => {
    axiosSecure
      .get("/coupon")
      .then((res) => setCoupons(res.data))
      .catch((err) => console.error(err));
  }, [axiosSecure]);

  const handleCopy = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(""), 2000); // 2 seconds after reset
  };

  return (
    <section className="relative py-20 bg-gradient-to-b from-green-50 via-white to-green-50 px-6 md:px-20 my-16">
      {/* Decorative Background Pattern */}
      <div className="absolute top-0 left-0 w-full h-full opacity-5 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>

      <div className="relative max-w-6xl mx-auto text-center">
        <motion.h2
          className="text-4xl font-extrabold mb-4 text-gray-800"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          💸 Exclusive Coupons for You
        </motion.h2>
        <p className="text-gray-600 mb-14 text-lg">
          Save more on your apartment bookings and enjoy amazing discounts!
        </p>

        {coupons.length === 0 ? (
          <p className="text-gray-500">No coupons available right now.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
            {coupons.map((coupon, index) => (
              <motion.div
                key={coupon._id || index}
                className="bg-white/80 backdrop-blur-lg border border-green-200 rounded-3xl shadow-xl p-8 
                           hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 relative overflow-hidden"
                initial={{ opacity: 0, scale: 0.85 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                {/* Animated Icon Top Corner */}
                <div className="absolute top-4 right-4 bg-green-100 p-3 rounded-full">
                  <FaGift className="text-green-600 text-xl animate-bounce" />
                </div>

                <div className="flex items-center justify-center gap-3 mb-5">
                  <FaTag className="text-green-500 text-3xl" />
                  <h3 className="text-3xl font-bold text-green-700 tracking-wide">
                    {coupon.code}
                  </h3>
                </div>

                <p className="flex items-center justify-center text-2xl font-semibold text-green-600 mb-4">
                  <FaPercent className="mr-2" /> {coupon.discount}% OFF
                </p>
                <p className="text-gray-600 text-base mb-6">{coupon.description}</p>

                {/* Copy Button */}
                <button
                  onClick={() => handleCopy(coupon.code)}
                  className="flex items-center gap-2 px-5 py-2 bg-green-600 text-white font-semibold rounded-full 
                             hover:bg-green-700 transition-all duration-300 mx-auto"
                >
                  {copiedCode === coupon.code ? (
                    <>
                      <FaCheckCircle /> Copied
                    </>
                  ) : (
                    <>
                      <FaCopy /> Copy Code
                    </>
                  )}
                </button>

                {/* Decorative Gradient */}
                <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-green-200 rounded-full blur-3xl opacity-30"></div>
                <div className="absolute -top-10 -left-10 w-28 h-28 bg-green-300 rounded-full blur-3xl opacity-20"></div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default CouponSection;
