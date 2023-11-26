import React from "react";
import SemesterCRUD from "../../../../components/crud/semester/semesterCRUD";

export const Semester = () => {
    const myUrls = [
        process.env.REACT_APP_MIDDLEWARE_URL_BASE + '/role/director/semester',
    ];


    return (
        <SemesterCRUD name={'Semestre'} urls={myUrls} title={`Bienvenido a gestión de semestres`} subtitle={'CRUD de Semestres'} />
    )
}
