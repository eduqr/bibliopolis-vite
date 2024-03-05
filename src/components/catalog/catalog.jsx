import "./../../index.css";
import { Link } from "react-router-dom";
import { Fragment } from "react";
import Sidebar from "../layout/sidebarNav";

function Catalog() {
  return (
    <>
      <Sidebar />
      <p className=" ml-52">Aquí va el catálogo de libros</p>
    </>
  );
}

export default Catalog;
