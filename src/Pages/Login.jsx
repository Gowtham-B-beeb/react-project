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


  const handleLogin = (e) => {

    e.preventDefault();

    if (
      identifier === "" ||
      password === ""
    ) {

      alert("Please fill all fields");

      return;
    }


    const success =
      login(
        identifier,
        password
      );


    if (!success) {

      alert(
        "Invalid Username/Email or Password"
      );

      return;
    }


 

    
    navigate("/dashboard");

  };


  return (

    <div className="auth-container">

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