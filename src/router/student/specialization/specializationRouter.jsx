import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { SpecializationHasUser } from '../../../Pages/student/specialization/specializationHasUser';

const SpecializationRouter = () => {
  return (
    <Routes>
      <Route path="/">
        <Route index element={<SpecializationHasUser />} />
      </Route>
    </Routes>
  );
};

export default SpecializationRouter;
