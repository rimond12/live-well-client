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

  if (loading || roleLoading) return <p>Loading profile...</p>;

  return (
    <div className="p-6 bg-white rounded-xl shadow-md space-y-6 max-w-2xl mx-auto mt-10">
      <h2 className="text-3xl font-bold mb-4 text-center">My Profile</h2>

      {/* User Info */}
      <div className="flex flex-col items-center space-y-4">
        <img
          src={user?.photoURL || "https://i.ibb.co/4pDNDk1/avatar.png"}
          alt="User Avatar"
          className="w-28 h-28 rounded-full border-4 border-green-500 object-cover"
        />
        <div className="text-center">
          <p className="text-xl font-semibold">{user?.displayName || "N/A"}</p>
          <p className="text-gray-600">{user?.email}</p>
          <span className="mt-2 inline-block px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
            Role: {role}
          </span>
        </div>
      </div>

      <hr className="my-6" />

      {/* Agreement Info */}
      {role === "member" && agreement ? (
        <div className="bg-gray-100 p-5 rounded-lg shadow-inner space-y-2">
          <h3 className="text-xl font-semibold mb-3 text-green-700">
            Rented Apartment Info
          </h3>
          <p>
            <strong>Agreement Accept Date:</strong>{" "}
            {agreement.acceptDate || "N/A"}
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
        <div className="bg-gray-100 p-5 rounded-lg text-gray-600 text-center">
          <h3 className="text-xl font-semibold mb-3 text-gray-700">
            Rented Apartment Info
          </h3>
          <p>Agreement Accept Date: None</p>
          <p>Floor No: None</p>
          <p>Block Name: None</p>
          <p>Apartment No: None</p>
          <p>Rent: None</p>
        </div>
      )}
    </div>
  );
};

export default MyProfile;
