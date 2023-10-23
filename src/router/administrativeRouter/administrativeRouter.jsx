import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { HomeAdministrative } from '../../Pages/administrative/homeAdministrative';
import SidebarAdministrative from '../../components/sidebard/administrative/sidebarAdministrative';
import Profile from '../../Pages/administrative/profile/profile';

import DirectorRouter from './director/directorRouter';
import MandatedRouter from './mandated/mandatedRouter';
import AcademicRouter from './academic/academicRouter';

const AdministrativeRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<SidebarAdministrative />}>
        <Route index element={<HomeAdministrative />} />
        <Route path="Director/*" element={<DirectorRouter/>} />
        <Route path="Mandated/*" element={<MandatedRouter/>} />
        <Route path="Academic/*" element={<AcademicRouter/>} />
        <Route path="Profile" element={<Profile/>} />
      </Route>
    </Routes>
  );
};

export default AdministrativeRouter;
