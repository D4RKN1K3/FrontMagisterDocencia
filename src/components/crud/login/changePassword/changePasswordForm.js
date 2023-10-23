import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

import ChangePasswordContainer from '../../../forms/body/ChangePasswordContainer'
import WaitingAlert from '../../../alert/waitingAlert';
import Alert from '../../../alert/alert';
import AlertVerification from '../../../alert/alertVerification';
import PasswordInput from '../../../input/passwordInput';
import { POSTRequest } from '../../../../utils/requestHelpers';
import { isPasswordValid } from '../../../../utils/validationUtils';

const ChangePasswordForm = () => {

    const [newItem, setNewItem] = useState({
        access_token: '',
        password: '',
    });
    const navigate = useNavigate();

    const [messageError, setMessageError] = useState(null);
    const [messageWaiting, setMessageWaiting] = useState(null);
    const [messageVerification, setMessageVerification] = useState(null);

    const handleChangePassword = async (event) => {
        event.preventDefault();
        const validationPassword = isPasswordValid(newItem.password);
        if (validationPassword) {
            setMessageError(validationPassword);
            return;
        }

        try {
            const url = process.env.REACT_APP_MIDDLEWARE_URL_BASE + '/auth/changePassword';
            if (newItem.access_token) {
                setMessageWaiting(true);
                const config = { ...newItem };
                const response = await POSTRequest(url, config);
                OptionMessage(response);
            } else {
                setMessageError('No tienes una sesión activa');
            }
        } catch (error) {
            setMessageError(`Error seaching password:` + error.message);
        }
    }

    const OptionMessage = async (data) => {
        setMessageWaiting(false);
        if (data.verificationMessage) {
            setMessageVerification(data.verificationMessage);
            navigate("/");
        }
        else if (data.message) {
            if (data.message.error.message !== undefined) {
                setMessageError(data.message.error.message);
                return
            }
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
                setMessageError(data.error.message);
            } else {
                setMessageError(data.error);
            }
        }
        else {
            setMessageError('Error Inesperado');
        }
    };

    const closeAlert = () => {
        setMessageError(null);
        setMessageVerification(null);
    }

    useEffect(() => {
        const hashParams = window.location.hash.substring(1).split('&');
        const params = {};

        hashParams.forEach(param => {
            const [key, value] = param.split('=');
            params[key] = value;
        });

        if (params.access_token && params.refresh_token) {
            setNewItem({ ...newItem, access_token: params.access_token });
        }
        else {
            navigate("/");
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            {messageWaiting && (<WaitingAlert />)}
            {messageError && (<Alert message={messageError} onClose={closeAlert} />)}
            {messageVerification && (<AlertVerification message={messageVerification} onClose={closeAlert} />)}
            <ChangePasswordContainer
                handleSubmit={handleChangePassword}
            >
                <PasswordInput
                    inputId='password'
                    value={newItem.password}
                    onChange={(e) => setNewItem({ ...newItem, password: e.target.value })}
                    placeholder={`Ingresar Contraseña`}
                />
            </ChangePasswordContainer>
        </>
    );
};

export default ChangePasswordForm;
