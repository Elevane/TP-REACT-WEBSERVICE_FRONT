import { useEffect, useState } from "react";
import useLocalStorage
 from "../auth/Hooks/useLocalStorage";
 import { json, useParams } from "react-router";
 import GoogleMapReact from "google-map-react";
 import React from "react";
 const AnyReactComponent = ({ text }) => <div style={{position: "absolute",
    top: "50%",
    left: "50%",
    width: "18px",
    height: "18px",
    backgroundColor: "#2196F3",
    border: "2px solid #fff",
    borderRadius: "100%",
    userSelect: "none",}} >{text}</div>;


    function CreateNewApp(lattitude, longitude, name, active) {
        let user = useLocalStorage.GetUser();
        let app = {
            "lattitude" :  parseFloat(lattitude),
            "longitude" : parseFloat(longitude),
            "name" : name,
            "active" : active
        }
        return fetch(process.env.REACT_APP_DBHOST_APPS , {
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


export default function Create(props){

    const [name, setName] = useState("");
    const [lattitude, setLattitude] = useState(55)
    const [longitude, setLongitude] = useState(55)
    const [active, setActive] = useState(true)
    
   
    const ChangePos = (e) => {
        setLattitude(e.lat)
        setLongitude(e.lng)
    }

    const Create = (e) => {
        e.preventDefault();
        CreateNewApp( lattitude, longitude, name, active).then((value) => {
            console.log(value)
            if (value.status != 200) {
              alert("Failed connection Error");
        
            } 
            else{
                window.location = "/dashboard"
            }
          });;
    }


       
    return(
    <div className="container">
    
    <div className="col-lg-12 text-lg-center" style={{margin : "50px"}}>
        <h2>Creation d'un marqueur</h2>

    </div>
    <div className="col-lg-8 push-lg-4 personal-info" style={{"margin" :" auto"}}>
         <form role="form">
            <div className="form-group row">
                <label className="col-lg-3 col-form-label form-control-label">Name</label>
                <div className="col-lg-9">
                    <input className="form-control" onChange={(e) => setName(e.target.value)} type="text" value={name} required/>
                </div>
            </div>
            <div className="form-group row">
                <label className="col-lg-3 col-form-label form-control-label">Lattitude</label>
                <div className="col-lg-9">
                    <input className="form-control" onChange={(e) => setLattitude(e.target.value)} type="text" value={lattitude} required/>
                </div>
            </div>
            <div className="form-group row">
                <label className="col-lg-3 col-form-label form-control-label">Longitude</label>
                <div className="col-lg-9">
                    <input className="form-control"onChange={(e) => setLongitude(e.target.value)}  type="text" value={longitude} required/>
                </div>
            </div>
            <div className="form-group row">
                <label className="col-lg-3 col-form-label form-control-label">Active</label>
                <div className="col-lg-9">
               
                    
                  <input className="form-check-input form-control" onChange={(e) => setActive(!active)} type="checkbox" checked={active  == true? 'checked' : ''} />
                
                    
                </div>
            </div>
            <div className="form-group row" style={{ height: "30vh", width: "50%", margin : "50px 50px 50px 250px" }}>
                <GoogleMapReact onClick={(e) => ChangePos(e)}
                bootstrapURLKeys={{ key: "" }} 
                defaultCenter={{lat: 48, lng: -1}}
                defaultZoom={11}
                >
                <AnyReactComponent lat={lattitude}
                 lng={longitude}
                />
                
                </GoogleMapReact>
            </div>
            <div className="form-group row">
                <label className="col-lg-3 col-form-label form-control-label"></label>
                <div className="col-lg-9" style={{display :"flex", justifyContent :"center"}}>
                    <a type="reset" href="/dashboard" className="btn btn-secondary" value="Cancel" style={{"margin" :"5px"}}>Retour</a>
                    <input onClick={(e) => Create(e)} type="submit" className="btn btn-primary" value="Save Changes" style={{"margin" :"5px"}}/>
                </div>
            </div>
        </form>
    </div>
    
</div>);
}