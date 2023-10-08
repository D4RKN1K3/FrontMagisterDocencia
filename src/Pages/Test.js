import './Login.css'
import React from "react";
import UserCRUD from '../components/crud/user/userCRUD';

function Test() {

    const myUrls = [
        process.env.REACT_APP_MIDDLEWARE_URL_BASE + '/role/director/roleAssignment/user/',
        process.env.REACT_APP_MIDDLEWARE_URL_BASE + '/role/director/roleAssignment/roleHasUser/rolesHasUser',
        process.env.REACT_APP_MIDDLEWARE_URL_BASE + '/role/director/roleAssignment/user/updatePassword',
        process.env.REACT_APP_MIDDLEWARE_URL_BASE + '/role/director/roleAssignment/roleHasUser/'
    ];


    return (
        <main>
            <UserCRUD name={'Usuario'} urls={myUrls} title={`Bienvenido a gestion de usuarios`} subtitle={'CRUD de Usuarios'} />
        </main>
    )
}

export default Test
