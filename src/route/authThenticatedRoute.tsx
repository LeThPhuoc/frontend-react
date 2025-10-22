import React from "react";
import { Outlet, Navigate, useLocation } from "react-router-dom";

type Prop = {
    isAuthenticated: boolean;
}

export const AuthThenticatedRoute = ({isAuthenticated}: Prop) => {
    let location = useLocation();
    if(location.pathname === '/login' && isAuthenticated) {
        return <Navigate to="/" replace/>
    }
    if(!isAuthenticated) {
        return <Navigate to="/login" replace/>
    }
    return <Outlet/>
}