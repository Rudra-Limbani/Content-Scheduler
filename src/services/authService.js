import { auth } from "./firebaseConfig";
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup 
} from "firebase/auth";

const googleProvider = new GoogleAuthProvider();

// ✅ Register User
export const registerUser = (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

// ✅ Login User
export const loginUser = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

// ✅ Google Login
export const googleLogin = () => {
  return signInWithPopup(auth, googleProvider);
};

// ✅ Logout
export const logoutUser = () => {
  return signOut(auth);
};
