import './Login.css'
import React from "react";
import UserCRUD from '../components/crud/user/userCRUD';
import SidebarAdministrative from '../components/sidebard/administrative/sidebarAdministrative';
import Navbar from '../components/navbar/navbar';

function Test() {

    const myUrls = [
        process.env.REACT_APP_MIDDLEWARE_URL_BASE + '/role/director/roleAssignment/user/',
        process.env.REACT_APP_MIDDLEWARE_URL_BASE + '/role/director/roleAssignment/roleHasUser/rolesHasUser',
        process.env.REACT_APP_MIDDLEWARE_URL_BASE + '/role/director/roleAssignment/user/updatePassword',
        process.env.REACT_APP_MIDDLEWARE_URL_BASE + '/role/director/roleAssignment/roleHasUser/'
    ];


    return (
        <main>
            <SidebarAdministrative />
            <Navbar />
            <div className="ml-16 sm:ml-10">
                <div className="container mt-8">
                    <UserCRUD name={'Usuario'} urls={myUrls} title={`Bienvenido a gestion de usuarios`} subtitle={'CRUD de Usuarios'} />
                </div>
            </div>
        </main>
    )
}

export default Test;
