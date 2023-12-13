import React from 'react';
import StageCRUD from '../../../../components/crud/specializationHasUser/student/stage/stageCRUD';

export const SecondStage = () => {
  const myUrls = [
    process.env.REACT_APP_MIDDLEWARE_URL_BASE + '/role/student/specialization/evaluate/secondStage/',
  ];
  return (
    <StageCRUD name={'Segunda Etapa'} urls={myUrls} title={`Bienvenido a la Segunda Etapa de Evaluación`} subtitle={''} />
  );
};
