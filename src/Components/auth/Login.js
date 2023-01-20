import React from "react";
import { toast } from "react-toastify";

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
    await authenticate(email, password)
      .then((value) => {
        if (value === null || value === undefined)
          toast.error("Return value can't be read");
        else if (!value.isSuccess) {
          toast.error(value.errorMessage);
        } else if (value.result === undefined) {
          toast.error("result is undifiend");
        } else {
          localStorage.setItem(
            process.env.REACT_APP_AUTH_COOKIE_NAME,
            JSON.stringify({ user: value.result })
          );
          window.location.href = "/";
        }
      })
      .catch(function () {
        toast.error("Failed to fetch api");
      });
  };

  const handleCreateAccount = async (e) => {
    e.preventDefault();
    window.location.href = "/CreateAccount";
  };
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h2 className="text-center text-dark mt-5">Complot</h2>
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
              <label style={{ fontWeight: "bold" }}>Mot de passe</label>
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
