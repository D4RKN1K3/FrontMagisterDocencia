import React, { useEffect } from "react";
import { getSession } from "../Session/getSession";
import { useNavigate } from "react-router-dom";
import './home.css'

export const Home = () => {
    const navigate = useNavigate();
    const sesion = getSession()

    useEffect(() => {  
        
        if (sesion === false){
            navigate("/Login")
        }
    }, [navigate, sesion]); 

    return (
        <>
        <div class="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
            <div class="mx-auto max-w-lg text-center">
                <h1 class="text-2xl font-bold font-normal sm:text-3xl">Ingrese datos del alumno</h1>
            </div>

            <form action="" class="mx-auto mb-0 mt-8 max-w-md space-y-4" id="borderimg1">
                <div>
                    <label class="sr-only" for="name">Name</label>
                    <input
                        class="w-full rounded-lg border-gray-200 p-3 text-sm"
                        placeholder="Nombre Completo"
                        type="text"
                        id="name" />
                </div>

                <div>
                    <label class="sr-only" for="name">Rut</label>
                    <input
                        class="w-full rounded-lg border-gray-200 p-3 text-sm"
                        placeholder="Rut"
                        type="text"
                        id="rut" />
                </div>

                <div>
                    <label class="sr-only" for="name">Sexo</label>
                    <input
                        class="w-full rounded-lg border-gray-200 p-3 text-sm"
                        placeholder="Sexo"
                        type="text"
                        id="sexo" />
                </div>

                <div>
                    <label class="sr-only" for="name">Estado Civil</label>
                    <input
                        class="w-full rounded-lg border-gray-200 p-3 text-sm"
                        placeholder="Estado Civil"
                        type="text"
                        id="estado" />
                </div>

                <div>
                    <label class="sr-only" for="name">Fecha de nacimiento</label>
                    <input
                        class="w-full rounded-lg border-gray-200 p-3 text-sm"
                        placeholder="Fecha de nacimiento"
                        type="text"
                        id="fecha" />
                </div>

                <div>
                    <label class="sr-only" for="name">Direccion</label>
                    <input
                        class="w-full rounded-lg border-gray-200 p-3 text-sm"
                        placeholder="Dirección"
                        type="text"
                        id="direccion" />
                </div>

                <div>
                    <label class="sr-only" for="name">Correo</label>
                    <input
                        class="w-full rounded-lg border-gray-200 p-3 text-sm"
                        placeholder="Correo Electronico"
                        type="email"
                        id="correo" />
                </div>

                <div>
                    <label class="sr-only" for="name">Fono</label>
                    <input
                        class="w-full rounded-lg border-gray-200 p-3 text-sm"
                        placeholder="Fono"
                        type="text"
                        id="fono" />
                </div>

                <div>
                    <label class="sr-only" for="name">Titulo</label>
                    <input
                        class="w-full rounded-lg border-gray-200 p-3 text-sm"
                        placeholder="Título"
                        type="text"
                        id="titulo" />
                </div>

                <div>
                    <label class="sr-only" for="name">Grado</label>
                    <input
                        class="w-full rounded-lg border-gray-200 p-3 text-sm"
                        placeholder="Grado"
                        type="text"
                        id="grado" />
                </div>

                <div>
                    <label class="sr-only" for="name">Postrado</label>
                    <input
                        class="w-full rounded-lg border-gray-200 p-3 text-sm"
                        placeholder="Postrado"
                        type="text"
                        id="postgrado" />
                </div>

                <div>
                    <label class="sr-only" for="name">Procedencia</label>
                    <input
                        class="w-full rounded-lg border-gray-200 p-3 text-sm"
                        placeholder="Universidad de procedencia"
                        type="text"
                        id="procedencia" />
                </div>
                
            </form>
        </div></>
    );
}
