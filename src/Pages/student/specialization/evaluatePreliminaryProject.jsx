import React from 'react';
import EvaluatePreliminaryProjectCRUD from '../../../components/crud/specializationHasUser/student/evaluatePreliminaryProjectCRUD';

export const EvaluatePreliminaryProject = () => {
  const myUrls = [
    process.env.REACT_APP_MIDDLEWARE_URL_BASE + '/role/student/specialization/evaluate/',
    process.env.REACT_APP_MIDDLEWARE_URL_BASE + '/role/student/specialization/evaluate/preliminaryProjectEvaluation/',
    process.env.REACT_APP_MIDDLEWARE_URL_BASE + '/role/student/specialization/evaluate/evaluationRubric',
  ];
  return (
    <EvaluatePreliminaryProjectCRUD name={'Evaluación'} urls={myUrls} title={`Bienvenido a la Evaluación`} subtitle={''} />
  );
};
