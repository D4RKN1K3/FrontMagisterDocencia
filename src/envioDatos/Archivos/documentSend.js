import Cookies from "js-cookie";
import PasswordEncrypt from "../../Encriptacion/UserEncrypt";

export function documentSend(document){

    const url = process.env.REACT_APP_MIDDLEWARE_URL_document
    const access_token = {access_token: Cookies.get('access_token')}

    const aux = PasswordEncrypt(access_token)
    console.log(document.file)
    // Configurar la solicitud
    let config = {
        method: "POST",
        headers: {
          Authorization: `Bearer ${aux}`
        },
        body: document
    }   


    fetch(url, config).then((response) => response.json()).then((data) => {
        
        console.log("entro", data)  
    }).catch(
        (error) => {return(console.error('Error al intentar ingresar', error.message))}
    )

    

}

export default documentSend