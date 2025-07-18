import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const AllAgreements = () => {
  const [agreements, setAgreements] = useState([]);
  const [loading, setLoading] = useState(true);
 const axiosSecure = useAxiosSecure();
  const fetchAgreements = () => {
    setLoading(true);
    axiosSecure
      .get("/agreements")
      .then((res) => {
        setAgreements(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch agreements:", err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchAgreements();
  }, []);

  const handleAccept = (id, userEmail) => {
    axiosSecure
      .patch(`/agreements/${id}/accept`)
      .then(() => {
        alert(`Agreement accepted for ${userEmail}`);
        fetchAgreements();
      })
      .catch((err) => {
        console.error("Accept failed:", err);
        alert("Failed to accept agreement.");
      });
  };

  const handleReject = (id, userEmail) => {
    axiosSecure
      .patch(`/agreements/${id}/reject`)
      .then(() => {
        alert(`Agreement rejected for ${userEmail}`);
        fetchAgreements();
      })
      .catch((err) => {
        console.error("Reject failed:", err);
        alert("Failed to reject agreement.");
      });
  };

  if (loading)
    return (
      <p className="text-center mt-10 text-lg font-semibold text-indigo-600 animate-pulse">
        Loading agreements...
      </p>
    );

  if (agreements.length === 0)
    return (
      <p className="text-center mt-10 font-semibold text-gray-600 text-xl">
        No agreements found.
      </p>
    );

  return (
    <div className="p-8 max-w-6xl mx-auto mt-12 bg-white rounded-xl shadow-lg border border-gray-200">
      <h2 className="text-3xl font-extrabold mb-8 text-indigo-700 flex items-center gap-3">
        📄 All Agreements
      </h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse text-center">
          <thead>
            <tr className="bg-indigo-200 text-indigo-900 uppercase text-sm font-semibold tracking-wide">
              <th className="p-3 border border-indigo-300">User Name</th>
              <th className="p-3 border border-indigo-300">Email</th>
              <th className="p-3 border border-indigo-300">Floor No</th>
              <th className="p-3 border border-indigo-300">Block Name</th>
              <th className="p-3 border border-indigo-300">Apartment No</th>
              <th className="p-3 border border-indigo-300">Rent</th>
              <th className="p-3 border border-indigo-300">Request Date</th>
              <th className="p-3 border border-indigo-300">Status</th>
              <th className="p-3 border border-indigo-300">Actions</th>
            </tr>
          </thead>
          <tbody>
            {agreements.map((agreement, idx) => (
              <tr
                key={agreement._id}
                className={`${idx % 2 === 0 ? "bg-indigo-50" : "bg-white"} hover:bg-indigo-100 transition`}
              >
                <td className="border border-indigo-300 p-3 font-medium text-indigo-800">
                  {agreement.userName}
                </td>
                <td className="border border-indigo-300 p-3 text-indigo-700 truncate max-w-xs">
                  {agreement.userEmail}
                </td>
                <td className="border border-indigo-300 p-3">{agreement.floorNo}</td>
                <td className="border border-indigo-300 p-3">{agreement.blockName}</td>
                <td className="border border-indigo-300 p-3">{agreement.apartmentNo}</td>
                <td className="border border-indigo-300 p-3 font-semibold">${agreement.rent}</td>
                <td className="border border-indigo-300 p-3">
                  {new Date(agreement.requestDate).toLocaleDateString()}
                </td>
                <td
                  className={`border border-indigo-300 p-3 capitalize font-semibold ${
                    agreement.status === "pending"
                      ? "text-yellow-600"
                      : agreement.status === "accepted"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {agreement.status}
                </td>
                <td className="border border-indigo-300 p-3 space-x-2">
                  {agreement.status === "pending" ? (
                    <>
                      <button
                        onClick={() => handleAccept(agreement._id, agreement.userEmail)}
                        className="bg-green-600 hover:bg-green-700 text-white px-4 py-1 rounded-md text-sm font-medium transition"
                      >
                        Accept
                      </button>
                      <button
                        onClick={() => handleReject(agreement._id, agreement.userEmail)}
                        className="bg-red-600 hover:bg-red-700 text-white px-4 py-1 rounded-md text-sm font-medium transition"
                      >
                        Reject
                      </button>
                    </>
                  ) : (
                    <span className="text-gray-600 font-semibold italic">Processed</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllAgreements;
