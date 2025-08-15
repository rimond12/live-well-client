import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { motion } from "framer-motion";
import Lottie from "lottie-react";
import locationAnimation from "../../../lotties/UO9kFTQ7Ir.json";

const LocationSection = () => {
  const position = [23.7543, 90.417];

  return (
    <section className="py-20 px-0 relative px-6 md:px-2">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8">
        <motion.div
          className="relative bg-[#111111] p-10 flex flex-col justify-center text-white"
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="relative z-10 space-y-6">
            <div
              style={{
                width: 120,
                height: 120,
                background:
                  "radial-gradient(circle at center, #c7b39a40, transparent 70%)",
                borderRadius: "50%",
                padding: "10px",
              }}
            >
              <Lottie animationData={locationAnimation} loop={true} />
            </div>

            <h2 className="text-4xl font-bold">
              Our <span className="text-[#c7b39a]">Location</span>
            </h2>
            <p className="text-lg text-gray-300 leading-relaxed">
              LiveWell Apartments is located at the heart of Dhaka city — near
              Gulshan-2. It’s easily accessible by bus, rickshaw, and car. With
              nearby restaurants, parks, and schools, our location is perfect
              for families and professionals.
            </p>
            <p className="text-md font-semibold text-gray-400">
              Address:{" "}
              <span className="text-[#c7b39a]">
                House #15, Road #3, Gulshan 2, Dhaka 1212, Bangladesh
              </span>
            </p>
          </div>
        </motion.div>

        <motion.div
          className="relative rounded-xl overflow-hidden shadow-2xl"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          <MapContainer
            center={position}
            zoom={15}
            scrollWheelZoom={false}
            className="w-full h-80 md:h-full rounded-xl"
          >
            <TileLayer
              attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={position}>
              <Popup>
                <div className="font-semibold text-gray-700">
                  LiveWell Apartments <br /> Gulshan 2, Dhaka
                </div>
              </Popup>
            </Marker>
          </MapContainer>
        </motion.div>
      </div>
    </section>
  );
};

export default LocationSection;
