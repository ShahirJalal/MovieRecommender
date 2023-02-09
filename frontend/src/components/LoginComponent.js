import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const LoginComponent = () => {
  const [userName, setUserName] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: userName, userPassword: userPassword })
    })
      .then((response) => response.text())
      .then((data) => {
        setMessage(data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="card mt-5 mx-auto" style={{ width: '18rem' }}>
      <div className="card-body">
        <form onSubmit={handleSubmit}>
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
          <button className="btn btn-primary" type="submit">Login</button>
        </form>
        {message && (
          <div className="mt-3">
            {message}
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginComponent;