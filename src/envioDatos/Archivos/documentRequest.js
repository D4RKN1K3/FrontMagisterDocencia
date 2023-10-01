import Cookies from "js-cookie";
import PasswordEncrypt from "../../Encriptacion/UserEncrypt";

export function documentRequest(){

    const url = process.env.REACT_APP_MIDDLEWARE_URL_document
    const access_token = {access_token: Cookies.get('access_token')}

    const aux = PasswordEncrypt(access_token)
    // Configurar la solicitud
    let config = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${aux}`
        },
    }   


    fetch(url, config).then((response) => response.json()).then((data) => {
        
        return(console.log(data)) 
    }).catch(
        (error) => {return(console.error('Error al intentar ingresar', error.message))}
    )

    

}

export default documentRequest