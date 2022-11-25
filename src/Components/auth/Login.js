import React, { useEffect, useState } from "react";
import jwt_decode from "jwt-decode"
async function authenticate(email, password, googleId) {
  const user = {
    email: email,
    password: password,
    GoogleToken : googleId
  };

  return fetch(process.env.REACT_APP_DBHOST_USERS + "/authenticate" , {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      Accept: "*/*",
    },
    body: JSON.stringify(user),
  }).then((data) => data.json());
}


const hrandleCallback = async (response)  => {
  var userGoogle = jwt_decode(response.credential)
  console.log(userGoogle)
  await authenticate(userGoogle.email, null , userGoogle.jti).then((value) => {
    if(value === null || value=== undefined)
      alert("Return value can't be read")
    else if (!value.isSuccess) {
      alert(value.errorMessage);
    }
    else if (value.result === undefined) {
      alert("result is undifiend",);
    }
    else{
      localStorage.setItem(
        "user",
        JSON.stringify({ user: value.result })
      );
      window.location.href = "/"
    }
  }).catch(function() {
    alert("Failed to fetch api");
});;
  //setUser(userGoogle)
  //localStorage.setItem("delation_user", JSON.stringify(userGoogle))
}



export default function Login() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  
  useEffect(() => {

    
    window.google.accounts.id.initialize({
      client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
      callback: hrandleCallback
    });
    window.google.accounts.id.renderButton(
      document.getElementById("signInButton"), {theme: "outline", size: "large"}
    )
  

  }, [window.google])
  

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Authentification starting")
    await authenticate(email, password, null).then((value) => {
      if(value === null || value=== undefined)
        alert("Return value can't be read")
      else if (!value.isSuccess) {
        alert(value.errorMessage);
      }
      else if (value.result === undefined) {
        alert("result is undifiend",);
      }
      else{
        localStorage.setItem(
          "user",
          JSON.stringify({ user: value.result })
        );
        window.location.href = "/"
      }
    }).catch(function() {
      alert("Failed to fetch api");
  });;
  };

  const handleCreateAccount = async (e) => {
    e.preventDefault();
    window.location.href = "/CreateAccount";
  };
  return (
    <div id="login-form-wrap">
      <h2> Login </h2>{" "}
      <form id="login-form" onSubmit={handleSubmit}>
        <p>
          <input
            type="text"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            name="email"
            placeholder="email"
            required
          />
        </p>{" "}
        <p>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            name="password"
            placeholder="password"
            required
          />
        </p>{" "}
        <p>
          <input type="submit" id="login" value="Login" />
        </p>{" "}
      </form>{" "}
      <div id="signInButton">Barre toi</div>
      <div id="create-account-wrap">
        <p>
          {" "}
          Not a member ?{" "}
          <a href="/create" onClick={handleCreateAccount}>
            {" "}
            Create Account{" "}
          </a>
        </p>
      </div>{" "}
    </div>
  );
}
