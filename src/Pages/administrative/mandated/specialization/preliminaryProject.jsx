import React from 'react';
import PreliminaryProjectCRUD from '../../../../components/crud/specializationHasUser/mandated/PreliminaryProjectCRUD';

export const PreliminaryProject = () => {
  const myUrls = [
    process.env.REACT_APP_MIDDLEWARE_URL_BASE + '/role/mandated/specialization/',
    process.env.REACT_APP_MIDDLEWARE_URL_BASE + '/role/mandated/specialization/academic',
    process.env.REACT_APP_MIDDLEWARE_URL_BASE + '/role/mandated/specialization/semester',
  ];
  return (
    <PreliminaryProjectCRUD name={'Asignación de Académicos'} urls={myUrls} title={`Bienvenido a la Asignación de Académicos`} subtitle={''} />
  );
};
