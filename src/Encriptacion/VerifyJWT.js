import { KJUR, b64utos } from 'jsrsasign';
import sessionDecode from '../Session/sessionDecode';

export function verifyToken(token){
    

    const publicKey = process.env.REACT_APP_PUBLIC_KEY

    const isValid = KJUR.jws.JWS.verify(token, publicKey, ['RS256']);


     if (isValid) {
        


        const parts = token.split('.');
        if (parts.length !== 3) {
            throw new Error('El token JWT no tiene el formato adecuado.');
        }

        //const header = JSON.parse(b64utos(parts[0]));
        const payload = JSON.parse(b64utos(parts[1]));
        
        sessionDecode(payload.session.encryptedData, payload.session.iv)
            
        return ('El token es válido.', payload);

    } else {
        return (console.log('El token no es válido.'));
    }   


};

export default verifyToken;