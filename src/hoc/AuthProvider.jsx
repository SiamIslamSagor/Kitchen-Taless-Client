import PropTypes from "prop-types";
import { createContext, useEffect, useState } from "react";
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import auth from "../firebase/firebase.config";
import toast from "react-hot-toast";
import { useAxiosPublic } from "../hooks/useAxiosPublic";

// create a new context and export
export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  // state
  const [user, setUser] = useState(null);
  const [userInfo, setUserInfo] = useState({});
  const [recipeLoading, setRecipeLoading] = useState(true);
  const [userLoading, setUserLoading] = useState(true);
  const [reFetchUser, setReFetchUser] = useState(true);

  const [loading, setLoading] = useState(true);
  const axiosPublic = useAxiosPublic();

  //   google provider
  const googleProvider = new GoogleAuthProvider();

  //   to login/register with google
  const googleAuth = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  //   to log out user
  const logout = () => {
    setLoading(true);
    return signOut(auth);
  };

  const handleSignOut = () => {
    const toastId = toast.loading("processing...");
    console.log("clicked");
    signOut(auth)
      .then(() => {
        setLoading(true);
        toast.success("Sign out successfully.", { id: toastId });
      })
      .catch(() => {
        toast.error("Sign out Failed.", { id: toastId });
      });
  };

  useEffect(() => {
    setUserLoading(true);
    axiosPublic
      .get(`/user/${user?.email && user?.email}`)
      .then(res => {
        setUserInfo(res.data);
        setUserLoading(false);
      })
      .catch(err => {
        console.log(err);
        setUserLoading(false);
      });
  }, [axiosPublic, user?.email, reFetchUser]);

  //   auth observer to observe auth all time any where
  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, presentUser => {
      setUser(presentUser);
      console.log("onAuthStateChanged %%%%%):=>", presentUser);
      // set the present user in the user state and when user set complete then set loading to false
      setLoading(false);

      //////////////////
      /// jwt block ////
      //////////////////

      if (presentUser) {
        // get token form server side and store in local storage
        const userInfo = { email: presentUser.email };
        axiosPublic.post("/jwt", userInfo).then(res => {
          // if token exist, then store in local storage
          if (res.data) {
            localStorage.setItem("access-token", res.data.token);
            // console.log("access-token stored");
          }
        });
      }
      // if user dose not exist, then remove stored token in local storage
      else {
        localStorage.removeItem("access-token");
        console.log("access-token removed");
        setLoading(false);
      }
      //////////////////////////////////
    });
    return () => {
      return unSubscribe();
    };
  }, [user?.email, axiosPublic]);

  const data = {
    // state
    user,
    userInfo,
    userLoading,
    loading,
    recipeLoading,
    // function
    setRecipeLoading,
    setReFetchUser,
    googleAuth,
    logout,
    handleSignOut,
  };

  return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>;
};

AuthProvider.propTypes = {
  children: PropTypes.node,
};

export default AuthProvider;
