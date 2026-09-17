import { useContext, useState } from "react";
import { AuthContext } from "../Context/Authcontext";
import "./Trainers.css";

function Trainers() {

  const { role } = useContext(AuthContext);

  // Trainer form states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [subject, setSubject] = useState("");

  // Trainers
  const [trainers, setTrainers] = useState(
    JSON.parse(localStorage.getItem("trainers")) || []
  );

  const [editId, setEditId] = useState(null);

  // Search
  const [search, setSearch] = useState("");

  // Selected trainer
  const [selectedTrainer, setSelectedTrainer] = useState(null);

  // Students
  const [students] = useState(
    JSON.parse(localStorage.getItem("students")) || []
  );

  // Attendance
  const [attendance, setAttendance] = useState(
    JSON.parse(localStorage.getItem("attendance")) || []
  );

  // Default date
  const [attendanceDate, setAttendanceDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  // =========================
  // CUSTOM ALERT
  // =========================

  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("success");

  const showAlert = (message, type = "success") => {

    setAlertMessage(message);
    setAlertType(type);

    setTimeout(() => {
      setAlertMessage("");
    }, 2500);
  };


  // =========================
  // ADD / UPDATE TRAINER
  // =========================

  const handleSubmit = (e) => {

    e.preventDefault();

    if (role !== "admin") {

      showAlert(
        "Only Admin can add or update trainers",
        "warning"
      );

      return;
    }

    if (editId) {

      const updatedTrainers = trainers.map(
        (trainer) =>
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

      showAlert(
        "Trainer updated successfully!",
        "success"
      );

      setEditId(null);

    } else {

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

      showAlert(
        "Trainer added successfully!",
        "success"
      );
    }

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

      showAlert(
        "Only Admin can edit trainers",
        "warning"
      );

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

      showAlert(
        "Only Admin can delete trainers",
        "warning"
      );

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

    showAlert(
      "Trainer deleted successfully!",
      "success"
    );
  };


  // =========================
  // ATTENDANCE BUTTON
  // =========================

  const handleAttendance = (trainer) => {

    setSelectedTrainer(trainer);
  };


  // =========================
  // STUDENTS OF TRAINER
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

    if (role !== "admin") {

      showAlert(
        "Only Admin can mark attendance",
        "warning"
      );

      return;
    }

    const existingAttendance = attendance.find(
      (item) =>
        item.studentId === studentId &&
        item.date === attendanceDate
    );


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

      showAlert(
        "Attendance updated successfully!",
        "success"
      );

      return;
    }


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

    showAlert(
      "Attendance marked successfully!",
      "success"
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

      {/* CUSTOM ALERT */}

      {alertMessage && (

        <div className={`trainers-alert ${alertType}`}>

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


      {/* PAGE TITLE */}

      <div className="page-header">

        <div>

          <h1>Trainers</h1>

          <p>
            Manage academy trainers
          </p>

        </div>

      </div>


      {/* ADMIN FORM */}

      {role === "admin" && (

        <div className="trainer-form-card">

          <h2>
            {editId
              ? "Edit Trainer"
              : "Add Trainer"}
          </h2>

          <form onSubmit={handleSubmit}>

            <input
              type="text"
              placeholder="Trainer Name"
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
              required
            />

            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              required
            />

            <input
              type="text"
              placeholder="Phone"
              value={phone}
              onChange={(e) =>
                setPhone(e.target.value)
              }
              required
            />

            <input
              type="text"
              placeholder="Subject"
              value={subject}
              onChange={(e) =>
                setSubject(e.target.value)
              }
              required
            />

            <button type="submit">

              {editId
                ? "Update Trainer"
                : "Add Trainer"}

            </button>

          </form>

        </div>

      )}


      {/* NORMAL USER MESSAGE */}

      {role !== "admin" && (

        <div className="user-message">

          <p>
            You are logged in as a Normal User.
            You can view trainers only.
          </p>

        </div>

      )}


      {/* SEARCH */}

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


      {/* TABLE */}

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

                    <td>{trainer.name}</td>

                    <td>{trainer.email}</td>

                    <td>{trainer.phone}</td>

                    <td>{trainer.subject}</td>


                    {role === "admin" && (

                      <td>

                        <button
                          className="edit-btn"
                          onClick={() =>
                            handleEdit(trainer)
                          }
                        >
                          Edit
                        </button>

                        <button
                          className="delete-btn"
                          onClick={() =>
                            handleDelete(
                              trainer.id
                            )
                          }
                        >
                          Delete
                        </button>

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


      {/* ATTENDANCE */}

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


          {trainerStudents.length === 0 ? (

            <p className="no-students">
              No students assigned to this trainer.
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