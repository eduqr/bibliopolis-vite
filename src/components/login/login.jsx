import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useNavigate } from 'react-router-dom';
import React, { Fragment, useEffect, useDebugValue, useState } from "react";
import {Button, Label, Input} from '../ui' ;
import ClienteAxios from "../../config/axios";
import { useRef } from 'react';

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 3000,
};

function login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const userTypeRef = useRef(null);
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleOtpChange = (event) => {
    setOtp(event.target.value);
  };
  
     


  const sendOTP = async (event) => {
    event.preventDefault();

    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setError("Por favor, ingresa un correo electrónico válido.");
      return;
    }
  
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
  
    try {
      
      let response = await ClienteAxios.post('http://localhost:8888/bibliotecarios-email', { email }, config);
      if (response.status === 200 && response.data) {
        
        console.log("Usuario verificado como bibliotecario", response.data);
        userTypeRef.current = 'bibliotecario';
        localStorage.setItem('userId', response.data.id);  // Guardar el ID del estudiante

      } else {
        let responseStudent = await ClienteAxios.post('http://localhost:8888/estudiantes-email', { email }, config);
        if (responseStudent.status === 200 && responseStudent.data) {
          console.log("Usuario verificado como estudiante", responseStudent.data);
          userTypeRef.current = 'estudiante';
          localStorage.setItem('userId', responseStudent.data.id);  // Guardar el ID del estudiante

        }
      }
  
      if (userTypeRef.current) {
        // Intenta enviar el OTP solo si el usuario es verificado
        let otpResponse = await ClienteAxios.post('http://localhost:8888/send-email', { email }, config);
        if (otpResponse.status === 200) {
          console.log("OTP sent to", email);
          setOtpSent(true);
        } else {
          throw new Error(`Failed to send OTP. Status: ${otpResponse.status}`);
        }
      } else {
        // Si no se encuentra ni como bibliotecario ni como estudiante
        throw new Error('No se encontró el usuario');
      }
    } catch (error) {
      setError("Cuenta no registrada.");
      console.error("Error en la verificación del usuario", error);
    }
  };
 

  const verifyOtp = async (event) => {
    event.preventDefault();

    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
  
    console.log("Enviando para verificación:", { email, otp }); // Diagnóstico
  
    try {
      let response = await ClienteAxios.post('http://localhost:8888/verify-otp', { email, otp }, config);
      if (response.status === 200) {
        console.log("OTP verificado correctamente", response.data);
        const userId = localStorage.getItem('userId'); // Recuperar el ID del usuario


        if (userTypeRef.current === 'bibliotecario') {
          navigate('/bibliotecarios');
        } else if (userTypeRef.current === 'estudiante') {
          navigate('/usuarios');
        }

      } else {
        console.log("Respuesta recibida:", response); // Diagnóstico adicional
        throw new Error('OTP incorrecto');
      }
    } catch (error) {
      console.error("Error en la verificación del OTP:", error);
      setError("OTP incorrecto. Por favor, intenta de nuevo.");
    }
  };
 
  
  return (
    <Fragment>
      <div className="flex flex-col sm:flex-row m-auto justify-start items-center w-full sm:w-11/12 md:w-2/3">
        <div className="w-full md:w-2/3 mt-20">
        <Slider {...settings}>
            <div>
              <img
                src="/logoPolitecnico.png"
                alt="Imagen 1"
                className="w-full h-auto"
              />
              <h3 className="font-bold text-center">Diseñado para la UPQROO</h3>
              <p className="text-gray-900 text-center">
                Bibliopolis es un software de gestión bibliotecaria pensado en
                las necesidades de la universidad
              </p>
            </div>

            <div className="flex flex-col items-center justify-center h-screen">
              <img src="../public/Img1.png" alt="Imagen 2" className="m-auto" />
              <h3 className="font-bold text-center">
                Olvídese de los registros en papel
              </h3>
              <p className="text-gray-900 text-center">
                Simplificamos la gestión eliminando los registros manuales y
                montones de documentos
              </p>
            </div>

            <div className="flex flex-col items-center justify-center h-screen">
              <img src="../public/Img2.png" alt="Imagen 2" className="m-auto" />
              <h3 className="font-bold text-center">
                Seguimiento fácil de préstamos
              </h3>
              <p className="text-gray-900 text-center">
                Mantenga el control total de los préstamos realizados y realice
                un seguimiento de forma sencilla{" "}
              </p>
            </div>

            <div className="flex flex-col items-center justify-center h-screen">
              <img src="../public/Img3.png" alt="Imagen 2" className="m-auto" />
              <h3 className="font-bold text-center">Catálogo actualizado</h3>
              <p className="text-gray-900 text-center">
                Software pensado para las necesidades de la universidad
              </p>
            </div>
          </Slider>
        </div>
  
        <div className="mt-5 pt-10 pb-8 selection:shadow-xl ring-1 ring-gray-900/5 sm:mx-auto sm:max-w-lg sm:rounded-lg bg-gray-50 w-full sm:w-1/2 lg:w-1/3 relative flex-col px-6 py-12 lg:px-8 m-auto">
          <div className="sm:mx-auto sm:w-1/2 sm:max-w-sm">
            <img
              className="mx-auto h-30 w-auto"
              src="../../public/isologo.png"
              alt="Your Company"
            />
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Inicia sesión en tu cuenta
            </h2>
          </div>
  
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-md">
            <form className="space-y-6">
              <div>
                <Label htmlFor="email">Correo electrónico</Label>
                <div className="mt-2">
                  <Input
                    placeholder="Tu correo"
                    type="email"
                    id="email"
                    name="email"
                    value={email}
                    onChange={handleEmailChange}
                    required
                  />
                  {error && <p className="text-red-500 text-xs italic">{error}</p>}
                </div>
              </div>
  
              {!otpSent ? (
                <div>
                  <Button onClick={sendOTP}>
                    Enviar email
                  </Button>
                </div>
              ) : (
                <Fragment>
                  <div>
                    <Label htmlFor="otp">Código</Label>
                    <div className="mt-2">
                      <Input
                        placeholder="Introduce tu código"
                        type="text"
                        id="otp"
                        name="otp"
                        value={otp}
                        onChange={handleOtpChange}
                        required
                      />
                    </div>
                  </div>
  
                  <div>
                    <Button onClick={verifyOtp}>
                      Iniciar sesión
                    </Button>
                  </div>
                </Fragment>
              )}
            </form>
          </div>
        </div>
      </div>
    </Fragment>
  );
  
}
export default login;
