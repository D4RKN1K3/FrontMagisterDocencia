import React from 'react';
import PreliminaryProjectCRUD from '../../../../components/crud/specializationHasUser/academic/preliminaryProjectCRUD';

export const SecondStage = () => {
  const myUrls = [
    process.env.REACT_APP_MIDDLEWARE_URL_BASE + '/role/academic/secondStage/',
    process.env.REACT_APP_MIDDLEWARE_URL_BASE + '/role/academic/secondStage/evaluationStatus',
    process.env.REACT_APP_MIDDLEWARE_URL_BASE + '/role/academic/semester',
  ];
  return (
    <PreliminaryProjectCRUD name={'Semestre'} urls={myUrls} title={`Bienvenido a la Asignación de Academícos`} subtitle={''} stageID={2}/>
  );
};
