import { createContext, useState } from "react";

export const AuthContext =
  createContext();


export const AuthProvider =
  ({ children }) => {


    /* ================================
       GET SAVED USER
    ================================= */

    const savedUser =
      JSON.parse(
        localStorage.getItem(
          "currentUser"
        )
      ) || null;


    const [username, setUsername] =
      useState(
        savedUser?.username || ""
      );


    const [role, setRole] =
      useState(
        savedUser?.role || ""
      );


    /* ================================
       SIGNUP
    ================================= */

    const signup = (
      username,
      email,
      password,
      role = "normal"
    ) => {

      const users =
        JSON.parse(
          localStorage.getItem("users")
        ) || [];


      const existingUser =
        users.find(
          (user) =>
            user.username === username ||
            user.email === email
        );


      if (existingUser) {

        return false;

      }


      const newUser = {

        username,

        email,

        password,

        role

      };


      users.push(newUser);


      localStorage.setItem(
        "users",
        JSON.stringify(users)
      );


      return true;

    };


    /* ================================
       LOGIN
    ================================= */

    const login = (
      identifier,
      password
    ) => {

      const users =
        JSON.parse(
          localStorage.getItem("users")
        ) || [];


      const user =
        users.find(
          (user) =>
            (
              user.username ===
                identifier ||
              user.email ===
                identifier
            ) &&
            user.password === password
        );


      if (!user) {

        return false;

      }


      /* SAVE USER IN STATE */

      setUsername(
        user.username
      );

      setRole(
        user.role
      );


      /* SAVE LOGIN */

      localStorage.setItem(
        "isLoggedIn",
        "true"
      );


      localStorage.setItem(
        "currentUser",
        JSON.stringify(user)
      );


      return true;

    };


    /* ================================
       UPDATE USERNAME
    ================================= */

    const updateUsername = (
      newUsername
    ) => {

      const currentUser =
        JSON.parse(
          localStorage.getItem(
            "currentUser"
          )
        );


      if (!currentUser) {

        return false;

      }


      const users =
        JSON.parse(
          localStorage.getItem("users")
        ) || [];


      const usernameExists =
        users.some(
          (user) =>
            user.username ===
              newUsername &&
            user.email !==
              currentUser.email
        );


      if (usernameExists) {

        return false;

      }


      const updatedUsers =
        users.map(
          (user) =>
            user.email ===
            currentUser.email
              ? {
                  ...user,
                  username:
                    newUsername
                }
              : user
        );


      const updatedCurrentUser = {

        ...currentUser,

        username: newUsername

      };


      localStorage.setItem(
        "users",
        JSON.stringify(
          updatedUsers
        )
      );


      localStorage.setItem(
        "currentUser",
        JSON.stringify(
          updatedCurrentUser
        )
      );


      setUsername(
        newUsername
      );


      return true;

    };


    /* ================================
       CHANGE PASSWORD
    ================================= */

    const changePassword = (
      currentPassword,
      newPassword
    ) => {

      const currentUser =
        JSON.parse(
          localStorage.getItem(
            "currentUser"
          )
        );


      if (!currentUser) {

        return "not_logged_in";

      }


      if (
        currentUser.password !==
        currentPassword
      ) {

        return "wrong_password";

      }


      const users =
        JSON.parse(
          localStorage.getItem("users")
        ) || [];


      const updatedUsers =
        users.map(
          (user) =>
            user.email ===
            currentUser.email
              ? {
                  ...user,
                  password:
                    newPassword
                }
              : user
        );


      const updatedCurrentUser = {

        ...currentUser,

        password: newPassword

      };


      localStorage.setItem(
        "users",
        JSON.stringify(
          updatedUsers
        )
      );


      localStorage.setItem(
        "currentUser",
        JSON.stringify(
          updatedCurrentUser
        )
      );


      return "success";

    };


    /* ================================
       LOGOUT
    ================================= */

    const logout = () => {

      setUsername("");

      setRole("");


      localStorage.removeItem(
        "isLoggedIn"
      );


      localStorage.removeItem(
        "currentUser"
      );

    };


    /* ================================
       PROVIDER
    ================================= */

    return (

      <AuthContext.Provider
        value={{
          username,
          role,
          signup,
          login,
          updateUsername,
          changePassword,
          logout
        }}
      >

        {children}

      </AuthContext.Provider>

    );

  };