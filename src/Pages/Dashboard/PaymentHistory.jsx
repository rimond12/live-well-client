import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";

const PaymentHistory = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  useEffect(() => {
    if (!user?.email) return;

    setLoading(true);
    axiosSecure
      .get("/payments", { params: { email: user.email } })
      .then((res) => {
        setPayments(res.data);
      })
      .catch((err) => {
        console.error("Error fetching payment history:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [user?.email, axiosSecure]);

  if (loading)
    return <p className="text-center mt-10 text-indigo-700 font-semibold">Loading payment history...</p>;
  if (payments.length === 0)
    return <p className="text-center mt-10 text-gray-600 font-semibold">No payments found.</p>;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <h2 className="text-2xl font-bold mb-6 text-indigo-700 text-center">
        Payment History
      </h2>

      {/* Scrollable container */}
      <div className="overflow-x-auto rounded-xl shadow bg-white">
        <table className="min-w-[700px] w-full text-sm text-center border-collapse">
          <thead className="bg-indigo-200 text-indigo-900 uppercase font-semibold">
            <tr>
              <th className="p-3 border border-indigo-300">Date</th>
              <th className="p-3 border border-indigo-300">Month</th>
              <th className="p-3 border border-indigo-300">Apartment</th>
              <th className="p-3 border border-indigo-300">Block</th>
              <th className="p-3 border border-indigo-300">Amount</th>
              <th className="p-3 border border-indigo-300">Status</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment) => (
              <tr
                key={payment._id}
                className="hover:bg-indigo-50 transition-colors"
              >
                <td className="p-3 border border-indigo-300 whitespace-nowrap">
                  {new Date(payment.date).toLocaleDateString()}
                </td>
                <td className="p-3 border border-indigo-300 whitespace-nowrap">
                  {payment.month}
                </td>
                <td className="p-3 border border-indigo-300 whitespace-nowrap">
                  {payment.apartment_no}
                </td>
                <td className="p-3 border border-indigo-300 whitespace-nowrap">
                  {payment.block_name}
                </td>
                <td className="p-3 border border-indigo-300 font-semibold text-green-700 whitespace-nowrap">
                  ${payment.paidAmount}
                </td>
                <td className="p-3 border border-indigo-300 capitalize text-green-600 font-medium whitespace-nowrap">
                  {payment.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentHistory;
