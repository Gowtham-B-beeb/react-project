import { useContext, useState } from "react";
import { AuthContext } from "../Context/Authcontext";
import "./Trainers.css";

function Trainers() {

  // Get user role from AuthContext
  const { role } = useContext(AuthContext);

  // Trainer form states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [subject, setSubject] = useState("");

  // Trainers from LocalStorage
  const [trainers, setTrainers] = useState(
    JSON.parse(localStorage.getItem("trainers")) || []
  );

  // Edit trainer ID
  const [editId, setEditId] = useState(null);

  // Search
  const [search, setSearch] = useState("");

  // Selected trainer for attendance
  const [selectedTrainer, setSelectedTrainer] = useState(null);

  // Students from LocalStorage
  const [students] = useState(
    JSON.parse(localStorage.getItem("students")) || []
  );

  // Attendance records from LocalStorage
  const [attendance, setAttendance] = useState(
    JSON.parse(localStorage.getItem("attendance")) || []
  );

  // Default date = Today
  const [attendanceDate, setAttendanceDate] = useState(
    new Date().toISOString().split("T")[0]
  );


  // =========================
  // ADD / UPDATE TRAINER
  // =========================

  const handleSubmit = (e) => {

    e.preventDefault();

    // Only admin can add/update
    if (role !== "admin") {
      alert("Only Admin can add or update trainers");
      return;
    }

    // Edit existing trainer
    if (editId) {

      const updatedTrainers = trainers.map((trainer) =>
        trainer.id === editId
          ? {
              ...trainer,
              name,
              email,
              phone,
              subject
            }
          : trainer
      );

      setTrainers(updatedTrainers);

      localStorage.setItem(
        "trainers",
        JSON.stringify(updatedTrainers)
      );

      alert("Trainer updated successfully!");

      setEditId(null);

    }

    // Add new trainer
    else {

      const newTrainer = {
        id: Date.now(),
        name,
        email,
        phone,
        subject
      };

      const updatedTrainers = [
        ...trainers,
        newTrainer
      ];

      setTrainers(updatedTrainers);

      localStorage.setItem(
        "trainers",
        JSON.stringify(updatedTrainers)
      );

      alert("Trainer added successfully!");
    }

    // Clear form
    setName("");
    setEmail("");
    setPhone("");
    setSubject("");
  };


  // =========================
  // EDIT TRAINER
  // =========================

  const handleEdit = (trainer) => {

    if (role !== "admin") {
      alert("Only Admin can edit trainers");
      return;
    }

    setEditId(trainer.id);

    setName(trainer.name);
    setEmail(trainer.email);
    setPhone(trainer.phone);
    setSubject(trainer.subject);
  };


  // =========================
  // DELETE TRAINER
  // =========================

  const handleDelete = (id) => {

    if (role !== "admin") {
      alert("Only Admin can delete trainers");
      return;
    }

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this trainer?"
    );

    if (!confirmDelete) {
      return;
    }

    const updatedTrainers = trainers.filter(
      (trainer) => trainer.id !== id
    );

    setTrainers(updatedTrainers);

    localStorage.setItem(
      "trainers",
      JSON.stringify(updatedTrainers)
    );

    alert("Trainer deleted successfully!");
  };


  // =========================
  // ATTENDANCE BUTTON
  // =========================

  const handleAttendance = (trainer) => {

    setSelectedTrainer(trainer);
  };


  // =========================
  // STUDENTS OF SELECTED TRAINER
  // =========================

  const trainerStudents = selectedTrainer
    ? students.filter(
        (student) =>
          student.trainer === selectedTrainer.name
      )
    : [];


  // =========================
  // MARK ATTENDANCE
  // =========================

  const markAttendance = (studentId, status) => {

    // Only admin can mark attendance
    if (role !== "admin") {
      alert("Only Admin can mark attendance");
      return;
    }

    // Check existing attendance
    const existingAttendance = attendance.find(
      (item) =>
        item.studentId === studentId &&
        item.date === attendanceDate
    );


    // =========================
    // UPDATE EXISTING ATTENDANCE
    // =========================

    if (existingAttendance) {

      const updatedAttendance = attendance.map(
        (item) =>
          item.studentId === studentId &&
          item.date === attendanceDate
            ? {
                ...item,
                status
              }
            : item
      );

      setAttendance(updatedAttendance);

      localStorage.setItem(
        "attendance",
        JSON.stringify(updatedAttendance)
      );

      return;
    }


    // =========================
    // ADD NEW ATTENDANCE
    // =========================

    const newAttendance = {
      id: Date.now(),
      studentId,
      trainer: selectedTrainer.name,
      date: attendanceDate,
      status
    };

    const updatedAttendance = [
      ...attendance,
      newAttendance
    ];

    setAttendance(updatedAttendance);

    localStorage.setItem(
      "attendance",
      JSON.stringify(updatedAttendance)
    );
  };


  // =========================
  // SEARCH FILTER
  // =========================

  const filteredTrainers = trainers.filter(
    (trainer) =>
      trainer.name
        .toLowerCase()
        .includes(search.toLowerCase()) ||

      trainer.email
        .toLowerCase()
        .includes(search.toLowerCase()) ||

      trainer.phone
        .toLowerCase()
        .includes(search.toLowerCase()) ||

      trainer.subject
        .toLowerCase()
        .includes(search.toLowerCase())
  );


  return (
    <div className="trainers-page">

      {/* =========================
          PAGE TITLE
      ========================= */}

      <div className="page-header">

        <div>
          <h1>Trainers</h1>

          <p>
            Manage academy trainers
          </p>
        </div>

      </div>


      {/* =========================
          ADMIN FORM
      ========================= */}

      {role === "admin" && (

        <div className="trainer-form-card">

          <h2>
            {editId
              ? "Edit Trainer"
              : "Add Trainer"}
          </h2>


          <form onSubmit={handleSubmit}>

            {/* Name */}

            <input
              type="text"
              placeholder="Trainer Name"
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
              required
            />


            {/* Email */}

            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              required
            />


            {/* Phone */}

            <input
              type="text"
              placeholder="Phone"
              value={phone}
              onChange={(e) =>
                setPhone(e.target.value)
              }
              required
            />


            {/* Subject */}

            <input
              type="text"
              placeholder="Subject"
              value={subject}
              onChange={(e) =>
                setSubject(e.target.value)
              }
              required
            />


            {/* Submit */}

            <button type="submit">

              {editId
                ? "Update Trainer"
                : "Add Trainer"}

            </button>

          </form>

        </div>

      )}


      {/* =========================
          NORMAL USER MESSAGE
      ========================= */}

      {role !== "admin" && (

        <div className="user-message">

          <p>
            You are logged in as a Normal User.
            You can view trainers only.
          </p>

        </div>

      )}


      {/* =========================
          SEARCH
      ========================= */}

      <div className="search-box">

        <input
          type="text"
          placeholder="Search trainers..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />

      </div>


      {/* =========================
          TRAINER TABLE
      ========================= */}

      <div className="table-container">

        <table>

          <thead>

            <tr>

              <th>Name</th>

              <th>Email</th>

              <th>Phone</th>

              <th>Subject</th>

              {role === "admin" && (
                <th>Action</th>
              )}

            </tr>

          </thead>


          <tbody>

            {filteredTrainers.length === 0 ? (

              <tr>

                <td
                  colSpan={
                    role === "admin"
                      ? "5"
                      : "4"
                  }
                >
                  No trainers found
                </td>

              </tr>

            ) : (

              filteredTrainers.map(
                (trainer) => (

                  <tr key={trainer.id}>

                    <td>
                      {trainer.name}
                    </td>

                    <td>
                      {trainer.email}
                    </td>

                    <td>
                      {trainer.phone}
                    </td>

                    <td>
                      {trainer.subject}
                    </td>


                    {role === "admin" && (

                      <td>

                        {/* Edit */}

                        <button
                          className="edit-btn"
                          onClick={() =>
                            handleEdit(trainer)
                          }
                        >
                          Edit
                        </button>


                        {/* Delete */}

                        <button
                          className="delete-btn"
                          onClick={() =>
                            handleDelete(trainer.id)
                          }
                        >
                          Delete
                        </button>


                        {/* Attendance */}

                        <button
                          className="attendance-btn"
                          onClick={() =>
                            handleAttendance(trainer)
                          }
                        >
                          Attendance
                        </button>

                      </td>

                    )}

                  </tr>

                )
              )

            )}

          </tbody>

        </table>

      </div>


      {/* =========================
          ATTENDANCE SECTION
      ========================= */}

      {selectedTrainer && (

        <div className="attendance-section">

          <div className="attendance-header">

            <h2>
              {selectedTrainer.name}'s Attendance
            </h2>

            <button
              onClick={() =>
                setSelectedTrainer(null)
              }
            >
              Close
            </button>

          </div>


          {/* DATE */}

          <div className="attendance-date">

            <label>
              Date:
            </label>

            <input
              type="date"
              value={attendanceDate}
              onChange={(e) =>
                setAttendanceDate(
                  e.target.value
                )
              }
            />

          </div>


          {/* STUDENTS */}

          {trainerStudents.length === 0 ? (

            <p className="no-students">

              No students assigned to this
              trainer.

            </p>

          ) : (

            <div className="table-container">

              <table>

                <thead>

                  <tr>

                    <th>
                      Student Name
                    </th>

                    <th>
                      Course
                    </th>

                    <th>
                      Status
                    </th>

                  </tr>

                </thead>


                <tbody>

                  {trainerStudents.map(
                    (student) => {

                      // Find attendance for selected
                      // student and selected date

                      const currentAttendance =
                        attendance.find(
                          (item) =>
                            item.studentId ===
                              student.id &&
                            item.date ===
                              attendanceDate
                        );


                      return (

                        <tr key={student.id}>

                          <td>
                            {student.name}
                          </td>

                          <td>
                            {student.course}
                          </td>

                          <td>

                            <select
                              value={
                                currentAttendance?.status ||
                                ""
                              }
                              onChange={(e) =>
                                markAttendance(
                                  student.id,
                                  e.target.value
                                )
                              }
                            >

                              <option value="">
                                Select
                              </option>

                              <option value="Present">
                                Present
                              </option>

                              <option value="Absent">
                                Absent
                              </option>

                            </select>

                          </td>

                        </tr>

                      );

                    }
                  )}

                </tbody>

              </table>

            </div>

          )}

        </div>

      )}

    </div>
  );
}

export default Trainers;
