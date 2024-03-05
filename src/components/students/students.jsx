import React, { Fragment, useEffect, useState } from "react";
import ClienteAxios from "../../config/axios";
import { Link } from "react-router-dom";
import Sidebar from "../layout/sidebarNav";
import { Card } from "@material-tailwind/react";
import "./../../index.css";

const TABLE_HEAD = ["Nombre", "Apellido", "Correo", "", ""];

function Students() {
  const [students, saveStudents] = useState([]);
  const ConsultarAPI = async () => {
    const StudentsCheck = await ClienteAxios.get("/estudiantes");

    saveStudents(StudentsCheck.data);
    console.log(students);
  };
  useEffect(() => {
    ConsultarAPI();
  }, []);
  return (
    <Fragment>
      <Sidebar />

      <Card className="w-2/3 overflow-scroll m-auto">
        <table className="w-2/3 min-w-max table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th
                  key={head}
                  className="border-b border-blueGray-400 bg-blueGray-50 p-4 font-normal leading-none opacity-70"
                >
                  {head}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {students.map(({ name, lastname, email }, index) => (
              <tr key={name} className="even:bg-blueGray-50/50 font-normal">
                <td className="p-4">{name}</td>
                <td className="p-4">{lastname}</td>
                <td className="p-4">{email}</td>
                <td className="p-4">
                  <Link to={"#"}>Editar</Link>
                </td>
                <td className="p-4">
                  <Link to={"#"}>Eliminar</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </Fragment>
  );
}

export default Students;
