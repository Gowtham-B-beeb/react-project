import { useContext, useState } from "react";
import { AuthContext } from "../Context/Authcontext";
import "./Students.css";

function Students() {

  // Get logged-in user's role
  const { role } = useContext(AuthContext);

  // =========================
  // FORM STATES
  // =========================

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [course, setCourse] = useState("");
  const [trainer, setTrainer] = useState("");

  // =========================
  // STUDENTS
  // =========================

  const [students, setStudents] = useState(
    JSON.parse(localStorage.getItem("students")) || []
  );

  // =========================
  // COURSES
  // =========================

  const [courses] = useState(
    JSON.parse(localStorage.getItem("courses")) || []
  );

  // =========================
  // TRAINERS
  // =========================

  const [trainers] = useState(
    JSON.parse(localStorage.getItem("trainers")) || []
  );

  // =========================
  // EDIT ID
  // =========================

  const [editId, setEditId] = useState(null);

  // =========================
  // SEARCH
  // =========================

  const [search, setSearch] = useState("");


  // =========================
  // ADD / UPDATE STUDENT
  // =========================

  const handleSubmit = (e) => {

    e.preventDefault();

    // Only Admin can add/update
    if (role !== "admin") {
      alert("Only Admin can add or update students");
      return;
    }


    // =========================
    // UPDATE
    // =========================

    if (editId) {

      const updatedStudents = students.map(
        (student) =>
          student.id === editId
            ? {
                ...student,
                name,
                email,
                phone,
                course,
                trainer
              }
            : student
      );

      setStudents(updatedStudents);

      localStorage.setItem(
        "students",
        JSON.stringify(updatedStudents)
      );

      alert("Student updated successfully!");

      setEditId(null);
    }


    // =========================
    // ADD
    // =========================

    else {

      const newStudent = {
        id: Date.now(),
        name,
        email,
        phone,
        course,
        trainer
      };

      const updatedStudents = [
        ...students,
        newStudent
      ];

      setStudents(updatedStudents);

      localStorage.setItem(
        "students",
        JSON.stringify(updatedStudents)
      );

      alert("Student added successfully!");
    }


    // Clear form
    setName("");
    setEmail("");
    setPhone("");
    setCourse("");
    setTrainer("");
  };


  // =========================
  // EDIT STUDENT
  // =========================

  const handleEdit = (student) => {

    if (role !== "admin") {
      alert("Only Admin can edit students");
      return;
    }

    setEditId(student.id);

    setName(student.name);
    setEmail(student.email);
    setPhone(student.phone);
    setCourse(student.course);
    setTrainer(student.trainer || "");
  };


  // =========================
  // DELETE STUDENT
  // =========================

  const handleDelete = (id) => {

    if (role !== "admin") {
      alert("Only Admin can delete students");
      return;
    }

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this student?"
    );

    if (!confirmDelete) {
      return;
    }

    const updatedStudents = students.filter(
      (student) => student.id !== id
    );

    setStudents(updatedStudents);

    localStorage.setItem(
      "students",
      JSON.stringify(updatedStudents)
    );

    alert("Student deleted successfully!");
  };


  // =========================
  // SEARCH FILTER
  // =========================

  const filteredStudents = students.filter(
    (student) =>
      student.name
        .toLowerCase()
        .includes(search.toLowerCase()) ||

      student.email
        .toLowerCase()
        .includes(search.toLowerCase()) ||

      student.phone
        .toLowerCase()
        .includes(search.toLowerCase()) ||

      student.course
        .toLowerCase()
        .includes(search.toLowerCase()) ||

      (student.trainer || "")
        .toLowerCase()
        .includes(search.toLowerCase())
  );


  return (

    <div className="students-page">

      {/* =========================
          PAGE HEADER
      ========================= */}

      <div className="page-header">

        <div>

          <h1>Students</h1>

          <p>
            Manage academy students
          </p>

        </div>

      </div>


      {/* =========================
          ADMIN FORM
      ========================= */}

      {role === "admin" && (

        <div className="student-form-card">

          <h2>
            {editId
              ? "Edit Student"
              : "Add Student"}
          </h2>


          <form onSubmit={handleSubmit}>

            {/* NAME */}

            <input
              type="text"
              placeholder="Student Name"
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
              required
            />


            {/* EMAIL */}

            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              required
            />


            {/* PHONE */}

            <input
              type="text"
              placeholder="Phone"
              value={phone}
              onChange={(e) =>
                setPhone(e.target.value)
              }
              required
            />


            {/* COURSE DROPDOWN */}

            <select
              value={course}
              onChange={(e) =>
                setCourse(e.target.value)
              }
              required
            >

              <option value="">
                Select Course
              </option>


              {courses.length === 0 ? (

                <option disabled>
                  No courses available
                </option>

              ) : (

                [
                  ...new Map(
                    courses.map((item) => [
                      item.courseName,
                      item
                    ])
                  ).values()
                ].map((item) => (

                  <option
                    key={item.id}
                    value={item.courseName}
                  >
                    {item.courseName}
                  </option>

                ))

              )}

            </select>


            {/* TRAINER DROPDOWN */}

            <select
              value={trainer}
              onChange={(e) =>
                setTrainer(e.target.value)
              }
              required
            >

              <option value="">
                Select Trainer
              </option>


              {trainers.length === 0 ? (

                <option disabled>
                  No trainers available
                </option>

              ) : (

                [
                  ...new Set(
                    trainers.map(
                      (item) => item.name
                    )
                  )
                ].map((trainerName) => (

                  <option
                    key={trainerName}
                    value={trainerName}
                  >
                    {trainerName}
                  </option>

                ))

              )}

            </select>


            {/* SUBMIT BUTTON */}

            <button type="submit">

              {editId
                ? "Update Student"
                : "Add Student"}

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
            You can view students only.
          </p>

        </div>

      )}


      {/* =========================
          SEARCH
      ========================= */}

      <div className="search-box">

        <input
          type="text"
          placeholder="Search students..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />

      </div>


      {/* =========================
          RESULT COUNT
      ========================= */}

      <p className="result-count">

        Showing {filteredStudents.length} student
        {filteredStudents.length !== 1
          ? "s"
          : ""}

      </p>


      {/* =========================
          STUDENT TABLE
      ========================= */}

      <div className="table-container">

        <table>

          <thead>

            <tr>

              <th>Name</th>

              <th>Email</th>

              <th>Phone</th>

              <th>Course</th>

              <th>Trainer</th>

              {role === "admin" && (
                <th>Action</th>
              )}

            </tr>

          </thead>


          <tbody>

            {filteredStudents.length === 0 ? (

              <tr>

                <td
                  colSpan={
                    role === "admin"
                      ? "6"
                      : "5"
                  }
                >
                  No students found
                </td>

              </tr>

            ) : (

              filteredStudents.map(
                (student) => (

                  <tr key={student.id}>

                    <td>
                      {student.name}
                    </td>

                    <td>
                      {student.email}
                    </td>

                    <td>
                      {student.phone}
                    </td>

                    <td>
                      {student.course}
                    </td>

                    <td>
                      {student.trainer || "Not Assigned"}
                    </td>


                    {role === "admin" && (

                      <td>

                        {/* EDIT */}

                        <button
                          className="edit-btn"
                          onClick={() =>
                            handleEdit(student)
                          }
                        >
                          Edit
                        </button>


                        {/* DELETE */}

                        <button
                          className="delete-btn"
                          onClick={() =>
                            handleDelete(
                              student.id
                            )
                          }
                        >
                          Delete
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

    </div>

  );
}

export default Students;
