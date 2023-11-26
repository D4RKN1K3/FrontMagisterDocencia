import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Home } from '../../../Pages/administrative/director/home';
import { Users } from '../../../Pages/administrative/director/users/users';
import { Academic } from '../../../Pages/administrative/director/academic/academic';
import { Student } from '../../../Pages/administrative/director/student/student';
import { Document } from '../../../Pages/administrative/director/student/document/document';
import { HandleTitle } from '../../../Pages/administrative/director/student/handleTitle/handleTitle';

const DirectorRouter = () => {
  return (
    <Routes>
      <Route path="/">
        <Route index element={<Home />} />
        <Route path="Users" element={<Users />} />
        <Route path="Academic" element={<Academic />} />
        <Route path="Student" element={<Student />} />
        <Route path="Document/:roleHasUserID" element={<Document />} />
        <Route path="HandleTitle/:userID" element={<HandleTitle />} />
      </Route>
    </Routes>
  );
};

export default DirectorRouter;
