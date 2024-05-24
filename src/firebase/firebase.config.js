import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCIKgA5CUTU1p0r69n6y5GS4n-4GlDEXBA",
  authDomain: "kitchen-taless.firebaseapp.com",
  projectId: "kitchen-taless",
  storageBucket: "kitchen-taless.appspot.com",
  messagingSenderId: "959431857804",
  appId: "1:959431857804:web:c05553cd1e4da7a7f9cda9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;
