import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { HomeStudent } from '../../Pages/student/homeStudent';
import SidebarStudent from '../../components/sidebard/student/sidebarStudent';
import Profile from '../../Pages/student/profile/profile';

import SpecializationRouter from './specialization/specializationRouter';

const StudentRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<SidebarStudent />}>
        <Route index element={<HomeStudent />} />
        <Route path="Profile" element={<Profile/>} />
        <Route path="Specialization/*" element={<SpecializationRouter/>} />
      </Route>
    </Routes>
  );
};

export default StudentRouter;
