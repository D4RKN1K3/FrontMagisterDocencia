import CryptoJS from 'crypto-js';
import { KJUR } from 'jsrsasign';

export function PasswordEncrypt(data) {
    

   
    const key = process.env.REACT_APP_KEY
    const secretKey = process.env.REACT_APP_SECRET_KEY
    
    //metodo de encriptacion
    const iv = CryptoJS.lib.WordArray.random(16);
    const encryptedData = CryptoJS.AES.encrypt(JSON.stringify(data), key, { iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 }).toString();

    //configuracion del payload
    const payload = { encryptedData: encryptedData.toString(), iv: iv.toString() };
    const options = {
        expiresIn: '1h',
        algorithm: 'RS256',
    };

    //firma digital
    const token = KJUR.jws.JWS.sign('RS256', JSON.stringify(options), JSON.stringify(payload), secretKey);
    
    //token completado
    return ( token )
};

export default PasswordEncrypt;