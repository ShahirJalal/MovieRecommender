import React from 'react';
import { Link } from 'react-router-dom';

const AdminHome = () => {
  return (
    <div className="container my-5">
      <div className="card p-5">
        <div className="card-header text-center">
          <h1 className="text-center">Welcome to the Movie Application</h1>
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

export default AdminHome;
