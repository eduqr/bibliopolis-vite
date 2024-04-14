import "./../../index.css";
import ClienteAxios from "../../config/axios";
import React, { Fragment, useEffect, useDebugValue, useState } from "react";
import Sidebar from "../layout/sidebarNav";
import {ButtonEdit, ButtonDelete, ButtonAdd, Label, Input} from '../ui' ;
import Select from 'react-select';


function NewLoan() {

  const [books, saveBooks] = useState([]);
  const [students, saveStudents] = useState([]);

  const consultarAPI = async () => {
    const booksResponse = await ClienteAxios.get("/libros");
    const studentsResponse = await ClienteAxios.get("/estudiantes");

    saveBooks(booksResponse.data);
    saveStudents(studentsResponse.data);
  };

  useEffect(() => {
    consultarAPI();
  }, []);

  const [loan, saveLoan] = useState({
    
    start_date: "",
    end_date: "",
    status: "pending",
    student_id: "",
    book_id: ""
  });
  
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

  const optionsBooks = books.map(book => ({ value: book.id, label: book.title, name: 'book_id' }));


  const optionsStudents = students.map(student => ({ value: student.id, label: student.id, name: 'student_id' }));


  const contarPrestamosActivos = async (studentId) => {
    try {
      const response = await ClienteAxios.get(`/prestamos?student_id=${studentId}`);
      const prestamosActivos = response.data.filter(prestamo => prestamo.status === 'active');
      return prestamosActivos.length;
    } catch (error) {
      console.error('Error al obtener los préstamos activos', error);
      return 0;
    }
  };


  const getTodayString = () => {
    const today = new Date();
    const day = (`0${today.getDate()}`).slice(-2);
    const month = (`0${today.getMonth() + 1}`).slice(-2);
    const year = today.getFullYear();
    return `${year}-${month}-${day}`;
  };

  const [todayDate, setTodayDate] = useState(getTodayString());

  const validarPrestamo = () => {
    const { start_date, end_date, status, student_id, book_id } = loan;
    return !start_date.length || !end_date.length || !status.length || !student_id.length || !book_id ;
  };

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
  
    const prestamosActivos = await contarPrestamosActivos(loan.student_id);
      
    if (loan.status === 'active' && prestamosActivos >= 3) {
      guardarMensajeError("El estudiante ya tiene tres préstamos activos.");
      return;


    }
  
    ClienteAxios.post("/prestamos", loan)
      .then(res => {
        console.log(res);
        guardarMensaje("Préstamo agregado correctamente");
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
      <Sidebar />
      <div className="ml-52 p-6">
        <h1 className="text-2xl font-bold mb-8">Nuevo Prestamo</h1>

          
          {mensaje && (
          <div className="bg-green-200 text-green-800 p-3 mb-4 rounded-md">
            {mensaje}
          </div>
        )}
        {mensajeError && (
          <div className="bg-red-200 text-red-800 p-3 mb-4 rounded-md">
            {mensajeError}
          </div>
        )}
        
        <form className="flex flex-row space-x-6" onSubmit={agregarPrestamo}>
          <div className="flex-1">
            <div className="space-y-4">


            <div className="flex flex-col mb-4">
              <Label>Fecha de inicio:</Label>
              <Input type="date" name="start_date" min={todayDate} value={loan.start_date} onChange={actualizarState} />
              {new Date(loan.start_date) < new Date(new Date().toISOString().split('T')[0]) && (
                <span className="text-red-500">La fecha de inicio debe ser hoy o posterior.</span>
              )}
            </div>

            <div className="flex flex-col mb-4">
              <Label>Fecha de finalización:</Label>
              {new Date(loan.start_date) >= new Date(new Date().toISOString().split('T')[0]) ? (
                <span className="text-xl">{loan.end_date}</span>
              ) : (
                <span className="text-red-500 text-xl">Elija una fecha de inicio válida</span>
              )}
            </div>


           
             
            </div>
          </div>

          <div className="flex-1">
            <div className="space-y-4">
              <div className="flex flex-col mb-4">
              <Label>Matricula del estudiante:</Label>
                <Select
                  className="basic-single rounded-sm"
                  classNamePrefix="select"
                  defaultValue={optionsStudents[0]}
                  isClearable={true}
                  isSearchable={true}
                  name="book_id"
                  options={optionsStudents}
                  onChange={actualizarState}
                />
              </div>

              <div className="flex flex-col mb-4">
              <Label>Libro a prestar:</Label>
                <Select
                  className="basic-single rounded-sm"
                  classNamePrefix="select"
                  defaultValue={optionsBooks[0]}
                  isClearable={true}
                  isSearchable={true}
                  name="book_id"
                  options={optionsBooks}
                  onChange={actualizarState}
                />
                
              </div>

              
                <input className="focus:outline-none text-white focus:ring-4 focus:ring-orange-300 text-center
                                  font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-16 dark:bg-orange-600
                                 dark:hover:bg-orange-700 dark:focus:ring-orange-800 "  
                        type="submit"      
                        disabled={validarPrestamo()}
                        value="Agregar Prestamo"
                />
              
              
            </div>
          </div>
        </form>
      </div>
    </Fragment>
  );
}

export default NewLoan;
