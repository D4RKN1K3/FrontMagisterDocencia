import React, { useEffect, useState } from "react";
import { getSession } from "../Session/getSession";
import { useNavigate } from "react-router-dom";
import dataRequest from "../envioDatos/dataRequest";

export const Info = () => {
    const navigate = useNavigate();
    const sesion = getSession()
    const [userData, setUserData] = useState(null);

    
    useEffect(() => {  
        if (sesion === false){
            navigate("/Login");
        } else {
            dataRequest()
                .then(data => setUserData(data))
                .catch(error => console.error("Error al obtener datos:", error));
        }
    }, [navigate, sesion]); 

    return (
        <div>
            <h1>Datos del usuario</h1>
            {userData && (
                <ul>
    
                    <li><strong>RUT:</strong> {userData.rut}</li>
                    <li><strong>Primer Nombre:</strong> {userData.firstName}</li>
                    <li><strong>Segundo Nombre:</strong> {userData.secondName}</li>
                    <li><strong>Apellido Paterno:</strong> {userData.surnameM}</li>
                    <li><strong>Apellido Materno:</strong> {userData.surnameF}</li>
                    <li><strong>Sexo:</strong> {userData.sex}</li>
                    <li><strong>Estado Civil:</strong> {userData.stateCivil}</li>
                    <li><strong>Fecha de nacimiento:</strong> {userData.birthday}</li>
                    <li><strong>Direccion:</strong> {userData.address}</li>
                    <li><strong>Email:</strong> {userData.email}</li>
                    <li><strong>Telefono:</strong> {userData.phone}</li>
                    {/* Agrega más campos aquí según tus datos */}
                </ul>
            )}
        </div>
    );
}