import axios from "axios";

const axiosPublic = axios.create({
  baseURL: "https://mind-jot-server.vercel.app",
});

export const useAxiosPublic = () => {
  return axiosPublic;
};
