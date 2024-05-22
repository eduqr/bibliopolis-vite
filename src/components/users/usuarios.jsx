import "./../../index.css";
import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import NavBar from "../layout/navBar";
import ClienteAxios from "../../config/axios";
import {ButtonEdit, ButtonDelete, ButtonAdd, Label, Input} from '../ui' ;

function Users() {
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
  
    return (
    <div>
        <NavBar />
      <div className="container mx-auto px-4">
        <h2 className="text-2xl text-center font-bold mb-4  mt-8">Catálogo de Libros</h2>
        <input
          type="text"
          placeholder="Buscar por título o autor..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="form-input w-full mb-4 mt-4 px-2 py-1 border-2 rounded-lg border-gray-300"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {currentBooks.map(book => (
            <div key={book.id} className="bg-white rounded-lg shadow-md overflow-hidden w-full mt-8">
              <img src={`http://localhost:8888/uploads/${book.image_name}`} alt={`Imagen libro ${book.title}`} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="text-lg font-medium">{book.title}</h3>
                <p className="text-sm mb-2">Autor: {book.author}</p>
                <ButtonAdd to={`/detallesLibro/${book.id}`}>
                  Ver libro
                </ButtonAdd>
              </div>
            </div>
          ))}
        </div>
        {visibleBooks < books.length && (
          <div className="flex justify-center mt-4 mb-4">
            <button onClick={showMoreBooks} className="bg-orange-900 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded">
              Mostrar más
            </button>
          </div>
        )}
      </div>
      </div>
    );
  }
  
  export default Users;
  