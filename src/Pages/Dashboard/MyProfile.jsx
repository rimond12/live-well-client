import React, { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useUserRole from "../../hooks/useUserRole";

const MyProfile = () => {
  const { user } = useAuth();
  const { role, loading: roleLoading } = useUserRole();
  const axiosSecure = useAxiosSecure();

  const [agreement, setAgreement] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.email && role === "member") {
      axiosSecure
        .get(`/agreements/user/${user.email}`)
        .then((res) => {
          setAgreement(res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching agreement:", err);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [user, role, axiosSecure]);

  if (loading || roleLoading)
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg font-semibold text-[#a38966] animate-pulse">
          Loading profile...
        </p>
      </div>
    );

  return (
    <div className="p-8 bg-white rounded-xl shadow-xl max-w-3xl mx-auto mt-12 space-y-8 border border-gray-200">
      <h2 className="text-4xl font-bold text-center text-[#a38966] drop-shadow">
        My Profile
      </h2>

      {/* User Info */}
      <div className="flex flex-col items-center text-center space-y-4">
        <img
          src={user?.photoURL || "https://i.ibb.co/4pDNDk1/avatar.png"}
          alt="User Avatar"
          className="w-32 h-32 rounded-full border-4 border-[#a38966] object-cover shadow-md"
        />
        <div>
          <p className="text-2xl font-semibold text-gray-800">
            {user?.displayName || "N/A"}
          </p>
          <p className="text-gray-500">{user?.email}</p>
          <span className="mt-3 inline-block px-4 py-1 rounded-full bg-[#a38966] text-white font-medium shadow">
            Role: {role}
          </span>
        </div>
      </div>

      {/* Agreement Info */}
      <div className="bg-gray-50 p-6 rounded-lg shadow-inner">
        <h3 className="text-2xl font-semibold mb-4 text-[#a38966] text-center">
          Rented Apartment Info
        </h3>

        {role === "member" && agreement ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700">
            <p>
              <strong>Agreement Accept Date:</strong>{" "}
              {agreement.date
                ? new Date(agreement.date).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  })
                : "N/A"}
            </p>
            <p>
              <strong>Floor No:</strong> {agreement.floorNo}
            </p>
            <p>
              <strong>Block Name:</strong> {agreement.blockName}
            </p>
            <p>
              <strong>Apartment No:</strong> {agreement.apartmentNo}
            </p>
            <p>
              <strong>Rent:</strong> ৳{agreement.rent}
            </p>
          </div>
        ) : (
          <p className="text-gray-500 text-center">
            No apartment agreement accepted yet.
          </p>
        )}
      </div>
    </div>
  );
};

export default MyProfile;
