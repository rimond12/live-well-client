import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { motion } from "framer-motion";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const FeaturedApartments = () => {
  const [featured, setFeatured] = useState([]);
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const res = await axiosSecure.get("/apartments/featured");
        setFeatured(res.data);
      } catch (err) {
        console.error("Failed to fetch featured apartments:", err);
      }
    };
    fetchFeatured();
  }, []);

  const cardVariants = (index) => ({
    hidden: { opacity: 0, x: index % 2 === 0 ? -50 : 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.7, ease: "easeOut" },
    },
    hover: {
      scale: 1.05,
      y: -5,
      boxShadow: "0 15px 25px rgba(163,137,102,0.4)",
    },
  });

  if (featured.length === 0)
    return (
      <p className="text-center text-gray-400 mt-10">
        No featured apartments available.
      </p>
    );

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-5">
        <h2 className="text-3xl font-bold text-center mb-12 text-black">
          Featured Apartments
        </h2>

        <div className="grid md:grid-cols-3 gap-8 mb-10">
          {featured.map((apt, index) => (
            <motion.div
              key={apt._id}
              variants={cardVariants(index)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              whileHover="hover"
              className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col cursor-pointer"
            >
              <div className="relative overflow-hidden rounded-t-lg">
                <img
                  src={apt.apartment_image}
                  alt="Apartment"
                  className="h-48 w-full object-cover rounded-t-lg"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-t-lg pointer-events-none"></div>
              </div>

              <div className="p-5 flex flex-col flex-grow">
                <h3 className="text-xl font-semibold text-[#a38966] mb-3">
                  Apartment {apt.apartment_no}
                </h3>
                <div className="flex flex-col gap-1 text-gray-700 flex-grow">
                  <p>
                    <span className="font-semibold text-gray-900">Floor:</span>{" "}
                    {apt.floor_no}
                  </p>
                  <p>
                    <span className="font-semibold text-gray-900">Block:</span>{" "}
                    {apt.block_name}
                  </p>
                  <p>
                    <span className="font-semibold text-gray-900">Rent:</span>{" "}
                    <span className="text-[#a38966] font-bold">{apt.rent} ৳</span>
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <motion.button
            onClick={() => navigate("/apartments")}
            className="px-6 py-2 bg-[#a38966] text-white font-semibold rounded-full cursor-pointer"
            whileHover={{ scale: 1.05, backgroundColor: "#8f7b55" }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.3 }}
          >
            View All Apartments
          </motion.button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedApartments;
