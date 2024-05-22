import React, { Fragment, useEffect, useState } from "react";
import ClienteAxios from "../../config/axios";
import NavBar from "../layout/navBar";
import { Card } from "@material-tailwind/react";
import "./../../index.css";
import { ButtonDelete } from '../ui';

function MyLoans() {
    const [loansStudents, setLoansStudents] = useState([]);
    const userId = localStorage.getItem('userId');
    
    console.log("User ID:", userId); 
    useEffect(() => {
      const fetchData = async () => {
        try {
          // Obtener los préstamos directamente asociados al ID del estudiante
          const response = await ClienteAxios.get("/prestamos-estudiante/" + userId);
          console.log(response.data);  // Agregar esto para verificar los datos

          setLoansStudents(response.data);
        } catch (error) {
          console.error("Error al obtener datos:", error);
        }
      };
      fetchData();
    }, [userId]);
  
  const deleteLoan = async (id) => {
    try {
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

  const translate = (status) => {
    switch(status){
      case 'active': return "Activo";
      case 'returned': return "Devuelto";
      case 'expired': return "Expirado";
      case 'cancelled': return "Cancelado";
      case 'pending': return "Pendiente";
      default: return "No aplica";
    }
  };

  const getStatusStyles = (status) => {
    switch (status) {
      case 'active':
      case 'returned':
        return 'bg-green-500 text-white rounded py-1 px-2';
      case 'expired':
      case 'cancelled':
        return 'bg-red-500 text-white rounded py-1 px-2';
      case 'pending':
        return 'bg-yellow-500 text-white rounded py-1 px-2';
      default:
        return 'rounded py-1 px-2';
    }
  };

  return (
    <Fragment>
      <NavBar />
      <div className="container mx-auto p-4">
        <div className="flex flex-wrap justify-between items-center mb-4">
          <h1 className="text-3xl font-semibold text-center w-full md:w-auto mb-4 md:mb-0">Mis Préstamos</h1>
        </div>
        {loansStudents.map(({ id, start_date, end_date, status }) => (
          <Card key={id} className="mb-4 p-4 w-full md:w-5/6 xl:w-2/3 mx-auto">
            <div className="flex flex-wrap justify-between items-center">
              <div className="w-full md:w-3/4 p-2">
                <h2 className="text-lg font-bold">Préstamo ID: {id}</h2>
                <p>Fecha inicio: {new Date(start_date).toLocaleDateString('es-MX')}</p>
                <p>Fecha fin: {new Date(end_date).toLocaleDateString('es-MX')}</p>
                <p>Estado: <span className={getStatusStyles(status)}>{translate(status)}</span></p>
                <p>Matrícula asociada: {userId}</p>
              </div>
              <div className="w-full md:w-1/4 p-2 flex justify-center md:justify-end">
                <ButtonDelete onClick={() => deleteLoan(id)}>Eliminar</ButtonDelete>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </Fragment>
  );
}

export default MyLoans;
