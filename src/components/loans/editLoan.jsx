import "./../../index.css";
import ClienteAxios from "../../config/axios";
import React, { Fragment, useEffect, useDebugValue, useState } from "react";
import Sidebar from "../layout/sidebarNav";
import {ButtonEdit, ButtonDelete, ButtonAdd, Label, Input} from '../ui' ;
import { useParams } from "react-router-dom";
import Select from 'react-select';



function EditLoan() {
    let params = useParams();
    console.log(params.id)

    const [books, saveBooks] = useState([]);
    const [students, saveStudents] = useState([]);

    const [loan, saveEditLoan] = useState({

      id: params.id,
      start_date: "",
      end_date: "",
      status: "",
      student_id: "",
      book_id: ""
    });

    const obtenerPrestamosActivos = async (studentId) => {
      try {
        const prestamosActivosResponse = await ClienteAxios.get("/prestamosActivos/" + studentId + "");
        const numeroPrestamosActivos = prestamosActivosResponse.data.prestamos_activos;
        return numeroPrestamosActivos;
      } catch (error) {
        console.error('Error al obtener los préstamos activos', error);
        return 0;
      }
    };
  
  
      const validarPrestamo = () => {
        const { start_date, end_date, status} = loan;
        let valido =
          !start_date.length || !end_date.length || !status.length  ;
        return valido;
      };
  
      const ConsultarAPI = async () => {
        const booksResponse = await ClienteAxios.get("/libros");
        const studentsResponse = await ClienteAxios.get("/estudiantes");
        const loanResponse = await ClienteAxios.get("/prestamos/" + params.id + "");

        //Formatear fecha para el input tipo date del HTML
        const loanData = loanResponse.data;
        loanData.start_date = loanData.start_date.split("T")[0]; 
        loanData.end_date = loanData.end_date.split("T")[0]; 

        saveEditLoan(loanData);

        saveBooks(booksResponse.data);
        saveStudents(studentsResponse.data);
    
      };
      useEffect(() => {
        ConsultarAPI();
      }, []);
    
      const actualizarState = (e) => {
       // Determina si el evento viene de react-select o de un input/select normal
        const { name, value } = e.target ? e.target : e;

        let newLoan = { ...loan, [name]: value };
      
        if (name === "start_date") {
          const startDate = new Date(value);
          const endDate = new Date(startDate);
          endDate.setDate(startDate.getDate() + 3); // Agrega tres días a la fecha de inicio
      
          const formattedEndDate = endDate.toISOString().split('T')[0];
          newLoan.end_date = formattedEndDate;
        }
      
        saveEditLoan(newLoan);
      };

      //Opciones para el select de react

      const optionsBooks = books.map(book => ({ value: book.id, label: book.title, name: 'book_id' }));
      const optionsStudents = students.map(student => ({ value: student.id, label: student.id, name: 'student_id' }));
  
      const selectedBookOption = books.find(book => book.id === loan.book_id);
      const selectedStudentOption = students.find(student => student.id === loan.student_id);


      const [mensajeError, guardarMensajeError] = useState(null);

      const ModificarPrestamo = async (e) => {
        e.preventDefault();
      
        
        const today = new Date(getTodayString()); 
        const selectedStartDate = new Date(loan.start_date);

        if (selectedStartDate < today) {
          guardarMensajeError("La fecha de inicio debe ser hoy o una fecha futura.");
          return;
        }
            
        const prestamosActivos = await obtenerPrestamosActivos(loan.student_id);
      
        if (prestamosActivos >= 3 && loan.status === 'active') {
          guardarMensajeError("El estudiante ya tiene tres préstamos activos.");
          return;
    
        }
      
        ClienteAxios.patch("/prestamos/"+params.id, {
          start_date: loan.start_date,
          end_date: loan.end_date,
          status: loan.status,
          student_id: loan.student_id,
          book_id: loan.book_id
        }).then((res) => {
          console.log(res);
          guardarMensaje("Préstamo Modificado");
          setTimeout(() => {
            guardarMensaje(null);
          }, 3000);
        }).catch((error) => {
          console.error(error);
        });
      };

    const [mensaje, guardarMensaje] = useState(null);

    const getTodayString = () => {
      const today = new Date();
      const day = (`0${today.getDate()}`).slice(-2);
      const month = (`0${today.getMonth() + 1}`).slice(-2);
      const year = today.getFullYear();
      return `${year}-${month}-${day}`;
    };
  
    const [todayDate, setTodayDate] = useState(getTodayString());
  
  
    return (
      <Fragment>
        <Sidebar />
        <div className="ml-52 p-6">
          <h1 className="text-2xl font-bold mb-8">Actualizar Prestamo</h1>
  
            
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
          
          <form className="flex flex-row space-x-6" onSubmit={ModificarPrestamo}>
          <div className="flex-1">
            <div className="space-y-4">

            <div className="flex flex-col mb-4">
          <Label>Fecha de inicio:</Label>
          <Input
            type="date"
            name="start_date"
            value={loan.start_date}
            min={todayDate}
            onChange={actualizarState}
          />
        </div>

        <div className="flex flex-col mb-4">
              <Label>Fecha de finalización:</Label>
              {new Date(loan.start_date) >=  new Date(new Date().toISOString().split('T')[0])  ? (
                <span className="text-xl">{loan.end_date}</span>
              ) : (
                <span className="text-red-500 text-xl">Elija una fecha de inicio válida</span>
              )}
            </div>


              <div className="flex flex-col mb-4">
                <Label>Estado del préstamo:</Label>
                <select 
                  name="status" 
                  className="border border-gray-300 rounded-md px-3 py-2"
                  value={loan.status} 
                  onChange={actualizarState}
                >
                  <option value="active">Activo</option>
                  <option value="expired">Expirado</option>
                  <option value="returned">Devuelto</option>
                  <option value="cancelled">Cancelado</option>
                  <option value="pending">Pendiente</option>
                </select>
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
                value={selectedStudentOption ? { value: selectedStudentOption.id, label: selectedStudentOption.id } : null}
                isClearable={true}
                isSearchable={true}
                name="student_id"
                options={optionsStudents}
                onChange={actualizarState}
              />
            </div>

            <div className="flex flex-col mb-4">
              <Label>Libro a prestar:</Label>
              <Select
                className="basic-single rounded-sm"
                classNamePrefix="select"
                value={selectedBookOption ? { value: selectedBookOption.id, label: selectedBookOption.title } : null}
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
                        value="Actualizar Prestamo"
                />
              
              
            </div>
          </div>
        </form>
        </div>
      </Fragment>
    );
  }
  
  export default EditLoan;