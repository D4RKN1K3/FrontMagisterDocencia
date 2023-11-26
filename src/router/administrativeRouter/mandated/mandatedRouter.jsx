import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Home } from '../../../Pages/administrative/mandated/home';
import { Users } from '../../../Pages/administrative/mandated/users/users';
import { Academic } from '../../../Pages/administrative/mandated/academic/academic';
import { Student } from '../../../Pages/administrative/mandated/student/student';
import { Document } from '../../../Pages/administrative/mandated/student/document/document';
import { HandleTitle } from '../../../Pages/administrative/mandated/student/handleTitle/handleTitle';
import { Title } from '../../../Pages/administrative/mandated/title/title';
import { Semester } from '../../../Pages/administrative/mandated/semester/semester';
import { SpecializationHasSemester } from '../../../Pages/administrative/mandated/specialization/specializationHasSemester';

const MandatedRouter = () => {
  return (
    <Routes>
      <Route path="/">
        <Route index element={<Home />} />
        <Route path="Users" element={<Users />} />
        <Route path="Academic" element={<Academic />} />
        <Route path="Student" element={<Student />} />
        <Route path="Document/:roleHasUserID" element={<Document />} />
        <Route path="HandleTitle/:userID" element={<HandleTitle />} />
        <Route path="Title" element={<Title />} />
        <Route path="Semester" element={<Semester />} />
        <Route path="SpecializationHasSemester" element={<SpecializationHasSemester/>} />
      </Route>
    </Routes>
  );
};

export default MandatedRouter;
