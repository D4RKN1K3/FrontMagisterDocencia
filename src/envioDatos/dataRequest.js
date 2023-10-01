import Cookies from "js-cookie";
import PasswordEncrypt from "../Encriptacion/UserEncrypt";

export function dataRequest(){

    const url = process.env.REACT_APP_MIDDLEWARE_URL_specialization
    const access_token = {access_token: Cookies.get('access_token')}

    const aux = PasswordEncrypt(access_token)
    // Configurar la solicitud
    let config = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${aux}`
        }
    }   


    fetch(url, config).then((response) => response.json()).then((data) => {
        
        console.log("entro", data)  
    }).catch(
        (error) => {return(console.error('Error al intentar ingresar', error.message))}
    )

    

}

export default dataRequest