import { useState, useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const MakePayment = () => {
  const { user } = useAuth();
 

  // ধরলাম agreement data props বা context থেকে পাবো, না হলে API থেকে ফেচ করতে হবে
  const [agreement, setAgreement] = useState(null);

  // Form state
  const [month, setMonth] = useState("");
  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [finalAmount, setFinalAmount] = useState(0);
  const [message, setMessage] = useState("");

  // লোডিং/এরর states
  const [loading, setLoading] = useState(false);

  // Fetch user agreement on mount
  useEffect(() => {
    if (user?.email) {
      useAxiosSecure.get(`/agreements/${user.email}`)
        .then(res => {
          setAgreement(res.data);
          setFinalAmount(res.data.rent); // প্রাথমিক ভ্যালু
        })
        .catch(err => console.error(err));
    }
  }, [user, useAxiosSecure]);

  // কুপন যাচাই করবো
  const handleApplyCoupon = () => {
    if (!couponCode.trim()) {
      setMessage("Please enter a coupon code");
      return;
    }
    setMessage("");
    setLoading(true);

    useAxiosSecure.post("/validate-coupon", { couponCode: couponCode.trim() })
      .then(res => {
        if (res.data.valid) {
          const discountAmount = (agreement.rent * res.data.discountPercentage) / 100;
          setDiscount(res.data.discountPercentage);
          setFinalAmount(agreement.rent - discountAmount);
          setMessage(`Coupon applied! You get ${res.data.discountPercentage}% off`);
        } else {
          setMessage("Invalid coupon code");
          setDiscount(0);
          setFinalAmount(agreement.rent);
        }
      })
      .catch(() => {
        setMessage("Failed to validate coupon");
        setDiscount(0);
        setFinalAmount(agreement.rent);
      })
      .finally(() => setLoading(false));
  };

  // পেমেন্ট সাবমিট
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!month) {
      setMessage("Please select a month");
      return;
    }

    setLoading(true);
    const paymentData = {
      memberEmail: user.email,
      floorNo: agreement.floorNo,
      blockName: agreement.blockName,
      apartmentNo: agreement.apartmentNo,
      rent: agreement.rent,
      month,
      couponCode: discount > 0 ? couponCode : null,
      discountPercentage: discount,
      finalAmount,
      paymentDate: new Date().toISOString(),
    };

    useAxiosSecure.post("/payments", paymentData)
      .then(res => {
        if (res.data.success) {
          setMessage("Payment successful! Thank you.");
          setCouponCode("");
          setDiscount(0);
          setFinalAmount(agreement.rent);
          setMonth("");
        } else {
          setMessage("Payment failed. Please try again.");
        }
      })
      .catch(() => {
        setMessage("Payment failed. Please try again.");
      })
      .finally(() => setLoading(false));
  };

  if (!agreement) {
    return <p className="text-center mt-10">Loading your agreement info...</p>;
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-4 text-indigo-600">💳 Make Payment</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-semibold">Member Email</label>
          <input
            type="email"
            value={user.email}
            readOnly
            className="input input-bordered w-full"
          />
        </div>

        <div>
          <label className="block font-semibold">Floor No</label>
          <input
            type="text"
            value={agreement.floorNo}
            readOnly
            className="input input-bordered w-full"
          />
        </div>

        <div>
          <label className="block font-semibold">Block Name</label>
          <input
            type="text"
            value={agreement.blockName}
            readOnly
            className="input input-bordered w-full"
          />
        </div>

        <div>
          <label className="block font-semibold">Apartment No</label>
          <input
            type="text"
            value={agreement.apartmentNo}
            readOnly
            className="input input-bordered w-full"
          />
        </div>

        <div>
          <label className="block font-semibold">Rent</label>
          <input
            type="text"
            value={`$${agreement.rent}`}
            readOnly
            className="input input-bordered w-full"
          />
        </div>

        <div>
          <label className="block font-semibold" htmlFor="month">
            Select Month
          </label>
          <select
            id="month"
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            className="select select-bordered w-full"
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

        <div>
          <label className="block font-semibold" htmlFor="couponCode">
            Coupon Code (Optional)
          </label>
          <input
            type="text"
            id="couponCode"
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value)}
            placeholder="Enter coupon code"
            className="input input-bordered w-full"
          />
          <button
            type="button"
            onClick={handleApplyCoupon}
            disabled={loading}
            className="mt-2 btn btn-sm btn-primary"
          >
            Apply Coupon
          </button>
        </div>

        {discount > 0 && (
          <p className="text-green-600 font-semibold">
            Discount applied: {discount}% off
          </p>
        )}

        <div>
          <label className="block font-semibold">Final Amount</label>
          <input
            type="text"
            value={`$${finalAmount.toFixed(2)}`}
            readOnly
            className="input input-bordered w-full font-bold text-lg"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="btn btn-indigo w-full mt-4"
        >
          {loading ? "Processing..." : "Pay Now"}
        </button>
      </form>

      {message && (
        <p className="mt-4 text-center text-red-600 font-semibold">{message}</p>
      )}
    </div>
  );
};

export default MakePayment;
