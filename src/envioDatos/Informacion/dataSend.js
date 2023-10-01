import Cookies from "js-cookie";
import PasswordEncrypt from "../../Encriptacion/UserEncrypt";

export function dataSend(editedData) {
    const filteredData = Object.fromEntries(
      Object.entries(editedData).filter(([key, value]) => value !== '')
    );
  
    const url = process.env.REACT_APP_MIDDLEWARE_URL_userdata;
    filteredData.access_token = Cookies.get('access_token');
    const aux = PasswordEncrypt(filteredData);
  
    // Configurar la solicitud
    let config = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${aux}`
      },
      body: JSON.stringify(filteredData) // Enviar filteredData como JSON
    };
  
    fetch(url, config)
      .then((response) => response.json())
      .then((data) => {
        console.log("entro", data);
      })
      .catch((error) => {
        console.error('Error al intentar ingresar', error.message);
        // Agrega el registro de la respuesta completa del servidor
        console.log('Respuesta completa del servidor:', error.response);
      });
  }
  
  export default dataSend;
  