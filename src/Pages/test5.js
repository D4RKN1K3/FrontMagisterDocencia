import { useState } from 'react';
import { PDFDocument, rgb } from 'pdf-lib';
import { enc, AES } from 'crypto-js';

const EncryptPdf = () => {
  const [file, setFile] = useState(null);
  const [password, setPassword] = useState('');
  const [encryptedPdf, setEncryptedPdf] = useState(null);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const encryptPdf = async () => {
    try {
      const pdfBytes = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(pdfBytes);
      const { encrypted } = await pdfDoc.encrypt({
        password,
        permissions: {
          print: true,
          copy: true,
          modify: true,
          annotate: true,
        },
      });

      const encryptedPdfBytes = await pdfDoc.save();

      // Encriptar el contenido del PDF utilizando AES
      const encryptedContent = AES.encrypt(
        enc.Utf8.parse(encryptedPdfBytes),
        enc.Utf8.parse(password)
      ).toString();

      // Puedes almacenar `encryptedContent` donde sea necesario o cargarlo en un visor de PDF
      setEncryptedPdf(encryptedContent);
    } catch (error) {
      console.error('Error al encriptar el PDF', error);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <br />
      <label>Password:</label>
      <input type="password" value={password} onChange={handlePasswordChange} />
      <br />
      <button onClick={encryptPdf}>Encriptar PDF</button>

      {encryptedPdf && (
        <a
          href={`data:application/pdf;base64,${encryptedPdf}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          Ver PDF encriptado
        </a>
      )}
    </div>
  );
};

export default EncryptPdf;
