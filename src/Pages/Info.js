import React, { useEffect, useState } from "react";
import { getSession } from "../Session/getSession";
import { useNavigate } from "react-router-dom";
import dataRequest from "../envioDatos/Informacion/dataRequest";
import { dataSend } from "../envioDatos/Informacion/dataSend";

export const Info = () => {
    const navigate = useNavigate();
    const sesion = getSession()
    const [userData, setUserData] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editedData, setEditedData] = useState({
      firstName: "",
      secondName: "",
      surnameM: "",
      surnameF: "",
      sex: "",
      stateCivil: "",
      birthday: "",
      address: "",
      email: "",
      phone: "",
    });

    
    useEffect(() => {  
        if (sesion === false){
            navigate("/Login");
        } else {
          dataRequest()
          .then((data) => {
            setUserData(data);
            
          })
                .catch(error => console.error("Error al obtener datos:", error));
        }
    }, [navigate, sesion]); 



    const handleEditClick = () => {
        setIsEditing(true);
      };
      
      const handleSaveClick = () => {
        console.log("Valores editados:", editedData);
        dataSend(editedData)
        setIsEditing(false); 
      };

      const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      };
      

      return (
        <div>
          <h1>Datos del usuario</h1>
          {isEditing ? (
            <form>
            <div className="form-group">
              <label>
                Primer Nombre:
                <input
                  type="text"
                  name="firstName"
                  value={editedData.firstName || userData?.firstName || ""}
                  onChange={handleInputChange}
                />
              </label>
            </div>
            <div className="form-group">
              <label>
                Segundo Nombre:
                <input
                  type="text"
                  name="secondName"
                  value={editedData.secondName || userData?.secondName || ""}
                  onChange={handleInputChange}
                />
              </label>
            </div>
            <div className="form-group">
              <label>
                Apellido Paterno:
                <input
                  type="text"
                  name="surnameM"
                  value={editedData.surnameM || userData?.surnameM || ""}
                  onChange={handleInputChange}
                />
              </label>
            </div>
            <div className="form-group">
              <label>
                Apellido Materno:
                <input
                  type="text"
                  name="surnameF"
                  value={editedData.surnameF || userData?.surnameF || ""}
                  onChange={handleInputChange}
                />
              </label>
            </div>
            <div className="form-group">
              <label>
                Sexo:
                <input
                  type="text"
                  name="sex"
                  value={editedData.sex || userData?.sex || ""}
                  onChange={handleInputChange}
                />
              </label>
            </div>
            <div className="form-group">
              <label>
                Estado Civil:
                <input
                  type="text"
                  name="stateCivil"
                  value={editedData.stateCivil || userData?.stateCivil || ""}
                  onChange={handleInputChange}
                />
              </label>
            </div>
            <div className="form-group">
              <label>
                Fecha de Nacimiento:
                <input
                  type="text"
                  name="birthday"
                  value={editedData.birthday || userData?.birthday || ""}
                  onChange={handleInputChange}
                />
              </label>
            </div>
            <div className="form-group">
              <label>
                Dirección:
                <input
                  type="text"
                  name="address"
                  value={editedData.address || userData?.address || ""}
                  onChange={handleInputChange}
                />
              </label>
            </div>
            <div className="form-group">
              <label>
                Email:
                <input
                  type="text"
                  name="email"
                  value={editedData.email || userData?.email || ""}
                  onChange={handleInputChange}
                />
              </label>
            </div>
            <div className="form-group">
              <label>
                Teléfono:
                <input
                  type="text"
                  name="phone"
                  value={editedData.phone || userData?.phone || ""}
                  onChange={handleInputChange}
                />
              </label>
            </div>
            <button onClick={handleSaveClick}>Guardar</button>
          </form>
          
          ) : (
            <>
              {userData ? (
                <ul>
                  <li><strong>RUT:</strong> {userData.rut}</li>
                  <li><strong>Primer Nombre:</strong> {userData.firstName}</li>
                  <li><strong>Segundo Nombre:</strong> {userData.secondName}</li>
                  <li><strong>Apellido Paterno:</strong> {userData.surnameM}</li>
                  <li><strong>Apellido Materno:</strong> {userData.surnameF}</li>
                  <li><strong>Sexo:</strong> {userData.sex}</li>
                  <li><strong>Estado Civil:</strong> {userData.stateCivil}</li>
                  <li><strong>Fecha de nacimiento:</strong> {userData.birthday}</li>
                  <li><strong>Dirección:</strong> {userData.address}</li>
                  <li><strong>Email:</strong> {userData.email}</li>
                  <li><strong>Teléfono:</strong> {userData.phone}</li>
                </ul>
              ) : (
                <p>Cargando datos...</p>
              )}
              <button onClick={handleEditClick}>Editar</button>
            </>
          )}
        </div>
      );
    };