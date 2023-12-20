import React from 'react';
import EvaluateThesisCRUD from '../../../../components/crud/specializationHasUser/academic/evaluateThesisCRUD';

export const EvaluateThesis = () => {
  const myUrls = [
    process.env.REACT_APP_MIDDLEWARE_URL_BASE + '/role/academic/evaluate/',
    process.env.REACT_APP_MIDDLEWARE_URL_BASE + '/role/academic/evaluate/thesisEvaluation/',
    process.env.REACT_APP_MIDDLEWARE_URL_BASE + '/role/academic/handleRubric/rubric/',
    process.env.REACT_APP_MIDDLEWARE_URL_BASE + '/role/academic/handleRubric/rubric/status/',
    process.env.REACT_APP_MIDDLEWARE_URL_BASE + '/role/academic/handleRubric/rubric/evaluationRubric/',
    process.env.REACT_APP_MIDDLEWARE_URL_BASE + '/role/academic/handleRubric/rubricHasQuestion/',
    process.env.REACT_APP_MIDDLEWARE_URL_BASE + '/role/academic/handleRubric/question/',
    process.env.REACT_APP_MIDDLEWARE_URL_BASE + '/role/academic/handleRubric/question/defaultQuestion',
  ];
  return (
    <EvaluateThesisCRUD name={'Evaluación'} urls={myUrls} title={`Bienvenido a la Evaluación`} subtitle={''} />
  );
};
