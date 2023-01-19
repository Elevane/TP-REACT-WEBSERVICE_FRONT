import { AddCircle, CheckBox } from "@mui/icons-material";
import {
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import useLocalStorage from "./auth/Hooks/useLocalStorage";
import { getAllApi } from "./hooks/useApi";
import NavBar from "./NavBar";

export default function Home() {
  let [complots, setComplots] = useState([]);

  useEffect(() => {
    getAllApi().then((complots) => {
      setComplots(complots);
    });
  }, []);

  return (
    <div style={{ width: "100%" }}>
      <NavBar />
      <div style={{ marginLeft: "20%" }}>
        <div className="w3-container w3-blue">
          <h1>Dashboard</h1>
        </div>
        <Table className="table" style={{ margin: "50px", width: "80%" }}>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Lattitude</TableCell>
              <TableCell>Longitude</TableCell>
              <TableCell>Configuration</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {complots.length > 0 ? (
              complots.map((app, index) => (
                <tr key={index}>
                  <td>{app.name}</td>
                  <td>{app.description}</td>
                  <td>{app.lattitude}</td>
                  <td>{app.longitude}</td>
                  <td>
                    <button type="button" className="btn btn-info m-1">
                      <a
                        style={{ textDecoration: "none" }}
                        href={"/dashboard/update/" + app.id}
                      >
                        edit
                      </a>
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <TableRow>
                <TableCell style={{ borderBottom: "none" }}>
                  <IconButton
                    onClick={() => (window.location.href = "/dashboard/create")}
                  >
                    <AddCircle color="primary"></AddCircle>
                  </IconButton>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
