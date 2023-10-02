import React, { useEffect } from "react";
import { getSession } from "../Session/getSession";
import { useNavigate } from "react-router-dom";
import Loader from "../components/LoginGoogle";

export const Load = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkSessionAndRedirect = () => {
      const sesion = getSession();

      if (sesion === false) {
        navigate("/Login");
      } else {
        navigate("/");
      }
    };

   
    const intervalId = setInterval(checkSessionAndRedirect, 5000);

    
    return () => {
      clearInterval(intervalId);
    };
  }, [navigate]);

  return <main><Loader/></main>
};
