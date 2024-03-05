import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Students from "./components/students/students";
import Sidebar from "./components/layout/sidebarNav";
import Login from "./components/login/login";
import Librarians from "./components/librarians/librarians";

function App() {
  return (
    <Router>
      <Fragment>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/inicio" />
          <Route path="/estudiantes" element={<Students />} />
          <Route path="/administracion" element={<Librarians />} />
        </Routes>
      </Fragment>
    </Router>
  );
}

export default App;
