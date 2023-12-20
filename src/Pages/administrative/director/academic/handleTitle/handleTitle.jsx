import React from "react";
import BodyAcademicCRUD from "../../../../../components/crud/handleTitle/bodyAcademicCRUD";

export const HandleTitleAcademic = () => {
    const myUrls = [
        process.env.REACT_APP_MIDDLEWARE_URL_BASE + '/role/director/handleTitle/bodyAcademic',
        process.env.REACT_APP_MIDDLEWARE_URL_BASE + '/role/director/handleTitle/bodyAcademic/title',
    ];

    return (
        <BodyAcademicCRUD name={'Titulación'} urls={myUrls} title={`Bienvenido a gestión de titulación`} subtitle={'CRUD de Titulación'} />
    )
}
