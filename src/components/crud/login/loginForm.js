import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from "react-router-dom";

import Alert from '../../alert/alert';
import AlertVerification from '../../alert/alertVerification';
import WaitingAlert from '../../alert/waitingAlert';

import { POSTRequest, } from '../../../utils/requestHelpers';
import { getSession, deniedSession } from '../../../utils/sessionHelpers';
import { verifyData, decryptData } from '../../../utils/securityUtils';
import { isPasswordValid } from '../../../utils/validationUtils';
import LoginContainer from '../../forms/body/loginContainer';
import TextInput from '../../input/textInput';
import PasswordInput from '../../input/passwordInput';

const LoginForm = () => {

  const itemName = 'Usuario'
  const [newItem, setNewItem] = useState({
    email: '',
    password: '',
  });
  const navigate = useNavigate();

  const verifyAdministrative = () => {
    if (!isAdminAccess) {
      return process.env.REACT_APP_MIDDLEWARE_URL_BASE + '/auth/signinWithEmail';
    }
    return process.env.REACT_APP_MIDDLEWARE_URL_BASE + '/auth/administrative/signinWithEmail';
  }

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const validationPassword = isPasswordValid(newItem.password);
      if (validationPassword) {
        setMessageError(validationPassword);
        return;
      }
      const url = verifyAdministrative();
      const access_token = Cookies.get('access_token');
      if (!access_token) {
        setMessageWaiting(true);
        const config = { ...newItem };
        const response = await POSTRequest(url, config);
        OptionMessage(response);
      } else {
        setMessageError('Ya tienes una sesión activa. Cierra la sesión actual para continuar');
      }
    } catch (error) {
      setMessageError(`Error seaching ${itemName}:` + error.message);
    }
  };

  const handleRecoverPassword = async () => {
    if (newItem.email) {
      try {
        const url = process.env.REACT_APP_MIDDLEWARE_URL_BASE + '/auth/recoverPassword';
        const access_token = Cookies.get('access_token');
        if (!access_token) {
          setMessageWaiting(true);
          const config = { email: newItem.email };
          const response = await POSTRequest(url, config);
          OptionMessage(response);
        } else {
          setMessageError('Ya tienes una sesión activa. Cierra la sesión actual para continuar');
        }
      } catch (error) {
        setMessageError(`Error seaching password:` + error.message);
      }
    }
    else {
      setMessageError('Por favor, ingrese su dirección de correo electrónico');
    }
  }

  const OptionMessage = async (data) => {
    setMessageWaiting(false);
    if (data.verificationMessage) {
      setMessageVerification(data.verificationMessage);
    }
    else if (data.errorDenied) {
      setMessageError(data.errorDenied);
      deniedSession(navigate);
    }
    else if (data.message) {
      setMessageError(data.message);
    }
    else if (data.errors) {
      const errorList = data.errors.map((error, index) => (`${index + 1}. ${error.msg}`)).join('<br/>');

      const formattedErrorList = { __html: errorList };

      setMessageError(
        <div>
          <p>Se encontraron los siguientes errores:</p>
          <div dangerouslySetInnerHTML={formattedErrorList} />
        </div>
      );

    }
    else if (data.error) {
      if (Object.keys(data.error).length === 0) {
        setMessageError('Error desconocido');
      } else if (data.error.message) {
        setMessageError(data.error.message !== undefined);
      } else {
        setMessageError(data.error);
      }
    }
    else if (data) {
      if (data.token) {
        setMessageVerification("Ha iniciado sesión con éxito. Bienvenido");
        const { encryptedData, iv } = verifyData(data.token);
        const session = decryptData(encryptedData, iv);
        Cookies.set('access_token', session.access_token);
        Cookies.set('refresh_token', session.refresh_token);
        if (isAdminAccess) {
          navigate("/Administrative");
        }
        else {
          navigate("/Dashboard");
        }
      }
      setMessageError("Ha ocurrido un error al intentar iniciar sesión. Por favor, verifica tus credenciales e inténtalo de nuevo");
    }
    else {
      setMessageError('Error Inesperado');
    }
  };

  useEffect(() => {
    if (navigate) {
      const sesion = getSession();

      if (sesion === false) {
        navigate("/");
      } else {
        navigate("/VerifyAuth");
      }
    }
  }, [navigate]);

  // -------------------------------Funciones de Extra-------------------------------
  const [isAdminAccess, setIsAdminAccess] = useState(false);

  const handleAdminAccessToggle = () => {
    setIsAdminAccess(!isAdminAccess);
  };

  const [messageError, setMessageError] = useState(null);
  const [messageVerification, setMessageVerification] = useState(null);
  const [messageWaiting, setMessageWaiting] = useState(null);

  const closeAlert = () => {
    setMessageError(null);
    setMessageVerification(null);
  }

  return (
    <div>
      {messageWaiting && <WaitingAlert />}
      {messageError && <Alert message={messageError} onClose={closeAlert} />}
      {messageVerification && (<AlertVerification message={messageVerification} onClose={closeAlert} />)}

      <LoginContainer
        handleSubmit={handleLogin}
        isAdminAccess={isAdminAccess}
      >
        <TextInput
          inputId='email'
          value={newItem.email}
          onChange={(e) => setNewItem({ ...newItem, email: e.target.value })}
          placeholder={`Ingresar Email`}
        />
        <PasswordInput
          inputId='password'
          value={newItem.password}
          onChange={(e) => setNewItem({ ...newItem, password: e.target.value })}
          placeholder={`Ingresar Contraseña`}
        />

        <div className="flex items-center justify-center">
          <input
            id="adminAccess"
            name="adminAccess"
            type="checkbox"
            checked={isAdminAccess}
            onChange={handleAdminAccessToggle}
            className="form-checkbox h-5 w-5 rounded border-orange-300 text-orange-500 transition duration-150 ease-in-out"
          />
          <label htmlFor="adminAccess" className="ml-2 text-center text-sm sm:text-md text-gray-600">Acceso a Sistema Administrativo</label>
        </div>

        <p className="text-center text-sm sm:text-md text-gray-500">
          <button
            type="button"
            onClick={handleRecoverPassword}
            className="hover:font-semibold hover:text-orange-500"
          >
            ¿Olvidaste tu contraseña?
          </button>
        </p>

      </LoginContainer>
    </div>
  );
};

export default LoginForm;