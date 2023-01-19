import { useEffect, useState } from "react";
import GoogleMapReact from "google-map-react";
import React from "react";
import SearchComplot from "./SearchComplot";
import { toast } from "react-toastify";
import { TextareaAutosize, TextField, Button, Switch, Select, MenuItem, Chip } from "@mui/material";
import Marker from "../Marker";
import { getOneApi, createComplotApi, getAllGenresApi } from "../hooks/useApi";
import { useParams } from "react-router-dom";

export default function Create() {
  const [name, setName] = useState("");
  const [lattitude, setLattitude] = useState(55);
  const [longitude, setLongitude] = useState(55);
  const [active, setActive] = useState(true);
  const [description, setDescription] = useState("");
  const [ possibleGenres, setPossibleGenres] = useState([])
  const [genres, setGenres] = useState([])

  const color = ["#faedcd", "#d4a373", "#ccd5ae", "#e9edc9", "#fefae0"];

  const getColor = (key) => {
    return color[key];
  };
  const ChangePos = (e) => {
    setLattitude(e.lat);
    setLongitude(e.lng);
  };

  const id = useParams();

  const getDesc = async (desc) => {
    var res = await getOneApi(desc);
    if (!res.isSucess) toast.error(res.error);
    setName(res.result.title);
    setDescription(res.result.extract);
  };

  useEffect(() => {
    getAllGenresApi().then((value) => {
      if(!value.isSucess) toast.error(value.error)
      setPossibleGenres(value.result)
    })

  }, [])

  const Cancel = () => {
    window.location.href = "/dashboard";
  };

  const Create = async () => {
    var res = await createComplotApi(
      id,
      lattitude,
      longitude,
      name,
      active,
      description
    );
    if (!res.isSucess) toast.error(res.error);
    if (res.isSucess) Cancel();
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
      <div style={{display: "flex"}}>
      {genres &&
              genres.map((elm, index) => (
                <Chip
                  key={index}
                  label={elm.name}
                  style={{ margin: "5px", backgroundColor: getColor(index) }}
                ></Chip>
              ))}
      </div>
      <Select style={{width :"150px"}}>
        {possibleGenres.map((elm, index) => <MenuItem key={index} value={elm.name} onClick={() => {setGenres([...genres, elm]); setPossibleGenres([...possibleGenres], elm)}}>{elm.name}</MenuItem>)}
      </Select>
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
          <Marker lat={lattitude} lng={longitude} />
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
