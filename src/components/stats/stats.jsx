import "./../../index.css";
import { Link } from "react-router-dom";
import { Fragment } from "react";
import Sidebar from "../layout/sidebarNav";

function Support() {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-10 ml-48">
        <h1 className="text-2xl font-bold mb-4">Panel de Soporte</h1>
        <p>Si tienes alguna duda o estás experimentando problemas, por favor contacta con nosotros:</p>
        
        <div className="mt-4">
          <h2 className="text-xl font-semibold">Contacto Directo</h2>
          <p>Para asistencia inmediata, puedes llamar al:</p>
          <p><strong>Teléfono:</strong> 9984577177</p>
          <p><strong>Horario:</strong> Lunes a Viernes, 9:00 a 18:00 hrs</p>
        </div>

        <div className="mt-4">
          <h2 className="text-xl font-semibold">Correo Electrónico</h2>
          <p>Envíanos un correo con tu problema o duda a:</p>
          <p><strong>Email:</strong> soportebibliopolis@gmail.com</p>
        </div>

        <div className="mt-4">
          <h2 className="text-xl font-semibold">Envía tu Consulta</h2>
          <form>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                Correo Electrónico
              </label>
              <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="email" placeholder="tuemail@ejemplo.com" />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="message">
                Mensaje
              </label>
              <textarea className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="message" rows="4" placeholder="Describe tu problema o consulta"></textarea>
            </div>
            <div className="flex items-center justify-between">
              <button className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                Enviar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Support;
