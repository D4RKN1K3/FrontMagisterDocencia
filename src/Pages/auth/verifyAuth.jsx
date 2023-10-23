import React, { useEffect } from "react";
import Loader from '../../components/loader/Loader';
import Cookies from 'js-cookie';
import { useNavigate } from "react-router-dom";
import { getSession, deniedSession } from '../../utils/sessionHelpers';

import { POSTRequest } from '../../utils/requestHelpers';


export const VerifyAuth = () => {
  const navigate = useNavigate();

  const verifyAuth = async () => {
    try {
      const url = process.env.REACT_APP_MIDDLEWARE_URL_BASE + '/auth/verifyAdministrative';
      const access_token = Cookies.get('access_token');
      const item = {
        access_token,
      };
      const response = await POSTRequest(url, item);
      if (response.token) {
        navigate("/Administrative");
      }
      else if (response.errorDenied) {
        navigate("/Dashboard");
      }
      else {
        deniedSession(navigate);
      }
    } catch (error) {
      console.error('Error de acceso denegado:', error.message);
      deniedSession();
    }
  };

  useEffect(() => {
    if (navigate) {
      const sesion = getSession();

      if (sesion === false) {
        navigate("/");
      } else {
        verifyAuth();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main>
      <Loader />
    </main>
  )
};
