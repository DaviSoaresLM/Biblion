import React from "react";
import {BrowserRouter as Router, Route, Routes, Link, Navigate} from "react-router-dom";
import LoginPage from "./features/auth/pages/LoginPage.jsx";
import RegisterPage from "./features/auth/pages/RegisterPage.jsx";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Navigate to="/auth/login"/>}/>;

                <Route path="/auth/login" element={<LoginPage/>}/>
                <Route path="/auth/register" element={<RegisterPage/>}/>
            </Routes>
        </Router>
    );
}
export default App;