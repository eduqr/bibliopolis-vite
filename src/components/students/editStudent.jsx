import "./../../index.css";
import ClienteAxios from "../../config/axios";
import React, { Fragment, useEffect, useDebugValue, useState } from "react";
import Sidebar from "../layout/sidebarNav";
import {ButtonEdit, ButtonDelete, ButtonAdd, Label, Input} from '../ui' ;
import { useParams } from "react-router-dom";



function EditStudent() {
    let params = useParams();
    console.log(params.id)

    const [carreras, guardarCarrera] = useState([]);

    const [alumno, guardarEditarAlumno] = useState({
        action: "update",    
        id: params.id,
        name: "",
        lastname: "",
        email: "",
        career_id: "",     
       
      });

      const validarAlumno = () => {
        const { name, lastname, email } = alumno;
        let valido =
          !name.length || !lastname.length || !email.length ;
        return valido;
      };
  
      const ConsultarAPI = async () => {
        const CarreraConsulta = await ClienteAxios.get("/carreras");
        const AlumnoConsulta = await ClienteAxios.get("/estudiantes/" + params.id + "");

        guardarCarrera(CarreraConsulta.data);
    
        guardarEditarAlumno(AlumnoConsulta.data);
      };
      useEffect(() => {
        ConsultarAPI();
      }, []);
    
      const actualizarState = (e) => {
        guardarEditarAlumno({
          ...alumno,
          [e.target.name]: e.target.value,
        });
      };
      
      const ModificarAlumno = (e) => {
        e.preventDefault();
        ClienteAxios.patch("/estudiantes/"+params.id+"", {
          name: alumno.name,
          lastname: alumno.lastname,
          email: alumno.email,
          career_id: alumno.career_id
        }).then((res) => {
          console.log(res);
          guardarMensaje("Alumno Modificado");
          setTimeout(() => {
            guardarMensaje(null);
          }, 3000);
        }).catch((error) => {
          console.log(error);
        });
      };

    const [mensaje, guardarMensaje] = useState(null);
  
  
    return (
      <Fragment>
        <Sidebar />
        <div className="ml-52 p-6">
          <h1 className="text-2xl font-bold mb-8">Editar Estudiante</h1>
  
            
            {mensaje && (
            <div className="bg-green-200 text-green-800 p-3 mb-4 rounded-md">
              {mensaje}
            </div>
          )}
          
          <form className="flex flex-row space-x-6" onSubmit={ModificarAlumno}>
            <div className="flex-1">
              <div className="space-y-4">
  
              <div className="flex flex-col mb-4">
                  <Label>Matricula:</Label>
                  <Input type="text" name="id" value={alumno.id} readOnly placeholder="ej. 202200530" onChange={actualizarState} />
                 
                </div>
  
                <div className="flex flex-col mb-4">
                  <Label >Nombre:</Label>
                  <Input type="text" name="name" value={alumno.name}  placeholder="Adrian" onChange={actualizarState} />
                  {alumno.name.length === 0 && (
                  <span className="text-red-500">El nombre es obligatorio</span>
                )}
                </div>
  
                <div className="flex flex-col mb-4">
                  <Label>Apellido:</Label>
                  <Input type="text" name="lastname" value={alumno.lastname}  placeholder="Valdez" onChange={actualizarState} />
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
                  <Input type="email" name="email" value={alumno.email}  placeholder="correo@gmail.com" onChange={actualizarState} />
                  {alumno.email.length === 0 && (
                  <span className="text-red-500">El correo es obligatorio</span>
                )}
                </div>
  
                <div className="flex flex-col mb-4">
                  <Label>Carrera:</Label>
                  <select name="career_id" className="border border-gray-300 rounded-md px-3 py-2" onChange={actualizarState}>
                    <option value=""  disabled>Selecciona una carrera</option>
                    {carreras.map(career => (
                      <option key={career.id} selected={career.id === alumno.career_id} value={career.id}>{career.name}</option>
                    ))}
                  </select>
                 
                 
                </div>
  
                
                  <input className="focus:outline-none text-white focus:ring-4 focus:ring-orange-300 text-center
                                    font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-16 dark:bg-orange-600
                                   dark:hover:bg-orange-700 dark:focus:ring-orange-800 "  
                          type="submit"      
                          disabled={validarAlumno()}
                          value="Guardar Estudiante"
                  />
                
                
              </div>
            </div>
          </form>
        </div>
      </Fragment>
    );
  }
  
  export default EditStudent;