import React from 'react';
import { Link } from 'react-router-dom';

const AdminHome = () => {
  return (
    <div className="container my-5">
      <div className="row">
        <div className="col-12">
          <h1 className="text-center">Welcome to the Movie Application</h1>
          <p className="text-center">Please select an option below:</p>
        </div>
      </div>
      <div className="row my-5">
        <div className="col-12 d-flex justify-content-center">
          <Link to="/admin-movies">
            <button className="btn btn-primary">View Movies</button>
          </Link>
        </div>
      </div>
      <div className="row my-5">
        <div className="col-12 d-flex justify-content-center">
          <Link to="/users">
            <button className="btn btn-secondary">View Users</button>
          </Link>
        </div>
      </div>
      <div className="row my-5">
        <div className="col-12 d-flex justify-content-center">
          <Link to="/favourites">
            <button className="btn btn-secondary">My Favourites</button>
          </Link>
          
        </div>
      </div>
    </div>
  );
};

export default AdminHome;

// edit this code so that it will check the local storage. if the local storage is empty, send the user to this page: http://localhost:3000/login.

// if the role of the person is admin, send the person to this page:
// let the person stay on the current page

// if the role of the person is user, send the person to this page:
// http://localhost:3000/user-home