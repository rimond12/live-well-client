import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";

const ManageCoupon = () => {

  const [coupons, setCoupons] = useState([]);
  const [form, setForm] = useState({ code: "", discount: "" });
  const axiosSecure = useAxiosSecure();

  // Load all coupons
  const fetchCoupons = async () => {
    try {
      const res = await axiosSecure.get("/coupons");
      setCoupons(res.data);
    } catch (err) {
      console.error("Failed to load coupons:", err);
    }
  };

  useEffect(() => {
    fetchCoupons();
  }, []);

  // Handle new coupon add
 const handleSubmit = async (e) => {
  e.preventDefault();

  const discount = parseFloat(form.discount);

  if (!form.code || isNaN(discount) || discount <= 0 || discount > 100) {
    Swal.fire("Invalid", "Please enter valid coupon and discount (1-100%)", "warning");
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
    fetchCoupons();
  } catch (err) {
    console.error("Add coupon failed:", err);
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
      fetchCoupons();
      Swal.fire("Deleted!", "Coupon has been deleted.", "success");
    } catch (err) {
      Swal.fire("Error", "Failed to delete coupon", "error");
    }
  }
};


  return (
    <div className="max-w-5xl mx-auto p-6 bg-white rounded shadow mt-10">
      <h2 className="text-2xl font-bold mb-6 text-indigo-700">
        🏱 Manage Coupons
      </h2>

      {/* Coupon Add Form */}
      <form onSubmit={handleSubmit} className="flex flex-col md:flex-row items-center gap-4 mb-8">
        <input
          type="text"
          placeholder="Coupon Code"
          className="input input-bordered w-full md:w-1/3"
          value={form.code}
          onChange={(e) => setForm({ ...form, code: e.target.value })}
        />
        <input
          type="number"
          placeholder="Discount %"
          className="input input-bordered w-full md:w-1/3"
          value={form.discount}
          onChange={(e) => setForm({ ...form, discount: e.target.value })}
        />
        <button type="submit" className="btn btn-primary">
          Add Coupon
        </button>
      </form>

      {/* Coupon List */}
      <table className="table w-full border border-gray-300">
        <thead className="bg-indigo-100">
          <tr>
            <th className="border p-2">Code</th>
            <th className="border p-2">Discount (%)</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {coupons.length > 0 ? (
            coupons.map((coupon) => (
              <tr key={coupon._id} className="text-center">
                <td className="border p-2 font-mono font-semibold">{coupon.code}</td>
                <td className="border p-2">{coupon.discount}%</td>
                <td className="border p-2">
                  <button
                    className="btn btn-sm btn-error"
                    onClick={() => handleDelete(coupon._id)}
                  >
                    <FaTrash className="text-white" />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={3} className="text-center py-4 text-gray-600">
                No coupons available.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ManageCoupon;
