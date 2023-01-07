import { createContext, useEffect, useState } from "react";
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
} from "@firebase/auth";
import { auth } from "../config/firebase";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser({
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
          uid: user.uid,
        });
      } else {
        setUser(null);
      }
    });
  }, []);

  const googleAuthentication = async () => {
    setIsLoading(true);
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  };

  const logout = async () => {
    await auth.signOut();
  };

  if (isLoading) {
    return (
      <div className="min-h-screen min-w-full flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <AuthContext.Provider
      value={{ user, isLoading, googleAuthentication, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
