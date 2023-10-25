import React, { useState } from 'react'
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDY0sAJQh-_6ozOoEsNNnN1HUkEpTtZ6Lg",
  authDomain: "fptblog-92158.firebaseapp.com",
  projectId: "fptblog-92158",
  storageBucket: "fptblog-92158.appspot.com",
  messagingSenderId: "129952121865",
  appId: "1:129952121865:web:088a49e2690de59241a4d8",
  measurementId: "G-B9W7C0BKPC"
};

initializeApp(firebaseConfig);

const firebaseApp = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();
const auth = getAuth(firebaseApp);

auth.useDeviceLanguage();

// FIREBASE CONSOLE -> PROJECT -> turn on google Sign-in method
const loginGoogle = async () => {
  const result = await signInWithPopup(auth, provider);
  const token = result?.user?.accessToken;
  if (token) {
    return token;
  }
  return '';
};

export {loginGoogle};
