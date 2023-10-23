import React, { useEffect, useRef } from "react";
import Loader from '../../components/loader/Loader';
import Cookies from 'js-cookie';
import { useNavigate } from "react-router-dom";

export const Auth = () => {
  const navigate = useNavigate();
  const isMounted = useRef(false);

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
        Cookies.set('access_token', params.access_token);
        Cookies.set('refresh_token', params.refresh_token);
        navigate("/Dashboard");
      } else {
        console.error('Error de acceso denegado:', params.error_description);
        navigate("/");
      }
    }
  }, [navigate]);

  return (
    <main>
      <Loader />
    </main>
  )
};
