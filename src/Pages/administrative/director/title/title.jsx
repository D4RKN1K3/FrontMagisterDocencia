import React from "react";
import TitleCRUD from "../../../../components/crud/handleTitle/titleCRUD";

export const Title = () => {
    const myUrls = [
        process.env.REACT_APP_MIDDLEWARE_URL_BASE + '/role/director/handleTitle/title/',
        process.env.REACT_APP_MIDDLEWARE_URL_BASE + '/role/director/handleTitle/title/type',
        process.env.REACT_APP_MIDDLEWARE_URL_BASE + '/role/director/handleTitle/title/university',
    ];


    return (
        <TitleCRUD name={'Título'} urls={myUrls} title={`Bienvenido a gestión de títulos`} subtitle={'CRUD de Títulos'} />
    )
}
