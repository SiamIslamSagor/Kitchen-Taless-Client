import axios from "axios";

const axiosPublic = axios.create({
  baseURL: "https://kitchen-tales-server.vercel.app",
});

export const useAxiosPublic = () => {
  return axiosPublic;
};
