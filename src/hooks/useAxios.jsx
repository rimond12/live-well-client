import axios from "axios";

const axiosInstance = axios.create({
  baseURL: `https://live-well-server.vercel.app`,
});

const useAxios = () => {
  return axiosInstance;
};

export default useAxios;
