import React from "react";
import { useLocation } from "react-router-dom";
import { Navigate } from "react-router-dom";

    export default function Logout(){
        const location = useLocation();

        localStorage.clear();

    return <Navigate to="/login" state={{ from: location }} replace />;

  }