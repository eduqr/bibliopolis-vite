import "./../../index.css";
import ClienteAxios from "../../config/axios";
import React, { Fragment, useEffect, useDebugValue, useState } from "react";
import Sidebar from "../layout/sidebarNav";
import {ButtonEdit, ButtonDelete, ButtonAdd, Label, Input} from '../ui' ;


function NewBook() {

  const [editorials, guardarEditoriales] = useState([]);

  const consultarAPI = async () => {
    const editorialesConsulta = await ClienteAxios.get("/editorial");
    guardarEditoriales(editorialesConsulta.data);
  };

  useEffect(() => {
    consultarAPI();
  }, []);

  const [libro, guardarLibro] = useState({ 
    id: "",
    title: "",
    author: "",
    isbn: "",
    units: "",
    editorial_id: "",
    image_name: ""
  });

  const actualizarState = (e) => {
    guardarLibro({
      ...libro,
      [e.target.name]: e.target.value,
    });
  };

  const validarLibro = () => {
    const {  title, author, isbn, units} = libro;
    return  !title.length || !author.length || !isbn.length || !units.length;
  };

  const [mensaje, guardarMensaje] = useState(null);

  const agregarLibro = (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append('title', libro.title);
    formData.append('author', libro.author);
    formData.append('isbn', libro.isbn);
    formData.append('units', libro.units);
    formData.append('editorial_id', libro.editorial_id);
    if (imageFile) {
      formData.append('image_name', imageFile);
    }
  
    ClienteAxios.post("/libros", formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }).then(res => {
      console.log(res);
      guardarMensaje("Libro agregado correctamente");
      setTimeout(() => {
        guardarMensaje(null);
      }, 3000);
    });
  };
  const [imageFile, setImageFile] = useState(null);

const handleImageChange = e => {
  if (e.target.files[0]) {
    setImageFile(e.target.files[0]);
  }
};
  return (
    <Fragment>
      <Sidebar />
      <div className="ml-52 p-6">
        <h1 className="text-2xl font-bold mb-8">Nuevo Libro</h1>

          
          {mensaje && (
          <div className="bg-green-200 text-green-800 p-3 mb-4 rounded-md">
            {mensaje}
          </div>
        )}
        
        <form className="flex flex-row space-x-6" onSubmit={agregarLibro} >
          <div className="flex-1">
            <div className="space-y-4">
              <div className="flex flex-col mb-4">
                <Label >Titulo:</Label>
                <Input type="text" name="title"  placeholder="Titulo del libro" onChange={actualizarState} />
                {libro.title.length === 0 && (
                  <span className="text-red-500">El titulo es obligatorio</span>
                )}
              </div>

              <div className="flex flex-col mb-4">
                <Label>Autor:</Label>
                <Input type="text" name="author"  placeholder="Autor del Libro" onChange={actualizarState} />
                {libro.author.length === 0 && (
                  <span className="text-red-500">El autor es obligatorio</span>
                )}
              </div>

              <div className="flex flex-col mb-4">
                <Label>ISBN:</Label>
                <Input type="text" name="isbn"  placeholder="ISBN del libro" onChange={actualizarState} />
                {libro.isbn.length === 0 && (
                  <span className="text-red-500">El ISBN es obligatorio</span>
                )}
              </div>
             
            </div>
          </div>

          <div className="flex-1">
            <div className="space-y-4">
              <div className="flex flex-col mb-4">
                <Label >Unidades en existencia:</Label>
                <Input type="number" name="units" min="0" max="99" placeholder="ej. 14" onChange={actualizarState} />
                {libro.units.length === 0 && (
                  <span className="text-red-500">Las unidades son obligatorias</span>
                )}
              </div>

              <div className="flex flex-col mb-4">
                <Label>Editorial:</Label>
                <select name="editorial_id" className="border border-gray-300 rounded-md px-3 py-2" onChange={actualizarState}>
                  <option value="" selected disabled>Seleccione una editorial</option>
                  {editorials.map(editorial => (
                    <option key={editorial.id} value={editorial.id}>{editorial.name}</option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col mb-4">
                <Label >Imagen del libro:</Label>
                <Input type="file" name="image_name" onChange={handleImageChange} />
               
              </div>

              
                <input className="focus:outline-none text-white focus:ring-4 focus:ring-orange-300 text-center
                                  font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-16 dark:bg-orange-600
                                 dark:hover:bg-orange-700 dark:focus:ring-orange-800 "  
                        type="submit"      
                        disabled={validarLibro()}
                        value="Agregar Libro"
                />
              
              
            </div>
          </div>
        </form>
      </div>
    </Fragment>
  );
}

export default NewBook;
