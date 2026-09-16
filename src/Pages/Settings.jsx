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
      alert("Username cannot be empty");
      return;
    }

    const success =
      updateUsername(
        newUsername.trim()
      );

    if (!success) {
      alert("Username already exists");
      return;
    }

    alert("Username updated successfully!");
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
      alert("Please fill all password fields");
      return;
    }

    if (newPassword !== confirmPassword) {
      alert("New passwords do not match");
      return;
    }

    if (newPassword.length < 6) {
      alert(
        "Password must be at least 6 characters"
      );
      return;
    }

    const result =
      changePassword(
        currentPassword,
        newPassword
      );

    if (result === "wrong_password") {
      alert("Current password is incorrect");
      return;
    }

    if (result === "not_logged_in") {
      alert("Please login again");
      return;
    }

    alert("Password changed successfully!");

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