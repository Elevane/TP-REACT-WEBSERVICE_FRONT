import React from "react";
import NavBar from "./NavBar";
import GoogleMapReact from "google-map-react";
import { useEffect, useState } from "react";
import useLocalStorage from "./auth/Hooks/useLocalStorage";


const AnyReactComponent = ({ text }) => <div style={{position: "absolute",
    top: "50%",
    left: "50%",
    width: "18px",
    height: "18px",
    backgroundColor: "#2196F3",
    border: "2px solid #fff",
    borderRadius: "100%",
    userSelect: "none",}} >{text}</div>;


function getApps() {
  let user = useLocalStorage.GetUser();
  let token = user.token;

  return fetch(process.env.REACT_APP_DBHOST_APPS + "/extended", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      Authorization: "Bearer " + user.token,
      Accept: "*/*",
    },
  }).then((data) => data.json());
}

export default function Home() {
  let [Apps, setApps] = useState([]);
  let  defaultProps = {
    center: {
      lat: 47.1,
      lng: -1,
    },
    zoom: 9,
  };
  let markers = [];
  useEffect(() => {
    getApps().then((value) => {
      console.log(value);
      if (value == undefined || value == null || value.result === undefined) {
        alert("Failed connection Error");
      } else if (!value.isSuccess) {
        alert(value);
        alert(value.errorMessage);
      } else {
        setApps(value.result);
        
      }
    });
  }, []);
 

  return (
    <div>
      <NavBar />
      <div style={{ marginLeft: "25%" }}>
        <div className="w3-container w3-blue">
          <h1>Carte</h1>
        </div>
        <div style={{ height: "95vh", width: "100%" }}>
          <GoogleMapReact
            bootstrapURLKeys={{ key: "" }}
            defaultCenter={defaultProps.center}
            defaultZoom={defaultProps.zoom}
          >
            {Apps.map((app, index) => (
      <AnyReactComponent
        key={index}
        lat={app.lattitude}
        lng={app.longitude}
        text={app.name}
        style={{with :"50px", height: "50px"}}
      />
      
    ))}
           
            </GoogleMapReact>
        </div>
      </div>
    </div>
  );
}
