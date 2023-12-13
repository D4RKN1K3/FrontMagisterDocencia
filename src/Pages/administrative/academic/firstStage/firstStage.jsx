import React from 'react';
import SpecializationHasSemesterCRUD from '../../../../components/crud/specializationHasUser/academic/specializationHasSemesterCRUD';

export const FirstStage = () => {
  const myUrls = [
    process.env.REACT_APP_MIDDLEWARE_URL_BASE + '/role/academic/firstStage/',
    process.env.REACT_APP_MIDDLEWARE_URL_BASE + '/role/academic/firstStage/evaluationStatus',
    process.env.REACT_APP_MIDDLEWARE_URL_BASE + '/role/academic/semester',
  ];
  return (
    <SpecializationHasSemesterCRUD name={'Semestre'} urls={myUrls} title={`Bienvenido a la Asignación de Academícos`} subtitle={''} />
  );
};
