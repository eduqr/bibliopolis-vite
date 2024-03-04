import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Students from "./components/students/students";

function App() {
  return (
    <Router>
      <Fragment>
        <h1 className="text-3xl font-semibold">Hola a todos</h1>
        <Routes>
          <Route path="/" element={<Students />} />
        </Routes>
      </Fragment>
    </Router>
  );
}

export default App;
