import "./Formulario.css"
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
        navigate("/");       
        

    
    }

    return(
        <section>
            <h1>Login</h1>

            <form className="formulario"
            onSubmit={handleSubmit}> 
                <input type="text" value={usuario} onChange={e => setUsuario(e.target.value)}/>
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
                <button>Iniciar Sesion</button>
            </form>
            {error && <p>Datos incorrectos</p>}
        </section>
    )
}