import { useState } from "react";
import useLocalStorage from "../auth/Hooks/useLocalStorage";
import GoogleMapReact from "google-map-react";
import React from "react";
import SearchComplot from "./SearchComplot";
import { toast } from "react-toastify";
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
async function getDescApi(search) {
  return fetch(
    process.env.REACT_APP_DBHOST_COMPLOT_SEARCH + "/searchOne?title=" + search,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        Accept: "*/*",
      },
    }
  ).then((data) => data.json());
}

function CreateNewApp(lattitude, longitude, name, active, description) {
  let user = useLocalStorage.GetUser();
  let app = {
    lattitude: parseFloat(lattitude),
    longitude: parseFloat(longitude),
    name: name,
    description: description,
    public: active,
  };
  return fetch(process.env.REACT_APP_DBHOST_COMPLOT_SEARCH, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      Authorization: "Bearer " + user.token,
      Accept: "*/*",
    },
    body: JSON.stringify(app),
  });
}

export default function Create() {
  const [name, setName] = useState("");
  const [lattitude, setLattitude] = useState(55);
  const [longitude, setLongitude] = useState(55);
  const [active, setActive] = useState(true);
  const [description, setDescription] = useState("");
  const ChangePos = (e) => {
    setLattitude(e.lat);
    setLongitude(e.lng);
  };

  const getDesc = async (desc) => {
    await getDescApi(desc).then((value) => {
      if (value === null || value === undefined || value.status === 400)
        toast.error("Failed connection Error");
      else {
        setDescription(value.result.extract);
        setName(desc);
      }
    });
  };
  const Cancel = () => {
    window.location.href = "/dashboard";
  };
  const Create = async () => {
    await CreateNewApp(lattitude, longitude, name, active, description).then(
      (value) => {
        if (value === null || value === undefined || value.status === 404)
          toast.error("Failed connection Error.");
        else if (!value.isSuccess) toast.error(`Could not create complot.`);
        else toast.success("value");
      }
    );
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
      <SearchComplot getDesc={getDesc} />
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
        <Button variant="contained" onClick={() => Create()}>
          Save
        </Button>
      </div>
    </div>
  );
}
