import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Home } from "../../Pages/home"
import { VerifyAuth } from "../../Pages/auth/verifyAuth";
import { Auth } from "../../Pages/auth/auth";
import { AuthAdministrative } from "../../Pages/auth/authAdministrative";
import { ChangePassword } from "../../Pages/auth/changePassword";

const AuthRouter = () => {
    return (
        <Routes>
            <Route path="/">
                <Route index element={<Home />} />
                <Route path="Auth" element={<Auth />} />
                <Route path="AuthAdministrative" element={<AuthAdministrative />} />
                <Route path="ChangePassword" element={<ChangePassword />} />
                <Route path="VerifyAuth" element={<VerifyAuth />} />
            </Route>
        </Routes>
    );
};

export default AuthRouter;
