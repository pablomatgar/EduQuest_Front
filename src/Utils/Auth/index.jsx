import React, { useContext, useState, useEffect } from "react";
import { auth, db } from "../../firebaseConfig";
import { v4 as uuidv4 } from "uuid";
import "@firebase/firestore";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [currentProfile, setCurrentProfile] = useState();
  const [loading, setLoading] = useState(true);
  const [loginSeleccionado, setLoginSeleccionado] = useState(true);

  function signUp(email, password, name, userType) {
    console.log("Estamos creando un nuevo usuario");
    return auth
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        db.collection("users")
          .doc(uuidv4())
          .set({ email, level: 0, name, points: 0, quest: [], type: userType })
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

  function logout() {
    return auth.signOut();
  }

  useEffect(() => {
    const unsuscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      //SetCurrentProfile => Fecth from server the whole profile based on the user name and then update state
      console.log("Usuario: ", user);
      setLoading(false);
    });

    return unsuscribe;
  }, []);

  const value = { currentUser, signUp, login, currentProfile };
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
