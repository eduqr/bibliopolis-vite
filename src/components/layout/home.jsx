import "./../../index.css";
import { Link } from "react-router-dom";
import { Fragment } from "react";
import Sidebar from "./sidebarNav";

function Home() {
  return (
    <>
      <Sidebar />
      <p className=" ml-52">Aquí va el panel de administración</p>
    </>
  );
}

export default Home;
