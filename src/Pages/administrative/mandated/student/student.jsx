import React from "react";
import StudentCRUD from "../../../../components/crud/user/studentCRUD";

export const Student = () => {
    const myUrls = [
        process.env.REACT_APP_MIDDLEWARE_URL_BASE + '/role/mandated/roleAssignment/user/',
        process.env.REACT_APP_MIDDLEWARE_URL_BASE + '/role/mandated/roleAssignment/roleHasUser/student',
        process.env.REACT_APP_MIDDLEWARE_URL_BASE + '/role/mandated/roleAssignment/importUsers/',
        '/Administrative/Mandated/Document/',
        '/Administrative/Mandated/HandleTitle/'
    ];


    return (
        <StudentCRUD name={'Estudiante'} urls={myUrls} title={`Bienvenido a Administración de Estudiantes`} subtitle={'Sistema Administrativo'} />
    )
}
