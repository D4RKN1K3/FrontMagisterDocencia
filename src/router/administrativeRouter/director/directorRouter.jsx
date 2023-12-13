import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Home } from '../../../Pages/administrative/director/home';
import { Users } from '../../../Pages/administrative/director/users/users';
import { Academic } from '../../../Pages/administrative/director/academic/academic';
import { Student } from '../../../Pages/administrative/director/student/student';
import { Document } from '../../../Pages/administrative/director/student/document/document';
import { HandleTitle } from '../../../Pages/administrative/director/student/handleTitle/handleTitle';
import { Title } from '../../../Pages/administrative/director/title/title';
import { Semester } from '../../../Pages/administrative/director/semester/semester';

const DirectorRouter = () => {
  return (
    <Routes>
      <Route path="/">
        <Route index element={<Home />} />
        <Route path="Users" element={<Users />} />
        <Route path="Academic" element={<Academic />} />
        <Route path="Student" element={<Student />} />
        <Route path="Document/:userID" element={<Document />} />
        <Route path="HandleTitle/:userID" element={<HandleTitle />} />
        <Route path="Title" element={<Title />} />
        <Route path="Semester" element={<Semester />} />
      </Route>
    </Routes>
  );
};

export default DirectorRouter;
