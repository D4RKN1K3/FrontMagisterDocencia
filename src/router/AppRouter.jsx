import { Head } from "../components/Head"
import { Home } from "../Pages/home"
import { Routes, Route } from "react-router-dom"
import LoginPage from '../Pages/Login'
import { Info } from "../Pages/Info"
import { Load } from "../Pages/Load"
import { Docs } from "../Pages/docs"
import Edit from "../Pages/Edit"
import Auth from "../Pages/Auth"
import AuthAdministrative from "../Pages/AuthAdministrative"

import Test from "../Pages/Test"

export const AppRouter = () => {
    return <>
    
        <Routes>
            <Route path="/" element= {<Head />}>
                <Route index element={<Home/>}/>
                <Route path="Info" element={<Info/>}/>
                <Route path="Docs" element={<Docs/>}/>
            </Route>
            <Route path="Login" element={<LoginPage/>}/>  
            <Route path="Auth" element={<Auth/>}/>          
            <Route path="Load" element={<Load/>}/>
            <Route path="Edit" element={<Edit/>}/>
            <Route path="AuthAdministrative" element={<AuthAdministrative/>}/>
            <Route path="Test" element={<Test/>}/>
        </Routes>
    </>
};
    
    
   