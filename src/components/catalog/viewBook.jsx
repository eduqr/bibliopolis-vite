import "./../../index.css";
import ClienteAxios from "../../config/axios";
import React, { Fragment, useEffect, useDebugValue, useState } from "react";
import Sidebar from "../layout/sidebarNav";
import {ButtonEdit, ButtonDelete, ButtonAdd, Label, Input} from '../ui' ;
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";


function ViewBook() {
    const { id } = useParams();  // Obtener el ID del libro de la URL
    const [libro, setLibro] = useState({});
    const [editorial, setEditorial] = useState('');

    // Función para cargar los detalles del libro
    useEffect(() => {
        const cargarLibro = async () => {
            const result = await ClienteAxios.get(`/libros/${id}`);
            setLibro(result.data);
            if (result.data.editorial_id) {
                const editorialData = await ClienteAxios.get(`/editorial/${result.data.editorial_id}`);
                setEditorial(editorialData.data.name);
            }
        };

        cargarLibro();
    }, [id]);  // Dependencia basada en el id, usando el hook useParams

    return (
        <Fragment>
          <Sidebar />
          <div className="ml-52 p-6">
            <div className="bg-white rounded-lg shadow-md p-4">
              <h1 className="text-2xl font-heading mb-8">Detalles del Libro</h1>
              {libro ? (
                <div className="flex flex-col">
                  <div className="mb-2">
                    <strong>Título:</strong> {libro.title}
                  </div>
                  <div className="mb-2">
                    <strong>Autor:</strong> {libro.author}
                  </div>
                  <div className="mb-2">
                    <strong>ISBN:</strong> {libro.isbn}
                  </div>
                  <div className="mb-2">
                    <strong>Unidades en existencia:</strong> {libro.units}
                  </div>
                  <div className="mb-2">
                    <strong>Editorial:</strong> {editorial}
                  </div>
                  <div className="mb-2">
                  {libro.image_name && (
  <div className="flex flex-col">
    <img
      src={`http://localhost:8888/uploads/${libro.image_name}`}
      alt="Imagen del Libro"
      className="w-48 border border-gray-300 hover:shadow-lg"
    />
  </div>
  
)}
 <Link to={"/catalogo"} className="focus:outline-none text-white focus:ring-4 focus:ring-orange-300 text-center
                                  font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-16 dark:bg-orange-900
                                 dark:hover:bg-orange-300 dark:focus:ring-orange-900 ml-80">Volver</Link>
</div>
                 
</div>
        ) : (
            <p className="text-gray-500">Cargando...</p>
        )}
        </div>
         </div>
        </Fragment>
      );
    }
    
    export default ViewBook;