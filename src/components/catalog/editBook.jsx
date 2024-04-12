import "./../../index.css";
import ClienteAxios from "../../config/axios";
import React, { Fragment, useEffect, useDebugValue, useState } from "react";
import Sidebar from "../layout/sidebarNav";
import {ButtonEdit, ButtonDelete, ButtonAdd, Label, Input} from '../ui' ;
import { useParams } from "react-router-dom";


function EditBook() {
    const { id } = useParams(); // Obtener el ID del libro desde la URL
  
    const [editorials, setEditorials] = useState([]);
    const [libro, setLibro] = useState({
      id: "",
      title: "",
      author: "",
      isbn: "",
      units: "",
      editorial_id: "",
      image_name: ""
    });
    const [imageFile, setImageFile] = useState(null);
    const [mensaje, setMensaje] = useState(null);
  
    useEffect(() => {
      const cargarEditoriales = async () => {
        const resultado = await ClienteAxios.get("/editorial");
        setEditorials(resultado.data);
      };
  
      const cargarLibro = async () => {
        const resultado = await ClienteAxios.get(`/libros/${id}`);
        setLibro({
          ...resultado.data,
          imageUrl: resultado.data.image_name ? `http://localhost:8888/uploads/${resultado.data.image_name}` : null
        });
      };
  
      cargarEditoriales();
      cargarLibro();
    }, [id]);
  
    const actualizarState = e => {
      setLibro({
        ...libro,
        [e.target.name]: e.target.value
      });
    };
  
    const handleImageChange = e => {
      setImageFile(e.target.files[0]);
    };
  
    const handleSubmit = async e => {
      e.preventDefault();
  
      const formData = new FormData();
      formData.append('title', libro.title);
      formData.append('author', libro.author);
      formData.append('isbn', libro.isbn);
      formData.append('units', libro.units);
      formData.append('editorial_id', libro.editorial_id);

       // Agrega la imagen solo si se ha seleccionado una nueva
  if (imageFile) {
    formData.append('image_name', imageFile);
  } else {
    formData.append('image_name', libro.image_name);
  }
  
      try {
        const res = await ClienteAxios.patch(`/libros/${id}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        console.log(res);
        setMensaje("Libro actualizado correctamente");
        setTimeout(() => {
          setMensaje(null);
        }, 3000);
      } catch (error) {
        console.error("Error al actualizar el libro", error);
        setMensaje("Error al actualizar el libro");
      }
    };

    const validarLibro = () => {
        const { title, author, isbn } = libro;
        let valido =
          !title.length || !author.length || !isbn.length  ;
        return valido;
      };
  
    return (
      <Fragment>
        <Sidebar />
        <div className="ml-52 p-6">
          <h1 className="text-2xl font-bold mb-8">Editar Libro</h1>
          
          {mensaje && (
            <div className="bg-green-200 text-green-800 p-3 mb-4 rounded-md">
              {mensaje}
            </div>
          )}
          
          <form className="flex flex-row space-x-6" onSubmit={handleSubmit}>
          <div className="flex-1">
            <div className="space-y-4">
              <div className="flex flex-col mb-4">
                <Label >Titulo:</Label>
                <Input type="text" name="title" value={libro.title} placeholder="Titulo del libro" onChange={actualizarState} />
                {libro.title.length === 0 && (
                  <span className="text-red-500">El titulo es obligatorio</span>
                )}
              </div>

              <div className="flex flex-col mb-4">
                <Label>Autor:</Label>
                <Input type="text" name="author" value={libro.author} placeholder="Autor del Libro" onChange={actualizarState} />
                {libro.author.length === 0 && (
                  <span className="text-red-500">El autor es obligatorio</span>
                )}
              </div>

              <div className="flex flex-col mb-4">
                <Label>ISBN:</Label>
                <Input type="text" name="isbn" value={libro.isbn} placeholder="ISBN del libro" onChange={actualizarState} />
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
                <Input type="number" name="units" min="0" max="99" value={libro.units} placeholder="ej. 14" onChange={actualizarState} />
                {libro.units.length === 0 && (
                  <span className="text-red-500">Las unidades son obligatorias</span>
                )}
              </div>

              <div className="flex flex-col mb-4">
                <Label>Editorial:</Label>
                <select name="editorial_id" value={libro.editorial_id} className="border border-gray-300 rounded-md px-3 py-2" onChange={actualizarState}>
                  <option  selected disabled>Seleccione una editorial</option>
                  {editorials.map(editorial => (
                    <option key={editorial.id} value={editorial.id}>{editorial.name}</option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col mb-4">
                <Label >Imagen del libro:</Label>
                {libro.imageUrl && (
                 <img src={libro.imageUrl} alt="Imagen actual del libro" className="w-32 h-32 mb-4" />
                )}
                  <Input type="file" name="image_name" onChange={handleImageChange} />
                              
              </div>

              
                <input className="focus:outline-none text-white focus:ring-4 focus:ring-orange-300 text-center
                                  font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-16 dark:bg-orange-600
                                 dark:hover:bg-orange-700 dark:focus:ring-orange-800 "  
                        type="submit"      
                        disabled={validarLibro()}

                        value="Actualizar Libro"
                />
              
              
            </div>
          </div>
          </form>
        </div>
      </Fragment>
    );
  }
  
  export default EditBook;