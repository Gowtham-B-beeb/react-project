import React from "react";
import { Outlet } from "react-router-dom";

import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar"; 

import "./Layout.css";

function Layout() {
  return (
    <div className="layout">

      
      <Navbar />

      <div className="layout-body">

       
        <Sidebar />

        
        <main className="main-content">
          <Outlet />
        </main>

      </div>

    </div>
  );
}

export default Layout;



