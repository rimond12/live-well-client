import { useEffect, useState } from "react";

import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";

const MyAgreement = () => {
  const { user } = useAuth();
  console.log(user);

  const axiosSecure = useAxiosSecure();
  const [agreement, setAgreement] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.email) {
      axiosSecure
        .get(`/agreements/${user.email}`)
        .then((res) => {
          setAgreement(res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setLoading(false);
        });
    }
  }, [user, axiosSecure]);

  if (loading) {
    return (
      <div className="flex justify-center items-center mt-20">
        <p className="text-lg font-semibold text-gray-700">Loading...</p>
      </div>
    );
  }

  if (!agreement || !agreement._id) {
    return (
      <div className="flex justify-center items-center mt-20">
        <p className="text-xl font-semibold text-red-500">
          ❌ No Agreement Found
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto mt-12 p-8 bg-white rounded-lg shadow-lg border border-gray-200">
      <h2 className="text-3xl font-bold text-indigo-600 mb-6 flex items-center gap-2">
        📄 My Agreement
      </h2>

      <div className="space-y-4 text-gray-700 text-lg">
        <p>
          <span className="font-semibold">👤 Name:</span> {agreement.userName}
        </p>
        <p>
          <span className="font-semibold">📧 Email:</span> {agreement.userEmail}
        </p>
        <p>
          <span className="font-semibold">🏠 Apartment No:</span>{" "}
          {agreement.apartmentNo}
        </p>
        <p>
          <span className="font-semibold">🏢 Block:</span> {agreement.blockName}
        </p>
        <p>
          <span className="font-semibold">📶 Floor:</span> {agreement.floorNo}
        </p>
        <p>
          <span className="font-semibold">💰 Rent:</span> ${agreement.rent}
        </p>
        <p>
          <span className="font-semibold">📌 Status:</span>{" "}
          <span
            className={`font-bold ${
              agreement.status === "pending"
                ? "text-yellow-600"
                : agreement.status === "accepted"
                ? "text-green-600"
                : "text-red-600"
            }`}
          >
            {agreement.status}
          </span>
        </p>
      </div>
    </div>
  );
};

export default MyAgreement;
