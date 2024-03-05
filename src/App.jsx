import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Students from "./components/students/students";
import Login from "./components/login/login";
import Home from "./components/layout/home";
import Loans from "./components/loans/loans";
import Catalog from "./components/catalog/catalog";
import Stats from "./components/stats/stats";
import "./App.css";

function App() {
  return (
    <Router>
      <Fragment>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/inicio" element={<Home />} />
          <Route path="/prestamos" element={<Loans />} />
          <Route path="/catalogo" element={<Catalog />} />
          <Route path="/estadisticas" element={<Stats />} />
          <Route path="/estudiantes" element={<Students />} />
        </Routes>
      </Fragment>
    </Router>
  );
}

export default App;
