import Cookies from 'js-cookie';
import { POSTRequest } from './requestHelpers';
import { verifyData, decryptData } from './securityUtils';

export const renewSession = async () => {
    try {
        const url = process.env.REACT_APP_MIDDLEWARE_URL_BASE + '/auth/refreshToken' || '';

        const refresh_token = Cookies.get('refresh_token');

        const item = {
            refresh_token,
        };
        const response = await POSTRequest(url, item);

        if (response.token) {
            const { encryptedData, iv } = verifyData(response.token);
            const { session } = decryptData(encryptedData, iv);
            Cookies.set('access_token', session.access_token);
            Cookies.set('refresh_token', session.refresh_token);

            return {
                verificationMessage: "La sesión ha sido renovada.",
            }
        }

        if (response.verificationMessage) {
            return {
                error: `Error durante el proceso de renovación: ${response.verificationMessage}, intente iniciar sesion nuevamente.`
            }
        }

        return {
            error: "Error durante el proceso de renovación. Por favor, intente nuevamente más tarde."
        }
    } catch (error) {
        console.error('Acceso denegado al renovar la sesión:', error.message);
        return {
            error: "Error al renovar la sesión. Por favor, intente nuevamente más tarde."
        }
    }
};
