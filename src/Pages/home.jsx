import React, { useEffect } from "react";
import { getSession } from "../Session/getSession";
import { useNavigate } from "react-router-dom";
import './home.css'
import { Insert } from '../components/Insert';

export const Home = () => {
    const navigate = useNavigate();
    const sesion = getSession()

    useEffect(() => {  
        
        if (sesion === false){
            navigate("/Login")
        }
    }, [navigate, sesion]); 

    return (
        <Insert />             
    );
}
