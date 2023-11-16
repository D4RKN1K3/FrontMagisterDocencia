import React from "react";
import DocumentCRUD from "../../../../../components/crud/document/documentCRUD";

export const Document = () => {
    const myUrls = [
        process.env.REACT_APP_MIDDLEWARE_URL_BASE + '/role/mandated/document/',
        process.env.REACT_APP_MIDDLEWARE_URL_BASE + '/role/mandated/document/documents',
    ];


    return (
        <DocumentCRUD name={'Documento'} urls={myUrls} title={`Bienvenido a gestión de documentos`} subtitle={'CRUD de Documentos'} />
    )
}
