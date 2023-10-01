import React, { useEffect, useState } from "react";
import { getSession } from "../Session/getSession";
import { useNavigate } from "react-router-dom";
import documentSend from "../envioDatos/Archivos/documentSend";
import documentRequest from "../envioDatos/Archivos/documentRequest";

export const Docs = () => {
    const navigate = useNavigate();
    const sesion = getSession()
    const [selectedFile, setSelectedFile] = useState(null);
    const [documentList, setDocumentList] = useState([]);
    
    
    
    useEffect(() => {  
        
        if (sesion === false){
            navigate("/Login")
        } else {
           
            const documents = documentRequest();
            //setDocumentList(documents);
            console.log("aca", documents)
          }
    }, [navigate,sesion]); 



    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
        console.log(file)
      };
    
      const handleUpload = () => {
        console.log(selectedFile)
        const formData = new FormData();
        formData.append('file', selectedFile);
    
        console.log("enviamos a documento ", documentSend(formData))
      };
    
    return (
        <div>
      <h1>Subir Archivo</h1>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Subir</button>

      <h2>Lista de Documentos:</h2>
      <ul>
        {documentList.map((document, index) => (
          <li key={index}>
            {/* Renderiza los detalles de cada documento */}
            <div>Nombre: {document.nombre}</div>
            <div>Tipo: {document.tipo}</div>
            {/* Agrega más detalles según la estructura del objeto */}
          </li>
        ))}
      </ul>
    </div>
    )
}

