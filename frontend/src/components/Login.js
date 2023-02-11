import React, { useState } from "react";
import axios from "axios";

const Login = () => {
  const [userName, setUserName] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/api/v1/users/login", {
        userName,
        userPassword,
      });
      console.log(response.data);
      if (response.data.role === "admin") {
        window.location.href = "/admin-home";
      } else {
        window.location.href = "/user-home";
      }
    } catch (error) {
      setError("Incorrect username or password");
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div style={{ width: "400px", padding: "3px", textAlign: "center" }}>
        <h3>Login</h3>
        {error && (
          <div style={{ backgroundColor: "red", color: "white" }}>
            <p>{error}</p>
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="formUsername">Username</label>
            <input
              type="text"
              placeholder="Enter username"
              value={userName}
              onChange={(event) => setUserName(event.target.value)}
            />
          </div>
          <div>
            <label htmlFor="formPassword">Password</label>
            <input
              type="password"
              placeholder="Password"
              value={userPassword}
              onChange={(event) => setUserPassword(event.target.value)}
            />
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default Login;