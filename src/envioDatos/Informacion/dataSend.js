import Cookies from "js-cookie";
import PasswordEncrypt from "../../Encriptacion/UserEncrypt";

export function dataSend(editedData) {
    const filteredData = Object.fromEntries(
        Object.entries(editedData).filter(([key, value]) => value !== '')
      );
      console.log(filteredData)

    const url = process.env.REACT_APP_MIDDLEWARE_URL_userdata
    filteredData.access_token = Cookies.get('access_token');
    const aux = PasswordEncrypt(filteredData);
    // Configurar la solicitud
    let config = {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${aux}`
        }
    }   


    fetch(url, config).then((response) => response.json()).then((data) => {
        return(console.log(data))
         
    }).catch(
        (error) => {return(console.error('Error al intentar ingresar', error.message))}
    )

    

}
  export default dataSend;
  