import "./../../index.css";
import ClienteAxios from "../../config/axios";
import React, { Fragment, useEffect, useDebugValue, useState } from "react";
import Sidebar from "../layout/sidebarNav";
import {ButtonEdit, ButtonDelete, ButtonAdd, Label, Input} from '../ui' ;


function NewLibrarian() {

  const [roles, guardarRoles] = useState([]);

  const consultarAPI = async () => {
    const rolesConsulta = await ClienteAxios.get("/roles");
    guardarRoles(rolesConsulta.data);
  };

  useEffect(() => {
    consultarAPI();
  }, []);

  const [bibliotecario, guardarBibliotecario] = useState({ 
    id: "",
    name: "",
    lastname: "",
    email: "",
    rol_id: ""
  });

  const actualizarState = (e) => {
    guardarBibliotecario({
      ...bibliotecario,
      [e.target.name]: e.target.value,
    });
  };

  const validarBibliotecario = () => {
    const {  name, lastname, email } = bibliotecario;
    return  !name.length || !lastname.length || !email.length ;
  };

  const [mensaje, guardarMensaje] = useState(null);



  const agregarBibliotecario = (e) => {
    e.preventDefault();
    ClienteAxios.post("/bibliotecarios", bibliotecario).then((res) => {
      console.log(res);
      guardarMensaje("Bibliotecario agregado correctamente"); 
      setTimeout(() => {
        guardarMensaje(null);
      }, 3000);
    });
  };

  return (
    <Fragment>
      <Sidebar />
      <div className="ml-52 p-6">
        <h1 className="text-2xl font-bold mb-8">Nuevo Bibliotecario</h1>

          
          {mensaje && (
          <div className="bg-green-200 text-green-800 p-3 mb-4 rounded-md">
            {mensaje}
          </div>
        )}
        
        <form className="flex flex-row space-x-6" onSubmit={agregarBibliotecario}>
          <div className="flex-1">
            <div className="space-y-4">

         

              <div className="flex flex-col mb-4">
                <Label >Nombre:</Label>
                <Input type="text" name="name"  placeholder="Adrian" onChange={actualizarState} />
                {bibliotecario.name.length === 0 && (
                  <span className="text-red-500">El nombre es obligatorio</span>
                )}
              </div>

              <div className="flex flex-col mb-4">
                <Label>Apellido:</Label>
                <Input type="text" name="lastname"  placeholder="Valdez" onChange={actualizarState} />
                {bibliotecario.lastname.length === 0 && (
                  <span className="text-red-500">El apellido es obligatorio</span>
                )}
              </div>
             
            </div>
          </div>

          <div className="flex-1">
            <div className="space-y-4">
              <div className="flex flex-col mb-4">
                <Label >Correo:</Label>
                <Input type="email" name="email"  placeholder="correo@gmail.com" onChange={actualizarState} />
                {bibliotecario.email.length === 0 && (
                  <span className="text-red-500">El correo es obligatorio</span>
                )}
              </div>

              <div className="flex flex-col mb-4">
                <Label>Rol:</Label>
                <select name="rol_id" className="border border-gray-300 rounded-md px-3 py-2" onChange={actualizarState}>
                  <option value="" selected disabled>Seleccione un rol</option>
                  {roles.map(rol => (
                    <option key={rol.id} value={rol.id}>{rol.name}</option>
                  ))}
                </select>
                
              </div>

              
                <input className="focus:outline-none text-white focus:ring-4 focus:ring-orange-300 text-center
                                  font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-16 dark:bg-orange-600
                                 dark:hover:bg-orange-700 dark:focus:ring-orange-800 "  
                        type="submit"      
                        disabled={validarBibliotecario()}
                        value="Agregar Bibliotecario"
                />
              
              
            </div>
          </div>
        </form>
      </div>
    </Fragment>
  );
}

export default NewLibrarian;
