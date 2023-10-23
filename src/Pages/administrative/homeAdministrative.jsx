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

    return (
        <div>
            <HomeSection />
        </div>
    );
};
