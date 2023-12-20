import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Home } from '../../../Pages/administrative/academic/home';
import { FirstStage } from '../../../Pages/administrative/academic/firstStage/firstStage';
import { SecondStage } from '../../../Pages/administrative/academic/secondStage/secondStage';
import { Thesis } from '../../../Pages/administrative/academic/thesis/thesis';
import { EvaluateThesis } from '../../../Pages/administrative/academic/evaluateThesis/evaluateThesis';
import { EvaluatePreliminaryProject } from '../../../Pages/administrative/academic/evaluatePreliminaryProject/evaluatePreliminaryProject';

const AcademicRouter = () => {
  return (
    <Routes>
      <Route path="/">
        <Route index element={<Home />} />
        <Route path="FirstStage" element={<FirstStage />} />
        <Route path="SecondStage" element={<SecondStage />} />
        <Route path="Thesis" element={<Thesis />} />
        <Route path="Evaluate/Thesis/:specializationHasUserID/:specializationHasSemesterID/:stageID" element={<EvaluateThesis />} />
        <Route path="Evaluate/PreliminaryProject/:specializationHasUserID/:specializationHasSemesterID/:stageID" element={<EvaluatePreliminaryProject />} />
      </Route>
    </Routes>
  );
};

export default AcademicRouter;
