import React from 'react';
import { Link } from 'react-router-dom';

const UserHome = () => {
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
          <Link to="/user-movies">
            <button className="btn btn-primary">View Movies</button>
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

export default UserHome;