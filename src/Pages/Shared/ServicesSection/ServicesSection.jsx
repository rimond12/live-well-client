import { FaFileContract, FaMoneyCheckAlt, FaTags } from "react-icons/fa";
import { motion } from "framer-motion";

const services = [
  {
    id: 1,
    title: "Apartment Agreement",
    icon: <FaFileContract size={28} className="text-white" />,
    description: "Easy apartment agreements with just a few clicks.",
    gradient: "from-[#a38966] to-[#d1bfa0]",
  },
  {
    id: 2,
    title: "Payment",
    icon: <FaMoneyCheckAlt size={28} className="text-white" />,
    description: "Secure and fast rent payments online.",
    gradient: "from-[#8f7b55] to-[#c1a679]",
  },
  {
    id: 3,
    title: "Coupon Discounts",
    icon: <FaTags size={28} className="text-white" />,
    description: "Apply coupons to get special discounts on rent.",
    gradient: "from-[#b89f7e] to-[#e3d3b3]",
  },
];

const ServicesSection = () => {
  return (
    <section className="py-20 ">
      <div className="max-w-7xl mx-auto px-5 text-center">
        <h2 className="text-4xl font-bold mb-12 text-black">
          Our Services
        </h2>

        <div className="grid md:grid-cols-3 gap-10">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center text-center hover:shadow-2xl transition-transform duration-300 cursor-pointer"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              whileHover={{ scale: 1.05 }}
            >
              <div
                className={`w-16 h-16 rounded-full flex items-center justify-center mb-5 bg-gradient-to-br ${service.gradient} shadow-lg`}
              >
                {service.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2 text-[#a38966]">
                {service.title}
              </h3>
              <p className="text-gray-600">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
