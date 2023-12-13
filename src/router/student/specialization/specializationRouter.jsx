import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { SpecializationHasUser } from '../../../Pages/student/specialization/specializationHasUser';
import { FirstStage } from '../../../Pages/student/specialization/firstStage/firstStage';
import { SecondStage } from '../../../Pages/student/specialization/secondStage/secondStage';

const SpecializationRouter = () => {
  return (
    <Routes>
      <Route path="/">
        <Route index element={<SpecializationHasUser />} />
        <Route path="FirstStage/:specializationHasUserID" element={<FirstStage />} />
        <Route path="SecondStage/:specializationHasUserID" element={<SecondStage />} />
      </Route>
    </Routes>
  );
};

export default SpecializationRouter;
