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
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 opacity-75"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z" />
        </svg>
      ),
      width: 'w-24',
    },
    {
      id: 2,
      label: 'Encargado',
      url: '/Administrative/Mandated',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 opacity-75"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path d="M18 10.5V6l-2.11 1.06A3.999 3.999 0 0112 12a3.999 3.999 0 01-3.89-4.94L5 5.5 12 2l7 3.5v5h-1M12 9l-2-1c0 1.1.9 2 2 2s2-.9 2-2l-2 1m2.75-3.58L12.16 4.1 9.47 5.47l2.6 1.32 2.68-1.37M12 13c2.67 0 8 1.33 8 4v3H4v-3c0-2.67 5.33-4 8-4m0 1.9c-3 0-6.1 1.46-6.1 2.1v1.1h12.2V17c0-.64-3.13-2.1-6.1-2.1z" />
        </svg>
      ),
      width: 'w-24',
    },
    {
      id: 3,
      label: 'Academico',
      url: '/Administrative/Academic',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 opacity-75"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
        </svg>
      ),
      width: 'w-24',
      Image: (
        <img src="https://images.unsplash.com/photo-1527529482837-4698179dc6ce?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80" alt="" />
      ),
    },
  ];

    return (
        <div>
            <HomeSection navigation={navigation} />
        </div>
    );
};
