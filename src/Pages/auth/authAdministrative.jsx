import React, { useEffect, useRef } from "react";
import Loader from '../../components/loader/Loader';
import Cookies from 'js-cookie';
import { useNavigate } from "react-router-dom";

import { POSTRequest } from '../../utils/requestHelpers';
import { verifyData, decryptData } from '../../utils/securityUtils';

export const AuthAdministrative = () => {
  const navigate = useNavigate();
  const isMounted = useRef(false);

  const verifyAdministrative = async (access_token, refresh_token) => {
    try {
      const url = process.env.REACT_APP_MIDDLEWARE_URL_BASE + '/auth/verifyAdministrative' || '';

      const item = {
        access_token,
      };
      const response = await POSTRequest(url, item);
      if (response.token) {
        const { encryptedData, iv } = verifyData(response.token);
        Cookies.set('access_token', decryptData(encryptedData, iv));
        Cookies.set('refresh_token', refresh_token);
        navigate("/Administrative");
      } else {
        navigate("/");
      }
    } catch (error) {
      console.error('Error de acceso denegado:', error.message);
      navigate("/");
    }
  };

  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
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
        navigate("/");
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate]);

  return (
    <main>
      <Loader />
    </main>
  );
};
