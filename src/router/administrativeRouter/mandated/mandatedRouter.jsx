import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Home } from '../../../Pages/administrative/mandated/home';
import { Users } from '../../../Pages/administrative/mandated/users/users';

const MandatedRouter = () => {
  return (
    <Routes>
      <Route path="/">
        <Route index element={<Home />} />
        <Route path="Users" element={<Users />} />
      </Route>
    </Routes>
  );
};

export default MandatedRouter;
