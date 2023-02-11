import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const Login = () => {
  const [userName, setUserName] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/api/v1/users/login', {
        userName,
        userPassword,
      });
      if (response.status === 200) {
        const role = response.data.role;
        console.log(role)
        if (role === 'admin') {
          window.location.href = 'http://localhost:3000/admin-home';
        } else {
          window.location.href = 'http://localhost:3000/user-home';
        }
      } else {
        setError('Wrong username or password. Please try again.');
      }
    } catch (error) {
      setError('An error occurred while logging in. Please try again later.');
    }
  };

  return (
    <div className='container mt-5 d-flex justify-content-center'>
      <div className='card' style={{ width: '30%' }}>
        <div className='card-header'>
          <h3>Login</h3>
        </div>
        <div className='card-body'>
          <form onSubmit={handleSubmit}>
            <div className='form-group mb-2'>
              <label htmlFor='username'>Username:</label>
              <input
                type='text'
                id='username'
                className='form-control'
                placeholder='Username'
                value={userName}
                onChange={(event) => setUserName(event.target.value)}
              />
            </div>
            <div className='form-group mb-2'>
              <label htmlFor='password'>Password:</label>
              <input
                type='password'
                id='password'
                className='form-control'
                placeholder='Password'
                value={userPassword}
                onChange={(event) => setUserPassword(event.target.value)}
              />
            </div>
            <button type='submit' className='btn btn-primary mt-2'>
              Login
            </button>
            {error && (
              <p className='text-danger mt-3'>{error}</p>
            )}
          </form>
          <p className="text-center mt-3">
            Don't have an account? &nbsp; 
            <a href="http://localhost:3000/registration">Sign up</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;