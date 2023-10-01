import React, { useEffect } from "react";
import { getSession } from "../Session/getSession";
import { useNavigate } from "react-router-dom";
import dataRequest from "../envioDatos/dataRequest";

export const Edit = () => {
    const navigate = useNavigate();
    const sesion = getSession()

    console.log("enviamos a datarequest ", dataRequest())
    
    useEffect(() => {  
        
        if (sesion === false){
            navigate("/Login")
        }
    }, [navigate,sesion]); 

    return (
        <h1>Edit</h1>
    );
}