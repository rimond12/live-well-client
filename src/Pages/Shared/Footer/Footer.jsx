import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaEnvelope,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#111111] py-10 px-6 md:px-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Logo & Name & Description */}
        <div className="flex flex-col items-start">
          <div className="flex items-center gap-3 mb-4">
            <img
              src="https://i.ibb.co/pv8PQkKy/1.png"
              alt="LiveWell Logo"
              className="w-10 h-10"
            />
            <h2
              className="text-3xl font-bold font-serif"
              style={{ color: "#ccbead" }}
            >
              LiveWell
            </h2>
          </div>
          <p className="leading-relaxed" style={{ color: "#ccbead" }}>
            LiveWell Apartments brings you the best in urban living with
            comfort, convenience, and community.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3
            className="text-xl font-semibold mb-4"
            style={{ color: "#ccbead" }}
          >
            Quick Links
          </h3>
          <ul className="space-y-3">
            {["Home", "Apartments", "Dashboard", "Login"].map((text) => (
              <li key={text}>
                <a
                  href={`/${
                    text.toLowerCase() === "home" ? "" : text.toLowerCase()
                  }`}
                  className="transition-colors duration-300"
                  style={{ color: "#ccbead" }}
                  onMouseEnter={(e) => (e.target.style.color = "#fff")}
                  onMouseLeave={(e) => (e.target.style.color = "#ccbead")}
                >
                  {text}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact & Social */}
        <div>
          <h3
            className="text-xl font-semibold mb-4"
            style={{ color: "#ccbead" }}
          >
            Connect with Us
          </h3>
          <p className="mb-4 leading-relaxed" style={{ color: "#ccbead" }}>
            Gulshan Avenue, Dhaka, Bangladesh
          </p>
          <div className="flex gap-6 text-2xl">
            <a
              href="mailto:info@livewell.com"
              className="transition-colors duration-300"
              style={{ color: "#ccbead" }}
              onMouseEnter={(e) => (e.target.style.color = "#fff")}
              onMouseLeave={(e) => (e.target.style.color = "#ccbead")}
              aria-label="Email"
            >
              <FaEnvelope />
            </a>
            <a
              href="#"
              className="transition-colors duration-300"
              style={{ color: "#ccbead" }}
              onMouseEnter={(e) => (e.target.style.color = "#3b5998")}
              onMouseLeave={(e) => (e.target.style.color = "#ccbead")}
              aria-label="Facebook"
            >
              <FaFacebookF />
            </a>
            <a
              href="#"
              className="transition-colors duration-300"
              style={{ color: "#ccbead" }}
              onMouseEnter={(e) => (e.target.style.color = "#1da1f2")}
              onMouseLeave={(e) => (e.target.style.color = "#ccbead")}
              aria-label="Twitter"
            >
              <FaTwitter />
            </a>
            <a
              href="#"
              className="transition-colors duration-300"
              style={{ color: "#ccbead" }}
              onMouseEnter={(e) => (e.target.style.color = "#0077b5")}
              onMouseLeave={(e) => (e.target.style.color = "#ccbead")}
              aria-label="LinkedIn"
            >
              <FaLinkedinIn />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Text */}
      <div
        className="text-center mt-10 text-sm select-none"
        style={{ color: "#ccbead" }}
      >
        &copy; {new Date().getFullYear()} LiveWell Apartments. All rights
        reserved by Rimon Dey.
      </div>
    </footer>
  );
};

export default Footer;
