import React from 'react';
import ProfileCRUD from '../../../components/crud/profile/profile';

const Profile = () => {
  const myUrls = [
    process.env.REACT_APP_MIDDLEWARE_URL_BASE + '/role/student/user/',
  ];
  return (
    <ProfileCRUD name={'Usuario'} urls={myUrls} title={`Bienvenido a gestion de usuarios`} subtitle={'CRUD de Usuarios'} />
  );
};

export default Profile;
