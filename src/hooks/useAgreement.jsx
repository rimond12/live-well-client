import { useEffect, useState } from "react";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";
import toast from "react-hot-toast";

const useAgreement = () => {
  const [agreement, setAgreement] = useState(null);
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    if (user?.email) {
      axiosSecure.get(`/my-agreement/${user.email}`)
        .then((res) => {
          setAgreement(res.data);
        })
        .catch((err) => {
          toast.error("Failed to fetch agreement", err);
        });
    }
  }, [user, axiosSecure]);

  return [agreement];
};

export default useAgreement;
