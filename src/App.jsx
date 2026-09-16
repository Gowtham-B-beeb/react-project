import React, { useContext } from "react";

import { BrowserRouter,Routes,Route, Navigate} from "react-router-dom";

import { AuthContext } from "./Context/Authcontext";

import Login from "./Pages/Login";
import Signup from "./Pages/Signup";

import Dashboard from "./Pages/Dashboard";
import Students from "./Pages/Students";
import Trainers from "./Pages/Trainers";
import Courses from "./Pages/Courses";
import Payments from "./Pages/Payments";
// import Attendance from "./Pages/Attendance";
import Settings from "./Pages/Settings";

import Layout from "./Layout";

import "./App.css";




function ThemeManager() {

  const savedTheme =
    localStorage.getItem("theme") || "light";

  if (savedTheme === "dark") {

    document.body.classList.add( "dark-mode" );

  } else {

    document.body.classList.remove("dark-mode" );
  }

  return null;
}



function ProtectedRoute({ children }) {

  const { role } =
    useContext(AuthContext);

  if (!role) {

    return (
      <Navigate to="/" />
    );

  }

  return children;
}




function AdminRoute({ children }) {

  const { role } =
    useContext(AuthContext);

  if (!role) {

    return (
      <Navigate to="/" />
    );

  }

  if (role !== "admin") {

    return (
      <Navigate to="/dashboard" />
    );

  }

  return children;
}




function App() {

  return (

    <BrowserRouter>

      <ThemeManager />

      <Routes>


        <Route
          path="/"
          element={<Login />}
        />


    

        <Route
          path="/signup"
          element={<Signup />}
        />


      
        <Route
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >

         

          <Route
            path="/dashboard"
            element={<Dashboard />}
          />


          

          <Route
            path="/students"
            element={<Students />}
          />



          <Route
            path="/trainers"
            element={<Trainers />}
          />


       

          <Route
            path="/courses"
            element={<Courses />}
          />


         

          {/* <Route
            path="/attendance"
            element={<Attendance />}
          /> */}


          

          <Route
            path="/settings"
            element={<Settings />}
          />


      

          <Route
            path="/payments"
            element={
              <AdminRoute>
                <Payments />
              </AdminRoute>
            }
          />

        </Route>



        <Route
          path="*"
          element={
            <Navigate to="/dashboard" />
          }
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;