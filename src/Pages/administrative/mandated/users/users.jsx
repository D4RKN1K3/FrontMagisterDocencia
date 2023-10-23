import React from "react";
import UserCRUD from '../../../../components/crud/user/userCRUD';

export const Users = () => {
    const myUrls = [
        process.env.REACT_APP_MIDDLEWARE_URL_BASE + '/role/mandated/roleAssignment/user/',
        process.env.REACT_APP_MIDDLEWARE_URL_BASE + '/role/mandated/roleAssignment/roleHasUser/rolesHasUser',
        process.env.REACT_APP_MIDDLEWARE_URL_BASE + '/role/mandated/roleAssignment/user/updatePassword',
        process.env.REACT_APP_MIDDLEWARE_URL_BASE + '/role/mandated/roleAssignment/roleHasUser/'
    ];


    return (
        <UserCRUD name={'Usuario'} urls={myUrls} title={`Bienvenido a gestion de usuarios`} subtitle={'CRUD de Usuarios'} />
    )
}
