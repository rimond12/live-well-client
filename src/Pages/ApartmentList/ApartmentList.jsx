import { useEffect, useState } from "react";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import ApartmentCard from "./ApartmentCard";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const ApartmentList = () => {
  const { user } = useAuth();
  const [apartments, setApartments] = useState([]);
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [minRent, setMinRent] = useState("");
  const [maxRent, setMaxRent] = useState("");

  const itemsPerPage = 6;

const fetchApartments = (page = 1, min = "", max = "") => {
  const params = {
    page,
    limit: itemsPerPage,
  };
  if (min !== "") params.min = min;
  if (max !== "") params.max = max;

  useAxiosSecure
    .get("/apartments", { params })
    .then((res) => {
      setApartments(res.data.apartments);
      setTotal(res.data.total);
    })
    .catch((err) => {
      console.error("API error:", err.message);
    });
};

useEffect(() => {
  fetchApartments(currentPage, minRent, maxRent);
}, [currentPage, minRent, maxRent]); // rent range change হলে fetch auto হবে

const handleSearch = () => {
  setCurrentPage(1);
  fetchApartments(1, minRent, maxRent);
};

const handleAgreement = async (apartment) => {
  const agreementData = {
    userName: user?.displayName,
    userEmail: user?.email,
    floorNo: apartment.floorNo,
    blockName: apartment.blockName,
    apartmentNo: apartment.apartmentNo,
    rent: apartment.rent,
    status: "pending",
  };

  try {
    await useAxiosSecure.post("/agreements", agreementData);
    alert("Agreement submitted successfully!");
    // toast.success("Agreement submitted successfully!"); // optional
  } catch (err) {
    console.error(err);
    alert("Failed to submit agreement.");
    // toast.error("Failed to submit agreement."); // optional
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
      <h2 className="text-3xl font-semibold mb-6 text-center">Available Apartments</h2>

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
          <ApartmentCard key={apt._id} apartment={apt} onAgreement={handleAgreement} />
        ))}
      </div>

      {/* Pagination with Prev and Next */}
      <div className="flex justify-center mt-6 items-center gap-2">
  <button
    onClick={goToPrevPage}
    disabled={currentPage === 1}
    className={`btn btn-sm ${currentPage === 1 ? "btn-disabled" : "btn-outline"}`}
  >
    {/* Left Arrow SVG */}
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-4 w-4 inline-block mr-1"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
    </svg>
    Prev
  </button>

  {[...Array(totalPages)].map((_, index) => (
    <button
      key={index}
      className={`btn btn-sm ${currentPage === index + 1 ? "btn-primary" : "btn-outline"}`}
      onClick={() => setCurrentPage(index + 1)}
    >
      {index + 1}
    </button>
  ))}

  <button
    onClick={goToNextPage}
    disabled={currentPage === totalPages}
    className={`btn btn-sm ${currentPage === totalPages ? "btn-disabled" : "btn-outline"}`}
  >
    Next
    {/* Right Arrow SVG */}
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-4 w-4 inline-block ml-1"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
    </svg>
  </button>
</div>

    </div>
  );
};

export default ApartmentList;
