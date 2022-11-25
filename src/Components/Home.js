
import React from "react";
import useLocalStorage from "./auth/Hooks/useLocalStorage";
export default function Home(){
    const user = useLocalStorage.GetUser();

    return(
        <div>
        <h1>welcome <strong style={{color:"red"}}>{ user.username || user.email }</strong></h1>
        <a href="/logout">logout</a>
        </div>
        );
}