import "./../../index.css";
import ClienteAxios from "../../config/axios";
import React, { Fragment, useEffect, useDebugValue, useState } from "react";
import Sidebar from "../layout/sidebarNav";
import {ButtonEdit, ButtonDelete, ButtonAdd, Label, Input} from '../ui' ;


function NewStudent() {

  const [carreras, guardarCarreras] = useState([]);

  const consultarAPI = async () => {
    const carreraConsulta = await ClienteAxios.get("/carreras");
    guardarCarreras(carreraConsulta.data);
  };

  useEffect(() => {
    consultarAPI();
  }, []);

  const [alumno, guardarAlumno] = useState({
    action: "insert",
    id: "",
    name: "",
    lastname: "",
    email: "",
    career_id: ""
  });

  const actualizarState = (e) => {
    guardarAlumno({
      ...alumno,
      [e.target.name]: e.target.value,
    });
  };

  const validarAlumno = () => {
    const { id, name, lastname, email } = alumno;
    return !id.length || !name.length || !lastname.length || !email.length ;
  };

  const [mensaje, guardarMensaje] = useState(null);



  const agregarAlumno = (e) => {
    e.preventDefault();
    ClienteAxios.post("/estudiantes", alumno).then((res) => {
      console.log(res);
      guardarMensaje("Estudiante agregado correctamente"); 
      setTimeout(() => {
        guardarMensaje(null);
      }, 3000);
    });
  };


  return (
    <Fragment>
      <Sidebar />
      <div className="ml-52 p-6">
        <h1 className="text-2xl font-bold mb-8">Nuevo Estudiante</h1>

          
          {mensaje && (
          <div className="bg-green-200 text-green-800 p-3 mb-4 rounded-md">
            {mensaje}
          </div>
        )}
        
        <form className="flex flex-row space-x-6" onSubmit={agregarAlumno}>
          <div className="flex-1">
            <div className="space-y-4">

            <div className="flex flex-col mb-4">
                <Label>Matricula:</Label>
                <Input type="text" name="id"  placeholder="ej. 202200530" onChange={actualizarState} />
                {alumno.id.length === 0 && (
                  <span className="text-red-500">La matrícula es obligatoria</span>
                )}
              </div>

              <div className="flex flex-col mb-4">
                <Label >Nombre:</Label>
                <Input type="text" name="name"  placeholder="Adrian" onChange={actualizarState} />
                {alumno.name.length === 0 && (
                  <span className="text-red-500">El nombre es obligatorio</span>
                )}
              </div>

              <div className="flex flex-col mb-4">
                <Label>Apellido:</Label>
                <Input type="text" name="lastname"  placeholder="Valdez" onChange={actualizarState} />
                {alumno.lastname.length === 0 && (
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
                {alumno.email.length === 0 && (
                  <span className="text-red-500">El correo es obligatorio</span>
                )}
              </div>

              <div className="flex flex-col mb-4">
                <Label>Carrera:</Label>
                <select name="career_id" className="border border-gray-300 rounded-md px-3 py-2" onChange={actualizarState}>
                  <option value="" selected disabled>Selecciona una carrera</option>
                  {carreras.map(career => (
                    <option key={career.id} value={career.id}>{career.name}</option>
                  ))}
                </select>
                
              </div>

              
                <input className="focus:outline-none text-white focus:ring-4 focus:ring-orange-300 text-center
                                  font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-16 dark:bg-orange-600
                                 dark:hover:bg-orange-700 dark:focus:ring-orange-800 "  
                        type="submit"      
                        disabled={validarAlumno()}
                        value="Agregar Estudiante"
                />
              
              
            </div>
          </div>
        </form>
      </div>
    </Fragment>
  );
}

export default NewStudent;
