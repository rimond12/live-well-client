import axios from "axios";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router";
import { useEffect } from "react";

const axiosSecure = axios.create({
  baseURL: "http://localhost:3000", // Change to 5000 if needed
});

// Request interceptor to add Firebase token
axiosSecure.interceptors.request.use(async (config) => {
  const auth = getAuth();
  const user = auth.currentUser;
  if (user) {
    const token = await user.getIdToken();
    console.log("🔥 Token being sent:", token);
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

const useAxiosSecure = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const responseInterceptor = axiosSecure.interceptors.response.use(
      (res) => res,
      (error) => {
        const status = error.response?.status;

        if (status === 403) {
          navigate("/forbidden");
        }

        if (status === 401) {
          const auth = getAuth();
          signOut(auth)
            .then(() => navigate("/login"))
            .catch((err) => console.error("Sign out error", err));
        }

        return Promise.reject(error);
      }
    );

    return () => {
      axiosSecure.interceptors.response.eject(responseInterceptor);
    };
  }, [navigate]);

  return axiosSecure;
};

export default useAxiosSecure;
