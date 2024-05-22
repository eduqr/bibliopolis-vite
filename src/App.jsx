import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Students from "./components/students/students";
import NewStudent from "./components/students/newStudent";
import EditStudent from "./components/students/editStudent";
import Login from "./components/login/login";
import Librarians from "./components/librarians/librarians";
import NewLibrarian from "./components/librarians/newLibrarian";
import EditLibrarian from "./components/librarians/editLibrarian";
import Loans from "./components/loans/loans";
import NewLoan from "./components/loans/newLoan";
import EditLoan from "./components/loans/editLoan";
import Catalog from "./components/catalog/catalog";
import NewBook from "./components/catalog/newBook";
import EditBook from "./components/catalog/editBook";
import ViewBook from "./components/catalog/viewBook";
import Stats from "./components/stats/stats";
import Users from "./components/users/usuarios";
import Contact from "./components/users/contacto";
import ViewDetailsBook from "./components/users/viewDetailsBook";
import RequestLoan from "./components/users/requestLoan";
import MyLoans from "./components/users/myLoans";

import "./App.css";

function App() {
  return (
    <Router>
      <Fragment>
        <Routes>
          
          {/* Rutas administrador */}
          <Route path="/bibliotecarios" element={<Librarians />} />
          <Route path="/nuevoBibliotecario" element={<NewLibrarian />} />
          <Route path="/editarBibliotecario/:id" element={<EditLibrarian />} />
          <Route path="/prestamos" element={<Loans />} />
          <Route path="/nuevoPrestamo" element={<NewLoan />} />
          <Route path="/editarPrestamo/:id" element={<EditLoan />} />
          <Route path="/catalogo" element={<Catalog />} />
          <Route path="/nuevoLibro" element={<NewBook />} />
          <Route path="/editarLibro/:id" element={<EditBook />} />
          <Route path="/verLibro/:id" element={<ViewBook />} />
          <Route path="/soporte" element={<Stats />} />
          <Route path="/estudiantes" element={<Students />} />
          <Route path="/nuevoEstudiante" element={<NewStudent />} />
          <Route path="/editarEstudiante/:id" element={<EditStudent />} />

          {/* Rutas publicas */}
          <Route path="/" element={<Login />} />
          <Route path="/usuarios" element={<Users />} />
          <Route path="/contacto" element={<Contact />} />
          <Route path="/detallesLibro/:id" element={<ViewDetailsBook />} />
          <Route path="/solicitarPrestamo/:id" element={<RequestLoan />} />
          <Route path="/mis-prestamos/:id" element={<MyLoans />} />
        </Routes>
      </Fragment>
    </Router>
  );
}

export default App;
