import React from 'react';
import StageCRUD from '../../../../components/crud/specializationHasUser/student/stage/stageCRUD';

export const FirstStage = () => {
  const myUrls = [
    process.env.REACT_APP_MIDDLEWARE_URL_BASE + '/role/student/specialization/evaluate/firstStage/',
  ];
  return (
    <StageCRUD name={'Primera Etapa'} urls={myUrls} title={`Bienvenido a la Primera Etapa de Evaluación`} subtitle={''} />
  );
};
