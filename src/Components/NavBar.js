import useLocalStorage from "./auth/Hooks/useLocalStorage";
import React from "react";
export default function NavBar() {
  const user = useLocalStorage.GetUser();
  return (
    <div
      className="w3-sidebar w3-light-grey w3-bar-block"
      style={{ width: "25%" }}
    >
      <h3 className="w3-bar-item" style={{ marginBottom: "40px" }}>
        Map Website
      </h3>
      <article style={{ display: "flex", alignItems: "end" }}>
        <img
          src="img/avatar.png"
          alt="avatar"
          style={{ width: "50px", heigt: "50px", margin: "30px 30px 0 30px" }}
        />
        <p>{user.username}</p>
      </article>
      <ul style={{ marginTop: "40px" }}>
        <a href="/" className="w3-bar-item w3-button">
          Carte
        </a>
        <a href="/dashboard" className="w3-bar-item w3-button">
          Complots
        </a>
        
        <a
          href="/logout"
          className="w3-bar-item w3-button"
          style={{ color: "blue" }}
        >
          logout
        </a>
      </ul>
    </div>
  );
}
