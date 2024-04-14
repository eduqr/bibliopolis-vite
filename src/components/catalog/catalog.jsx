import "./../../index.css";
import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../layout/sidebarNav";
import ClienteAxios from "../../config/axios";
import {ButtonEdit, ButtonDelete, ButtonAdd, Label, Input} from '../ui' ;

function Catalog() {
  const [books, setBooks] = useState([]);

  const [visibleBooks, setVisibleBooks] = useState(6);
  const [searchTerm, setSearchTerm] = useState('');


 

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await ClienteAxios.get('/libros');
        setBooks(response.data);
      } catch (error) {
        console.error('Error al obtener libros:', error);
      }
    };

    fetchBooks();
  }, []);

  const showMoreBooks = () => {
    setVisibleBooks(current => current + 6);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredBooks = books.filter(book =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const currentBooks = filteredBooks.slice(0, visibleBooks);

  const deleteBook = async (id) => {
    try {
      const confirmacion = window.confirm("¿Estás seguro de que deseas eliminar este libro?" );
      if (confirmacion) {
        const response = await ClienteAxios.delete("/libros/" + id);
        alert("Libro Eliminado");
        window.location.reload();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Sidebar />
      <div className="container ">
        <div className="flex flex-wrap">
          <div className="w-full md:w-1/3 px-4">
            
          </div>
          <div className="w-full md:w-2/3 px-4">
            <h2 className="text-2xl text-center font-bold mb-4 mt-4">Catálogo de Libros</h2>
            <input
              type="text"
              placeholder="Buscar por título o autor..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="form-input w-full mb-4 mt-4 px-2 py-1 border-2 rounded-lg border-gray-300"
            />

            <div className=" text-right mr-16 mt-8">
            <ButtonAdd to={"/nuevoLibro"}>Añadir libro +</ButtonAdd>
            </div>

            <div className="grid grid-cols-3 gap-4">
              {currentBooks.map(book => (
                <div key={book.id} className="bg-white rounded-lg shadow-md overflow-hidden w-48 mr-4 mt-8">
                  <img src={`http://localhost:8888/uploads/${book.image_name}`} alt={`Imagen libro ${book.title}`} className="w-full h-48 object-cover" />
                  <div className="p-4">
                    <h3 className="text-lg font-medium">{book.title}</h3>
                    <p className="text-sm mb-2">Autor: {book.author}</p>
                    <div className="flex justify-between">
                    <Link to={"/editarLibro/"+ book.id}>
                    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-edit" width="32" height="32" viewBox="0 0 24 24" stroke-width="1.5" stroke="#00abfb" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                        <path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1" />
                        <path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z" />
                        <path d="M16 5l3 3" />
                      </svg>
                    </Link>
                    <Link onClick={() => deleteBook(book.id)}>
                    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-trash" width="32" height="32" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ff2825" fill="none" stroke-linecap="round" stroke-linejoin="round">
                      <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                      <path d="M4 7l16 0" />
                      <path d="M10 11l0 6" />
                      <path d="M14 11l0 6" />
                      <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
                      <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
                    </svg>
                    </Link>

                    <Link to={"/verLibro/"+ book.id}>
                    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-eye" width="32" height="32" viewBox="0 0 24 24" stroke-width="1.5" stroke="#597e8d" fill="none" stroke-linecap="round" stroke-linejoin="round">
                      <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                      <path d="M10 12a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" />
                      <path d="M21 12c-2.4 4 -5.4 6 -9 6c-3.6 0 -6.6 -2 -9 -6c2.4 -4 5.4 -6 9 -6c3.6 0 6.6 2 9 6" />
                    </svg>
                    </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {visibleBooks < books.length && (
          <div className="flex justify-center mt-4">
            <button onClick={showMoreBooks} className="focus:outline-none text-white focus:ring-4 focus:ring-orange-300 text-center
                                  font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-16 dark:bg-orange-900
                                 dark:hover:bg-orange-300 dark:focus:ring-orange-900 ml-80">
              Mostrar más
            </button>
          </div>
        )}
     
    </>
  );
}

export default Catalog;
