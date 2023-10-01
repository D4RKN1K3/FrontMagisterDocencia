import { Formulario } from '../components/Formulario'
import { Home } from '../components/Home'
import { useState } from 'react'
import './Login.css'
import React, { useEffect } from "react";
import { getSession } from "../Session/getSession";
import { useNavigate } from "react-router-dom";


function LoginPage() {
  const [user, setUser] = useState([])

  const navigate = useNavigate();
  const sesion = getSession()

  
  useEffect(() => {
      if (sesion === false){
          navigate("/Login")
      }
      else{
          navigate("/")
      }
  }, [navigate, sesion]); 


  return (
    <div className='Login'>
      {
        !user.length > 0
        ?<Formulario setUser={setUser} />
        :<Home />
        
      }
     
    </div>
  )
}

export default LoginPage
