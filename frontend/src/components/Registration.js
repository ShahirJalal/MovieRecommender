import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { hashPassword } from './passwordUtils';

const Registration = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("user");
  const [isSuccessful, setIsSuccessful] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (userPassword !== confirmPassword) {
      setErrorMessage("Passwords do not match");
      setIsSuccessful(false);
      return;
    }
    try {
      const hashedPassword = await hashPassword(userPassword);
      const response = await axios.post(
        "http://localhost:8080/api/v1/users/register",
        {
          email,
          userName,
          userPassword: hashedPassword,
          role: "user", // Set the role to "user"
        }
      );      
      if (response.data) {
        setIsSuccessful(true);
        setErrorMessage("");
        window.location.href = "http://localhost:3000/login";
      }
    } catch (error) {
      setErrorMessage("Error registering user");
      setIsSuccessful(false);
    }
  };  

  const roleFromLocalStorage = localStorage.getItem("role");
  if (roleFromLocalStorage) {
    if (roleFromLocalStorage === "user") {
      window.location.href = "http://localhost:3000/user-home";
    } else if (roleFromLocalStorage === "admin") {
      window.location.href = "http://localhost:3000/admin-home";
    } else {
      window.location.href = "http://localhost:3000/login";
    }
  }

  return (
    <div className="container mt-5 d-flex justify-content-center">
      <div className="card" style={{ width: "30%" }}>
        <div className="card-header">
          <h3>Register</h3>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="form-group mb-2">
              <label htmlFor="username">Username:</label>
              <input
                type="text"
                id="username"
                className="form-control"
                placeholder="User Name"
                value={userName}
                onChange={(event) => setUserName(event.target.value)}
              />
            </div>
            <div className="form-group mb-2">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                className="form-control"
                placeholder="Email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>
            <div className="form-group mb-2">
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                className="form-control"
                placeholder="Password"
                value={userPassword}
                onChange={(event) => setUserPassword(event.target.value)}
              />
            </div>
            <div className="form-group mb-2">
              <label htmlFor="confirmPassword">Confirm Password:</label>
              <input
                type="password"
                id="confirmPassword"
                className="form-control"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
              />
            </div>
            <button type="submit" className="btn btn-primary mt-2">
              Register
            </button>
            {isSuccessful && (
              <p className="text-success mt-3">Registration successful</p>
            )}
            {errorMessage && <p className="text-danger mt-3">{errorMessage}</p>}
          </form>
          <p className="text-center mt-3">
            Already have an account?&nbsp;
            <a href="http://localhost:3000/login">Login</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Registration;