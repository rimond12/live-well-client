import React from "react";
import { Link, useRouteError } from "react-router";
import Lottie from "lottie-react";
import errorAnimation from "../../lotties/Error 404.json"; // <-- Download JSON to your assets folder

const ErrorPage = () => {
  const error = useRouteError();
  console.error(error);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-center p-6">
      <div className="max-w-md mb-8">
        <Lottie animationData={errorAnimation} loop={true} />
      </div>
      <h1 className="text-4xl font-bold mb-4 text-gray-800">Oops!</h1>
      <p className="text-gray-600 mb-2">
        {error?.statusText || error?.message || "Something went wrong"}
      </p>
      <p className="text-gray-500 mb-6">Error Code: {error?.status || 404}</p>
      <Link
        to="/"
        className="px-6 py-3 bg-[#ccbead] text-white rounded-lg hover:bg-[#a38966] transition"
      >
        Go Home
      </Link>
    </div>
  );
};

export default ErrorPage;
