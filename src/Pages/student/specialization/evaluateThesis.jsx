import React from 'react';
import EvaluateThesisCRUD from '../../../components/crud/specializationHasUser/student/evaluateThesisCRUD';

export const EvaluateThesis = () => {
  const myUrls = [
    process.env.REACT_APP_MIDDLEWARE_URL_BASE + '/role/student/specialization/evaluate/',
    process.env.REACT_APP_MIDDLEWARE_URL_BASE + '/role/student/specialization/evaluate/thesisEvaluation/',
    process.env.REACT_APP_MIDDLEWARE_URL_BASE + '/role/student/specialization/evaluate/evaluationRubric',
  ];
  return (
    <EvaluateThesisCRUD name={'Evaluación'} urls={myUrls} title={`Bienvenido a la Evaluación`} subtitle={''} />
  );
};
