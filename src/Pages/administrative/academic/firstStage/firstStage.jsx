import React from 'react';
import PreliminaryProjectCRUD from '../../../../components/crud/specializationHasUser/academic/preliminaryProjectCRUD';

export const FirstStage = () => {
  const myUrls = [
    process.env.REACT_APP_MIDDLEWARE_URL_BASE + '/role/academic/firstStage/',
    process.env.REACT_APP_MIDDLEWARE_URL_BASE + '/role/academic/firstStage/evaluationStatus',
    process.env.REACT_APP_MIDDLEWARE_URL_BASE + '/role/academic/semester',
  ];
  return (
    <PreliminaryProjectCRUD name={'Semestre'} urls={myUrls} title={`Bienvenido a la Asignación de Academícos`} subtitle={''} stageID={1}/>
  );
};
