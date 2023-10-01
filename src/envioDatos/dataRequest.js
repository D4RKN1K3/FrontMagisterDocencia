import Cookies from "js-cookie";
import PasswordEncrypt from "../Encriptacion/UserEncrypt";

export function dataRequest(){

    const url = process.env.REACT_APP_MIDDLEWARE_URL_userdata;
    const access_token = { access_token: Cookies.get('access_token') };
    const aux = PasswordEncrypt(access_token);
  
  
    let config = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${aux}`
      },
    };
  
   
    return fetch(url, config)
      .then((response) => {
        if (!response.ok) {
          throw new Error('La solicitud no se completó correctamente');
        }
        return response.json();
      })
      .catch((error) => {
        console.error('Error al intentar ingresar', error.message);
        throw error; 
      });
  }
    



export default dataRequest