import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const userId = localStorage.getItem('userId');

  return (
    <nav className="bg-orange-900 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="font-bold text-lg">Bibliopolis</h1>
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" /></svg>
          </button>
        </div>
        <div className={`w-full md:block ${isOpen ? 'block' : 'hidden'}`}>
          <ul className="md:flex md:items-center">
            <li className="md:ml-4">
              <NavLink to="/" className="block py-2 pr-4 pl-3 md:p-0" activeClassName="text-blue-400">Inicio</NavLink>
            </li>
            <li className="md:ml-4">
              <NavLink to={`/mis-prestamos/${userId}`} className="block py-2 pr-4 pl-3 md:p-0" activeClassName="text-blue-400">Mis préstamos</NavLink>
            </li>
            <li className="md:ml-4">
              <NavLink to="/usuarios" className="block py-2 pr-4 pl-3 md:p-0" activeClassName="text-blue-400">Catalogo</NavLink>
            </li>
            <li className="md:ml-4">
              <NavLink to="/contacto" className="block py-2 pr-4 pl-3 md:p-0" activeClassName="text-blue-400">Contacto</NavLink>
            </li>

          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;