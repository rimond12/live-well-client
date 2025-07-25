import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { motion } from "framer-motion";

const AgreementRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const axiosSecure = useAxiosSecure();

  const fetchRequests = () => {
    setLoading(true);
    axiosSecure
      .get("/agreement/pending")
      .then((res) => {
        setRequests(Array.isArray(res.data) ? res.data : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    fetchRequests();
  }, [axiosSecure]);

  const handleAccept = (id, userEmail) => {
    axiosSecure.patch(`/agreements/${id}/accept`).then(() => {
      Swal.fire("Accepted!", `${userEmail}'s agreement accepted`, "success");
      setRequests((prev) => prev.filter((req) => req._id !== id));
    });
  };

  const handleReject = (id, userEmail) => {
    axiosSecure.patch(`/agreements/${id}/reject`).then(() => {
      Swal.fire("Rejected!", `${userEmail}'s agreement rejected`, "info");
      setRequests((prev) => prev.filter((req) => req._id !== id));
    });
  };

  if (loading)
    return (
      <p className="text-center mt-10 text-lg font-semibold text-[#c7b39a] animate-pulse">
        Loading agreement requests...
      </p>
    );

  if (requests.length === 0)
    return (
      <p className="text-center mt-10 font-semibold text-gray-400 text-xl">
        No pending requests found.
      </p>
    );

  return (
    <section className="p-6 md:p-10 max-w-7xl mx-auto">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-3xl font-bold text-[#c7b39a] mb-8"
      >
        📄 Agreement Requests
      </motion.h2>

      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto rounded-xl shadow-lg border border-[#c7b39a]">
        <table className="min-w-full border-collapse text-center">
          <thead className="bg-[#111111] text-[#c7b39a] uppercase text-sm font-semibold">
            <tr>
              <th className="p-3">User Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Floor No</th>
              <th className="p-3">Block Name</th>
              <th className="p-3">Room No</th>
              <th className="p-3">Rent</th>
              <th className="p-3">Request Date</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((req, idx) => (
              <tr
                key={req._id}
                className={`${
                  idx % 2 === 0 ? "bg-gray-50" : "bg-white"
                } hover:bg-[#f9f7f4] transition`}
              >
                <td className="p-3 font-medium text-gray-700">
                  {req.userName || req.userEmail.split("@")[0]}
                </td>
                <td className="p-3 text-gray-600">{req.userEmail}</td>
                <td className="p-3">{req.floorNo}</td>
                <td className="p-3">{req.blockName}</td>
                <td className="p-3">{req.apartmentNo}</td>
                <td className="p-3 font-semibold text-[#c7b39a]">${req.rent}</td>
                <td className="p-3">{new Date(req.date).toLocaleDateString()}</td>
                <td className="p-3 space-x-2">
                  <button
                    onClick={() => handleAccept(req._id, req.userEmail)}
                    className="bg-[#c7b39a] hover:bg-[#b09c85] text-white px-4 py-1 rounded-md text-sm font-medium transition"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => handleReject(req._id, req.userEmail)}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-1 rounded-md text-sm font-medium transition"
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card Layout */}
      <div className="grid grid-cols-1 gap-6 md:hidden">
        {requests.map((req) => (
          <div
            key={req._id}
            className="bg-white rounded-xl shadow-lg border border-[#c7b39a] p-4 space-y-2"
          >
            <h3 className="font-bold text-[#c7b39a] text-lg">
              {req.userName || req.userEmail.split("@")[0]}
            </h3>
            <p className="text-gray-700 text-sm">{req.userEmail}</p>
            <div className="grid grid-cols-2 text-sm gap-y-1">
              <p><span className="font-semibold">Floor:</span> {req.floorNo}</p>
              <p><span className="font-semibold">Block:</span> {req.blockName}</p>
              <p><span className="font-semibold">Room:</span> {req.apartmentNo}</p>
              <p><span className="font-semibold">Rent:</span> ${req.rent}</p>
            </div>
            <p className="text-xs text-gray-500">
              {new Date(req.date).toLocaleDateString()}
            </p>
            <div className="flex gap-2 pt-2">
              <button
                onClick={() => handleAccept(req._id, req.userEmail)}
                className="flex-1 bg-[#c7b39a] hover:bg-[#b09c85] text-white py-2 rounded-md text-sm font-medium transition"
              >
                Accept
              </button>
              <button
                onClick={() => handleReject(req._id, req.userEmail)}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 rounded-md text-sm font-medium transition"
              >
                Reject
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AgreementRequests;
