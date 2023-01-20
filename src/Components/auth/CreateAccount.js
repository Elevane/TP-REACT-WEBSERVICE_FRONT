import React from "react";
async function register(email, password, username) {
  const user = {
    username: username,
    email: email,
    password: password,
  };
  return fetch(process.env.REACT_APP_DBHOST_USERS + "/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      Accept: "*/*",
    },
    body: JSON.stringify(user),
  }).then((data) => data.json());
}

export default function CreateAccount() {
  const [email, setEmail] = React.useState();
  const [password, setPassword] = React.useState();
  const [username, setUserName] = React.useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await register(email, password, username).then((value) => {
      if (!value.isSuccess) {
        alert(value.errorMessage);
      } else if (value.result === undefined) {
        alert("Failed connection Error value has no result");
      } else {
        localStorage.setItem(
          process.env.REACT_APP_AUTH_COOKIE_NAME,
          JSON.stringify({ user: value.result })
        );
        window.location.href = "/";
      }
    });
  };

  return (
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
                <label style={{ fontWeight: "bold" }}>Email</label>
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
                <label style={{ fontWeight: "bold" }}>Pseudo</label>
                <input
                  type="text"
                  id="username"
                  onChange={(e) => setUserName(e.target.value)}
                  name="username"
                  placeholder="username"
                  aria-describedby="usernameHelp"
                  className="form-control"
                  required
                />
              </div>
              <div className="mb-3">
                <label style={{ fontWeight: "bold" }}>Mot de passe</label>
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
                  id="Create"
                  value="Create"
                  className="btn btn-color px-5 mb-5 w-100"
                />
              </div>
              <div
                id="emailHelp"
                className="form-text text-center mb-5 text-dark"
              >
                Already have an account?{" "}
                <a href="/login" className="text-dark fw-bold">
                  {" "}
                  Login
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
