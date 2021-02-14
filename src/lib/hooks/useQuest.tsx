import React from "react";
import { useEffect, useRef, useState } from "react";
import FetchClient from "../../Utils/Interceptor/FetchClient";
import axios from "axios";

function useQuest() {
    const [quests, setQuests] = useState(Array({
        id: "",
        name: "",
        description: "",
        creatorId: "",
        roomId: "",
        reward: {
            description: "",
            points: "",
            type: ""
        }}));

  useEffect(() => {

    const url = "http://localhost:8000/api/quests?take=10&skip=0";

    const fetchQuests = async () => {
        try{
            const response = await axios.get(url);
            const responseData: {
                id: string;
                name: string;
                description: string;
                creatorId: string;
                roomId: string;
                reward: {
                    description: string;
                    points: string;
                    type: string;
                }}[] = response.data;
            setQuests(responseData);
        }
        catch(e){
            console.log(e);
        }
    };
    fetchQuests();

        /*FetchClient.get(url)
            .then((res) => {
                if (res.data != null) {
                    setQuests(res.data);
                    console.log(res.data);
                }
            })
            .catch((err) => {
                console.error(err);
            });*/
  }, []);

  return { quests };
}

export default useQuest;
