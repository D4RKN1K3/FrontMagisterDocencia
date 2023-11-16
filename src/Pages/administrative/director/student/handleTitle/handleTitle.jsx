import React from "react";
import RoleHasTitleCRUD from "../../../../../components/crud/handleTitle/roleHasTitleCRUD";

export const HandleTitle = () => {
    const myUrls = [
        process.env.REACT_APP_MIDDLEWARE_URL_BASE + '/role/director/handleTitle/roleHasTitle',
        process.env.REACT_APP_MIDDLEWARE_URL_BASE + '/role/director/handleTitle/roleHasTitle/title',
    ];


    return (
        <RoleHasTitleCRUD name={'Titulación'} urls={myUrls} title={`Bienvenido a gestión de titulación`} subtitle={'CRUD de Titulación'} />
    )
}
