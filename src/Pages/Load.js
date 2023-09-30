import React, { useEffect } from "react";
import { getSession } from "../Session/getSession";
import { useNavigate } from "react-router-dom";

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

   
    const intervalId = setInterval(checkSessionAndRedirect, 3000);

    
    return () => {
      clearInterval(intervalId);
    };
  }, [navigate]);

  return <h1>Cargando</h1>;
};
