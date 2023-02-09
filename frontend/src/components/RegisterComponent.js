import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const RegisterComponent = () => {
  const [userName, setUserName] = useState('');
  const [userPassword, setUserPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(userName, userPassword);
    // here you can add the logic to send the data to the server for authentication
  };

  return (

    <div>
        <br /><br />
        <div className="container">
            <div className="card col-md-6 offset-md-3 offset-md-3">
                <h2 className = "text-center">Registration</h2>
                <div className="card-body">
                <form className="mt-5" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="userName">Username:</label>
        <input
          type="text"
          className="form-control"
          id="userName"
          value={userName}
          onChange={(event) => setUserName(event.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="userPassword">Password:</label>
        <input
          type="password"
          className="form-control"
          id="userPassword"
          value={userPassword}
          onChange={(event) => setUserPassword(event.target.value)}
        />
      </div>
      <button className="btn btn-success" type="submit">Register</button>
    </form>
                </div>
            </div>
        </div>
    </div>

  );
};

export default RegisterComponent;