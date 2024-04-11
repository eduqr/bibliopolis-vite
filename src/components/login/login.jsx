import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React, { Fragment } from "react";
import {Button, Label, Input} from '../ui' ;

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
  return (
    <Fragment>
      <div className="w-2/3 flex flex-row m-auto justify-start items-center">
        <div className="w-2/3">
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

        <div className="sm:px-10 mt-10 pt-10 pb-8 selection:shadow-xl ring-1 ring-gray-900/5 sm:mx-auto sm:max-w-lg sm:rounded-lg bg-gray-50 w-full relative flex-col  px-6 py-12 lg:px-8  m-auto">
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

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6" action="#" method="POST">
              <div>
                <Label htmlFor="email">
                  Correo electrónico
                </Label>
                <div className="mt-2">
                  <Input placeholder="Tu correo"
                         type="email"
                         id="email"
                         name="email"
                         required
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                <Label htmlFor="password">
                  Contraseña
                </Label>
                </div>
                <div className="mt-2">
                <Input placeholder="Tu contraseña"
                       type="password"
                       id="password"
                       name="password"
                       required
                
                />
                </div>
              </div>

              <div>
                <Button to={"/bibliotecarios"}>
                  Iniciar sesión
                </Button>
              </div>
            </form>

            <p className="mt-10 text-center text-sm text-gray-900">
              ¿No tienes cuenta?{" "}
              <a
                href="#"
                className="font-semibold leading-6 text-gray-900 hover:text-gray-900"
              >
                Únete a Bibliopolis
              </a>
            </p>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
export default login;
