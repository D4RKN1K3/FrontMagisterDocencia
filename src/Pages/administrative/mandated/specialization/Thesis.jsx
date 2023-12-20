import React from 'react';
import ThesisCRUD from '../../../../components/crud/specializationHasUser/mandated/ThesisCRUD';

export const Thesis = () => {
  const myUrls = [
    process.env.REACT_APP_MIDDLEWARE_URL_BASE + '/role/mandated/specialization/',
    process.env.REACT_APP_MIDDLEWARE_URL_BASE + '/role/mandated/specialization/mandated',
    process.env.REACT_APP_MIDDLEWARE_URL_BASE + '/role/mandated/specialization/mandated',
    process.env.REACT_APP_MIDDLEWARE_URL_BASE + '/role/mandated/specialization/semester',
  ];
  return (
    <ThesisCRUD name={'Asignación de Académicos'} urls={myUrls} title={`Bienvenido a la Asignación de Académicos`} subtitle={''} />
  );
};
