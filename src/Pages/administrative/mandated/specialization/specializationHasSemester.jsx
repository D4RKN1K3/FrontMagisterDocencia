import React from 'react';
import SpecializationHasSemesterCRUD from '../../../../components/crud/specializationHasUser/mandated/specializationHasSemesterCRUD';

export const SpecializationHasSemester = () => {
  const myUrls = [
    'http://localhost:3000' + '/role/mandated/specialization/',
    'http://localhost:3000' + '/role/mandated/specialization/academic',
    'http://localhost:3000' + '/role/mandated/specialization/semester',
  ];
  return (
    <SpecializationHasSemesterCRUD name={'Asignación de Académicos'} urls={myUrls} title={`Bienvenido a la Asignación de Académicos`} subtitle={''} />
  );
};
