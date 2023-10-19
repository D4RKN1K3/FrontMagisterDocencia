import "./Formulario.css"
import logo from '../img/logo-uta.png'
import { useState } from "react"
import { PasswordEncrypt } from "../Encriptacion/UserEncrypt"
import send from "../envioDatos/loginSend";
import { useNavigate } from "react-router-dom";



export function Formulario({setUser}) {
    
    const [usuario, setUsuario] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState(false) 

    const navigate = useNavigate();

    const handleSubmit = async (e) =>{
        e.preventDefault()

        if(usuario === "" || password === ""){
            setError(true)
            return
        }       

        setError(false)

        let data = {
            "email": usuario,
            "password" : password
        }
        
        send(PasswordEncrypt(data))  
        
        navigate("/Load")     
         
    }

    return(
        <>
        <div className="mx-auto max-w-screen-xl font-normal px-4 py-16 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-lg">
                <h1 className="text-center text-2xl font-bold text-4 sm:text-3xl">
                    Inicio de sesión
                </h1>

                <img 
                className="w-40 h-40 mx-auto my-3"
                src={logo} alt="Logo Uta" 
                />

                <form
                onSubmit={handleSubmit}
                className="mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8"
                >
                    <div>
                        <label htmlFor="email" className="sr-only">Email</label>

                        <div className="relative">
                            <input 
                                placeholder="Usuario" 
                                type="text" 
                                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm" 
                                value={usuario} onChange={e => setUsuario(e.target.value)} 
                            />        

                            <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                                <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-4 w-4 text-gray-400"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                                </svg>
                            </span>
                        </div>
                    </div>

                    <div>
                        <label htmlFor="password" className="sr-only">Password</label>

                        <div className="relative">
                            <input 
                                type="password" 
                                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm" 
                                value={password} onChange={e => setPassword(e.target.value)} 
                                placeholder="Ingrese Contraseña"
                            />

                            <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                                <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-4 w-4 text-gray-400"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                >
                                    <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                    </svg>
                                </span>
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="block w-full rounded-lg bg-4 px-5 py-3 text-sm font-medium text-white hover:bg-5"
                        >
                            Acceder
                        </button>

                        <p className="text-center text-sm text-gray-500">
                            Olvido su contraseña?   
                            <a className="underline hover:text-red-800" href="login"> Recuperar</a>
                        </p>
                    </form>
                    {error && 
                        <div role="alert" className="rounded border-s-4 border-red-500 bg-red-50 p-4">
                            <strong className="block font-medium text-red-800"> Datos Incorrectos </strong>
                        </div>
                        
                    }
                </div>
            </div>
        </>
    )
}