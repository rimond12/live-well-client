import { useNavigate } from "react-router";
import useAuth from "../../hooks/useAuth";


const ApartmentCard = ({ apartment, onAgreement }) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const {
    _id,
    apartment_image,
    floor_no,
    block_name,
    apartment_no,
    rent,
  } = apartment;

  const handleAgreement = () => {
    if (!user) {
      navigate("/login");
    } else {
      onAgreement(apartment);
    }
  };

  return (
    <div className="card bg-white shadow-lg rounded-lg p-4">
      <img src={apartment_image} alt="Apartment" className="h-48 w-full object-cover rounded-md" />
      <div className="mt-4 space-y-1">
        <p><strong>Floor:</strong> {floor_no}</p>
        <p><strong>Block:</strong> {block_name}</p>
        <p><strong>Apartment No:</strong> {apartment_no}</p>
        <p><strong>Rent:</strong> {rent} ৳</p>
        <button
          onClick={handleAgreement}
          className="btn btn-success btn-sm mt-2"
        >
          Agreement
        </button>
      </div>
    </div>
  );
};

export default ApartmentCard;
