import { useContext } from "react";

import { AuthContext } from "../Context/Authcontext";

import "./Dashboard.css";

function Dashboard() {

  const { username, role } =
    useContext(AuthContext);

  // Get Students
  const students =
    JSON.parse(
      localStorage.getItem("students")
    ) || [];

  // Get Trainers
  const trainers =
    JSON.parse(
      localStorage.getItem("trainers")
    ) || [];

  // Get Courses
  const courses =
    JSON.parse(
      localStorage.getItem("courses")
    ) || [];

  // Get Attendance
  const attendance =
    JSON.parse(
      localStorage.getItem("attendance")
    ) || [];

  // Get Payments
  const payments =
    JSON.parse(
      localStorage.getItem("payments")
    ) || [];


  // Present Attendance Count
  const presentCount =
    attendance.filter(
      (item) =>
        item.status === "Present"
    ).length;


  // Absent Attendance Count
  const absentCount =
    attendance.filter(
      (item) =>
        item.status === "Absent"
    ).length;


  // Total Payment Amount
  const totalPayments =
    payments.reduce(
      (total, payment) =>
        total +
        Number(payment.amount || 0),
      0
    );


  return (
    <div className="dashboard-page">

      {/* HEADER */}

      <div className="dashboard-header">

        <div>

          <h1>
            Welcome, {username} 
          </h1>

          <p>
            {role === "admin"
              ? "You have full access to the Academy Admin Dashboard."
              : "You have view-only access to the academy data."
            }
          </p>

        </div>

        <div className="role-badge">

          {role === "admin"
            ? "Admin User"
            : "Normal User"
          }

        </div>

      </div>


      {/* SUMMARY CARDS */}

      <div className="dashboard-cards">

        {/* Students */}

        <div className="dashboard-card">

       

          <div>

            <h3>
              Students
            </h3>

            <h2>
              {students.length}
            </h2>

          </div>

        </div>


        {/* Trainers */}

        <div className="dashboard-card">

          

          <div>

            <h3>
              Trainers
            </h3>

            <h2>
              {trainers.length}
            </h2>

          </div>

        </div>


        {/* Courses */}

        <div className="dashboard-card">

         
          <div>

            <h3>
              Courses
            </h3>

            <h2>
              {courses.length}
            </h2>

          </div>

        </div>


        {/* Attendance */}

        <div className="dashboard-card">

        

          <div>

            <h3>
              Attendance
            </h3>

            <h2>
              {attendance.length}
            </h2>

          </div>

        </div>


        {/* Present */}

        <div className="dashboard-card">

         
          <div>

            <h3>
              Present
            </h3>

            <h2>
              {presentCount}
            </h2>

          </div>

        </div>


        {/* Absent */}

        <div className="dashboard-card">


          <div>

            <h3>
              Absent
            </h3>

            <h2>
              {absentCount}
            </h2>

          </div>

        </div>


        {/* Payments */}

        {role === "admin" && (

          <div className="dashboard-card">

          

            <div>

              <h3>
                Total Payments
              </h3>

              <h2>
                ₹{totalPayments}
              </h2>

            </div>

          </div>

        )}

      </div>


      {/* ATTENDANCE SUMMARY */}

      <div className="dashboard-section">

        <h2>
          Attendance Summary
        </h2>

        <div className="overview-grid">

          <div>

            <span>
              Total Records
            </span>

            <strong>
              {attendance.length}
            </strong>

          </div>


          <div>

            <span>
              Present
            </span>

            <strong>
              {presentCount}
            </strong>

          </div>


          <div>

            <span>
              Absent
            </span>

            <strong>
              {absentCount}
            </strong>

          </div>

        </div>

      </div>


      {/* ACCESS INFORMATION */}

      {/* <div className="dashboard-section">

        <h2>
          Your Access
        </h2>


        {role === "admin" ? (

          <div className="access-box admin-access">

            <h3>
              🔐 Administrator Access
            </h3>

            <p>
              You can add, edit and delete
              Students, Trainers and Courses.
            </p>

            <p>
              You can also manage Payments
              and Attendance.
            </p>

          </div>

        ) : (

          <div className="access-box normal-access">

            <h3>
              👤 Normal User Access
            </h3>

            <p>
              You can view Students, Trainers,
              Courses and Attendance.
            </p>

            <p>
              CRUD operations and Payments
              are restricted.
            </p>

          </div>

        )}

      </div> */}


      {/* ACADEMY OVERVIEW */}

      <div className="dashboard-section">

        <h2>
          Academy Overview
        </h2>

        <div className="overview-grid">

          <div>

            <span>
              Total Students
            </span>

            <strong>
              {students.length}
            </strong>

          </div>


          <div>

            <span>
              Total Trainers
            </span>

            <strong>
              {trainers.length}
            </strong>

          </div>


          <div>

            <span>
              Total Courses
            </span>

            <strong>
              {courses.length}
            </strong>

          </div>


          <div>

            <span>
              Total Payments
            </span>

            <strong>
              ₹{totalPayments}
            </strong>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Dashboard;