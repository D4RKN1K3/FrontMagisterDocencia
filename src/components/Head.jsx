import foto from '../img/whipala.png'
import logo from '../img/logo-uta2.png'
import React, { useEffect } from "react";
import { getSession } from "../Session/getSession";
import { Outlet, useNavigate } from "react-router-dom";
import deleteSession from '../Session/deleteSession';


export const Head = () => {

  const navigate = useNavigate();
  const sesion = getSession()


    useEffect(() => {  
            
      if (sesion === false){
            navigate("/Login")
        }
    }, [navigate, sesion]); 

    const handleLogoutClick = () => {
      deleteSession()
      navigate("/Login")
    };
    const handleEdit = () => {
      
      navigate("/Info")
    };



  return (
    <>
    <header className="bg-3 font-normal">
      <div class="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div class="flex h-16 items-center justify-between">
          <div class="md:flex md:items-center md:gap-12">
            <a class="block text-teal-600" href="/">
            </a>
          </div>
    
          <div class="hidden md:block">
            <nav aria-label="Global">
              <ul class="flex items-center gap-6 text-sm">
                <li>
                  <img 
                  className="w-18 h-14 mx-auto my-3"
                  src={logo} alt="Logo Uta" 
                  />
                </li>
                <li>
                  <a
                    class="transition font-bold hover:text-4 hover:text-lg"
                    href="/"
                  >
                    Inicio
                  </a>
                </li>
    
                <li>
                  <a
                    class=" transition font-bold hover:text-4 hover:text-lg"
                    href="/"
                  >
                    Seccion 2
                  </a>
                </li>
    
                <li>
                  <a
                    class=" transition font-bold hover:text-4 hover:text-lg"
                    href="/"
                  >
                    Seccion 3
                  </a>
                </li>
    
                <li>
                  <a
                    class=" transition font-bold hover:text-4 hover:text-lg"
                    href="/"
                  >
                    Seccion 4
                  </a>
                </li>
    
                <li>
                  <a
                    class=" transition font-bold hover:text-4 hover:text-lg"
                    href="/"
                  >
                    Seccion 5
                  </a>
                </li>
    
                <li>
                  <a
                    class="transition font-bold hover:text-4 hover:text-lg"
                    href="/Docs"
                  >
                    Documentos
                  </a>
                </li>
                <li>
                  <div class="sm:flex sm:gap-4">
                    <button
                    onClick={handleEdit} 
                    className="inline-block rounded border sm: border-slate-900 bg-4 px-12 py-3 text-sm font-medium text-white hover:bg-1  focus:outline-none focus:ring active:text-indigo-500">
                        {sesion.nombre}
                    </button>
                  </div>                  
                </li>
                <li>
                  <div class="sm:flex sm:gap-4">
                    <button
                    onClick={handleLogoutClick} 
                    className="inline-block rounded border border-indigo-600 bg-4 px-12 py-3 text-sm font-medium text-white hover:bg-1  focus:outline-none focus:ring active:text-indigo-500">
                        Cerrar sesion
                    </button>
                  </div>      
                </li>
              </ul>
            </nav>
          </div>

          <div class="flex items-center gap-4">
            <div class="block md:hidden">
              <button 
                class="rounded bg-gray-100 p-2 text-gray-600 transition hover:text-gray-600/75"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="hidden md:block border-t border-gray-200 sr-only">
        <img src={foto} alt="whipala" />     
      </div>
      <div className="h-3" style={{backgroundImage: `url(${foto})`}}> 
      </div>
    </header>
    <body>
    <Outlet></Outlet>
    </body>
    </>
  
  )
}
