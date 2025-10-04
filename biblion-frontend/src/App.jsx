import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import RegistroUsuario from "./pages/RegistroUsuario.jsx";
import LoginUsuario from "./pages/LoginUsuario.jsx";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/login-usuario" element={<LoginUsuario />} />
          <Route path="/registro-usuario" element={<RegistroUsuario />} />
          <Route path="/" element={<LoginUsuario />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;