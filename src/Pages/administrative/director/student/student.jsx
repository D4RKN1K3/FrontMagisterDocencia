import React from "react";
import StudentCRUD from "../../../../components/crud/user/studentCRUD";

export const Student = () => {
    const myUrls = [
        process.env.REACT_APP_MIDDLEWARE_URL_BASE + '/role/director/roleAssignment/user/',
        process.env.REACT_APP_MIDDLEWARE_URL_BASE + '/role/director/roleAssignment/roleHasUser/student',
        process.env.REACT_APP_MIDDLEWARE_URL_BASE + '/role/director/roleAssignment/importUsers/',
        '/Administrative/Director/Document/',
        '/Administrative/Director/HandleTitle/'
    ];


    return (
        <StudentCRUD name={'Estudiante'} urls={myUrls} title={`Bienvenido a Administración de Estudiantes`} subtitle={'Sistema Administrativo'} />
    )
}
