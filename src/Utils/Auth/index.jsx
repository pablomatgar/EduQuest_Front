import React, { useContext, useState, useEffect } from "react";
import { auth, db } from "../../firebaseConfig";
import app from "../../firebaseConfig";
import "@firebase/firestore";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);
  const [loginSeleccionado, setLoginSeleccionado] = useState(true);

  function signUp(email, password, name) {
    console.log("Estamos creando un nuevo usuario");
    return auth
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        db.collection("users")
          .doc("Prueba")
          .set({ email, level: 0, name: "Victor", points: 0, quest: [] })
          .catch((e) => {
            console.log(e);
          });
      })
      .catch((e) => {
        console.log("ERROR: ", e);
      });
  }

  function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password);
  }

  useEffect(() => {
    const unsuscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      console.log("Usuario: ", user);
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
