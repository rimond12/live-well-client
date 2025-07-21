import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth"; // ✅ Add this

const PaymentHistory = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth(); // ✅ Get user email

  useEffect(() => {
    if (!user?.email) return;

    setLoading(true);
    axiosSecure
      .get("/payments", { params: { email: user.email } })
      .then((res) => {
        console.log(res.data);
        setPayments(res.data);
      })
      .catch((err) => {
        console.error("Error fetching payment history:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [user?.email, axiosSecure]);

  if (loading) return <p>Loading payment history...</p>;
  if (payments.length === 0) return <p>No payments found.</p>;

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-6 text-indigo-700">
        Payment History
      </h2>
      <table className="min-w-full border-collapse text-center">
        <thead>
          <tr className="bg-indigo-200 text-indigo-900 uppercase text-sm font-semibold tracking-wide">
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
            <tr key={payment._id} className="hover:bg-indigo-50 transition">
              <td className="border border-indigo-300 p-3">
                {new Date(payment.paymentDate).toLocaleDateString()}
              </td>
              <td className="border border-indigo-300 p-3">{payment.month}</td>
              <td className="border border-indigo-300 p-3">
                {payment.apartmentNo}
              </td>
              <td className="border border-indigo-300 p-3">{payment.blockName}</td>
              <td className="border border-indigo-300 p-3 font-semibold">
                ${payment.finalAmount}
              </td>
              <td className="border border-indigo-300 p-3 capitalize text-green-600 font-medium">
                Paid
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PaymentHistory;
