import { useContext, useState } from "react";
import { AuthContext } from "../Context/Authcontext";

import "./Attendance.css";

function Attendance() {

  const { role } = useContext(AuthContext);


  // =========================
  // STUDENTS
  // =========================

  const students =
    JSON.parse(
      localStorage.getItem("students")
    ) || [];


  // =========================
  // ATTENDANCE
  // =========================

  const [attendance, setAttendance] =
    useState(() => {

      const savedAttendance =
        localStorage.getItem("attendance");

      return savedAttendance
        ? JSON.parse(savedAttendance)
        : [];
    });


  // =========================
  // FORM STATES
  // =========================

  const [student, setStudent] =
    useState("");

  const [date, setDate] =
    useState("");

  const [status, setStatus] =
    useState("Present");

  const [editId, setEditId] =
    useState(null);


  // =========================
  // SEARCH & FILTER
  // =========================

  const [search, setSearch] =
    useState("");

  const [statusFilter, setStatusFilter] =
    useState("All");


  // =========================
  // SAVE ATTENDANCE
  // =========================

  const saveAttendance = (data) => {

    setAttendance(data);

    localStorage.setItem(
      "attendance",
      JSON.stringify(data)
    );
  };


  // =========================
  // ADD / UPDATE
  // =========================

  const handleSubmit = (e) => {

    e.preventDefault();


    if (role !== "admin") {

      alert(
        "Only Admin can manage attendance"
      );

      return;
    }


    if (!student || !date || !status) {

      alert("Please fill all fields");

      return;
    }


    if (editId !== null) {

      // UPDATE

      const updatedAttendance =
        attendance.map((item) =>

          item.id === editId
            ? {
                ...item,
                student,
                date,
                status
              }
            : item
        );

      saveAttendance(
        updatedAttendance
      );

      setEditId(null);

      alert(
        "Attendance updated successfully!"
      );

    } else {

      // ADD

      const newAttendance = {

        id: Date.now(),

        student,

        date,

        status
      };

      saveAttendance([
        ...attendance,
        newAttendance
      ]);

      alert(
        "Attendance marked successfully!"
      );
    }


    clearForm();
  };


  // =========================
  // CLEAR FORM
  // =========================

  const clearForm = () => {

    setStudent("");
    setDate("");
    setStatus("Present");
  };


  // =========================
  // EDIT
  // =========================

  const handleEdit = (item) => {

    if (role !== "admin") {

      alert(
        "Only Admin can edit attendance"
      );

      return;
    }


    setEditId(item.id);

    setStudent(item.student);

    setDate(item.date);

    setStatus(item.status);
  };


  // =========================
  // DELETE
  // =========================

  const handleDelete = (id) => {

    if (role !== "admin") {

      alert(
        "Only Admin can delete attendance"
      );

      return;
    }


    const confirmDelete =
      window.confirm(
        "Are you sure you want to delete this attendance?"
      );


    if (!confirmDelete) {
      return;
    }


    const updatedAttendance =
      attendance.filter(
        (item) => item.id !== id
      );

    saveAttendance(
      updatedAttendance
    );

    alert(
      "Attendance deleted successfully!"
    );
  };


  // =========================
  // SEARCH + FILTER
  // =========================

  const filteredAttendance =
    attendance.filter((item) => {

      const matchesSearch =
        item.student
          .toLowerCase()
          .includes(
            search.toLowerCase()
          );


      const matchesStatus =
        statusFilter === "All" ||
        item.status === statusFilter;


      return (
        matchesSearch &&
        matchesStatus
      );
    });


  return (

    <div className="attendance-page">

      <h1>
        Attendance
      </h1>

      <p className="attendance-subtitle">
        Manage student attendance
      </p>


      {/* =========================
          ADMIN FORM
         ========================= */}

      {role === "admin" && (

        <div className="attendance-form">

          <h2>

            {editId !== null
              ? "Update Attendance"
              : "Mark Attendance"}

          </h2>


          <form
            onSubmit={handleSubmit}
          >


            {/* STUDENT */}

            <div className="input-group">

              <label>
                Student
              </label>

              <select
                value={student}
                onChange={(e) =>
                  setStudent(
                    e.target.value
                  )
                }
              >

                <option value="">
                  Select Student
                </option>


                {students.map(
                  (item) => (

                    <option
                      key={item.id}
                      value={item.name}
                    >
                      {item.name}
                    </option>

                  )
                )}

              </select>

            </div>


            {/* DATE */}

            <div className="input-group">

              <label>
                Date
              </label>

              <input
                type="date"
                value={date}
                onChange={(e) =>
                  setDate(
                    e.target.value
                  )
                }
              />

            </div>


            {/* STATUS */}

            <div className="input-group">

              <label>
                Status
              </label>

              <select
                value={status}
                onChange={(e) =>
                  setStatus(
                    e.target.value
                  )
                }
              >

                <option value="Present">
                  Present
                </option>

                <option value="Absent">
                  Absent
                </option>

              </select>

            </div>


            {/* BUTTONS */}

            <div className="attendance-buttons">

              <button type="submit">

                {editId !== null
                  ? "Update Attendance"
                  : "Mark Attendance"}

              </button>


              <button
                type="button"
                onClick={() => {

                  clearForm();

                  setEditId(null);

                }}
              >
                Clear
              </button>

            </div>

          </form>

        </div>

      )}


      {/* =========================
          NORMAL USER MESSAGE
         ========================= */}

      {role === "normal" && (

        <p className="view-message">

          You are logged in as Normal User.
          You can view attendance only.

        </p>

      )}


      {/* =========================
          ATTENDANCE LIST
         ========================= */}

      <div className="attendance-list">

        <div className="attendance-list-header">

          <h2>
            Attendance List
          </h2>


          {/* SEARCH */}

          <input
            type="text"
            className="attendance-search"
            placeholder="🔍 Search student..."
            value={search}
            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }
          />


          {/* STATUS FILTER */}

          <select
            className="attendance-filter"
            value={statusFilter}
            onChange={(e) =>
              setStatusFilter(
                e.target.value
              )
            }
          >

            <option value="All">
              All Status
            </option>

            <option value="Present">
              Present
            </option>

            <option value="Absent">
              Absent
            </option>

          </select>

        </div>


        {/* RESULT COUNT */}

        {(search !== "" ||
          statusFilter !== "All") && (

          <p className="attendance-search-result">

            {filteredAttendance.length}
            {" "}
            record(s) found

          </p>

        )}


        {attendance.length === 0 ? (

          <p>
            No attendance records available.
          </p>

        ) : filteredAttendance.length === 0 ? (

          <p className="no-attendance-result">
            No matching attendance records found.
          </p>

        ) : (

          <table>

            <thead>

              <tr>

                <th>S.No</th>

                <th>
                  Student
                </th>

                <th>
                  Date
                </th>

                <th>
                  Status
                </th>

                {role === "admin" && (
                  <th>
                    Action
                  </th>
                )}

              </tr>

            </thead>


            <tbody>

              {filteredAttendance.map(
                (item, index) => (

                  <tr
                    key={item.id}
                  >

                    <td>
                      {index + 1}
                    </td>

                    <td>
                      {item.student}
                    </td>

                    <td>
                      {item.date}
                    </td>

                    <td>

                      <span
                        className={
                          item.status === "Present"
                            ? "status-present"
                            : "status-absent"
                        }
                      >
                        {item.status}
                      </span>

                    </td>


                    {/* ADMIN ACTIONS */}

                    {role === "admin" && (

                      <td>

                        <button
                          className="edit-btn"
                          onClick={() =>
                            handleEdit(
                              item
                            )
                          }
                        >
                          Edit
                        </button>


                        <button
                          className="delete-btn"
                          onClick={() =>
                            handleDelete(
                              item.id
                            )
                          }
                        >
                          Delete
                        </button>

                      </td>

                    )}

                  </tr>

                )
              )}

            </tbody>

          </table>

        )}

      </div>

    </div>
  );
}

export default Attendance;