import './Login.css'
import React, { useEffect } from "react";
import Loader from '../components/LoginGoogle';
import Cookies from 'js-cookie';

import { POSTRequest } from '../utils/requestHelpers';
import { verifyData, decryptData } from '../utils/securityUtils';

function AuthAdministrative() {

  const verifyAdministrative = async (access_token, refresh_token) => {
    try {
      const url = process.env.REACT_APP_MIDDLEWARE_URL_BASE + '/auth/verifyAdministrative' || '';

      const item = {
        access_token,
      };
      const response = await POSTRequest(url, item);
      if(response.token){
        const { encryptedData, iv } = verifyData(response.token);
        Cookies.set('access_token', decryptData(encryptedData, iv));
        Cookies.set('refresh_token', refresh_token);
      }

      window.location.href = '/';
    } catch (error) {
      console.error('Error de acceso denegado:', error.message);
      window.location.href = '/';
    }
  };

  useEffect(() => {
    const hashParams = window.location.hash.substring(1).split('&');
    const params = {};

    hashParams.forEach(param => {
      const [key, value] = param.split('=');
      params[key] = value;
    });

    if (params.access_token && params.refresh_token) {
      verifyAdministrative(params.access_token, params.refresh_token);

    } else {
      console.error('Error de acceso denegado:', params.error_description);
      window.location.href = '/';
    }
  }, []);

  return (
    <main>
      <Loader />
    </main>
  )
}

export default AuthAdministrative
