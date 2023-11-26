import React from 'react';
import SpecializationHasSemesterCRUD from '../../../../components/crud/specializationHasUser/mandated/specializationHasSemesterCRUD';

export const SpecializationHasSemester = () => {
  const myUrls = [
    process.env.REACT_APP_MIDDLEWARE_URL_BASE + '/role/mandated/specialization/',
    process.env.REACT_APP_MIDDLEWARE_URL_BASE + '/role/mandated/specialization/academic',
    process.env.REACT_APP_MIDDLEWARE_URL_BASE + '/role/mandated/specialization/semester',
  ];
  return (
    <SpecializationHasSemesterCRUD name={'Semestre'} urls={myUrls} title={`Bienvenido a la Asignación de Academícos`} subtitle={''} />
  );
};
