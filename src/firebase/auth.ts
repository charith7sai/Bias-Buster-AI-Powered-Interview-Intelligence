
"use client";
import { 
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut
} from 'firebase/auth';
import { initializeFirebase } from '.';

const { auth } = initializeFirebase();

export const handleEmailSignUp = (email: string, password: string) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

export const handleEmailLogin = (email: string, password: string) => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const handleSignOut = () => {
  return signOut(auth);
};
