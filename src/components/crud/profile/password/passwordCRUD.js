import React, { useState } from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from "react-router-dom";

import ModalCRUD from '../../../modal/modalCRUD';
import Alert from '../../../alert/alert';
import AlertVerification from '../../../alert/alertVerification';
import WaitingAlert from '../../../alert/waitingAlert';

import { PUTRequest } from '../../../../utils/requestHelpers';
import { renewSession, deniedSession } from '../../../../utils/sessionHelpers';
import { isPasswordValid } from '../../../../utils/validationUtils';
import FormHeaderNotUpdate from '../../../forms/body/formContainerNotUpdate'
import TextInput from '../../../input/textInput';
import CustomButton from '../../../button/customButton';

const CustomPath = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z" />
    </svg>
  );
};
const getPasswordRequirementsText = () => {
  return (
    <p>
      La contraseña debe cumplir con las siguientes características:
      <br />
      - No se permite el uso de contraseñas repetidas.
      <br />
      - Debe tener una longitud mínima de 8 caracteres.
      <br />
      - Debe contener al menos una letra mayúscula.
      <br />
      - Debe contener al menos una letra minúscula.
      <br />
      - Debe contener al menos un número.
      <br />- Debe contener al menos un carácter especial.
    </p>
  );
};

const PasswordCRUD = ({ urls }) => {
  const [itemName] = useState('Usuario');
  const navigate = useNavigate();
  const [newItem, setNewItem] = useState({
    password: '',
  });

  // -------------------------------Funciones Para CRUD-------------------------------
  const handleUpdate = async (event) => {
    event.preventDefault();
    try {
      const validationPassword = isPasswordValid(newItem.password);
      if (validationPassword) {
        setMessageError(validationPassword);
        return;
      }
      const url = process.env.REACT_APP_MIDDLEWARE_URL_BASE + '/role/student/user/updatePassword';
      const access_token = Cookies.get('access_token');
      if (access_token) {
        setMessageWaiting(true);
        const config = {
          access_token,
          ...newItem
        };
        const response = await PUTRequest(url, config);
        OptionMessage(response);
      } else {
        setMessageError('No tienes una sesión');
      }
    } catch (error) {
      setMessageWaiting(false);
      setMessageError(`Error creating ${itemName}:` + error.message);
    }
  };
  const OptionMessage = async (data) => {
    setMessageWaiting(false);
    if (data.verificationMessage) {
      setMessageVerification(data.verificationMessage);
      closeModal();
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
      if (data.message.error.message !== undefined) {
        setMessageError(data.message.error.message);
        return
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
          message={'Cambio de Contraseña'}
          secondaryMessage={''}
          pText={getPasswordRequirementsText()}
          messageButton={'Cambiar Contraseña'}
          handleSubmit={handleUpdate}
          closeModal={closeModal}
          customPath={<CustomPath />}
        >
          <TextInput
            inputId='passwordUser'
            value={newItem.password}
            onChange={(e) => setNewItem({ ...newItem, password: e.target.value })}
            placeholder={`Ingresar Contraseña`}
          />
        </FormHeaderNotUpdate>
      </ModalCRUD>


      <CustomButton onClick={openModal} type="button"
        color="orange"
        padding_x='4'
        padding_smx='6'
        padding_mdx='8'
        padding_y='0'
        width='full'
        height='10'
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
          <CustomPath />
        </svg>
        Cambiar Contraseña
      </CustomButton>

    </div>
  );
};

export default PasswordCRUD;