import { Head } from "../components/Head"
import { Home } from "../Pages/home"
import { Routes, Route } from "react-router-dom"
import LoginPage from '../Pages/Login'
import { Edit } from "../Pages/Edit"
import { Load } from "../Pages/Load"

export const AppRouter = () => {
    return <>
    
        <Routes>
            <Route path="/" element= {<Head />}>
                <Route index element={<Home/>}/>
                
            </Route>
            <Route path="Login" element={<LoginPage/>}/>
            <Route path="Edit" element={<Edit/>}/>
            <Route path="Load" element={<Load/>}/>
        </Routes>
    </>
};
    
    
   