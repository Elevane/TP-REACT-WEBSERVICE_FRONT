import React from "react";

async function authenticate(email, password) {
  const user = {
    email: email,
    password: password,
  };

  return fetch(process.env.REACT_APP_DBHOST_USERS + "/authenticate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      Accept: "*/*",
    },
    body: JSON.stringify(user),
  }).then((data) => data.json());
}

export default function Login() {
  const [email, setEmail] = React.useState();
  const [password, setPassword] = React.useState();
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Authentification starting");
    await authenticate(email, password)
      .then((value) => {
        if (value === null || value === undefined)
          alert("Return value can't be read");
        else if (!value.isSuccess) {
          alert(value.errorMessage);
        } else if (value.result === undefined) {
          alert("result is undifiend");
        } else {
          localStorage.setItem("user", JSON.stringify({ user: value.result }));
          window.location.href = "/";
        }
      })
      .catch(function () {
        alert("Failed to fetch api");
      });
  };

  const handleCreateAccount = async (e) => {
    e.preventDefault();
    window.location.href = "/CreateAccount";
  };
  return (
    /*<div id="login-form-wrap" className="card">
      <h2 className="card-header"> Login </h2>{" "}
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
    </div>*/

    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h2 className="text-center text-dark mt-5">Map Marker</h2>
          <div className="text-center mb-5 text-dark">TP PWA bastien AUBRY</div>
          <div className="card my-5">
            <form
              className="card-body cardbody-color p-lg-5"
              onSubmit={handleSubmit}
            >
              <div className="text-center">
                <img
                  src="img/logo.png"
                  className="img-fluid profile-image-pic img-thumbnail rounded-circle my-3"
                  width="200px"
                  alt="profile"
                />
              </div>

              <div className="mb-3">
                <input
                  type="text"
                  id="email"
                  onChange={(e) => setEmail(e.target.value)}
                  name="email"
                  placeholder="email"
                  aria-describedby="emailHelp"
                  className="form-control"
                  required
                />
              </div>
              <div className="mb-3">
                <input
                  type="password"
                  id="password"
                  onChange={(e) => setPassword(e.target.value)}
                  name="password"
                  placeholder="password"
                  className="form-control"
                  required
                />
              </div>
              <div className="text-center">
                <input
                  type="submit"
                  id="login"
                  value="Login"
                  className="btn btn-color px-5 mb-5 w-100"
                />
              </div>
              <div
                id="emailHelp"
                className="form-text text-center mb-5 text-dark"
              >
                Not Registered?{" "}
                <a
                  href="/createAccount"
                  onClick={handleCreateAccount}
                  className="text-dark fw-bold"
                >
                  {" "}
                  Create an Account
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
