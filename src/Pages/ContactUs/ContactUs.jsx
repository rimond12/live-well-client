import { motion } from "framer-motion";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

export default function ContactUs() {
    return (
        <div className="bg-white min-h-screen">
            {/* Header */}
            <div className="bg-[#a38966] py-16 text-center text-white">
                <motion.h1
                    className="text-4xl font-bold"
                    initial={{ opacity: 0, y: -40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                >
                    Contact Us
                </motion.h1>
                <p className="mt-4 text-lg">We’d love to hear from you. Get in touch!</p>
            </div>

            {/* Content */}
            <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-2 gap-12">
                {/* Contact Info */}
                <motion.div
                    className="space-y-6"
                    initial={{ opacity: 0, x: -40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h2 className="text-2xl font-semibold text-[#a38966]">Get in Touch</h2>
                    <p className="text-gray-700">
                        Have questions about apartments, agreements, or payments? Reach out
                        to us directly and our team will assist you.
                    </p>
                    <div className="space-y-4 text-gray-800">
                        <p className="flex items-center gap-3">
                            <FaMapMarkerAlt className="text-[#a38966]" /> 123 LiveWell Street,
                            Dhaka, Bangladesh
                        </p>
                        <p className="flex items-center gap-3">
                            <FaPhoneAlt className="text-[#a38966]" /> +880 1234-567890
                        </p>
                        <p className="flex items-center gap-3">
                            <FaEnvelope className="text-[#a38966]" /> support@livewell.com
                        </p>
                    </div>
                </motion.div>

                {/* Contact Form */}
                <motion.div
                    className="bg-gray-50 p-8 rounded-xl shadow-lg"
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h2 className="text-2xl font-semibold text-[#a38966] mb-6">
                        Send Us a Message
                    </h2>
                    <form className="space-y-5">
                        <div>
                            <label className="block text-gray-700 mb-2">Your Name</label>
                            <input
                                type="text"
                                placeholder="Enter your name"
                                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#a38966]"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 mb-2">Your Email</label>
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#a38966]"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 mb-2">Message</label>
                            <textarea
                                rows="4"
                                placeholder="Write your message..."
                                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#a38966]"
                            ></textarea>
                        </div>
                        <motion.button
                            type="submit"
                            className="w-full py-3 rounded-md border-2 border-[#a38966] bg-[#a38966] text-white font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-[#a38966] focus:ring-opacity-50"
                            whileHover={{
                                backgroundColor: "#ffffff",
                                color: "#000000",
                                borderColor: "#a38966",
                                transition: { duration: 0.3 },
                            }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Send Message
                        </motion.button>
                    </form>
                </motion.div>
            </div>

            {/* Map Placeholder */}
            <div className="w-full h-64 mt-10">
                <iframe
                    title="LiveWell Location"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3650.458555679819!2d90.39945241543173!3d23.77717669354324!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c766f17e3c09%3A0xc58fa4b5a3c3cdb!2sDhaka!5e0!3m2!1sen!2sbd!4v1671193771234"
                    className="w-full h-full border-0"
                    allowFullScreen=""
                    loading="lazy"
                ></iframe>
            </div>
        </div>
    );
}
