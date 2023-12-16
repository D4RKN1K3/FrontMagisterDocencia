import React from 'react';
import SpecializationHasSemesterCRUD from '../../../components/crud/specializationHasUser/student/specializationHasSemesterCRUD';

export const SpecializationHasSemester = () => {
  const myUrls = [
    process.env.REACT_APP_MIDDLEWARE_URL_BASE + '/role/student/specialization/specializationHasSemester/',
    process.env.REACT_APP_MIDDLEWARE_URL_BASE + '/role/student/specialization/specializationHasSemester/typeEvaluate',
    process.env.REACT_APP_MIDDLEWARE_URL_BASE + '/role/student/specialization/specializationHasSemester/semester',
  ];
  return (
    <SpecializationHasSemesterCRUD name={'Tipo de Evaluación'} urls={myUrls} title={`Bienvenido a la Selección de Tipo de Evaluación`} subtitle={''} />
  );
};
