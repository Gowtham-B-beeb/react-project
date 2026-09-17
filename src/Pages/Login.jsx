import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { AuthContext } from "../Context/Authcontext";

import "./Login.css";

function Login() {

  const { login } =
    useContext(AuthContext);

  const navigate =
    useNavigate();

  const [identifier, setIdentifier] =
    useState("");

  const [password, setPassword] =
    useState("");

  // Custom Alert
  const [alertMessage, setAlertMessage] =
    useState("");

  const [alertType, setAlertType] =
    useState("error");


  // =========================
  // SHOW ALERT
  // =========================

  const showAlert = (message, type = "error") => {

    setAlertMessage(message);
    setAlertType(type);

    setTimeout(() => {
      setAlertMessage("");
    }, 2500);
  };


  // =========================
  // LOGIN
  // =========================

  const handleLogin = (e) => {

    e.preventDefault();

    if (
      identifier === "" ||
      password === ""
    ) {

      showAlert(
        "Please fill all fields",
        "warning"
      );

      return;
    }


    const success =
      login(
        identifier,
        password
      );


    if (!success) {

      showAlert(
        "Invalid Username/Email or Password",
        "error"
      );

      return;
    }


    showAlert(
      "Login successful!",
      "success"
    );


    setTimeout(() => {
      navigate("/dashboard");
    }, 1000);

  };


  return (

    <div className="auth-container">

      {/* =========================
          CUSTOM ALERT
      ========================= */}

      {alertMessage && (

        <div className={`login-alert ${alertType}`}>

          <span>
            {alertMessage}
          </span>

          <button
            onClick={() =>
              setAlertMessage("")
            }
          >
            ×
          </button>

        </div>

      )}


      <div className="auth-box">

        <h1>
          Login
        </h1>


        <form
          onSubmit={handleLogin}
        >

          <input
            type="text"
            placeholder="Username or Email"
            value={identifier}
            onChange={(e) =>
              setIdentifier(
                e.target.value
              )
            }
          />


          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(
                e.target.value
              )
            }
          />


          <button
            type="submit"
          >
            Login
          </button>

        </form>


        <p>

          Don't have an account?

          <Link to="/signup">
            Signup
          </Link>

        </p>

      </div>

    </div>
  );
}

export default Login;