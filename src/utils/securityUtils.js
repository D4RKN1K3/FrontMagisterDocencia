import CryptoJS from 'crypto-js';
import { KJUR, b64utos } from 'jsrsasign';

export function encryptData(data) {
    const key = process.env.REACT_APP_KEY
    const iv = CryptoJS.lib.WordArray.random(16);
    const encryptedData = CryptoJS.AES.encrypt(JSON.stringify(data), key, { iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 }).toString();
    return { encryptedData: encryptedData.toString(), iv: iv.toString() };
}

export function decryptData(encryptedData, iv) {
    const key = process.env.REACT_APP_KEY
    const bytes = CryptoJS.AES.decrypt(encryptedData, key, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
    const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
    return JSON.parse(decryptedData);
}

export function signData(payload) {
    const secretKey = process.env.REACT_APP_SECRET_KEY
    const options = {
        expiresIn: '1h',
        algorithm: 'RS256',
    };
    const token = KJUR.jws.JWS.sign('RS256', JSON.stringify(options), JSON.stringify(payload), secretKey);
    return token;
}

export function verifyData(token) {
    const publicKey = process.env.REACT_APP_PUBLIC_KEY
    const isValid = KJUR.jws.JWS.verify(token, publicKey, ['RS256']);
    if (isValid) {
        const parts = token.split('.');
        if (parts.length !== 3) {
            return null;
        }

        const payload = JSON.parse(b64utos(parts[1]));

        return payload.data;
    } else {
        return null;
    }
}