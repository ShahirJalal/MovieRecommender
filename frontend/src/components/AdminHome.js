import React from 'react';
import { Link } from 'react-router-dom';

const withRoleCheck = (Component) => {
  return () => {
    const role = localStorage.getItem('role');

    if (role === 'user') {
      window.location.href = 'http://localhost:3000/user-home';
      return null;
    } else if (!role) {
      window.location.href = 'http://localhost:3000';
      return null;
    }

    return <Component />;
  };
};

const AdminHome = () => {
  return (
    <div className="container my-5 d-flex justify-content-center">
      <div className="card" style={{ width: "50%" }}>
        <div className="card-header">
          <h3 className="text-center">Movie Recommender System</h3>
        </div>
        <div className="card-body">
          <p className="text-center">Please select an option below:</p>
          <div className="d-flex justify-content-center my-5">
            <Link to="/admin-movies">
              <button className="btn btn-primary mx-3">View Movies</button>
            </Link>
            <Link to="/users">
              <button className="btn btn-secondary mx-3">View Users</button>
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

export default withRoleCheck(AdminHome);