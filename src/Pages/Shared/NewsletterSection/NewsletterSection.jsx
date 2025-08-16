import { FaEnvelope } from "react-icons/fa";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const NewsletterSection = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.3 });

    return (
        <section className=" relative max-w-7xl mx-auto rounded-xl py-20 px-6 md:px-2 bg-[#111111] my-20 overflow-visible ">
            {/* Decorative blobs */}
            <div className="absolute top-10 left-0 w-72 h-72 bg-[#c7b39a] opacity-20 blur-3xl rounded-full"></div>
            <div className="absolute bottom-0 right-0 w-80 h-80 bg-[#c7b39a] opacity-10 blur-3xl rounded-full"></div>

            <motion.div
                ref={ref}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="max-w-3xl mx-auto text-center relative z-10"
            >
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                    Subscribe to Our Newsletter
                </h2>
                <p className="text-gray-300 mb-8">
                    Get the latest updates about our apartments, offers, and news directly in your inbox.
                </p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="flex flex-col md:flex-row items-center justify-center gap-4"
                >
                    <div className="relative w-full md:w-auto flex-1">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="w-full px-6 py-3 rounded-full border border-gray-400 focus:outline-none focus:ring-2 focus:ring-[#a38966] bg-gray-900 text-white placeholder-gray-400"
                        />
                        <FaEnvelope className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    </div>
                    <motion.button
                        className="px-8 py-3 rounded-full bg-[#a38966] text-white font-semibold"
                        whileHover={{ scale: 1.05, backgroundColor: "#8f7b55" }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ duration: 0.3 }}
                    >
                        Subscribe
                    </motion.button>
                </motion.div>
            </motion.div>
        </section>
    );
};

export default NewsletterSection;
