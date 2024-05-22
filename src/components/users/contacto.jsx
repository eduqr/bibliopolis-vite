import "./../../index.css";
import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import NavBar from "../layout/navBar";
import ClienteAxios from "../../config/axios";
import {ButtonEdit, ButtonDelete, ButtonAdd, Label, Input} from '../ui' ;

function Contact() {
    return (
        <div className="min-h-screen bg-gray-100">
            <NavBar />
            <div className="container mx-auto px-4 py-8">
                <div className="bg-white shadow rounded-lg p-6 md:p-12">
                    <div className="text-center">
                        <h2 className="text-2xl font-semibold mb-2">¿Tienes alguna sugerencia?</h2>
                        <p className="text-gray-600 mb-6">Escríbenos a nuestro email o utiliza el formulario de contacto.</p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <form action="#" method="POST">
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                                        Nombre
                                    </label>
                                    <input type="text" id="name" name="name" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                                        Email
                                    </label>
                                    <input type="email" id="email" name="email" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="message">
                                        Mensaje
                                    </label>
                                    <textarea id="message" name="message" rows="4" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" required></textarea>
                                </div>
                                <div className="flex items-center justify-between">
                                    <button className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                                        Enviar
                                    </button>
                                </div>
                            </form>
                        </div>
                        <div className="flex flex-col items-center justify-center">
                            <p className="mb-4">O envíanos un email directamente:</p>
                            <a href="mailto:contacto@ejemplo.com" className="text-blue-500 hover:underline">soportebibliopolis@gmail.com</a>
                            
                             
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Contact;
  