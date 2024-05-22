import "./../../index.css";
import ClienteAxios from "../../config/axios";
import React, { Fragment, useEffect, useDebugValue, useState } from "react";
import NavBar from "../layout/navBar";
import {ButtonEdit, ButtonDelete, ButtonAdd, Label, Input} from '../ui' ;
import Select from 'react-select';
import { useParams } from "react-router-dom";


function RequestLoan() {
    const { id } = useParams();  // Obtener el ID del libro de la URL
    const [libro, setLibro] = useState({});

    // Función para cargar los detalles del libro
    useEffect(() => {
        const cargarLibro = async () => {
            const result = await ClienteAxios.get(`/libros/${id}`);
            setLibro(result.data);     
        };

        cargarLibro();
    }, [id]);  // Dependencia basada en el id, usando el hook useParams
  

 

  const [loan, saveLoan] = useState({
    
    start_date: "",
    end_date: "",
    status: "pending",
    student_id: "",
    book_id: id
  });

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    saveLoan(prev => ({ ...prev, student_id: userId }));
}, []);
  
  
  const actualizarState = (e) => {

    // Determina si el evento viene de react-select o de un input/select normal
    const { name, value } = e.target ? e.target : e;
  
    let newLoan = {
      ...loan,
      [name]: value
    };
  
    // Lógica Para Fecha de inicio
    if (name === "start_date") {
      const startDate = new Date(value);
      const endDate = new Date(startDate);
      endDate.setDate(startDate.getDate() + 3); // fecha final se le añaden 3 dias de la fecha de inicio
      const endDateStr = endDate.toISOString().split('T')[0]; // formatear fecha
      newLoan.end_date = endDateStr;
    }
  
    
    saveLoan(newLoan);
  };

  const getTodayString = () => {
    const today = new Date();
    const day = (`0${today.getDate()}`).slice(-2);
    const month = (`0${today.getMonth() + 1}`).slice(-2);
    const year = today.getFullYear();
    return `${year}-${month}-${day}`;
  };

  const [todayDate, setTodayDate] = useState(getTodayString());

  

  const [mensaje, guardarMensaje] = useState(null);
  const [mensajeError, guardarMensajeError] = useState(null);



  const agregarPrestamo = async (e) => {
    e.preventDefault();
  
    const today = new Date(getTodayString()); 
    const selectedStartDate = new Date(loan.start_date);

    if (selectedStartDate < today) {
      guardarMensajeError("La fecha de inicio debe ser hoy o una fecha futura.");
      return;
    }
  
    ClienteAxios.post("/prestamos", loan)
      .then(res => {
        console.log(res);
        guardarMensaje("Préstamo solicitado correctamente");
        setTimeout(() => {
          guardarMensaje(null);
        }, 3000);
      })
      .catch(error => {
        guardarMensajeError("Error al agregar el préstamo");
        console.error(error);
      });
  };

  return (
    <Fragment>
        <NavBar />
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold text-center mb-8">Solicitar Préstamo</h1>

            <div className="flex flex-col md:flex-row justify-center items-start md:items-stretch gap-10">
                {libro.image_name && (
                    <div className="md:flex-1 max-w-sm md:max-w-72 ">
                        <img
                            src={`http://localhost:8888/uploads/${libro.image_name}`}
                            alt="Imagen del Libro"
                            className="w-full rounded-lg shadow-lg"
                        />
                    </div>
                )}
                <div className="md:flex-1 max-w-md">
                    {mensaje && (
                        <div className="bg-green-200 text-green-800 p-3 mb-4 rounded-md text-center">
                            {mensaje}
                        </div>
                    )}
                    {mensajeError && (
                        <div className="bg-red-200 text-red-800 p-3 mb-4 rounded-md text-center">
                            {mensajeError}
                        </div>
                    )}

                    <form onSubmit={agregarPrestamo} className="space-y-6">
                        <div className="space-y-4">
                            <div>
                                <label className="block font-medium">Fecha de inicio:</label>
                                <input
                                    type="date"
                                    name="start_date"
                                    min={todayDate}
                                    value={loan.start_date || ''}
                                    onChange={actualizarState}
                                    className="mt-1 p-2 border rounded-md w-full"
                                />
                            </div>
                            <div>
                                <label className="block font-medium">Fecha de finalización:</label>
                                <span className="block mt-1 p-2 text-xl bg-gray-100 rounded-md">{loan.end_date}</span>
                            </div>
                        </div>
                        <div className="text-center mt-6">
                            <button
                                type="submit"
                                disabled={!loan.start_date || !loan.end_date}
                                className="bg-orange-600 hover:bg-orange-700 text-white font-medium py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors"
                            >
                                Agregar Préstamo
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </Fragment>
);
}

export default RequestLoan;
