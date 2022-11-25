
import { useLocation, Navigate } from "react-router-dom";
import React from "react";
import useLocalStorage from "./Hooks/useLocalStorage";



export default function RequireAuth({ children }) {
    const location = useLocation();
    const user = useLocalStorage.GetUser();
    if (user === false) {
        localStorage.clear();
        return <Navigate to = "/login"state = {{ from: location }} replace />;
    }


    return children;
}