import React, { useEffect, useState } from "react";
import useLocalStorage from "./auth/Hooks/useLocalStorage";
import NavBar from "./NavBar";
function DeleteAppApi(id){
  let user = useLocalStorage.GetUser();
  return fetch(process.env.REACT_APP_DBHOST_APPS+"/"+id, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      Authorization: "Bearer " + user.token,
      Accept: "*/*",
    },
  });
}
function getApps() {
  let user = useLocalStorage.GetUser();
  let token = user.token;

  return fetch(process.env.REACT_APP_DBHOST_APPS, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      Authorization: "Bearer " + user.token,
      Accept: "*/*",
    },
  }).then((data) =>  data.json());
}
export default function Home() {

  function DeleteApp(e) {
    DeleteAppApi(e.target.value).then((value) => {
      if(!value.ok)
        alert("erreur d'api");
      else{
        let newApps = Apps.filter((a) => {return a.id != e.target.value});
        setApps(newApps)
      }
      
      console.log(value)
    });
  }
  let [Apps, setApps] = useState([]);
  let appComponents = [];
  useEffect(() => {
    
    getApps().then((value) => {
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

  
   
    if(Apps.length >0){
     appComponents = Apps.map((app, index) => (
      <tr key={index}>
        <td>{app.id}</td>
        <td>{app.name}</td>
        <td>{app.date}</td>
        <td>
        {
           app.active ?  <input type="checkbox"  disabled/> :  <input type="checkbox" checked disabled/>
        } 
          
        </td>
        <td>
        <button type="button" className="btn btn-info m-1">
            <a style={{"textDecoration" :"none"}} href={"/dashboard/update/"+app.id}>edit</a>
          </button>
          <button type="button" value={app.id} className="btn btn-danger  m-1" onClick={(e) => DeleteApp(e)}>
            X
          </button>  
        </td>
      </tr>
    ));
    }
 

  return (
    <div>
      <NavBar />
      <div style={{ marginLeft: "25%" }}>
        <div className="w3-container w3-blue">
          <h1>Dashboard</h1>
        </div>
        <table className="table" style={{ margin: "50px", width: "80%" }}>
          <thead>
            <tr>
              <th scope="col">Number</th>
              <th scope="col">Name</th>
              <th scope="col">Date</th>
              <th scope="col">Edit</th>
              <th scope="col">Configuration</th>
            </tr>
          </thead>
          <tbody>
            {appComponents.length > 0 ? appComponents : <tr>
              <a href="/dashboard/create" className="btn btn-primary" style={{ "backgroundColor" : "#2196F3", border :"none", margin : "8px"}}>+</a>
            </tr>}
            
          </tbody>
        </table>
      </div>
    </div>
  );
}
