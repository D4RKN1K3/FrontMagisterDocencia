import React, { useState } from 'react';

function FileUpload() {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const uploadSegments = async () => {
    const segmentSize = 1024 * 1024; // Tamaño de segmento: 1 MB
    const segmentCount = Math.ceil(file.size / segmentSize);
    const tempSegments = [];

    for (let i = 0; i < segmentCount; i++) {
      const start = i * segmentSize;
      const end = Math.min((i + 1) * segmentSize, file.size);
      const segment = file.slice(start, end);
      tempSegments.push(segment);
    }

    // Enviar cada segmento al servidor
    for (let i = 0; i < tempSegments.length; i++) {
      const formData = new FormData();
      formData.append('segment', tempSegments[i]);

      try {
        await fetch('http://localhost:3000/upload-segment', {
          method: 'POST',
          body: formData,
        });

        console.log(`Segmento ${i + 1} enviado con éxito.`);
      } catch (error) {
        console.error(`Error al enviar el segmento ${i + 1}:`, error);
      }
    }

    // Cuando se hayan enviado todos los segmentos, reensamblar el archivo
    if (tempSegments.length === segmentCount) {
      try {
        await fetch('http://localhost:3000/reassemble', {
          method: 'GET',
        });
        console.log('Archivo reensamblado con éxito.');
      } catch (error) {
        console.error('Error al reensamblar el archivo:', error);
      }
    }
    try {
      const response = await fetch('http://localhost:3000/getfilename', {
        method: 'GET',
      });
      console.log(response);
      if (response.ok) {
        const data = await response.json();
        const assembledFileName = data.filename;
        const fileSize = data.size;
        const fileCreatedAt = data.createdAt;

        console.log(`Nombre del archivo: ${assembledFileName}`);
        console.log(`Tamaño del archivo: ${fileSize} bytes`);
        console.log(`Fecha de creación: ${fileCreatedAt}`);
        // Puedes acceder a más información aquí según lo que hayas agregado en el servidor.
      } else {
        console.error('Error al obtener la información del archivo ensamblado.');
      }

    } catch (error) {
      console.error('Error al reensamblar el archivo:', error);
    }

  };

  return (
    <div>
      <input type="file" accept=".png, .jpg, .pdf, .xls .txt" onChange={handleFileChange} />
      <button onClick={uploadSegments}>Subir Archivo</button>
    </div>
  );
}

export default FileUpload;
