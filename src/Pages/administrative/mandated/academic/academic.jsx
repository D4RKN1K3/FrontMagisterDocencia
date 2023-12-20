import React from "react";
import AcademicCRUD from "../../../../components/crud/user/academicCRUD";

export const Academic = () => {
    const myUrls = [
        process.env.REACT_APP_MIDDLEWARE_URL_BASE + '/role/mandated/roleAssignment/user/',
        process.env.REACT_APP_MIDDLEWARE_URL_BASE + '/role/mandated/roleAssignment/roleHasUser/academic',
        '/Administrative/Mandated/HandleTitleAcademic/'
    ];


    return (
        <AcademicCRUD name={'Académico'} urls={myUrls} title={`Bienvenido a Administración de Académicos`} subtitle={'Sistema Administrativo'} />
    )
}
