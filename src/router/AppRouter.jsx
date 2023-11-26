import { Routes, Route } from "react-router-dom";

import AuthRouter from "./auth/authRouter";
import AdministrativeRouter from "./administrativeRouter/administrativeRouter";
import StudentRouter from "./student/studentRouter";
import EncryptPDF from '../Pages/test5';

export const AppRouter = () => {
    return <>

        <Routes>
            <Route path="/*" element={<AuthRouter />} />
            <Route path="/Administrative/*" element={<AdministrativeRouter />} />
            <Route path="/Dashboard/*" element={<StudentRouter />} />
            <Route path="/test5" element={<EncryptPDF />} />
        </Routes>
    </>
};