import Cookies from "js-cookie";

export function deleteSession(){
    console.log("entramos a borrar")
    Cookies.remove('access_token')
    Cookies.remove('refresh_token')

    return("Se ha finalizado la sesion")
}

export default deleteSession;