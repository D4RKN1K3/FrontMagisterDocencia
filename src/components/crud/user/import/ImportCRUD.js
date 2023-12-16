import React, { useState } from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from "react-router-dom";

import ModalCRUD from '../../../modal/modalCRUD';
import Alert from '../../../alert/alert';
import AlertVerification from '../../../alert/alertVerification';
import WaitingAlert from '../../../alert/waitingAlert';

import { POSTFileRequest } from '../../../../utils/requestHelpers';
import { renewSession, deniedSession } from '../../../../utils/sessionHelpers';
import FormHeaderNotUpdate from '../../../forms/body/formContainerNotUpdate'
import CustomButton from '../../../button/customButton';
import FileDropzone from '../../../input/fileDropzone';

const CustomPath = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m6.75 12l-3-3m0 0l-3 3m3-3v6m-1.5-15H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
    </svg>
  );
};

const ImportCRUD = ({ name, label, url, handleFetchItems }) => {
  const [itemName] = useState(name);
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState(null);

  // -------------------------------Funciones Para CRUD-------------------------------
  const handleFileChange = async (file) => {
    setSelectedFile(file);
    setMessageVerification("Se ha Cargado el Archivo");
  };

  const handleCreate = async (event) => {
    event.preventDefault();
    try {
      const access_token = Cookies.get('access_token');
      if (access_token) {
        if (selectedFile) {
          setMessageWaiting(true);
          const config = {
            access_token,
          };
          const response = await POSTFileRequest(url, config, selectedFile);
          OptionMessage(response);
        }
        else {
          setMessageError('No se ha subido ningún archivo');
        }
      } else {
        setMessageError('No tienes una sesión');
      }
    } catch (error) {
      setMessageWaiting(false);
      setMessageError(`Error importing ${itemName}:` + error.message);
    }
  };

  const OptionMessage = async (data) => {
    setMessageWaiting(false);
    if (data.verificationMessage) {
      setMessageVerification(data.verificationMessage);
      setModalOpen(false);
      await handleFetchItems();
    }
    else if (data.renewalMessage) {
      await handleFetchItems();
      setMessageVerification(data.renewalMessage);
    }
    else if (data.errorDenied) {
      setMessageError(data.errorDenied);
      deniedSession(navigate);
    }
    else if (data.expirationError) {
      const renewedData = await renewSession();
      OptionMessage(renewedData);
    }
    else if (data.message) {
      if (data.message.error && data.message.error.message !== undefined) {
        setMessageError(data.message.error.message);
        return;
      }
      setMessageError(data.message);
    }
    else if (data.errors) {
      const errorList = data.errors.map((error, index) => `${index + 1}. ${error.msg}`).join('<br/>');
      setMessageError(<p>Se encontraron los siguientes errores:<br />{errorList}</p>);
    }
    else if (data.error) {
      if (Object.keys(data.error).length === 0) {
        setMessageError('Error desconocido');
      } else if (data.error.message !== undefined) {
        setMessageError(data.error.message);
      } else {
        setMessageError(data.error);
      }
    }
    else {
      setMessageError('Error Inesperado');
    }
  };

  // -------------------------------Funciones de Extra-------------------------------
  const [modalOpen, setModalOpen] = useState(false);
  const [messageError, setMessageError] = useState(null);
  const [messageVerification, setMessageVerification] = useState(null);
  const [messageWaiting, setMessageWaiting] = useState(null);

  const closeAlert = () => {
    setMessageError(null);
    setMessageVerification(null);
  }

  // -------------------------------Funciones para los Modal-------------------------------
  const openModal = async () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div>
      {messageWaiting && <WaitingAlert />}
      {messageError && <Alert message={messageError} onClose={closeAlert} />}
      {messageVerification && (<AlertVerification message={messageVerification} onClose={closeAlert} />)}

      <ModalCRUD isOpen={modalOpen}>
        <FormHeaderNotUpdate
          message={`Importación de ${label}`}
          messageButton={`Importar ${label}`}
          handleSubmit={handleCreate}
          closeModal={closeModal}
          customPath={<CustomPath />}
        >
          <FileDropzone onFileChange={handleFileChange} />
        </FormHeaderNotUpdate>
      </ModalCRUD>


      <CustomButton onClick={openModal} type="button"
        color='orange'
        padding_x='4'
        padding_smx='6'
        padding_mdx='8'
        padding_y='2'
        width='full'
        height='10'
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
          <CustomPath />
        </svg>
        Importar {label}
      </CustomButton>

    </div>
  );
};

export default ImportCRUD;