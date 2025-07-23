import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const AgreementRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const axiosSecure = useAxiosSecure();
const fetchRequests = () => {
  setLoading(true);
  axiosSecure
    .get("/agreement/pending")
    .then((res) => {
      console.log("Full response:", res);
      console.log("Response data:", res.data);
      setRequests(Array.isArray(res.data) ? res.data : []);
      setLoading(false);
    })
    .catch((err) => {
      console.error("Failed to fetch pending agreements:", err);
      setLoading(false);
    });
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
      <p className="text-center mt-10 text-lg font-semibold text-indigo-600 animate-pulse">
        Loading agreement requests...
      </p>
    );

  if (requests.length === 0)
    return (
      <p className="text-center mt-10 font-semibold text-gray-600 text-xl">
        No pending requests found.
      </p>
    );

  return (
    <div className="p-8 max-w-6xl mx-auto mt-12 bg-white rounded-xl shadow-lg border border-gray-200">
      <h2 className="text-3xl font-extrabold mb-8 text-indigo-700 flex items-center gap-3">
        📄 Agreement Requests
      </h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse text-center">
          <thead>
            <tr className="bg-indigo-200 text-indigo-900 uppercase text-sm font-semibold tracking-wide">
              <th className="p-3 border border-indigo-300">User Name</th>
              <th className="p-3 border border-indigo-300">Email</th>
              <th className="p-3 border border-indigo-300">Floor No</th>
              <th className="p-3 border border-indigo-300">Block Name</th>
              <th className="p-3 border border-indigo-300">Room No</th>
              <th className="p-3 border border-indigo-300">Rent</th>
              <th className="p-3 border border-indigo-300">Request Date</th>
              <th className="p-3 border border-indigo-300">Actions</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((req, idx) => (
              <tr
                key={req._id}
                className={`${idx % 2 === 0 ? "bg-indigo-50" : "bg-white"} hover:bg-indigo-100 transition`}
              >
                <td className="border border-indigo-300 p-3 font-medium text-indigo-800">
                  {req.userName || req.userEmail.split("@")[0]}
                </td>
                <td className="border border-indigo-300 p-3 text-indigo-700">
                  {req.userEmail}
                </td>
                <td className="border border-indigo-300 p-3">{req.floorNo}</td>
                <td className="border border-indigo-300 p-3">{req.blockName}</td>
                <td className="border border-indigo-300 p-3">{req.apartmentNo}</td>
                <td className="border border-indigo-300 p-3 font-semibold">${req.rent}</td>
                <td className="border border-indigo-300 p-3">
                  {new Date(req.date).toLocaleDateString()}
                </td>
                <td className="border border-indigo-300 p-3 space-x-2">
                  <button
                    onClick={() => handleAccept(req._id, req.userEmail)}
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-1 rounded-md text-sm font-medium transition"
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
    </div>
  );
};

export default AgreementRequests;
