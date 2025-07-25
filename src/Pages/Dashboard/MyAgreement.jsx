import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";

const MyAgreement = () => {
  const { user } = useAuth();
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
        <p className="text-lg font-semibold text-[#a38966] animate-pulse">
          Loading...
        </p>
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
    <div className="max-w-xl mx-auto mt-12 p-8 bg-white rounded-xl shadow-xl border border-gray-300">
      <h2 className="text-3xl font-bold text-black mb-6 flex items-center gap-2">
        📄 <span className="text-[#a38966]">My Agreement</span>
      </h2>

      <div className="space-y-4 text-gray-800 text-lg">
        <p>
          <span className="font-semibold text-black">👤 Name:</span>{" "}
          <span className="text-[#a38966]">{user.displayName}</span>
        </p>
        <p>
          <span className="font-semibold text-black">📧 Email:</span>{" "}
          <span className="text-[#a38966]">{agreement.userEmail}</span>
        </p>
        <p>
          <span className="font-semibold text-black">🏠 Apartment No:</span>{" "}
          <span className="text-[#a38966]">{agreement.apartmentNo}</span>
        </p>
        <p>
          <span className="font-semibold text-black">🏢 Block:</span>{" "}
          <span className="text-[#a38966]">{agreement.blockName}</span>
        </p>
        <p>
          <span className="font-semibold text-black">📶 Floor:</span>{" "}
          <span className="text-[#a38966]">{agreement.floorNo}</span>
        </p>
        <p>
          <span className="font-semibold text-black">💰 Rent:</span>{" "}
          <span className="text-[#a38966]">৳{agreement.rent}</span>
        </p>
        <p>
          <span className="font-semibold text-black">📌 Status:</span>{" "}
          <span
            className={`font-bold px-3 py-1 rounded-full capitalize ${
              agreement.status === "pending"
                ? "bg-yellow-100 text-yellow-700"
                : agreement.status === "accepted"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
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
