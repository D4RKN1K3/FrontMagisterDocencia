import React, { useState } from 'react';
import CustomButton from '../../../button/customButton';
import WaitingAlert from '../../../alert/waitingAlert';
import Alert from '../../../alert/alert';
import AlertVerification from '../../../alert/alertVerification';
import { GETRequest } from '../../../../utils/requestHelpers';
import { verifyData } from '../../../../utils/securityUtils';

const SocialButton = ({ isAdminAccess }) => {

    const [messageError, setMessageError] = useState(null);
    const [messageWaiting, setMessageWaiting] = useState(null);
    const [messageVerification, setMessageVerification] = useState(null);

    const verifyAdministrative = () => {
        if (!isAdminAccess) {
            return process.env.REACT_APP_MIDDLEWARE_URL_BASE + '/auth/signinWithGoogle';
        }
        return process.env.REACT_APP_MIDDLEWARE_URL_BASE + '/auth/administrative/signinWithGoogle';
    }

    const signInWithGoogle = async () => {
        try {
            const url = verifyAdministrative();
            setMessageWaiting(true);
            const config = {
            };

            const response = await GETRequest(url, config);
            OptionMessage(response);
        } catch (error) {
            setMessageWaiting(false);
            setMessageError(`Error seaching Usuario:` + error.message);
        }
    };

    const OptionMessage = async (data) => {
        setMessageWaiting(false);
        if (data.message) {
            if (data.message.error.message) {
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
            if (data.error.message) {
                setMessageError(data.error.message);
                return
            }
            setMessageError(data.error);
        }
        else if (data) {
            setMessageVerification("Redirigiendo para iniciar sesión con tu correo institucional...");
            const { url } = verifyData(data.token);
            window.location.replace(url);
        }
        else {
            setMessageError('Error Inesperado');
        }
    };

    const closeAlert = () => {
        setMessageError(null);
        setMessageVerification(null);
    }

    return (
        <>
            {messageWaiting && (<WaitingAlert />)}
            {messageError && (<Alert message={messageError} onClose={closeAlert} />)}
            {messageVerification && (<AlertVerification message={messageVerification} onClose={closeAlert} />)}
            <div className="flex w-full items-center justify-center gap-1 sm:gap-2">
                <CustomButton
                    onClick={() => signInWithGoogle()}
                    type="button"
                    color="orange"
                    padding_x="0"
                    padding_smx="0"
                    padding_mdx="0"
                    padding_y="2.5"
                    width="full"
                    height="10"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Ingresar con tu Correo Institucional
                </CustomButton>
            </div>
        </>
    );
};

export default SocialButton;
