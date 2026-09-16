import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "../Context/Authcontext";

function Navbar() {

  const {
    username,
    role,
    logout
  } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleLogout = () => {

    logout();

    navigate("/");
  };

  return (
    <nav className="navbar">

      <div className="navbar-left">

        <h2>
          Academy Admin
        </h2>

      </div>


      <div className="navbar-right">

        <div className="user-info">

          <div className="user-avatar">
            {username
              ? username.charAt(0).toUpperCase()
              : "U"
            }
          </div>

          <div className="user-details">

            <strong>
              {username}
            </strong>

            <span>
              {role === "admin"
                ? "Admin"
                : "Normal User"
              }
            </span>

          </div>

        </div>


        <button
          className="logout-btn"
          onClick={handleLogout}
        >
          Logout
        </button>

      </div>

    </nav>
  );
}

export default Navbar;