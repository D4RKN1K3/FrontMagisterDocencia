import React from 'react';
import SpecializationHasSemesterCRUD from '../../../../components/crud/specializationHasUser/academic/specializationHasSemesterCRUD';

export const SecondStage = () => {
  const myUrls = [
    process.env.REACT_APP_MIDDLEWARE_URL_BASE + '/role/academic/secondStage/',
    process.env.REACT_APP_MIDDLEWARE_URL_BASE + '/role/academic/secondStage/evaluationStatus',
    process.env.REACT_APP_MIDDLEWARE_URL_BASE + '/role/academic/semester',
  ];
  return (
    <SpecializationHasSemesterCRUD name={'Semestre'} urls={myUrls} title={`Bienvenido a la Asignación de Academícos`} subtitle={''} />
  );
};
