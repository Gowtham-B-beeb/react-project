import { useContext, useState } from "react";
import { AuthContext } from "../Context/Authcontext";
import "./Settings.css";

function Settings() {

  const {
    username,
    updateUsername,
    changePassword
  } = useContext(AuthContext);


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
  // USERNAME
  // =========================

  const [newUsername, setNewUsername] =
    useState(username);


  // =========================
  // PASSWORD
  // =========================

  const [currentPassword, setCurrentPassword] =
    useState("");

  const [newPassword, setNewPassword] =
    useState("");

  const [confirmPassword, setConfirmPassword] =
    useState("");


  // =========================
  // THEME
  // =========================

  const [theme, setTheme] =
    useState(
      localStorage.getItem("theme") || "light"
    );


  // =========================
  // UPDATE USERNAME
  // =========================

  const handleUsernameUpdate = (e) => {

    e.preventDefault();

    if (newUsername.trim() === "") {

      showAlert(
        "Username cannot be empty",
        "warning"
      );

      return;
    }


    const success =
      updateUsername(
        newUsername.trim()
      );


    if (!success) {

      showAlert(
        "Username already exists",
        "error"
      );

      return;
    }


    showAlert(
      "Username updated successfully!",
      "success"
    );

  };


  // =========================
  // CHANGE PASSWORD
  // =========================

  const handlePasswordChange = (e) => {

    e.preventDefault();

    if (
      currentPassword === "" ||
      newPassword === "" ||
      confirmPassword === ""
    ) {

      showAlert(
        "Please fill all password fields",
        "warning"
      );

      return;
    }


    if (newPassword !== confirmPassword) {

      showAlert(
        "New passwords do not match",
        "error"
      );

      return;
    }


    if (newPassword.length < 6) {

      showAlert(
        "Password must be at least 6 characters",
        "warning"
      );

      return;
    }


    const result =
      changePassword(
        currentPassword,
        newPassword
      );


    if (result === "wrong_password") {

      showAlert(
        "Current password is incorrect",
        "error"
      );

      return;
    }


    if (result === "not_logged_in") {

      showAlert(
        "Please login again",
        "warning"
      );

      return;
    }


    showAlert(
      "Password changed successfully!",
      "success"
    );


    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");

  };


  // =========================
  // CHANGE THEME
  // =========================

  const handleThemeChange = (selectedTheme) => {

    setTheme(selectedTheme);

    localStorage.setItem(
      "theme",
      selectedTheme
    );


    if (selectedTheme === "dark") {

      document.body.classList.add(
        "dark-mode"
      );

    } else {

      document.body.classList.remove(
        "dark-mode"
      );

    }

  };


  return (

    <div className="settings-page">


      {/* =========================
          CUSTOM ALERT
         ========================= */}

      {alertMessage && (

        <div
          className={`settings-alert ${alertType}`}
        >

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


      {/* =========================
          HEADER
         ========================= */}

      <div className="settings-header">

        <h1>
          Settings
        </h1>

        <p>
          Manage your account settings
        </p>

      </div>


      {/* =========================
          USERNAME
         ========================= */}

      <div className="settings-card">

        <h2>
          👤 Profile Settings
        </h2>

        <p className="settings-description">
          Update your username.
        </p>


        <form
          onSubmit={handleUsernameUpdate}
        >

          <div className="settings-group">

            <label>
              Current Username
            </label>

            <input
              type="text"
              value={username}
              disabled
            />

          </div>


          <div className="settings-group">

            <label>
              New Username
            </label>

            <input
              type="text"
              placeholder="Enter new username"
              value={newUsername}
              onChange={(e) =>
                setNewUsername(
                  e.target.value
                )
              }
            />

          </div>


          <button
            type="submit"
            className="settings-primary-btn"
          >
            Update Username
          </button>

        </form>

      </div>


      {/* =========================
          PASSWORD
         ========================= */}

      <div className="settings-card">

        <h2>
          🔐 Change Password
        </h2>

        <p className="settings-description">
          Change your account password.
        </p>


        <form
          onSubmit={handlePasswordChange}
        >

          <div className="settings-group">

            <label>
              Current Password
            </label>

            <input
              type="password"
              placeholder="Enter current password"
              value={currentPassword}
              onChange={(e) =>
                setCurrentPassword(
                  e.target.value
                )
              }
            />

          </div>


          <div className="settings-group">

            <label>
              New Password
            </label>

            <input
              type="password"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) =>
                setNewPassword(
                  e.target.value
                )
              }
            />

          </div>


          <div className="settings-group">

            <label>
              Confirm New Password
            </label>

            <input
              type="password"
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) =>
                setConfirmPassword(
                  e.target.value
                )
              }
            />

          </div>


          <button
            type="submit"
            className="settings-primary-btn"
          >
            Change Password
          </button>

        </form>

      </div>


      {/* =========================
          APPEARANCE
         ========================= */}

      <div className="settings-card">

        <h2>
          🎨 Appearance
        </h2>

        <p className="settings-description">
          Choose your preferred theme.
        </p>


        <div className="theme-options">

          <button
            className={
              theme === "light"
                ? "theme-btn active"
                : "theme-btn"
            }
            onClick={() =>
              handleThemeChange("light")
            }
          >
            ☀️ Light Mode
          </button>


          <button
            className={
              theme === "dark"
                ? "theme-btn active"
                : "theme-btn"
            }
            onClick={() =>
              handleThemeChange("dark")
            }
          >
            🌙 Dark Mode
          </button>

        </div>

      </div>

    </div>

  );
}

export default Settings;