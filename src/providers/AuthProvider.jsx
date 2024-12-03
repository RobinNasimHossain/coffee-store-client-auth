import {
  createUserWithEmailAndPassword,
  signInWithCredential,
  signInWithEmailAndPassword,
} from "firebase/auth";
import React, { createContext, useState } from "react";
import { useContext } from "react";
import { auth } from "../firebase/firebase.init";
export const AuthContext = createContext(null);
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const userInfo = {
    user,
    loading,
    createUser,
    signIn,
  };
  return (
    <>
      <AuthContext.Provider value={userInfo}>{children}</AuthContext.Provider>
    </>
  );
};
