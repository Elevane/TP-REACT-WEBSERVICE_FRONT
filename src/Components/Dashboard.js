import { AddCircle, Delete, ModeEdit } from "@mui/icons-material";
import {
  Chip,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import useColors from "./auth/Hooks/useColors";
import { getAllApi } from "./hooks/useApi";
import NavBar from "./NavBar";

export default function Home() {
  let [complots, setComplots] = useState([]);

  useEffect(() => {
    getAllApi().then((complots) => {
      if (!complots.isSucess) toast.error(complots.error);
      setComplots(complots.result);
    });
  }, []);

  const deleteComplot = async () => {};

  return (
    <div style={{ width: "100%" }}>
      <NavBar />
      <div style={{ marginLeft: "20%" }}>
        <div className="w3-container w3-blue">
          <h1 style={{ paddingLeft: "50px" }}>Dashboard</h1>
        </div>
        <Table className="table" style={{ margin: "50px" }}>
          <TableHead>
            <TableRow>
              <TableCell style={{ fontWeight: "bold" }}>Name</TableCell>
              <TableCell style={{ fontWeight: "bold" }}>Description</TableCell>
              <TableCell style={{ fontWeight: "bold" }}>Lattitude</TableCell>
              <TableCell style={{ fontWeight: "bold" }}>Longitude</TableCell>
              <TableCell style={{ fontWeight: "bold" }}>Genres</TableCell>
              <TableCell style={{ fontWeight: "bold" }}>
                Configuration
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell style={{ borderBottom: "none" }}>
                <IconButton
                  onClick={() => (window.location.href = "/dashboard/create")}
                >
                  <AddCircle color="primary"></AddCircle>
                </IconButton>
              </TableCell>
            </TableRow>
            {complots.map((app, index) => (
              <TableRow key={index}>
                <TableCell>{app.name}</TableCell>
                <TableCell
                  style={{
                    height: "200px",
                    width: "600px",
                  }}
                >
                  {app.description}
                </TableCell>
                <TableCell>
                  <Typography color="primary">
                    {app.lattitude.toFixed(2)}
                  </Typography>{" "}
                </TableCell>
                <TableCell>
                  <Typography color="primary">
                    {" "}
                    {app.longitude.toFixed(2)}
                  </Typography>
                </TableCell>
                <TableCell>
                  {app.genres &&
                    app.genres.map((elm, index) => (
                      <Chip
                        key={index}
                        label={elm.name}
                        style={{
                          margin: "2px",
                          backgroundColor: useColors.getColors(elm.genreId),
                        }}
                      ></Chip>
                    ))}
                </TableCell>
                <TableCell>
                  <IconButton
                    onClick={() =>
                      (window.location.href = "/dashboard/update/" + app.id)
                    }
                  >
                    <ModeEdit />
                  </IconButton>
                  <IconButton onClick={deleteComplot}>
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
