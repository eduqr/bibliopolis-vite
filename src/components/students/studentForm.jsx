import "./../../index.css";
import ClienteAxios from "../../config/axios";
import React, { Fragment, useEffect, useState } from "react";
import Sidebar from "../layout/sidebarNav";
import {ButtonEdit, ButtonDelete, ButtonAdd, Label, Input} from '../ui' ;


function studentForm() {

const [carreras, guardarCarreras] = useState([]);
  const ConsultarAPI = async () => {
    const CarreraConsulta = await ClienteAxios.get("/carreras");
    guardarCarreras(CarreraConsulta.data);
  };
  useEffect(() => {
    ConsultarAPI();
  }, []);

  
    return (
        <Fragment>
          <Sidebar />
          <div className="ml-52 p-6">
            <h1 className="text-2xl font-bold mb-8">Registro de Estuidante</h1>
            <div className="flex flex-row space-x-6">
              {/* Primera columna */}
              <div className="flex-1">
                <form className="space-y-4">
                  <div className="flex flex-col mb-4">
                    <Label htmlFor="nombre">Nombre:</Label>
                    <Input type="text" name="nombre" id="nombre" placeholder=" Adrian " />
                  </div>
                  <div className="flex flex-col mb-4">
                  <Label htmlFor="apellido">Apellido:</Label>
                    <Input type="text" name="apellido" id="apellido" placeholder=" Valdez" />
                  </div>
                </form>
              </div>
              
              {/* Segunda columna */}
              <div className="flex-1">
                <form className="space-y-4">
                  <div className="flex flex-col mb-4">
                  <Label htmlFor="correo">Correo:</Label>
                <Input type="email" name="correo" id="correo" placeholder=" correo@gmail.com" />
                  </div>
                  <div className="flex flex-col mb-4">
                   
                  <Label htmlFor="carrera" >Carrera:</Label>
                <select name="carrera" className="border border-gray-300 rounded-md px-3 py-2">
                  <option value="" >Selecciona una opción</option>
                  {carreras.map((careers) => (
                    <option key={careers.id} value={careers.id}>{careers.name}</option>
                  ))}
                </select>
                  </div>
                  <div className="mb-36">
                  <ButtonAdd>Agregar estudiante</ButtonAdd>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </Fragment>
      );
}

export default studentForm;