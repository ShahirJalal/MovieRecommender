import React from "react";
import { Link } from "react-router-dom";

// check user's role
const withRoleCheck = (Component) => {
  return () => {
    const role = localStorage.getItem("role");

    if (role === "admin") {
      window.location.href = "http://localhost:3000/admin-home";
      return null;
    } else if (!role) {
      window.location.href = "http://localhost:3000";
      return null;
    }

    return <Component />;
  };
};

const UserHome = () => {
  return (
    <div className="container my-5 d-flex justify-content-center">
      <div className="card" style={{ width: "30%" }}>
        <div className="card-header">
          <h3 className="text-center">Movie Recommender System</h3>
        </div>
        <div className="card-body">
          <p className="text-center">Please select an option below:</p>
          <div className="d-flex justify-content-center my-5">
            <Link to="/user-movies">
              <button className="btn btn-primary mx-3">View Movies</button>
            </Link>
            <Link to="/favourites">
              <button className="btn btn-secondary mx-3">My Favourites</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withRoleCheck(UserHome);