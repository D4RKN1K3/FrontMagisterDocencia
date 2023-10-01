
import './Login.css'
import React, { useEffect } from "react";
import Loader from '../components/LoginGoogle';
import { AuthStateSocial } from '../AuthGoogle/HandledataBase';


function Auth() {
 
  const instanciaAuthStateSocial = new AuthStateSocial();

  useEffect(() => {
    instanciaAuthStateSocial.checkSessionSocial();
  }, []);

  return (
    <main>
      <Loader/>
    </main>
  )
}

export default Auth
