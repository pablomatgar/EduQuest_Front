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
    const userID = uuidv4();
    console.log(userID);
    localStorage.setItem("userID", userID);
    return auth
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        db.collection("users")
          .doc(userID)
          .set({
            email,
            level: 0,
            name: name,
            points: 0,
            quest: [],
            type: userType,
          })
          .catch((e) => {
            console.log(e);
          });
      })
      .catch((e) => {
        console.log("ERROR: ", e);
      });
  }

  function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password).then(async () => {
      const snapshot = await db
        .collection("users")
        .where("email", "==", email)
        .get();
      if (!snapshot.empty) {
        snapshot.forEach((user) => {
          localStorage.setItem("userID", user.id);
        });
        return true;
      }
      throw new Error("Error logging in!");
    });
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
