import React from 'react';
import ThesisCRUD from '../../../../components/crud/specializationHasUser/academic/thesisCRUD';

export const Thesis = () => {
  const myUrls = [
    process.env.REACT_APP_MIDDLEWARE_URL_BASE + '/role/academic/thesisEvaluation/',
    process.env.REACT_APP_MIDDLEWARE_URL_BASE + '/role/academic/thesisEvaluation/evaluationStatus',
    process.env.REACT_APP_MIDDLEWARE_URL_BASE + '/role/academic/semester',
  ];
  return (
    <ThesisCRUD name={'Semestre'} urls={myUrls} title={`Bienvenido a la Asignación de Academícos`} subtitle={''} stageID={1}/>
  );
};
