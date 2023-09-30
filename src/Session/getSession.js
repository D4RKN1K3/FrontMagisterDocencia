import Cookies from "js-cookie";
import { b64utos } from 'jsrsasign';



export function getSession(){
 
    if (document.cookie.indexOf('access_token') === -1) {
        console.log("sesion no existe")
        return(false)

    } else {

        const access_token = Cookies.get('access_token');
        //const refresh_token = Cookies.get('refresh_token');

        const parts = access_token.split('.');
        if (parts.length !== 3) {
            throw new Error('El token JWT no tiene el formato adecuado.');
        }

        const payload = JSON.parse(b64utos(parts[1]));
        if (payload.aud === 'authenticated'){

            const data = {
                aud : payload.aud,
                email: payload.email
            }
            return (data);
        }
           
        
      
    }         

  

}

export default getSession;