import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import '../../style/border.css'
import { verifyAuthAndRedirect } from "../../utils/sessionHelpers";
import { useNavigate } from "react-router-dom";

function Sections({ title, description, sections }) {
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
        <section className="bg-white text-orange-500">
            <div className="mx-auto max-w-screen-xl px-4 pb-2 sm:pb-4 sm:px-3 lg:pb-6 lg:px-2">
                <div className="mx-auto max-w-3xl text-center">
                    <h2 className="text-3xl font-bold sm:text-4xl">{title}</h2>
                    <p className="mt-4 text-gray-600">
                        {description}
                    </p>
                </div>
                <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {sections.map((section, index) => (
                        <Link
                            key={index}
                            to={section.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            id="borderimg2"
                            className="block rounded-xl border border-gray-400 p-8 shadow-sm hover:ring-1 hover:ring-gray-200 focus:outline-none focus:ring"
                        >
                            <div className="h-10 w-10 flex flex-row justify-center items-center w-full gap-1 md:gap-2">
                                {section.icon}
                                <h2 className="mt-4 text-xl font-bold text-gray-900">{section.title}</h2>
                            </div>
                            <p className="mt-1 text-sm text-gray-500">{section.description}</p>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Sections;
