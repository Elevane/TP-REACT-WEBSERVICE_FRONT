import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Components/Home";
import Login from "./Components/auth/Login";
import Logout from "./Components/auth/Logout";
import RequireAuth from "./Components/auth/RequireAuth";
import CreateAccount from "./Components/auth/CreateAccount";
import Dashboard from "./Components/Dashboard";
import Edit from "./Components/Pages/edit";
import Create from "./Components/Pages/create";

function App({ children }) {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <RequireAuth>
              <Home />
            </RequireAuth>
          }
        ></Route>
         <Route
          path="/dashboard/update/:id"
          element={
            <RequireAuth>
              <Edit />
            </RequireAuth>
          }
        ></Route>

         <Route
          path="/dashboard/create"
          element={
            <RequireAuth>
              <Create />
            </RequireAuth>
          }
        ></Route>
        
        <Route
          path="/dashboard"
          element={
            <RequireAuth>
              <Dashboard />
            </RequireAuth>
          }
        ></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/createAccount" element={<CreateAccount />}></Route>
        <Route path="/logout" element={<Logout />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
