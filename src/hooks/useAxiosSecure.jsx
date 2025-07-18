import axios from "axios";

const useAxiosSecure = axios.create({
  baseURL: "http://localhost:3000", // তোমার সার্ভার URL
  // এখনই token বা cookies ব্যবহার না করলে withCredentials না দেয়াটা ঠিক
});

export default useAxiosSecure;
