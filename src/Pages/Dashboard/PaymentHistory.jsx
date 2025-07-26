import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import Loading from "../Loading/Loading";

const PaymentHistory = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  // Fetch payments using React Query
  const { data: payments = [], isLoading } = useQuery({
    queryKey: ["paymentHistory", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get("/payments", {
        params: { email: user.email },
      });
      return res.data;
    },
  });

  if (isLoading)
    return (
     <Loading></Loading>
    );

  if (!payments.length)
    return (
      <p className="text-center mt-10 text-gray-500 font-semibold text-lg">
        No payments found.
      </p>
    );

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h2 className="text-3xl font-bold mb-8 text-center text-black">
        Payment History
      </h2>

      <div className="overflow-x-auto rounded-xl shadow-lg border border-gray-200">
        <table className="min-w-[700px] w-full text-sm text-center">
          <thead className="bg-[#a38966] text-white uppercase text-sm">
            <tr>
              <th className="p-3">Date</th>
              <th className="p-3">Month</th>
              <th className="p-3">Apartment</th>
              <th className="p-3">Block</th>
              <th className="p-3">Amount</th>
              <th className="p-3">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {payments.map((payment, index) => (
              <tr
                key={payment._id}
                className={`transition-colors ${
                  index % 2 === 0 ? "bg-white" : "bg-gray-50"
                } hover:bg-[#f5f1ea]`}
              >
                <td className="p-3 whitespace-nowrap text-gray-700">
                  {new Date(payment.date).toLocaleDateString()}
                </td>
                <td className="p-3 whitespace-nowrap text-gray-700">
                  {payment.month}
                </td>
                <td className="p-3 whitespace-nowrap text-gray-700">
                  {payment.apartment_no}
                </td>
                <td className="p-3 whitespace-nowrap text-gray-700">
                  {payment.block_name}
                </td>
                <td className="p-3 font-semibold text-green-600 whitespace-nowrap">
                  ${payment.paidAmount}
                </td>
                <td
                  className={`p-3 font-medium capitalize whitespace-nowrap ${
                    payment.status === "paid"
                      ? "text-green-600"
                      : "text-red-500"
                  }`}
                >
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
