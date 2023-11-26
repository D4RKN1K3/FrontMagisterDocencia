
import React from "react";
import AcademicCRUD from "../../../../components/crud/user/academicCRUD";

export const Academic = () => {
    const myUrls = [
        process.env.REACT_APP_MIDDLEWARE_URL_BASE + '/role/director/roleAssignment/user/',
        process.env.REACT_APP_MIDDLEWARE_URL_BASE + '/role/director/roleAssignment/roleHasUser/academic',
    ];


    return (
        <AcademicCRUD name={'Académico'} urls={myUrls} title={`Bienvenido a gestión de académicos`} subtitle={'CRUD de Académicos'} />
    )
}