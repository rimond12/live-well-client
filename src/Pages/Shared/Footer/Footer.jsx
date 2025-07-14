import React from "react";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaEnvelope } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#111111] text-white py-10 px-6 md:px-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Column 1: Logo & Brand */}
        <div>
          <h2 className="text-3xl font-bold font-serif mb-4">LiveWell</h2>
          <p className="text-gray-400">
            LiveWell Apartments brings you the best in urban living with
            comfort, convenience, and community.
          </p>
        </div>

        {/* Column 2: Quick Links */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-gray-400">
            <li><a href="/" className="hover:text-white">Home</a></li>
            <li><a href="/apartments" className="hover:text-white">Apartments</a></li>
            <li><a href="/dashboard" className="hover:text-white">Dashboard</a></li>
            <li><a href="/login" className="hover:text-white">Login</a></li>
          </ul>
        </div>

        {/* Column 3: Contact & Social */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Connect with Us</h3>
          <p className="text-gray-400 mb-4">Gulshan Avenue, Dhaka, Bangladesh</p>
          <div className="flex gap-4 text-xl">
            <a href="mailto:info@livewell.com" className="hover:text-blue-400"><FaEnvelope /></a>
            <a href="#" className="hover:text-blue-500"><FaFacebookF /></a>
            <a href="#" className="hover:text-blue-300"><FaTwitter /></a>
            <a href="#" className="hover:text-blue-600"><FaLinkedinIn /></a>
          </div>
        </div>
      </div>

      <div className="text-center text-gray-500 mt-10 text-sm">
        &copy; {new Date().getFullYear()} LiveWell Apartments. All rights reserved by Rimon Dey.
      </div>
    </footer>
  );
};

export default Footer;
