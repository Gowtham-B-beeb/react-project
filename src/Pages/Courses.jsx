import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/Authcontext";
import "./Courses.css";

function Courses() {

  const { role } = useContext(AuthContext);

  const [courseName, setCourseName] = useState("");
  const [description, setDescription] = useState("");
  const [trainer, setTrainer] = useState("");
  const [duration, setDuration] = useState("");
  const [fee, setFee] = useState("");
  const [startDate, setStartDate] = useState("");

  const [courses, setCourses] = useState(
    JSON.parse(localStorage.getItem("courses")) || []
  );

  const [trainers, setTrainers] = useState(
    JSON.parse(localStorage.getItem("trainers")) || []
  );

  const [editId, setEditId] = useState(null);
  const [search, setSearch] = useState("");

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


  useEffect(() => {

    const savedTrainers =
      JSON.parse(localStorage.getItem("trainers")) || [];

    setTrainers(savedTrainers);

  }, []);


  useEffect(() => {

    localStorage.setItem(
      "courses",
      JSON.stringify(courses)
    );

  }, [courses]);


  // =========================
  // ADD / UPDATE COURSE
  // =========================

  const handleSubmit = (e) => {

    e.preventDefault();

    if (role !== "admin") {

      showAlert(
        "Only Admin can add or update courses",
        "warning"
      );

      return;
    }


    // UPDATE

    if (editId) {

      const updatedCourses = courses.map(
        (course) =>
          course.id === editId
            ? {
                ...course,
                courseName,
                description,
                trainer,
                duration,
                fee,
                startDate
              }
            : course
      );

      setCourses(updatedCourses);

      showAlert(
        "Course updated successfully!",
        "success"
      );

      setEditId(null);

    } else {

      // ADD

      const newCourse = {
        id: Date.now(),
        courseName,
        description,
        trainer,
        duration,
        fee,
        startDate
      };

      setCourses([
        ...courses,
        newCourse
      ]);

      showAlert(
        "Course added successfully!",
        "success"
      );
    }


    // Clear form

    setCourseName("");
    setDescription("");
    setTrainer("");
    setDuration("");
    setFee("");
    setStartDate("");
  };


  // =========================
  // EDIT COURSE
  // =========================

  const handleEdit = (course) => {

    if (role !== "admin") {

      showAlert(
        "Only Admin can edit courses",
        "warning"
      );

      return;
    }

    setEditId(course.id);

    setCourseName(course.courseName);
    setDescription(course.description);
    setTrainer(course.trainer);
    setDuration(course.duration);
    setFee(course.fee);
    setStartDate(course.startDate);
  };


  // =========================
  // DELETE COURSE
  // =========================

  const handleDelete = (id) => {

    if (role !== "admin") {

      showAlert(
        "Only Admin can delete courses",
        "warning"
      );

      return;
    }


    const confirmDelete =
      window.confirm(
        "Are you sure you want to delete this course?"
      );


    if (!confirmDelete) {
      return;
    }


    const updatedCourses =
      courses.filter(
        (course) =>
          course.id !== id
      );

    setCourses(updatedCourses);

    showAlert(
      "Course deleted successfully!",
      "success"
    );
  };


  // =========================
  // UNIQUE TRAINERS
  // =========================

  const uniqueTrainers = [
    ...new Set(
      trainers.map(
        (item) => item.name
      )
    )
  ];


  // =========================
  // SEARCH FILTER
  // =========================

  const filteredCourses =
    courses.filter(
      (course) =>
        course.courseName
          .toLowerCase()
          .includes(
            search.toLowerCase()
          ) ||

        course.description
          .toLowerCase()
          .includes(
            search.toLowerCase()
          ) ||

        course.trainer
          .toLowerCase()
          .includes(
            search.toLowerCase()
          ) ||

        course.duration
          .toLowerCase()
          .includes(
            search.toLowerCase()
          )
    );


  return (

    <div className="courses-page">

      {/* =========================
          CUSTOM ALERT
      ========================= */}

      {alertMessage && (

        <div className={`courses-alert ${alertType}`}>

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


      {/* PAGE HEADER */}

      <div className="page-header">

        <div>

          <h1>Courses</h1>

          <p>
            Manage academy courses
          </p>

        </div>

      </div>


      {/* ADMIN FORM */}

      {role === "admin" && (

        <div className="course-form-card">

          <h2>
            {editId
              ? "Edit Course"
              : "Add Course"}
          </h2>


          <form
            onSubmit={handleSubmit}
          >

            <input
              type="text"
              placeholder="Course Name"
              value={courseName}
              onChange={(e) =>
                setCourseName(
                  e.target.value
                )
              }
              required
            />


            <textarea
              placeholder="Course Description"
              value={description}
              onChange={(e) =>
                setDescription(
                  e.target.value
                )
              }
              required
            />


            <select
              value={trainer}
              onChange={(e) =>
                setTrainer(
                  e.target.value
                )
              }
              required
            >

              <option value="">
                Select Trainer
              </option>

              {uniqueTrainers.length === 0 ? (

                <option disabled>
                  No trainers available
                </option>

              ) : (

                uniqueTrainers.map(
                  (trainerName) => (

                    <option
                      key={trainerName}
                      value={trainerName}
                    >
                      {trainerName}
                    </option>

                  )
                )

              )}

            </select>


            <input
              type="text"
              placeholder="Duration (Example: 3 Months)"
              value={duration}
              onChange={(e) =>
                setDuration(
                  e.target.value
                )
              }
              required
            />


            <input
              type="number"
              placeholder="Course Fee"
              value={fee}
              onChange={(e) =>
                setFee(
                  e.target.value
                )
              }
              required
            />


            <input
              type="date"
              value={startDate}
              onChange={(e) =>
                setStartDate(
                  e.target.value
                )
              }
              required
            />


            <button type="submit">

              {editId
                ? "Update Course"
                : "Add Course"}

            </button>

          </form>

        </div>

      )}


      {/* NORMAL USER MESSAGE */}

      {role !== "admin" && (

        <div className="user-message">

          <p>
            You are logged in as a Normal User.
            You can view courses only.
          </p>

        </div>

      )}


      {/* SEARCH */}

      <div className="search-box">

        <input
          type="text"
          placeholder="Search courses..."
          value={search}
          onChange={(e) =>
            setSearch(
              e.target.value
            )
          }
        />

      </div>


      {/* RESULT COUNT */}

      <p className="result-count">

        Showing{" "}
        {filteredCourses.length}{" "}
        course
        {filteredCourses.length !== 1
          ? "s"
          : ""}

      </p>


      {/* TABLE */}

      <div className="table-container">

        <table>

          <thead>

            <tr>

              <th>Course Name</th>
              <th>Description</th>
              <th>Trainer</th>
              <th>Duration</th>
              <th>Fee</th>
              <th>Start Date</th>

              {role === "admin" && (
                <th>Action</th>
              )}

            </tr>

          </thead>


          <tbody>

            {filteredCourses.length === 0 ? (

              <tr>

                <td
                  colSpan={
                    role === "admin"
                      ? "7"
                      : "6"
                  }
                >
                  No courses found
                </td>

              </tr>

            ) : (

              filteredCourses.map(
                (course) => (

                  <tr key={course.id}>

                    <td>
                      {course.courseName}
                    </td>

                    <td>
                      {course.description}
                    </td>

                    <td>
                      {course.trainer}
                    </td>

                    <td>
                      {course.duration}
                    </td>

                    <td>
                      ₹{course.fee}
                    </td>

                    <td>
                      {course.startDate}
                    </td>


                    {role === "admin" && (

                      <td>

                        <button
                          className="edit-btn"
                          onClick={() =>
                            handleEdit(course)
                          }
                        >
                          Edit
                        </button>


                        <button
                          className="delete-btn"
                          onClick={() =>
                            handleDelete(
                              course.id
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

export default Courses;