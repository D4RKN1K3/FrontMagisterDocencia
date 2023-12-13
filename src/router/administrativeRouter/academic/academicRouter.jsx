import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Home } from '../../../Pages/administrative/academic/home';
import { FirstStage } from '../../../Pages/administrative/academic/firstStage/firstStage';
import { SecondStage } from '../../../Pages/administrative/academic/secondStage/secondStage';

const AcademicRouter = () => {
  return (
    <Routes>
      <Route path="/">
        <Route index element={<Home />} />
        <Route path="FirstStage" element={<FirstStage />} />
        <Route path="SecondStage" element={<SecondStage />} />
      </Route>
    </Routes>
  );
};

export default AcademicRouter;
