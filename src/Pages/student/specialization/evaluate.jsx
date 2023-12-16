import React from 'react';
import EvaluateCRUD from '../../../components/crud/specializationHasUser/student/evaluateCRUD';

export const Evaluate = () => {
  const myUrls = [
    process.env.REACT_APP_MIDDLEWARE_URL_BASE + '/role/student/specialization/evaluate/',
    process.env.REACT_APP_MIDDLEWARE_URL_BASE + '/role/student/specialization/evaluate/specializationHasStudent/',
    process.env.REACT_APP_MIDDLEWARE_URL_BASE + '/role/student/specialization/evaluate/evaluationRubric',
  ];
  return (
    <EvaluateCRUD name={'Evaluación'} urls={myUrls} title={`Bienvenido a la Evaluación`} subtitle={''} />
  );
};
