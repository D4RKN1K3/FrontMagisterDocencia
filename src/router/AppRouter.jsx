import { Head } from "../components/Head"
import { Home } from "../Pages/home"
import { Routes, Route } from "react-router-dom"
import LoginPage from '../Pages/Login'
import { Edit } from "../Pages/Edit"
import { Load } from "../Pages/Load"
import { Docs } from "../Pages/docs"
import Auth from "../Pages/Auth"

export const AppRouter = () => {
    return <>
    
        <Routes>
            <Route path="/" element= {<Head />}>
                <Route index element={<Home/>}/>
                <Route path="Edit" element={<Edit/>}/>
                <Route path="Docs" element={<Docs/>}/>
                
            </Route>
            <Route path="Login" element={<LoginPage/>}/>  
            <Route path="Auth" element={<Auth/>}/>          
            <Route path="Load" element={<Load/>}/>
        </Routes>
    </>
};
    
    
   