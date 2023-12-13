import React from "react";
import UserHasTitleCRUD from "../../../../../components/crud/handleTitle/userHasTitleCRUD";

export const HandleTitle = () => {
    const myUrls = [
        process.env.REACT_APP_MIDDLEWARE_URL_BASE + '/role/mandated/handleTitle/userHasTitle',
        process.env.REACT_APP_MIDDLEWARE_URL_BASE + '/role/mandated/handleTitle/userHasTitle/title',
    ];


    return (
        <UserHasTitleCRUD name={'Titulación'} urls={myUrls} title={`Bienvenido a gestión de titulación`} subtitle={'CRUD de Titulación'} />
    )
}
