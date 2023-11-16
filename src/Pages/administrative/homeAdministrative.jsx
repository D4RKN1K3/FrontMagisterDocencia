import React, { useEffect, useRef } from "react";
import HomeSection from "../../components/sections/homeSection";
import { verifyAuthAndRedirect } from "../../utils/sessionHelpers";
import { useNavigate } from "react-router-dom";

export const HomeAdministrative = () => {
    const isMounted = useRef(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (!isMounted.current) {
            isMounted.current = true;
            // Coloca el código que deseas ejecutar solo una vez aquí
            verifyAuthAndRedirect(navigate);
        }
    }, [navigate]);

    
const navigation = [
    {
      id: 1,
      label: 'Director',
      url: '/Administrative/Director',
      icon: (
        <img src="https://th.bing.com/th/id/OIP.OzbSWBUB5eg0bNdqnCw79gHaFX?pid=ImgDet&rs=1" alt="Director" />
      ),
      width: 'w-24',
    },
    {
      id: 2,
      label: 'Encargado',
      url: '/Administrative/Mandated',
      icon: (
        <img src="https://th.bing.com/th/id/OIP.cF3nqeGHWRTEZDyjp7UULQHaE8?pid=ImgDet&rs=1" alt="Encargado" />
      ),
      width: 'w-24',
    },
    {
      id: 3,
      label: 'Academico',
      url: '/Administrative/Academic',
      icon: (
        <img src="https://images.unsplash.com/photo-1533709475520-a0745bba78bf?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="Academico" />
      ),
      width: 'w-24',
    },
  ];

    return (
        <div>
            <HomeSection navigation={navigation} />
        </div>
    );
};
