import { useEffect, useState } from "react";
import axios from "axios";

const PaymentHistory = ({ userEmail }) => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userEmail) return;

    setLoading(true);
    axios
      .get("http://localhost:3000/payments", { params: { email: userEmail } })
      .then((res) => setPayments(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [userEmail]);

  if (loading) return <p>Loading payment history...</p>;
  if (payments.length === 0) return <p>No payments found.</p>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-6 text-indigo-700">
        Payment History
      </h2>
      <table className="min-w-full border-collapse text-center">
        <thead>
          <tr className="bg-indigo-200 text-indigo-900 uppercase text-sm font-semibold tracking-wide">
            <th className="p-3 border border-indigo-300">Date</th>
            <th className="p-3 border border-indigo-300">Amount</th>
            <th className="p-3 border border-indigo-300">Status</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((payment) => (
            <tr key={payment._id} className="hover:bg-indigo-50 transition">
              <td className="border border-indigo-300 p-3">
                {new Date(payment.date).toLocaleDateString()}
              </td>
              <td className="border border-indigo-300 p-3 font-semibold">
                ${payment.amount}
              </td>
              <td className="border border-indigo-300 p-3 capitalize">
                {payment.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PaymentHistory;
