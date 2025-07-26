import { useNavigate } from "react-router";
import useAuth from "../../hooks/useAuth";
import { motion } from "framer-motion";

const ApartmentCard = ({ apartment, onAgreement }) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const { _id, apartment_image, floor_no, block_name, apartment_no, rent } =
    apartment;

  const handleAgreement = () => {
    if (!user) {
      navigate("/login");
    } else {
      onAgreement(apartment);
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
    hover: {
      scale: 1.05,
      y: -10,
      boxShadow: "0 15px 25px rgba(163,137,102,0.4)",
    },
  };

  return (
    <motion.div
      className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col"
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
    >
      <motion.div
        className="relative overflow-hidden rounded-t-lg"
        whileHover={{ scale: 1.1 }}
        transition={{ duration: 0.7 }}
      >
        <img
          src={apartment_image}
          alt="Apartment"
          className="h-48 w-full object-cover rounded-t-lg"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-t-lg pointer-events-none"></div>
      </motion.div>

      <div className="p-5 flex flex-col flex-grow">
        <h3 className="text-xl font-semibold text-[#a38966] mb-3 transition-colors duration-300">
          Apartment {apartment_no}
        </h3>

        <div className="flex flex-col gap-1 text-gray-700 flex-grow">
          <p>
            <span className="font-semibold text-gray-900">Floor:</span>{" "}
            {floor_no}
          </p>
          <p>
            <span className="font-semibold text-gray-900">Block:</span>{" "}
            {block_name}
          </p>
          <p>
            <span className="font-semibold text-gray-900">Rent:</span>{" "}
            <span className="text-[#a38966] font-bold">{rent} ৳</span>
          </p>
        </div>

        <motion.button
          onClick={handleAgreement}
          className="mt-6 py-2 rounded-md border-2 border-[#a38966] bg-[#a38966] text-white font-semibold shadow-md
            focus:outline-none focus:ring-2 focus:ring-[#a38966] focus:ring-opacity-50"
          whileHover={{
            backgroundColor: "#ffffff",
            color: "#000000",
            borderColor: "#a38966",
            transition: { duration: 0.3 },
          }}
          whileTap={{ scale: 0.95 }}
        >
          Agreement
        </motion.button>
      </div>
    </motion.div>
  );
};

export default ApartmentCard;
