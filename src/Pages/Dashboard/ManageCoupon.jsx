import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import { motion } from "framer-motion";

const ManageCoupon = () => {
  const [form, setForm] = useState({ code: "", discount: "" });
  const axiosSecure = useAxiosSecure();

  // 🔹 GET Coupons with React Query
  const {
    data: coupons = [],
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["coupons"],
    queryFn: async () => {
      const res = await axiosSecure.get("/coupons");
      return res.data;
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const discount = parseFloat(form.discount);

    if (!form.code || isNaN(discount) || discount <= 0 || discount > 100) {
      Swal.fire(
        "Invalid",
        "Enter valid coupon and discount (1-100%)",
        "warning"
      );
      return;
    }

    try {
      await axiosSecure.post("/coupons", {
        code: form.code.toUpperCase(),
        discountPercentage: discount,
        active: true,
      });
      Swal.fire("Success", "Coupon added successfully!", "success");
      setForm({ code: "", discount: "" });
      refetch(); // 🔹 Add এর পর রিফেচ
    } catch (err) {
      Swal.fire("Error", "Failed to add coupon", "error");
    }
  };

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "You want to delete this coupon?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    });

    if (confirm.isConfirmed) {
      try {
        await axiosSecure.delete(`/coupons/${id}`);
        Swal.fire("Deleted!", "Coupon has been deleted.", "success");
        refetch(); // 🔹 Delete এর পর রিফেচ
      } catch (err) {
        Swal.fire("Error", "Failed to delete coupon", "error");
      }
    }
  };

  if (isLoading)
    return (
      <p className="text-center mt-10 text-lg font-semibold text-[#c7b39a] animate-pulse">
        Loading coupons...
      </p>
    );

  if (isError)
    return (
      <p className="text-center mt-10 text-red-500 font-semibold text-xl">
        Failed to load coupons.
      </p>
    );

  return (
    <section className="max-w-6xl mx-auto p-6 md:p-10">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-3xl font-bold text-[#c7b39a] mb-8"
      >
        🏷 Manage Coupons
      </motion.h2>

      {/* Add Coupon Form */}
      <form
        onSubmit={handleSubmit}
        className="flex flex-col md:flex-row gap-4 mb-8 bg-white shadow-lg rounded-xl p-5 border border-[#c7b39a]"
      >
        <input
          type="text"
          placeholder="Coupon Code"
          className="input input-bordered flex-1 border-gray-300 rounded-md focus:ring-[#c7b39a]"
          value={form.code}
          onChange={(e) => setForm({ ...form, code: e.target.value })}
        />
        <input
          type="number"
          placeholder="Discount %"
          className="input input-bordered flex-1 border-gray-300 rounded-md focus:ring-[#c7b39a]"
          value={form.discount}
          onChange={(e) => setForm({ ...form, discount: e.target.value })}
        />
        <button
          type="submit"
          className="px-6 py-2 bg-[#111111] text-white rounded-md hover:bg-[#333333] transition"
        >
          Add Coupon
        </button>
      </form>

      {/* Responsive Table */}
      <div className="overflow-x-auto shadow-lg rounded-xl border border-[#c7b39a]">
        <table className="min-w-full text-center">
          <thead className="bg-[#111111] text-[#c7b39a] uppercase text-sm font-semibold">
            <tr>
              <th className="p-3 whitespace-nowrap">Code</th>
              <th className="p-3 whitespace-nowrap">Discount (%)</th>
              <th className="p-3 whitespace-nowrap">Actions</th>
            </tr>
          </thead>
          <tbody>
            {coupons.length > 0 ? (
              coupons.map((coupon, idx) => (
                <tr
                  key={coupon._id}
                  className={`${
                    idx % 2 === 0 ? "bg-gray-50" : "bg-white"
                  } hover:bg-[#f9f7f4] transition`}
                >
                  <td className="p-3 font-mono font-semibold text-gray-700">
                    {coupon.code}
                  </td>
                  <td className="p-3 text-gray-700">{coupon.discount}%</td>
                  <td className="p-3">
                    <button
                      className="bg-red-600 hover:bg-red-700 text-white px-4 py-1 rounded-md transition"
                      onClick={() => handleDelete(coupon._id)}
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3} className="p-6 text-gray-500">
                  No coupons available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default ManageCoupon;
