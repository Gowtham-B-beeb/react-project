import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { AuthContext } from "../Context/Authcontext";

import "./Signup.css";

function Signup() {

  const { signup } = useContext(AuthContext);

  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("normal");

  // Custom Alert
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("error");


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
  // SIGNUP
  // =========================

  const handleSignup = (e) => {

    e.preventDefault();

    if (
      username === "" ||
      email === "" ||
      password === ""
    ) {

      showAlert(
        "Please fill all fields",
        "warning"
      );

      return;
    }


    const success = signup(
      username,
      email,
      password,
      role
    );


    if (!success) {

      showAlert(
        "Username or Email already exists",
        "error"
      );

      return;
    }


    showAlert(
      "Signup Successful!",
      "success"
    );


    setTimeout(() => {
      navigate("/");
    }, 1000);
  };


  return (

    <div className="auth-container">

      {/* =========================
          CUSTOM ALERT
      ========================= */}

      {alertMessage && (

        <div className={`signup-alert ${alertType}`}>

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
          Signup
        </h1>


        <form onSubmit={handleSignup}>

          {/* USERNAME */}

          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) =>
              setUsername(e.target.value)
            }
          />


          {/* EMAIL */}

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
          />


          {/* PASSWORD */}

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
          />


          {/* ROLE */}

          <select
            value={role}
            onChange={(e) =>
              setRole(e.target.value)
            }
          >

            <option value="normal">
              Normal User
            </option>

            <option value="admin">
              Admin User
            </option>

          </select>


          {/* SIGNUP BUTTON */}

          <button type="submit">
            Signup
          </button>

        </form>


        <p>
          Already have an account?

          <Link to="/">
            Login
          </Link>
        </p>

      </div>

    </div>

  );
}

export default Signup;