import React, { useEffect } from "react";
import { getSession } from "../Session/getSession";
import { useNavigate } from "react-router-dom";

export const Home = () => {
    const navigate = useNavigate();

    useEffect(() => {  
        const sesion = getSession()
        if (sesion === false){
            navigate("/Login")
        }
    }, []); 

    return (
        <h1>Home</h1>
    );
}
