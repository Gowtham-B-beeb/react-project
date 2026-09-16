import { useContext } from "react";
import { NavLink } from "react-router-dom";

import { AuthContext } from "../Context/Authcontext";

function Sidebar() {

  const { role } =
    useContext(AuthContext);

  return (
    <aside className="sidebar">

      <div className="sidebar-title">
        <h3>
          MENU
        </h3>
      </div>


      <NavLink
        to="/dashboard"
        className="sidebar-link"
      >
       
        Dashboard
      </NavLink>


            <NavLink
        to="/trainers"
        className="sidebar-link"
      >
       
        Trainers
      </NavLink>


      <NavLink
        to="/students"
        className="sidebar-link"
      >
       
        Students
      </NavLink>



      <NavLink
        to="/courses"
        className="sidebar-link"
      >
       
        Courses
      </NavLink>


      {role === "admin" && (

        <NavLink
          to="/payments"
          className="sidebar-link"
        >
         
          Payments
        </NavLink>

      )}


     


      <NavLink
        to="/settings"
        className="sidebar-link"
      >
       
        Settings
      </NavLink>

    </aside>
  );
}

export default Sidebar;