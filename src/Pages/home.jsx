import React, { useEffect } from "react";
import { getSession } from "../Session/getSession";
import { useNavigate } from "react-router-dom";

export const Home = () => {
    const navigate = useNavigate();
    const sesion = getSession()

    useEffect(() => {  
        
        if (sesion === false){
            navigate("/Login")
        }
    }, [navigate, sesion]); 

    return (
        <h1>Home</h1>
    );
}
