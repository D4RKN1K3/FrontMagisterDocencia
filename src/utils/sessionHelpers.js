import Cookies from 'js-cookie';
import { POSTRequest } from './requestHelpers';
import { verifyData, decryptData } from './securityUtils';
import { b64utos } from 'jsrsasign';

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

export const getSession = () => {
    const accessTokenCookie = Cookies.get('access_token');

    if (!accessTokenCookie) {
        return false;
    }

    const parts = accessTokenCookie.split('.');

    if (parts.length !== 3) {
        return false;
    }

    const payload = JSON.parse(b64utos(parts[1]));

    if (payload.aud === 'authenticated') {
        const userData = {
            aud: payload.aud,
            email: payload.email,
            nombre: payload.user_metadata.name,
        };

        return userData;
    }

    return false;
}

export const deleteSession = () => {
    Cookies.remove('access_token')
    Cookies.remove('refresh_token')
}

export const deniedSession = (navigate) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    deleteSession();
    navigate("/");
}

export const verifyAuthAndRedirect = async (navigate) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const sesion = getSession();
    if (sesion === false) {
        navigate("/");
    } else {
        try {
            const url = process.env.REACT_APP_MIDDLEWARE_URL_BASE + "/auth/verifyAdministrative";
            const access_token = Cookies.get("access_token"); // Asegúrate de que Cookies esté importado
            const item = {
                access_token,
            };
            const response = await POSTRequest(url, item);
            if (response.errorDenied) {
                deniedSession(navigate);
            }
        } catch (error) {
            console.error("Error de acceso denegado:", error.message);
            deniedSession();
        }
    }
};