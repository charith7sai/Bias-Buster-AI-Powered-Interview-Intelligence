"use client";
import { 
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup
} from 'firebase/auth';
import { initializeFirebase } from '.';

const { auth } = initializeFirebase();
const googleProvider = new GoogleAuthProvider();

export const handleEmailSignUp = (email: string, password: string) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

export const handleEmailLogin = (email: string, password: string) => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const handleGoogleSignIn = () => {
  return signInWithPopup(auth, googleProvider);
};

export const handleSignOut = () => {
  return signOut(auth);
};
