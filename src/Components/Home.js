import React from "react";
import NavBar from "./NavBar";
import GoogleMapReact from "google-map-react";
import { useEffect, useState } from "react";
import useLocalStorage from "./auth/Hooks/useLocalStorage";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import Marker from "./Marker";
import { getAllApi } from "./hooks/useApi";

export default function Home() {
  let [markers, setMarkers] = useState([]);
  let defaultProps = {
    center: {
      lat: 47.1,
      lng: -1,
    },
    zoom: 9,
  };

  useEffect(() => {
    getAllApi().then((complots) => {
      setMarkers(complots);
    });
  }, []);

  return (
    <div style={{ width: "100%" }}>
      <NavBar />
      <div style={{ marginLeft: "20%" }}>
        <div className="w3-container">
          <h1>Carte</h1>
        </div>
        <div style={{ height: "95vh", width: "100%" }}>
          <GoogleMapReact
            bootstrapURLKeys={{ key: "" }}
            defaultCenter={defaultProps.center}
            defaultZoom={defaultProps.zoom}
          >
            {markers.map((app, index) => (
              <Marker
                key={index}
                lat={app.lattitude}
                lng={app.longitude}
                genres={app.genres}
                name={app.name}
                desc={app.description}
                isPublic={app.public}
                style={{ with: "50px", height: "50px" }}
              />
            ))}
          </GoogleMapReact>
        </div>
      </div>
    </div>
  );
}
