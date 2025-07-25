import React from "react";
import Lottie from "lottie-react";
import welcomeAnimation from "../../lotties/Welcome.json"; // তোমার লট্টি ফাইলের পাথ ঠিক করে নিবে

const DashboardHome = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full p-8 text-center space-y-6">
      {/* লট্টি অ্যানিমেশন */}
      <div className="max-w-screen mx-auto">
        <Lottie animationData={welcomeAnimation} loop={true} />
      </div>

      {/* স্বাগতম মেসেজ */}
      <h2 className="text-3xl font-bold text-[#af8d64]">
        Welcome to your Dashboard!
      </h2>
      <p className="text-gray-500 max-w-xl">
        Manage your profile, agreements, payments, and more. Use the sidebar to navigate through different sections based on your role.
      </p>
    </div>
  );
};

export default DashboardHome;
