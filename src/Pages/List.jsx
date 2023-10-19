import React, { useEffect } from "react";
import { getSession } from "../Session/getSession";
import { useNavigate } from "react-router-dom";
import './Login.css'
import StudentsCRUD from '../components/crud/user/studentsCRUD';


export const List = () => {
    const navigate = useNavigate();
    const sesion = getSession()

    const myUrls = [
        process.env.REACT_APP_MIDDLEWARE_URL_BASE + '/role/director/roleAssignment/user/',
        process.env.REACT_APP_MIDDLEWARE_URL_BASE + '/role/director/roleAssignment/roleHasUser/rolesHasUser',
        process.env.REACT_APP_MIDDLEWARE_URL_BASE + '/role/director/roleAssignment/user/updatePassword',
        process.env.REACT_APP_MIDDLEWARE_URL_BASE + '/role/director/roleAssignment/roleHasUser/'
    ];

    useEffect(() => {  
        
        if (sesion === false){
            navigate("/Login")
        }
    }, [navigate, sesion]); 

    return (
        <main>
            <StudentsCRUD name={'Estudiante'} urls={myUrls} title={`Bienvenido a gestion de estudiantes`} />
        </main>     
    );
}





