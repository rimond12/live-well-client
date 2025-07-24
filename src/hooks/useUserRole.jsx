import { useEffect, useState } from "react";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";

const useUserRole = () => {
  const { user, loading: authLoading } = useAuth();
//   console.log(user.email);
  
  const axiosSecure = useAxiosSecure();

  const [role, setRole] = useState("guest");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && user?.email) {
      setLoading(true);
      axiosSecure
        .get(`/users/role/${user.email}`)
        .then((res) => {
          setRole(res.data.role || "user");
        })
        .catch((err) => {
          console.error("Role fetch error:", err);
          setRole("user");
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [user, authLoading, axiosSecure]);

  return [role, loading];
};

export default useUserRole;
