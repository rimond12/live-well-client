import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import ApartmentCard from "./ApartmentCard";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

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
      Swal.fire("Error!", "Failed to fetch apartments", "error");
    }
  };

  useEffect(() => {
    fetchApartments(currentPage, minRent, maxRent);
  }, [currentPage, minRent, maxRent]);

  const handleSearch = () => {
    setCurrentPage(1);
  };

  const handleAgreement = async (apartment) => {
    if (!user?.email) {
      Swal.fire("Login Required", "Please log in first.", "warning");
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

    try {
      const res = await axiosSecure.post("/agreements", agreementData);
      Swal.fire("Success!", "Agreement submitted successfully!", "success");
    } catch (err) {
      const status = err?.response?.status;
      const message =
        err?.response?.data?.message || "Failed to submit agreement.";

      if (status === 409) {
        // Already requested same apartment (duplicate)
        Swal.fire("Already Exists", message, "info");
      } else if (status === 400) {
        // কোনো ভ্যালিডেশন ইস্যু হলে
        Swal.fire("Invalid Request", message, "warning");
      } else {
        // অন্য সব অপ্রত্যাশিত error
        Swal.fire("Error!", message, "error");
      }
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
    <div className="max-w-6xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <h2 className="text-4xl font-extrabold mb-10 text-center text-[#a38966] drop-shadow-lg">
        Available Apartments
      </h2>

      {/* Rent Search */}
      <div className="flex flex-wrap justify-center gap-4 mb-10">
        <input
          type="number"
          placeholder="Min Rent"
          value={minRent}
          onChange={(e) => setMinRent(e.target.value)}
          className="input input-bordered border-[#a38966] focus:ring-[#a38966] focus:border-[#a38966] w-40 sm:w-48"
        />
        <input
          type="number"
          placeholder="Max Rent"
          value={maxRent}
          onChange={(e) => setMaxRent(e.target.value)}
          className="input input-bordered border-[#a38966] focus:ring-[#a38966] focus:border-[#a38966] w-40 sm:w-48"
        />
        <button
          onClick={handleSearch}
          className="btn bg-black text-white border-2 border-transparent hover:bg-white hover:text-black hover:border-[#a38966] transition duration-300 px-8"
        >
          Search
        </button>
      </div>

      {/* Apartment Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {apartments.length === 0 && (
          <p className="text-center col-span-full text-gray-600 font-semibold text-lg">
            No apartments found.
          </p>
        )}
        {apartments.map((apt) => (
          <ApartmentCard
            key={apt._id}
            apartment={apt}
            onAgreement={handleAgreement}
          />
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-12 items-center gap-3 flex-wrap">
          <button
            onClick={goToPrevPage}
            disabled={currentPage === 1}
            className={`btn btn-sm ${
              currentPage === 1
                ? "btn-disabled bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-[#a38966] text-white hover:bg-[#8b7b58]"
            } transition duration-300 flex items-center gap-1 px-4`}
          >
            <svg
              className="h-4 w-4 inline-block"
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
              className={`btn btn-sm px-4 ${
                currentPage === index + 1
                  ? "bg-[#a38966] text-white shadow-lg"
                  : "btn-outline text-[#a38966] hover:bg-[#8b7b58] hover:text-white"
              } transition duration-300`}
              onClick={() => setCurrentPage(index + 1)}
            >
              {index + 1}
            </button>
          ))}

          <button
            onClick={goToNextPage}
            disabled={currentPage === totalPages}
            className={`btn btn-sm ${
              currentPage === totalPages
                ? "btn-disabled bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-[#a38966] text-white hover:bg-[#8b7b58]"
            } transition duration-300 flex items-center gap-1 px-4`}
          >
            Next
            <svg
              className="h-4 w-4 inline-block"
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
      )}
    </div>
  );
};

export default ApartmentList;
