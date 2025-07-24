import React, { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const MyProfile = () => {
  const { user } = useAuth();
  // console.log(user.email);
  
  const axiosSecure = useAxiosSecure();
  const [agreement, setAgreement] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.email) {
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
    }
  }, [user, axiosSecure]);

  if (loading) return <p>Loading profile...</p>;

  return (
    <div className="p-6 bg-white rounded-xl shadow-md space-y-6">
      <h2 className="text-2xl font-bold mb-4">My Profile</h2>
      <div className="space-y-2">
        <p><strong>Name:</strong> {user?.displayName || "N/A"}</p>
        <p><strong>Email:</strong> {user?.email}</p>
        <p><strong>Role:</strong> {user?.role || "User"}</p>
      </div>

      <hr className="my-4" />

      {agreement ? (
        <div className="bg-gray-100 p-4 rounded-lg">
          <h3 className="text-xl font-semibold mb-2">My Agreement</h3>
          <p><strong>Floor No:</strong> {agreement.floor_no}</p>
          <p><strong>Block Name:</strong> {agreement.block_name}</p>
          <p><strong>Apartment No:</strong> {agreement.apartment_no}</p>
          <p><strong>Rent:</strong> ৳{agreement.rent}</p>
        </div>
      ) : (
        <p className="text-gray-600">No apartment agreement found.</p>
      )}
    </div>
  );
};

export default MyProfile;
