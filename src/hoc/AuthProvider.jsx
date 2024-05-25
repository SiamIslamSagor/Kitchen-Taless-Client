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

// create a new context and export
export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  // state
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

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

  //   auth observer to observe auth all time any where
  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, presentUser => {
      console.log("onAuthStateChanged %%%%%):=>", presentUser);
      // set the present user in the user state and when user set complete then set loading to false
      setUser(presentUser);
      setLoading(false);
    });
    return () => {
      return unSubscribe();
    };
  }, [user?.email]);

  const data = {
    // state
    user,
    loading,
    // function
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
