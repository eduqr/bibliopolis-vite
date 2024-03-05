import "./../../index.css";
import { Link } from "react-router-dom";
import { Fragment } from "react";
import Sidebar from "../layout/sidebarNav";

function Stats() {
  return (
    <>
      <Sidebar />
      <p className=" ml-52">Aquí va el panel de estadísticas</p>
    </>
  );
}

export default Stats;
