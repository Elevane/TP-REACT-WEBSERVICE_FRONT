import React from "react";
import {
  BrowserRouter as Router,
  Routes ,
  Route  
} from "react-router-dom";
import Home from './Components/Home';
import Login from './Components/auth/Login';
import Logout from './Components/auth/Logout';
import RequireAuth from './Components/auth/RequireAuth';
import CreateAccount from "./Components/auth/CreateAccount";
  function App({children}) {
  
    return (
      <Router>
        <Routes >
          <Route path="/" element={<RequireAuth><Home /></RequireAuth>}></Route>
          <Route path="/login" element={<Login/>}></Route>
          <Route path="/createAccount" element={<CreateAccount/>}></Route>
          <Route path="/logout" element={<Logout/>}></Route>
        </Routes > 
    </Router>
    );
  }

export default App;
