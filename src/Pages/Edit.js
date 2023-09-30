import React, { useEffect } from "react";
import { getSession } from "../Session/getSession";
import { useNavigate } from "react-router-dom";

export const Edit = () => {
    const navigate = useNavigate();

    useEffect(() => {  
        const sesion = getSession()
        if (sesion === false){
            navigate("/Login")
        }
    }, []); 

    return (
        <h1>Edit</h1>
    );
}