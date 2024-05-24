import PropTypes from "prop-types";
import { createContext, useEffect, useState } from "react";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import auth from "../firebase/firebase.config";
import toast from "react-hot-toast";

// create a new context and export
export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  // state
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isUserUpdate, setIsUserUpdate] = useState(true);

  //   google provider
  const googleProvider = new GoogleAuthProvider();

  // to create new user
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  //   to login user by there email and password
  const login = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  //   to login/register with google
  const googleAuth = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  //   to update user name and photo
  const updateUserNameAndPhoto = (userName, photoUrl) => {
    return updateProfile(auth.currentUser, {
      displayName: userName,
      photoURL: photoUrl,
    });
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

  //   to goo to top by treegrid this function
  const scrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
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
  }, [isUserUpdate, user?.email]);

  const data = {
    // state
    user,
    loading,
    isUserUpdate,
    // function
    createUser,
    login,
    googleAuth,
    setIsUserUpdate,
    updateUserNameAndPhoto,
    logout,
    handleSignOut,
    scrollTop,
  };

  return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>;
};

AuthProvider.propTypes = {
  children: PropTypes.node,
};

export default AuthProvider;
