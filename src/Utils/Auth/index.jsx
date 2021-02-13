import React, { useContext, useState, useEffect } from "react";
import { auth } from "../../firebaseConfig";
import Firebase from "firebase";

const AuthContext = React.createContext(null);

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  function signUp(email, password, name) {
    Firebase.database()
      .ref("users/" + name)
      .set({
        email: email,
        level: 0,
        name: name,
        points: 0,
        quests: [],
      });
    return auth.createUserWithEmailAndPassword(email, password);
  }

  function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password);
  }

  useEffect(() => {
    const unsuscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsuscribe;
  }, []);

  const value = { currentUser, signUp, login };
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
