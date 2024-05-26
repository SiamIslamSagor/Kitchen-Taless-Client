import axios from "axios";
import { useNavigate } from "react-router-dom";
import useDataContext from "./useDataContext";

const axiosSecure = axios.create({
  baseURL: "http://localhost:5000",
});

const useAxiosSecure = () => {
  const navigate = useNavigate();
  const { logOut } = useDataContext();
  // request interceptors for add authorization header
  axiosSecure.interceptors.request.use(
    config => {
      // get token
      const token = localStorage.getItem("access-token");
      console.log("INTERCEPTORS WORKING");
      //   set token
      config.headers.authorization = `Bearer ${token}`;
      //   send token in server side
      return config;
    },
    // if error, then run this code block
    error => {
      return Promise.reject(error);
    }
  );

  // response

  axiosSecure.interceptors.response.use(
    response => {
      // return the response
      return response;
    },
    // if error, then run this code block
    async error => {
      // get status code form error message
      const status = error?.response?.status;
      console.log("STATUS CODE ERROR IN THE INTERCEPTORS==>", status);
      // if status code 401 or 403 then log out the current user and navigate to login page.
      if (status === 401 || status === 403) {
        await logOut();
        navigate("/");
      }
      return Promise.reject(error);
    }
  );
  return axiosSecure;
};

export default useAxiosSecure;
