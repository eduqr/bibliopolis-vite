import React, { Fragment, useEffect, useState } from "react";
import ClienteAxios from "../../config/axios";
import { Link } from "react-router-dom";
import Sidebar from "../layout/sidebarNav";

function Librarians() {
  return (
    <Fragment>
      <Sidebar />
      <p className=" ml-52">Aquí va el panel de administracion</p>
    </Fragment>
  );
}

export default Librarians;
