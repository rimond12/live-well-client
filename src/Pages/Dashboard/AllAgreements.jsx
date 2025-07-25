import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

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
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    fetchAgreements();
  }, []);

  const handleAccept = (id, userEmail) => {
    axiosSecure.patch(`/agreements/${id}/accept`).then(() => {
      Swal.fire("Accepted!", `Agreement accepted for ${userEmail}`, "success");
      fetchAgreements();
    });
  };

  const handleReject = (id, userEmail) => {
    axiosSecure.patch(`/agreements/${id}/reject`).then(() => {
      Swal.fire("Rejected!", `Agreement rejected for ${userEmail}`, "info");
      fetchAgreements();
    });
  };

  if (loading)
    return (
      <p className="text-center mt-10 text-lg font-semibold text-[#c7b39a] animate-pulse">
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
    <div className="p-6 md:p-8 max-w-6xl mx-auto mt-12 bg-white rounded-xl shadow-lg border border-[#c7b39a]/40">
      <h2 className="text-3xl font-extrabold mb-6 text-[#111111]">
        📄 All Agreements
      </h2>

      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto rounded-lg">
        <table className="w-full border-collapse text-center">
          <thead>
            <tr className="bg-[#c7b39a]/30 text-[#111111] uppercase text-sm font-semibold">
              <th className="p-3 border border-[#c7b39a]/40">Email</th>
              <th className="p-3 border border-[#c7b39a]/40">Floor</th>
              <th className="p-3 border border-[#c7b39a]/40">Block</th>
              <th className="p-3 border border-[#c7b39a]/40">Apartment</th>
              <th className="p-3 border border-[#c7b39a]/40">Rent</th>
              <th className="p-3 border border-[#c7b39a]/40">Date</th>
              <th className="p-3 border border-[#c7b39a]/40">Status</th>
              <th className="p-3 border border-[#c7b39a]/40">Actions</th>
            </tr>
          </thead>
          <tbody>
            {agreements.map((a, idx) => (
              <tr
                key={a._id}
                className={`${
                  idx % 2 === 0 ? "bg-[#f9f9f9]" : "bg-white"
                } hover:bg-[#f1f1f1]`}
              >
                <td className="border p-3">{a.userEmail}</td>
                <td className="border p-3">{a.floorNo}</td>
                <td className="border p-3">{a.blockName}</td>
                <td className="border p-3">{a.apartmentNo}</td>
                <td className="border p-3 font-semibold">${a.rent}</td>
                <td className="border p-3">
                  {new Date(a.date).toLocaleDateString()}
                </td>
                <td
                  className={`border p-3 font-semibold capitalize ${
                    a.status === "pending"
                      ? "text-yellow-600"
                      : a.status === "accepted"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {a.status}
                </td>
                <td className="border p-3 space-x-2">
                  {a.status === "pending" ? (
                    <>
                      <button
                        onClick={() => handleAccept(a._id, a.userEmail)}
                        className="bg-green-600 hover:bg-green-700 text-white px-4 py-1 rounded-md text-sm"
                      >
                        Accept
                      </button>
                      <button
                        onClick={() => handleReject(a._id, a.userEmail)}
                        className="bg-red-600 hover:bg-red-700 text-white px-4 py-1 rounded-md text-sm"
                      >
                        Reject
                      </button>
                    </>
                  ) : (
                    <span className="text-gray-500 italic">Processed</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden space-y-4">
        {agreements.map((a) => (
          <div
            key={a._id}
            className="border border-[#c7b39a]/40 rounded-lg p-4 bg-[#f9f9f9]"
          >
            <p className="font-semibold text-[#111111]">{a.userEmail}</p>
            <p>
              <span className="font-semibold">Floor:</span> {a.floorNo}
            </p>
            <p>
              <span className="font-semibold">Block:</span> {a.blockName}
            </p>
            <p>
              <span className="font-semibold">Apartment:</span> {a.apartmentNo}
            </p>
            <p>
              <span className="font-semibold">Rent:</span> ${a.rent}
            </p>
            <p>
              <span className="font-semibold">Date:</span>{" "}
              {new Date(a.date).toLocaleDateString()}
            </p>
            <p
              className={`font-semibold capitalize ${
                a.status === "pending"
                  ? "text-yellow-600"
                  : a.status === "accepted"
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              Status: {a.status}
            </p>
            {a.status === "pending" ? (
              <div className="mt-3 flex gap-3">
                <button
                  onClick={() => handleAccept(a._id, a.userEmail)}
                  className="flex-1 bg-green-600 text-white py-1 rounded"
                >
                  Accept
                </button>
                <button
                  onClick={() => handleReject(a._id, a.userEmail)}
                  className="flex-1 bg-red-600 text-white py-1 rounded"
                >
                  Reject
                </button>
              </div>
            ) : (
              <span className="text-gray-500 italic">Processed</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllAgreements;
