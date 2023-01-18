import { useState, useParams } from "react";
import useLocalStorage from "../auth/Hooks/useLocalStorage";
import GoogleMapReact from "google-map-react";
import React from "react";
import { TextareaAutosize, TextField, Button, Switch } from "@mui/material";

const AnyReactComponent = ({ text }) => (
  <div
    style={{
      position: "absolute",
      top: "50%",
      left: "50%",
      width: "18px",
      height: "18px",
      backgroundColor: "#2196F3",
      border: "2px solid #fff",
      borderRadius: "100%",
      userSelect: "none",
    }}
  >
    {text}
  </div>
);

function updateAppApi(id, lattitude, longitude, name, active) {
  let user = useLocalStorage.GetUser();
  let app = {
    id: id,
    lattitude: parseFloat(lattitude),
    longitude: parseFloat(longitude),
    name: name,
    active: active,
  };

  return fetch(process.env.REACT_APP_DBHOST_APPS, {
    method: "PUT",
    body: JSON.stringify(app),
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      Authorization: "Bearer " + user.token,
      Accept: "*/*",
    },
  });
}
export default function Edit(props) {
  const [name, setName] = useState(props.name);
  const [lattitude, setLattitude] = useState(props.lat);
  const [longitude, setLongitude] = useState(props.lng);
  const [active, setActive] = useState(props.active);
  const [description, setDescription] = useState(props.description);

  const { id } = useParams();

  const ChangePos = (e) => {
    setLattitude(e.lat);
    setLongitude(e.lng);
  };

  const Update = () => {
    updateAppApi(id, lattitude, longitude, name, active).then((value) => {
      if (value.status !== 200) {
        alert("Failed connection Error");
      }
    });
  };

  const Cancel = () => {
    window.location.href = "/dashboard";
  };

  return (
    <div
      style={{
        margin: "50px",
        width: "40%",
        height: "1200px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "flex-start",
      }}
    >
      <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
        <h2>Creation d'un Complot</h2>
      </div>

      <TextField
        className="form-control"
        required={true}
        value={name}
        id="outlined-basic"
        label="Name"
        variant="outlined"
        onChange={(e) => setName(e.target.value)}
      />

      <TextareaAutosize
        disabled={true}
        className="form-control"
        required={true}
        value={description}
        id="outlined-basic"
        label="Description"
        variant="outlined"
        minRows={7}
        maxRows={7}
        onChange={(e) => setDescription(e.target.value)}
      />
      <div
        style={{
          width: "60%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <TextField
          type="number"
          required={true}
          value={lattitude}
          id="outlined-basic"
          label="Lattitude"
          variant="outlined"
          onChange={(e) => setLattitude(e.target.value)}
        />
        <TextField
          type="number"
          required={true}
          value={lattitude}
          id="outlined-basic"
          label="Lattitude"
          variant="outlined"
          onChange={(e) => setLattitude(e.target.value)}
        />
      </div>
      <div
        style={{
          width: "10%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h5>Public</h5>
        <Switch
          label="Public"
          checked={active}
          onClick={() => setActive(!active)}
        />
      </div>

      <div
        style={{
          height: "50vh",
          width: "100%",
        }}
      >
        <GoogleMapReact
          onClick={(e) => ChangePos(e)}
          bootstrapURLKeys={{ key: "" }}
          defaultCenter={{ lat: 48, lng: -1 }}
          defaultZoom={11}
        >
          <AnyReactComponent lat={lattitude} lng={longitude} />
        </GoogleMapReact>
      </div>

      <div
        style={{
          width: "22%",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Button variant="outlined" onClick={Cancel}>
          Cancel
        </Button>
        <Button variant="contained" onClick={() => Update()}>
          Save
        </Button>
      </div>
    </div>
  );
}
