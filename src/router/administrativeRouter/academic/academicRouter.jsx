import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Home } from '../../../Pages/administrative/academic/home';

const AcademicRouter = () => {
  return (
    <Routes>
      <Route path="/">
        <Route index element={<Home />} />
      </Route>
    </Routes>
  );
};

export default AcademicRouter;
