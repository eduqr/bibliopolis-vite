import "./../../index.css";
import ClienteAxios from "../../config/axios";
import React, { Fragment, useEffect, useDebugValue, useState } from "react";
import NavBar from "../layout/navBar";
import {ButtonEdit, ButtonDelete, ButtonAdd, Label, Input} from '../ui' ;
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";


function ViewDetailsBook() {
    const { id } = useParams();
    const [libro, setLibro] = useState(null);
    const [editorial, setEditorial] = useState('');

    useEffect(() => {
        const cargarLibro = async () => {
            try {
                const result = await ClienteAxios.get(`/libros/${id}`);
                setLibro(result.data);
                if (result.data.editorial_id) {
                    const editorialData = await ClienteAxios.get(`/editorial/${result.data.editorial_id}`);
                    setEditorial(editorialData.data.name);
                }
            } catch (error) {
                console.log('Error al cargar detalles del libro:', error);
            }
        };

        cargarLibro();
    }, [id]);

    return (
        <Fragment>
            <NavBar />
            <div className="container mx-auto px-4 py-8">
                <div className="bg-white shadow-lg rounded-lg p-6 md:p-10">
                    <h1 className="text-3xl font-semibold text-center mb-8">Detalles del Libro</h1>
                    {libro ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                            {libro.image_name && (
                                <img
                                    src={`http://localhost:8888/uploads/${libro.image_name}`}
                                    alt={`Portada de ${libro.title}`}
                                    className="max-w-full md:max-w-sm mx-auto rounded-lg shadow-md"
                                />
                            )}
                            <div>
                                <h2 className="text-2xl font-bold mb-3">{libro.title}</h2>
                                <p className="text-xl text-gray-800 mb-2"><strong>Autor:</strong> {libro.author}</p>
                                <p className="text-gray-700 mb-2"><strong>ISBN:</strong> {libro.isbn}</p>
                                <p className="text-gray-700 mb-2"><strong>Editorial:</strong> {editorial || 'No especificada'}</p>
                                <p className="text-gray-700 mb-2"><strong>Unidades en existencia:</strong> {libro.units}</p>
                               
                                <Link to="/usuarios" className="mt-4 inline-block bg-orange-900 hover:bg-orange-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                                    Volver al catálogo
                                </Link>
                                <div className="mt-6">
                                    <h3 className="text-lg font-medium mb-2">¿Te interesa? Solicita tu préstamo ahora mismo</h3>
                                    <Link to={`/solicitarPrestamo/${id}`} className="bg-orange-600 hover:bg-orange-300 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                                        Solicitar préstamo
                                    </Link>
                                </div>
                            </div>
                            
                        </div>
                    ) : (
                        <p className="text-center text-gray-500">Cargando detalles del libro...</p>
                    )}
                </div>
            </div>
        </Fragment>
    );
}

export default ViewDetailsBook;