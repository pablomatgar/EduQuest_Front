import React, {
  useState,
  useEffect,
  useContext,
  useCallback,
  useMemo,
} from "react";

import FetchClient from "../../Utils/Interceptor/FetchClient";

const UserContext = React.createContext(undefined);

const UserProvider = ({ children }) => {
  const [user, setUser] = useState({name: "", email: "", level: "", points: 0, quests: []});
  const [montado, setMontado] = useState();

  useEffect(() => {
    const url = "http://localhost:8000/api/me";
    FetchClient.get(url)
      .then((res) => {
        if(res.data!=null){
        setUser(res.data);
        console.log("Hemos obtenido al usuario: ", user);
        }
      })
      .catch((err) => {
        console.error(err);
      });
    setMontado(true);
  }, []);

  useEffect(() => {
    if (montado) {
      console.log("Componente montado");
    }
  }, [montado]);

  const addQuest = useCallback((myQuest) => {
    user.quest.push(myQuest);
    const newUser = user;
    setUser(newUser);
  }, []);

  const removeQuest = useCallback((oldQuest) => {
    user.quest = user.quest.filter((item) => item != oldQuest);
    const newUser = user;
    setUser(newUser);
  }, []);

  const addPoints = useCallback((points) => {
    user.points += points;
    const newUser = user;
    setUser(newUser);
  }, []);

  const data = useMemo(() => [user, addQuest, removeQuest, addPoints], [
    user,
    addQuest,
    removeQuest,
    addPoints,
  ]);

  return <UserContext.Provider value={data}>{children}</UserContext.Provider>;
};

const useUser = () => {
  const context = useContext(UserContext);
  console.log(context);
  if (context === undefined) {
    throw new Error("useUser can only be used inside UserProvider");
  }
  return context;
};

export { UserProvider, useUser };
