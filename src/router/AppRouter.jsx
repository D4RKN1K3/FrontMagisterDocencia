import { Routes, Route } from "react-router-dom";

import Test from "../Pages/Test"
import Test2 from "../Pages/Test2"
import Test3 from "../Pages/Test3"

import AuthRouter from "./auth/authRouter";
import AdministrativeRouter from "./administrativeRouter/administrativeRouter";
import StudentRouter from "./student/studentRouter";

export const AppRouter = () => {
    return <>

        <Routes>
            <Route path="/*" element={<AuthRouter />} />
            <Route path="/Administrative/*" element={<AdministrativeRouter />} />
            <Route path="/Dashboard/*" element={<StudentRouter />} />
            <Route path="Test" element={<Test />} />
            <Route path="Test2" element={<Test2 />} />
            <Route path="Test3" element={<Test3 />} />
        </Routes>
    </>
};