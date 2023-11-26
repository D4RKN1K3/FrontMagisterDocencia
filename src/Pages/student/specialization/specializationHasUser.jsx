import React from 'react';
import SpecializationHasUserCRUD from '../../../components/crud/specializationHasUser/student/specializationHasUserCRUD';

export const SpecializationHasUser = () => {
  const myUrls = [
    process.env.REACT_APP_MIDDLEWARE_URL_BASE + '/role/student/specialization/specializationHasUser/',
    process.env.REACT_APP_MIDDLEWARE_URL_BASE + '/role/student/specialization/specializationHasUser/specialization',
    process.env.REACT_APP_MIDDLEWARE_URL_BASE + '/role/student/specialization/specializationHasUser/semester',
  ];
  return (
    <SpecializationHasUserCRUD name={'Especialización'} urls={myUrls} title={`Bienvenido a la Selección de Especialización`} subtitle={''} />
  );
};
