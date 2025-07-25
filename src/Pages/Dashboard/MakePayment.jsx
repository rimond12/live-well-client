import React, { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  useStripe,
  useElements,
  CardElement,
} from "@stripe/react-stripe-js";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_KEY);

const PaymentForm = ({ agreement }) => {
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const [clientSecret, setClientSecret] = useState("");
  const [processing, setProcessing] = useState(false);
  const [transactionId, setTransactionId] = useState("");
  const [couponCode, setCouponCode] = useState("");
  const [couponError, setCouponError] = useState("");
  const [finalAmount, setFinalAmount] = useState(agreement?.rent || 0);
  const [month, setMonth] = useState("");

  useEffect(() => {
    if (finalAmount > 0) {
      axiosSecure
        .post("/create-payment-intent", { amount: finalAmount })
        .then((res) => {
          setClientSecret(res.data.clientSecret);
        })
        .catch(() => {
          Swal.fire("Error", "Failed to create payment intent", "error");
        });
    }
  }, [axiosSecure, finalAmount]);

  const applyCoupon = async () => {
    if (!couponCode.trim()) {
      setCouponError("Please enter a coupon code.");
      return;
    }

    try {
      const res = await axiosSecure.post("/verify-coupon", {
        code: couponCode.trim(),
        rent: agreement.rent,
      });

      if (res.data.valid) {
        setFinalAmount(res.data.discountedAmount);
        Swal.fire(
          "Success",
          `Coupon applied! New amount: $${res.data.discountedAmount}`,
          "success"
        );
        setCouponError("");
      } else {
        setCouponError(res.data.message || "Invalid or expired coupon.");
        setFinalAmount(agreement.rent);
      }
    } catch (err) {
      setCouponError("Server error while verifying coupon.");
      setFinalAmount(agreement.rent);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!month) {
      Swal.fire("Warning", "Please select a month before payment", "warning");
      return;
    }

    if (!stripe || !elements || !clientSecret) return;

    const card = elements.getElement(CardElement);
    if (!card) return;

    setProcessing(true);

    const { error } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      Swal.fire("Error", error.message, "error");
      setProcessing(false);
      return;
    }

    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card,
          billing_details: {
            name: user?.displayName || "Anonymous",
            email: user?.email || "Unknown",
          },
        },
      });

    if (confirmError) {
      Swal.fire("Error", confirmError.message, "error");
      setProcessing(false);
      return;
    }

    if (paymentIntent.status === "succeeded") {
      setTransactionId(paymentIntent.id);

      const paymentData = {
        email: user?.email,
        name: user?.displayName,
        agreementId: agreement._id,
        apartmentId: agreement.apartmentId,
        block_name: agreement.blockName,
        apartment_no: agreement.apartmentNo,
        rent: agreement.rent,
        paidAmount: finalAmount,
        month,
        transactionId: paymentIntent.id,
        date: new Date(),
        status: "paid",
      };

      const res = await axiosSecure.post("/payments", paymentData);

      if (res.data?.data?.acknowledged && res.data?.data?.insertedId) {
        Swal.fire("Success", "Payment successful!", "success");
      } else {
        Swal.fire("Error", "Payment recording failed", "error");
      }
    }

    setProcessing(false);
  };

  return (
    <div className="max-w-lg mx-auto mt-10 bg-white rounded-xl shadow-xl border border-gray-200 p-8">
      <h2 className="text-3xl font-bold mb-6 text-center text-black">
        Make Payment
      </h2>

      <div className="space-y-2 text-gray-700 mb-6">
        <p>
          <strong>Email:</strong> {agreement?.userEmail}
        </p>
        <p>
          <strong>Block:</strong> {agreement?.blockName}
        </p>
        <p>
          <strong>Apartment:</strong> {agreement?.apartmentNo}
        </p>
        <p>
          <strong>Floor:</strong> {agreement?.floorNo}
        </p>
        <p>
          <strong>Original Rent:</strong> ${agreement?.rent}
        </p>
        <p className="text-lg font-semibold text-[#a38966]">
          Final Amount: ${finalAmount}
        </p>
      </div>

      <div className="mb-5">
        <label className="block font-semibold mb-1">Select Month</label>
        <select
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          className="select select-bordered w-full focus:border-[#a38966] focus:ring-[#a38966]"
        >
          <option value="">-- Select Month --</option>
          {[
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
          ].map((m) => (
            <option key={m} value={m}>
              {m}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-5">
        <label className="block font-semibold mb-1">Have a Coupon?</label>
        <div className="flex gap-2">
          <input
            type="text"
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value)}
            placeholder="Enter coupon code"
            className="input input-bordered w-full focus:border-[#a38966] focus:ring-[#a38966]"
          />
          <button
            type="button"
            onClick={applyCoupon}
            className="btn bg-[#a38966] text-white hover:bg-black transition"
          >
            Apply
          </button>
        </div>
        {couponError && <p className="text-red-500 mt-2">{couponError}</p>}
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#000",
                "::placeholder": { color: "#aab7c4" },
              },
              invalid: { color: "#9e2146" },
            },
          }}
          className="p-3 border rounded-lg focus:border-[#a38966]"
        />

        <button
          type="submit"
          disabled={!stripe || !clientSecret || processing || transactionId}
          className="w-full py-2 rounded-lg bg-[#a38966] text-white hover:bg-black transition font-semibold"
        >
          {processing
            ? "Processing..."
            : transactionId
            ? "Payment Done"
            : `Pay $${finalAmount}`}
        </button>
      </form>

      {transactionId && (
        <p className="mt-4 text-green-600 font-semibold text-center">
          Transaction successful! ID: {transactionId}
        </p>
      )}
    </div>
  );
};

const MakePaymentWrapper = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [agreement, setAgreement] = useState(null);

  useEffect(() => {
    if (user?.email) {
      axiosSecure
        .get(`/agreement?email=${user.email}`)
        .then((res) => setAgreement(res.data))
        .catch(() =>
          Swal.fire("Error", "Failed to load agreement info", "error")
        );
    }
  }, [user, axiosSecure]);

  if (!agreement)
    return (
      <p className="text-center mt-10 text-[#a38966]">Loading agreement...</p>
    );

  return (
    <Elements stripe={stripePromise}>
      <PaymentForm agreement={agreement} />
    </Elements>
  );
};

export default MakePaymentWrapper;
