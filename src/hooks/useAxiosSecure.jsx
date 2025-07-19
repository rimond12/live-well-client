import axios from "axios";
import { getAuth } from "firebase/auth";

const axiosSecure = axios.create({
  baseURL: `http://localhost:3000`, // Change to 5000 if needed
});

// Request interceptor to add Firebase token to headers
axiosSecure.interceptors.request.use(async (config) => {
  const auth = getAuth();
  const user = auth.currentUser;

  if (user) {
    const token = await user.getIdToken(); // ✅ Fresh token
    console.log("🔥 Token being sent:", token); // Add this
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// Custom hook return
const useAxiosSecure = () => {
  return axiosSecure;
};

export default useAxiosSecure;
