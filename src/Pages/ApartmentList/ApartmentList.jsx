import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import ApartmentCard from "./ApartmentCard";
import useAxiosSecure from "../../hooks/useAxiosSecure";
// import toast from "react-hot-toast"; // Optional toast

const ApartmentList = () => {
  const { user } = useAuth();
  const [apartments, setApartments] = useState([]);
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [minRent, setMinRent] = useState("");
  const [maxRent, setMaxRent] = useState("");
  const axiosSecure = useAxiosSecure();

  const itemsPerPage = 6;

  const fetchApartments = async (page = 1, min = "", max = "") => {
    const params = {
      page,
      limit: itemsPerPage,
    };
    if (min !== "") params.min = min;
    if (max !== "") params.max = max;

    try {
      const res = await axiosSecure.get("/apartments", { params });
      setApartments(res.data.apartments);
      setTotal(res.data.total);
    } catch (err) {
      console.error("API error:", err.message);
      // toast.error("Failed to fetch apartments");
    }
  };

  useEffect(() => {
    fetchApartments(currentPage, minRent, maxRent);
  }, [currentPage, minRent, maxRent]);

  const handleSearch = () => {
    setCurrentPage(1); // reset to page 1 on new search
  };

  const handleAgreement = async (apartment) => {
    if (!user?.email) {
      alert("Please log in first.");
      return;
    }

    const agreementData = {
      apartmentId: apartment._id,
      userEmail: user.email,
      rent: apartment.rent,
      blockName: apartment.block_name,
      apartmentNo: apartment.apartment_no,
      floorNo: apartment.floor_no,
      image: apartment.apartment_image,
      date: new Date().toISOString(),
    };

    console.log("Submitting agreement data:", agreementData);

    try {
      await axiosSecure.post("/agreements", agreementData);
      alert("Agreement submitted successfully!");
    } catch (err) {
      console.error(err);
      alert(err?.response?.data?.message || "Failed to submit agreement.");
    }
  };

  const totalPages = Math.ceil(total / itemsPerPage);

  const goToPrevPage = () => {
    setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev));
  };

  const goToNextPage = () => {
    setCurrentPage((prev) => (prev < totalPages ? prev + 1 : prev));
  };

  return (
    <div className="max-w-6xl mx-auto py-10">
      <h2 className="text-3xl font-semibold mb-6 text-center">
        Available Apartments
      </h2>

      {/* Rent Search */}
      <div className="flex flex-wrap gap-4 justify-center mb-6">
        <input
          type="number"
          placeholder="Min Rent"
          value={minRent}
          onChange={(e) => setMinRent(e.target.value)}
          className="input input-bordered"
        />
        <input
          type="number"
          placeholder="Max Rent"
          value={maxRent}
          onChange={(e) => setMaxRent(e.target.value)}
          className="input input-bordered"
        />
        <button onClick={handleSearch} className="btn btn-primary">
          Search
        </button>
      </div>

      {/* Apartment Cards */}
      <div className="grid md:grid-cols-3 gap-6">
        {apartments.map((apt) => (
          <ApartmentCard
            key={apt._id}
            apartment={apt}
            onAgreement={handleAgreement}
          />
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-6 items-center gap-2">
        <button
          onClick={goToPrevPage}
          disabled={currentPage === 1}
          className={`btn btn-sm ${
            currentPage === 1 ? "btn-disabled" : "btn-outline"
          }`}
        >
          {/* Left Arrow */}
          <svg
            className="h-4 w-4 inline-block mr-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Prev
        </button>

        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            className={`btn btn-sm ${
              currentPage === index + 1 ? "btn-primary" : "btn-outline"
            }`}
            onClick={() => setCurrentPage(index + 1)}
          >
            {index + 1}
          </button>
        ))}

        <button
          onClick={goToNextPage}
          disabled={currentPage === totalPages}
          className={`btn btn-sm ${
            currentPage === totalPages ? "btn-disabled" : "btn-outline"
          }`}
        >
          Next
          {/* Right Arrow */}
          <svg
            className="h-4 w-4 inline-block ml-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ApartmentList;
