import { fetchHelpers } from "./fetchHelpers";
import { encryptData, signData } from "./securityUtils";

// Función genérica para realizar una solicitud POST
export const GETRequest = async (url, item) => {
    const { encryptedData, iv } = encryptData(item);

    const payload = {
        encryptedData,
        iv,
    };
    const token = signData(payload);
    const config = {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    const response = await fetchHelpers(url, config);
    return response;
};

// Función genérica para realizar una solicitud POST
export const POSTRequest = async (url, newItem) => {

    const { encryptedData, iv } = encryptData(newItem);

    const payload = {
        encryptedData,
        iv,
    };
    const token = signData(payload);

    const config = {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const response = await fetchHelpers(url, config);
    return response;
};

// Función generica para subir Archivos 
export const POSTFileRequest = async (url, newItem, file) => {
    const formData = new FormData();
    formData.append('file', file);
    const { encryptedData, iv } = encryptData(newItem);

    const payload = {
        encryptedData,
        iv,
    };
    const token = signData(payload);
    const config = {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`,
        },
        body: formData,
    };
    const response = await fetchHelpers(url, config);
    return response;
};

// Función genérica para realizar una solicitud PUT
export const PUTRequest = async (url, newItem) => {
    const { encryptedData, iv } = encryptData(newItem);

    const payload = {
        encryptedData,
        iv,
    };
    const token = signData(payload);

    const config = {
        method: 'PUT',
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const response = await fetchHelpers(url, config);
    return response;
};

export const DELETERequest = async (url, item) => {
    const { encryptedData, iv } = encryptData(item);

    const payload = {
        encryptedData,
        iv,
    };
    const token = signData(payload);

    const config = {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }

    const response = await fetchHelpers(url, config);
    return response;
}