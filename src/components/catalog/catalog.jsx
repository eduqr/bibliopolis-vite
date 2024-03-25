import "./../../index.css";
import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../layout/sidebarNav";
import ClienteAxios from "../../config/axios";

function Catalog() {
  const [books, setBooks] = useState([]);

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

  return (
    <>
     <Sidebar />
      <div class="container mx-auto">
        <div class="flex flex-wrap">
          <div class="w-full md:w-1/3 px-4">
          </div>
            <div class="w-full md:w-2/3 px-4">
              
                  <h2 class="text-2xl font-bold mb-4">Catálogo de Libros</h2>
                  <div class="grid grid-cols-3 gap-4">
                    
                  </div>
                  <div class="mt-8 flex justify-center">
                  
                    {books.map(book => (
                <div key={book.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <img src={`/Catalog/${book.image_name}`} alt={`Imagen libro ${book.title}`} className="w-full h-48 object-cover" />
                  <div className="p-4">
                    <h3 className="text-lg font-medium">{book.title}</h3>
                    <p className="text-sm mb-2">Autor: {book.author}</p>
                    {/* Agrega más detalles del libro aquí */}
                    <a href="#">Más información</a>
                  </div>
                </div>
              ))}
        
                </div>
                
          </div>
        </div>
      </div>

      /* Paginacion */
      <ul class="flex justify-center">
        <li class="mr-2">
          <a href="#">&laquo;</a>
        </li>
        <li class="px-2">
          <a href="#">1</a>
        </li>
        <li class="px-2">
          <a href="#">2</a>
        </li>
        <li class="px-2">
          <a href="#">3</a>
        </li>
        <li class="ml-2">
          <a href="#">&raquo;</a>
        </li>
      </ul>
    </>
  );
}

export default Catalog;