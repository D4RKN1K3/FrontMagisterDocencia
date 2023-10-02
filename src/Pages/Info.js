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
    }, []); 



    const handleEditClick = () => {
        setIsEditing(true);
      };
      
      const handleSaveClick = () => {
        // Copia todos los campos de userData a editedData si no existen en editedData o si están vacíos en editedData
        for (const key in userData) {
          if (!(key in editedData) || editedData[key] === '') {
            editedData[key] = userData[key];
          }
        }
      
        // Filtra los campos no vacíos de editedData y guárdalos en filteredData
        const filteredData = Object.fromEntries(
          Object.entries(editedData).filter(([key, value]) => value !== '')
        );
      
        console.log("Valores editados:", filteredData);
        dataSend(editedData);
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
        <div
        className="mx-auto max-w-lg font-normal"
        >
          <h1>Datos del usuario</h1>
          {isEditing ? (
            <form
            className="mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8"
            id="borderimg1"
            >
              <div className="form-group">
  <label>
    Primer Nombre:
    <input
      type="text"
      name="firstName"
      className="mx-2"
      value={editedData.firstName}
      placeholder={userData?.firstName || ""}
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
      className="mx-2"
      value={editedData.secondName}
      placeholder={userData?.secondName || ""}
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
      className="mx-2"
      value={editedData.surnameM}
      placeholder={userData?.surnameM || ""}
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
      className="mx-2"
      value={editedData.surnameF}
      placeholder={userData?.surnameF || ""}
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
      className="mx-2"
      value={editedData.sex}
      placeholder={userData?.sex || ""}
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
      className="mx-2"
      value={editedData.stateCivil}
      placeholder={userData?.stateCivil || ""}
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
      className="mx-2"
      value={editedData.birthday}
      placeholder={userData?.birthday || ""}
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
      className="mx-2"
      value={editedData.address}
      placeholder={userData?.address || ""}
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
      className="mx-2"
      value={editedData.email}
      placeholder={userData?.email || ""}
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
      className="mx-2"
      value={editedData.phone}
      placeholder={userData?.phone || ""}
      onChange={handleInputChange}
    />
  </label>
</div>
<button onClick={handleSaveClick}>Guardar</button>

            </form>
          
          ) : (
            <>
              {userData ? (
                <ul
                className="mx-auto max-w-lg items-center"
                >
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