import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  FaTag,
  FaPercent,
  FaGift,
  FaCopy,
  FaCheckCircle,
} from "react-icons/fa";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";

const CouponSection = () => {
  const [coupons, setCoupons] = useState([]);
  const [copiedCode, setCopiedCode] = useState("");
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    axiosSecure
      .get("/coupon")
      .then((res) => setCoupons(res.data))
      .catch((err) => toast.error(err));
  }, [axiosSecure]);

  const handleCopy = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(""), 2000);
  };

  return (
    <section className="relative py-20 px-6 md:px-2 bg-[#111111] overflow-hidden my-20">
      <div className="absolute top-10 left-0 w-72 h-72 bg-[#c7b39a] opacity-20 blur-3xl rounded-full"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-[#c7b39a] opacity-10 blur-3xl rounded-full"></div>

      <div className="relative max-w-7xl mx-auto text-center z-10">
        <motion.h2
          className="text-4xl md:text-5xl font-extrabold mb-4 text-white"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          🎁 Exclusive <span className="text-[#c7b39a]">Coupons</span> for You
        </motion.h2>
        <p className="text-gray-300 mb-14 text-lg">
          Save more on your apartment bookings and enjoy amazing discounts!
        </p>

        {coupons.length === 0 ? (
          <p className="text-gray-400">No coupons available right now.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {coupons.map((coupon, index) => (
              <motion.div
                key={coupon._id || index}
                className="relative bg-white/10 backdrop-blur-lg border border-[#c7b39a]/40 rounded-3xl shadow-xl 
                           p-8 transition-transform transform hover:-translate-y-3 hover:rotate-1 duration-500"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                {/* Animated Icon */}
                <div className="absolute top-4 right-4 bg-[#c7b39a]/20 p-3 rounded-full">
                  <FaGift className="text-[#c7b39a] text-xl animate-bounce" />
                </div>

                <div className="flex items-center justify-center gap-3 mb-5">
                  <FaTag className="text-[#c7b39a] text-3xl" />
                  <h3 className="text-3xl font-bold text-white tracking-wide">
                    {coupon.code}
                  </h3>
                </div>

                <p className="flex items-center justify-center text-2xl font-semibold text-[#c7b39a] mb-4">
                  <FaPercent className="mr-2" /> {coupon.discount}% OFF
                </p>
                <p className="text-gray-300 text-base mb-6">
                  {coupon.description}
                </p>

                {/* Copy Button */}
                <button
                  onClick={() => handleCopy(coupon.code)}
                  className="flex items-center gap-2 px-5 py-2 bg-[#c7b39a] text-black font-semibold rounded-full 
                             hover:bg-white hover:text-[#111111] transition-all duration-300 mx-auto"
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
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default CouponSection;
