import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { SpecializationHasUser } from '../../../Pages/student/specialization/specializationHasUser';
import { SpecializationHasSemester } from '../../../Pages/student/specialization/specializationHasSemester';
import { Evaluate } from '../../../Pages/student/specialization/evaluate';

const SpecializationRouter = () => {
  return (
    <Routes>
      <Route path="/">
        <Route index element={<SpecializationHasUser />} />
        <Route path=":specializationHasUserID" element={<SpecializationHasSemester />} />
        <Route path="Evaluate/:specializationHasUserID/:specializationHasSemesterID/:stageID" element={<Evaluate />} />
      </Route>
    </Routes>
  );
};

export default SpecializationRouter;
