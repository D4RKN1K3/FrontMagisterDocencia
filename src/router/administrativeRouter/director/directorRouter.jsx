import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Home } from '../../../Pages/administrative/director/home';
import { Users } from '../../../Pages/administrative/director/users/users';

const DirectorRouter = () => {
  return (
    <Routes>
      <Route path="/">
        <Route index element={<Home />} />
        <Route path="Users" element={<Users />} />
      </Route>
    </Routes>
  );
};

export default DirectorRouter;
