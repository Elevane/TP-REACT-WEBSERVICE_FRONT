import React from "react";
import NavBar from "./NavBar";
import GoogleMapReact from "google-map-react";
import { useEffect, useState } from "react";
import useLocalStorage from "./auth/Hooks/useLocalStorage";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
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

export default function Home() {
  let [markers, setMarkers] = useState([]);
  let [user, setUser] = useState(useLocalStorage.GetUser());
  let defaultProps = {
    center: {
      lat: 47.1,
      lng: -1,
    },
    zoom: 9,
  };

  useEffect(() => {
    fetch(process.env.REACT_APP_DBHOST_COMPLOT_SEARCH, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        Authorization: "Bearer " + user.token,
        Accept: "*/*",
      },
    })
      .then((data) => {
        if (data.status === 500) throw "Error while calling api";
        if (data === null || data === undefined || data.status === 400)
          toast.error("Failed connection Error" + data);
        else if (!data.isSuccess) toast.error(data.errorMessage);
        else setMarkers(data.result);
      })
      .catch((e) => toast.error(e));
  }, []);

  return (
    <div style={{ width: "100%" }}>
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
            {markers.map((app, index) => (
              <AnyReactComponent
                key={index}
                lat={app.lattitude}
                lng={app.longitude}
                text={app.name}
                style={{ with: "50px", height: "50px" }}
              />
            ))}
          </GoogleMapReact>
        </div>
      </div>
    </div>
  );
}
