import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import ApartmentCard from "./ApartmentCard";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import Loading from "../Loading/Loading";

const ApartmentList = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const [currentPage, setCurrentPage] = useState(1);
  const [minRent, setMinRent] = useState("");
  const [maxRent, setMaxRent] = useState("");

  const itemsPerPage = 6;

  const fetchApartments = async ({ queryKey }) => {
    const [_key, page, min, max] = queryKey;
    const params = { page, limit: itemsPerPage };
    if (min) params.min = min;
    if (max) params.max = max;

    const res = await axiosSecure.get("/apartments", { params });
    return res.data; 
  };

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["apartments", currentPage, minRent, maxRent],
    queryFn: fetchApartments,
    keepPreviousData: true,
  });

  const apartments = data?.apartments || [];
  const total = data?.total || 0;
  const totalPages = Math.ceil(total / itemsPerPage);

  const handleSearch = () => {
    setCurrentPage(1);
    refetch(); 
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
      await axiosSecure.post("/agreements", agreementData);
      Swal.fire("Success!", "Agreement submitted successfully!", "success");
    } catch (err) {
      const status = err?.response?.status;
      const message =
        err?.response?.data?.message || "Failed to submit agreement.";

      if (status === 409) {
        Swal.fire("Already Exists", message, "info");
      } else if (status === 400) {
        Swal.fire("Invalid Request", message, "warning");
      } else {
        Swal.fire("Error!", message, "error");
      }
    }
  };

  const goToPrevPage = () =>
    setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev));
  const goToNextPage = () =>
    setCurrentPage((prev) => (prev < totalPages ? prev + 1 : prev));

  if (isLoading) {
    return <Loading></Loading>;
  }

  if (isError) {
    return (
      <p className="text-center mt-10 text-xl text-red-500">
        Failed to fetch apartments
      </p>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
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
          </button>
        </div>
      )}
    </div>
  );
};

export default ApartmentList;
