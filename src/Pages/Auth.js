import './Login.css'
import React, { useEffect } from "react";
import Loader from '../components/LoginGoogle';
import Cookies from 'js-cookie';

function Auth() {
  useEffect(() => {
    const hashParams = window.location.hash.substring(1).split('&');
    const params = {};

    hashParams.forEach(param => {
      const [key, value] = param.split('=');
      params[key] = value;
    });

    if (params.access_token && params.refresh_token) {
      Cookies.set('access_token', params.access_token);
      Cookies.set('refresh_token', params.refresh_token);
      window.location.href = '/';
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

export default Auth
