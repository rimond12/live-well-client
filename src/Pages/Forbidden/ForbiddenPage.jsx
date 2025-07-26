import React from "react";
import { Link } from "react-router";
import Lottie from "lottie-react";
import forbiddenAnimation from "../../lotties/No Entry.json"; 
const ForbiddenPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-center p-6">
      <div className="max-w-md mb-8">
        <Lottie animationData={forbiddenAnimation} loop={true} />
      </div>
      <h1 className="text-4xl font-bold mb-4 text-gray-800">Access Denied</h1>
      <p className="text-gray-600 mb-2">
        You don’t have permission to view this page.
      </p>
      <p className="text-gray-500 mb-6">Error Code: 403</p>
      <Link
        to="/"
        className="px-6 py-3 bg-[#ccbead] text-white rounded-lg hover:bg-[#a38966] transition"
      >
        Go Home
      </Link>
    </div>
  );
};

export default ForbiddenPage;
