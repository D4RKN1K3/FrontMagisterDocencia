import verifyToken from "../Encriptacion/VerifyJWT";

export function send(data){

    const middlewareUrl =  process.env.REACT_APP_MIDDLEWARE_URL

    //Configuracion
    let config = {
        method: "POST",
        headers: {
          Authorization: `Bearer ${data}`
        }
    }
    //Se envia la informacion al middleware
    
        fetch(middlewareUrl, config).then((response) => response.json()).then((data) => {
            console.log("Funciono",verifyToken(data.token))
        }).catch(
            (error) => {return(console.error('Error al intentar ingresar', error.message))}
        )
    
};

export default send;