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
        const fetchData = async () => {
          if (sesion === false) {
            navigate("/Login");
          } else {
            try {
              const documents = await documentRequest();
              // Ahora puedes trabajar con 'documents' aquí
              console.log("aca", documents);
              setDocumentList(documents);
            } catch (error) {
            
              console.error("Error al obtener los documentos:", error);
            }
          }
        };
      
        fetchData();
      }, []);
      


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
        {documentList ? (
            documentList.map((document, index) => (
            <li key={index}>
                <div>
                <span>id: {document.documentID} </span>
                <a href= {document.archive} target="_blank" rel="noopener noreferrer">
                {document.format.name}
                </a>
                </div>
            </li>
            ))
        ) : (
            <li>Cargando documentos...</li>
        )}
        </ul>

    </div>
    )
}

