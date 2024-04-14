import React, { Fragment, useEffect, useState } from "react";
import ClienteAxios from "../../config/axios";
import Sidebar from "../layout/sidebarNav";
import { Card } from "@material-tailwind/react";
import "./../../index.css";
import {ButtonEdit, ButtonDelete, ButtonAdd, Label, Input} from '../ui' ;


const TABLE_HEAD = ["Fecha inicio", "Fecha fin", "Estado del prestamo", "Matricula asociada", "Acciones" ];

function Loans() {

  
  const [loans, saveLoans] = useState([]);
  const [students, saveStudents] = useState([]);
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');


  const ConsultarAPI = async () => {
    try {
      const loansResponse = await ClienteAxios.get("/prestamos");
      const studentsResponse = await ClienteAxios.get("/estudiantes"); 


      saveLoans(loansResponse.data);
      saveStudents(studentsResponse.data);
    } catch (error) {
      console.error("Error al obtener datos:", error);
    }
  };

  useEffect(() => {
    ConsultarAPI();
  }, []);

  const getStudentMatriculaById = (student_id) => {
    const student = students.find((s) => s.id === student_id);
    return student ? student.id : "N/A"; 
  };

  const deleteLoan = async (id) => {
    try {
      // Primero, obtenemos los detalles del préstamo
      const loanResponse = await ClienteAxios.get("/prestamos/" + id);
      const loan = loanResponse.data;
  
      // Verificar si el préstamo está activo
      if (loan.status === "active") {
        alert("No se pueden eliminar préstamos activos. Asegúrate de cambiar el estado del préstamo antes de eliminarlo.");
        return;  // Salir de la función si el préstamo está activo
      }
  
      // Si el préstamo no está activo, preguntamos si realmente desea eliminarlo
      const confirmacion = window.confirm("¿Estás seguro de que deseas eliminar este préstamo?");
  
      if (confirmacion) {
        await ClienteAxios.delete("/prestamos/" + id);
        alert("Préstamo eliminado");
        window.location.reload();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const translate = (status) =>{
    switch(status){
      case 'active':
        return "Activo";
      case 'returned':
        return "Devuelto";
      case 'expired':
        return "Expirado";
      case 'cancelled':
        return "Cancelado";
      case 'pending':
        return "Pendiente";
      default:
        return "No aplica";
    }
  }

  const getStatusStyles = (status) => {
    switch (status) {
      case 'active':
      case 'returned':
        return 'bg-green-500 text-xl text-white text-w px-1 py-1 rounded';
      case 'expired':
      case 'cancelled':
        return 'bg-red-500 text-xl text-white px-1 py-1 rounded';
      case 'pending':
        return 'bg-yellow-500 text-xl text-white px-1 py-1 rounded';
      default:
        return 'px-1 py-1 rounded';
    }
  };

  const filteredLoans = loans.filter(loan => {
    const student = students.find(s => s.id === loan.student_id);
    const matricula = student ? student.id : '';
    return (filterStatus === 'all' || loan.status === filterStatus) &&
           (matricula.includes(searchTerm));
});

const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
};

  return (
    <Fragment>
      <Sidebar />
      <Card className="w-2/3 overflow-scroll m-auto">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-semibold text-left py-5 mb-5">Gestión de Préstamos</h1>
          <ButtonAdd to={"/nuevoPrestamo"}>Nuevo Préstamo</ButtonAdd>
        </div>
 {/* Search and filter bar */}
                <div className="flex space-x-4 mb-4">
                    <input
                        type="text"
                        placeholder="Buscar por matrícula..."
                        className="px-4 py-2 border rounded"
                        value={searchTerm}
                        onChange={handleSearchChange}
                    />
                    <select
                        id="statusFilter"
                        onChange={e => setFilterStatus(e.target.value)}
                        className="px-4 py-2 border rounded"
                    >
                        <option value="all">Todos</option>
                        <option value="active">Activo</option>
                        <option value="returned">Devuelto</option>
                        <option value="expired">Expirado</option>
                        <option value="cancelled">Cancelado</option>
                        <option value="pending">Pendiente</option>
                    </select>
                </div>

        <table className="w-2/3 min-w-max table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map(head => (
                <th key={head} className="border-b border-blueGray-400 bg-blueGray-50 p-4 font-normal leading-none opacity-70">
                  {head}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredLoans.map(({ id, start_date, end_date, status, student_id }, index) => (
              <tr key={index} className="even:bg-blueGray-50/50 font-normal">
                <td className="p-4">{new Date(start_date).toLocaleDateString('es-MX')}</td>
                <td className="p-4">{new Date(end_date).toLocaleDateString('es-MX')}</td>
                <td className="p-4">
                  <span className={getStatusStyles(status)}>
                    {translate(status)}
                  </span>
                </td>
                <td className="p-4">{getStudentMatriculaById(student_id)}</td>
                <td className="p-4">
                  <ButtonEdit to={`/editarPrestamo/${id}`}>Editar</ButtonEdit>
                  <ButtonDelete onClick={() => deleteLoan(id)}>Eliminar</ButtonDelete>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </Fragment>
  );
}

export default Loans;