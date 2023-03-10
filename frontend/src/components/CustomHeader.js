import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const CustomHeader = () => {
  const [role, setRole] = useState("");
  const [userName, setUserName] = useState("");

  useEffect(() => {
    setRole(localStorage.getItem("role"));
    setUserName(localStorage.getItem("userName"));
  }, []);

  // Clears local storage and redirects user to login page
  const handleLogout = () => {
    localStorage.clear();
    setTimeout(() => {
      window.location.href = "/login";
    }, 1000);
  };

  return (
    <div>
      <header>
        <nav className="navbar navbar-expand-md navbar-dark bg-dark">
          <div>
            <a
              href="http://localhost:3000/"
              className="navbar-brand header-text"
            >
              <img
                src="https://raw.githubusercontent.com/ShahirJalal/ReferencePoint/a8fbc0f807b8dd8fc16dca0cb14c59084b0d6bf1/images/filmfrenzy-low-resolution-logo-color-on-transparent-background.svg"
                alt="Movie Application Logo"
                height="30"
                style={{ marginRight: "10px" }}
              />
            </a>
          </div>
          {userName && (
            <span
              className="nav-link"
              style={{ color: "#ceb700", marginRight: "10px" }}
            >
              {userName.charAt(0).toUpperCase() + userName.slice(1)} {/* Displays username on the header */}
            </span>
          )}
          <div className="collapse navbar-collapse">
            {role && (
              <ul className="navbar-nav ml-auto">
                <li className="nav-item"> {/* Sends users to approriate home page based on their role */}
                  {role === "user" ? (
                    <Link to="/user-home" className="nav-link">
                      Home
                    </Link>
                  ) : (
                    <Link to="/admin-home" className="nav-link">
                      Home
                    </Link>
                  )}
                </li>
                <li className="nav-item">
                  <Link to="#" onClick={handleLogout} className="nav-link">
                    Logout
                  </Link>
                </li>
              </ul>
            )}
          </div>
        </nav>
      </header>
    </div>
  );
};

export default CustomHeader;