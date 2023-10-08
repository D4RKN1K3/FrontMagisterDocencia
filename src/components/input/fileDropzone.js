import React, { useState } from 'react';
import FileDropzone from './fileDropzone';

function App() {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (file) => {
    setSelectedFile(file);
    // Haz algo con el archivo seleccionado, como enviarlo a un servidor o procesarlo de alguna manera.
  };

  return (
    <div className="App">
      <h1>File Dropzone Example</h1>
      <FileDropzone onFileChange={handleFileChange} />
      {selectedFile && (
        <p>Archivo seleccionado: {selectedFile.name}</p>
      )}
    </div>
  );
}

export default App;
