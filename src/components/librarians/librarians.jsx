import React, { Fragment, useEffect, useState } from "react";
import ClienteAxios from "../../config/axios";
import Sidebar from "../layout/sidebarNav";
import { Card } from "@material-tailwind/react";
import "./../../index.css";
import {ButtonEdit, ButtonDelete, ButtonAdd, Label, Input} from '../ui' ;


const TABLE_HEAD = ["Nombre", "Apellido", "Correo", "Rol", "Acciones" ];

function Librarians() {

  
  const [librarians, saveLibrarians] = useState([]);
  const [roles, saveRoles] = useState([]);

  const ConsultarAPI = async () => {
    try {
      const librariansResponse = await ClienteAxios.get("/bibliotecarios");
      const rolesReponse = await ClienteAxios.get("/roles"); 

      saveLibrarians(librariansResponse.data);
      saveRoles(rolesReponse.data);
    } catch (error) {
      console.error("Error al obtener datos:", error);
    }
  };

  useEffect(() => {
    ConsultarAPI();
  }, []);

  const getRolNameById = (rol_id) => {
    const rol = roles.find((r) => r.id === rol_id);
    return rol ? rol.name : "N/A"; 
  };

  const deleteLibrarian = async (id) => {
    try {
      const confirmacion = window.confirm("¿Estás seguro de que deseas eliminar este bibliotecario?");
      if (confirmacion) {
        const response = await ClienteAxios.delete("/bibliotecarios/" + id);
        alert("Bibliotecario Eliminado");
        window.location.reload();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Fragment>
      <Sidebar />
      
      <Card className="w-2/3 overflow-scroll m-auto">
        
      <div className="flex justify-between items-center">
  <h1 className="text-3xl font-semibold text-left py-5 mb-5">Gestion de Bibliotecarios</h1>
  <ButtonAdd to={"/nuevoBibliotecario"}>Nuevo bibliotecario</ButtonAdd>
</div>

        <table className="w-2/3 min-w-max table-auto text-left">
       

          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th
                  key={head}
                  className="border-b border-blueGray-400 bg-blueGray-50 p-4 font-normal leading-none opacity-70"
                >
                  {head}
                </th>
              ))}
            </tr>
       
          </thead>
          
          <tbody>
          {librarians.map(({id, name, lastname, email, rol_id }, index) => (

          


              <tr key={name} className="even:bg-blueGray-50/50 font-normal">
                <td className="p-4">{name}</td>
                <td className="p-4">{lastname}</td>
                <td className="p-4">{email}</td>
                <td className="p-4" >{getRolNameById(rol_id)}</td>
                <td className="p-4" >
                  <ButtonEdit to={"/editarBibliotecario/"+ id}>Editar</ButtonEdit>   
                  <ButtonDelete onClick={() => deleteLibrarian(id)}>Eliminar</ButtonDelete>            
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
      </Card>
    </Fragment>
  );
}

export default Librarians;