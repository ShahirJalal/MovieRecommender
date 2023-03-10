import React, { useState } from "react";
import axios from "axios";
import { hashPassword } from "./PasswordUtils";

// check user's role
const withRoleCheck = (Component) => {
  return () => {
    const role = localStorage.getItem("role");

    if (role === "admin") {
      window.location.href = "http://localhost:3000/admin-home";
      return null;
    } else if (role === "user") {
      window.location.href = "http://localhost:3000/user-home";
      return null;
    }

    return <Component />;
  };
};

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const hashedPassword = await hashPassword(password); // Hash the password
      const response = await axios.post( // Sent for verification
        "http://localhost:8080/api/v1/users/login",
        {
          userName: username,
          userPassword: hashedPassword,
        }
      );

      // Stores user's data in local storage
      if (response.data.role === "user") {
        localStorage.setItem("userId", response.data.userId);
        localStorage.setItem("userName", response.data.userName);
        localStorage.setItem("role", "user");
        window.location.href = "http://localhost:3000/user-home"; // Sends user to appropriate home page
      } else if (response.data.role === "admin") {
        localStorage.setItem("userId", response.data.userId);
        localStorage.setItem("userName", response.data.userName);
        localStorage.setItem("role", "admin");
        window.location.href = "http://localhost:3000/admin-home";
      }
    } catch (error) {
      setError("Wrong username or password. Please try again.");
      console.error(error);
    }
  };

  return (
    <div className="container mt-5 d-flex justify-content-center">
      <div className="card" style={{ width: "30%" }}>
        <div className="card-header">
          <h3>Login</h3>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              className="form-control mb-2"
              id="username"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="password"
              className="form-control mb-2"
              id="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit" className="btn btn-primary mt-2">
              Login
            </button>
            {error && <p className="text-danger mt-3">{error}</p>}
          </form>
          <p className="text-center mt-3">
            Don't have an account?&nbsp;
            <a href="http://localhost:3000/registration">Sign up</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default withRoleCheck(Login);