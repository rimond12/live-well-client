import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import Loading from "../Loading/Loading";

const ManageMembers = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data: members = [],
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["members"],
    queryFn: async () => {
      const res = await axiosSecure.get("/members");
      return res.data;
    },
  });

  const handleRemove = (memberId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This member will lose access to the member dashboard.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, remove!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .patch(`/members/${memberId}/remove`)
          .then((res) => {
            if (res.data.success) {
              Swal.fire("Removed!", "Member is now a normal user.", "success");
              refetch(); 
            }
          })
          .catch(() =>
            Swal.fire("Error!", "Failed to remove member.", "error")
          );
      }
    });
  };

  if (isLoading)
    return (
      <Loading></Loading>
    );

  if (isError)
    return (
      <p className="text-center mt-10 font-semibold text-red-500 text-xl">
        Error loading members.
      </p>
    );

  if (members.length === 0)
    return (
      <p className="text-center mt-10 font-semibold text-gray-400 text-xl">
        No members found.
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
        👥 Manage Members
      </motion.h2>

      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto rounded-xl shadow-lg border border-[#c7b39a]">
        <table className="min-w-full border-collapse text-center">
          <thead className="bg-[#111111] text-[#c7b39a] uppercase text-sm font-semibold">
            <tr>
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {members.map((member, idx) => (
              <tr
                key={member._id}
                className={`${
                  idx % 2 === 0 ? "bg-gray-50" : "bg-white"
                } hover:bg-[#f9f7f4] transition`}
              >
                <td className="p-3 font-medium text-gray-700">
                  {member.name || member.displayName || "No Name"}
                </td>
                <td className="p-3 text-gray-600 truncate max-w-xs">
                  {member.email}
                </td>
                <td className="p-3">
                  <button
                    onClick={() => handleRemove(member._id)}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-1 rounded-md text-sm font-medium transition"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card Layout */}
      <div className="grid grid-cols-1 gap-6 md:hidden">
        {members.map((member) => (
          <div
            key={member._id}
            className="bg-white rounded-xl shadow-lg border border-[#c7b39a] p-4 space-y-2"
          >
            <h3 className="font-bold text-[#c7b39a] text-lg">
              {member.name || member.displayName || "No Name"}
            </h3>
            <p className="text-gray-700 text-sm">{member.email}</p>
            <div className="flex gap-2 pt-2">
              <button
                onClick={() => handleRemove(member._id)}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 rounded-md text-sm font-medium transition"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ManageMembers;
