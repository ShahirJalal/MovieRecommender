import React, { useState } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

const Login = () => {
  const [userName, setUserName] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/api/v1/users/login', {
        userName,
        userPassword,
      });
      if (response.data) {
        setIsAuthenticated(true);
      }
    } catch (error) {
      setErrorMessage('Invalid credentials');
    }
  };

  return (
    <div>
      {isAuthenticated ? (
        <Redirect to='/movies' />
      ) : (
        <form onSubmit={handleSubmit}>
          <input
            type='text'
            placeholder='User Name'
            value={userName}
            onChange={(event) => setUserName(event.target.value)}
          />
          <input
            type='password'
            placeholder='Password'
            value={userPassword}
            onChange={(event) => setUserPassword(event.target.value)}
          />
          <button type='submit'>Login</button>
          {errorMessage && <p>{errorMessage}</p>}
        </form>
      )}
    </div>
  );
};

export default Login;