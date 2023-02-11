// import React, { useState } from 'react';
// import axios from 'axios';
// import 'bootstrap/dist/css/bootstrap.min.css';

// const Login = () => {
//   const [userName, setUserName] = useState('');
//   const [userPassword, setUserPassword] = useState('');
//   const [isSuccessful, setIsSuccessful] = useState(false);
//   const [errorMessage, setErrorMessage] = useState('');

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     try {
//       const response = await axios.post('http://localhost:8080/api/v1/users/login', {
//         userName,
//         userPassword,
//       });
//       if (response.data) {
//         setIsSuccessful(true);
//         setErrorMessage('');
//       }
//     } catch (error) {
//       setErrorMessage('Invalid credentials');
//       setIsSuccessful(false);
//     }
//   };

// return (
//   <div className='container mt-5 d-flex justify-content-center'>
//     <div className='card' style={{width: "30%"}}>
//       <div className='card-header'>
//         <h3>Login</h3>
//       </div>
//       <div className='card-body'>
//         <form onSubmit={handleSubmit}>
//           <div className='form-group mb-2'>
//             <label htmlFor='username'>Username:</label>
//             <input
//               type='text'
//               id='username'
//               className='form-control'
//               placeholder='User Name'
//               value={userName}
//               onChange={(event) => setUserName(event.target.value)}
//             />
//           </div>
//           <div className='form-group mb-2'>
//             <label htmlFor='password'>Password:</label>
//             <input
//               type='password'
//               id='password'
//               className='form-control'
//               placeholder='Password'
//               value={userPassword}
//               onChange={(event) => setUserPassword(event.target.value)}
//             />
//           </div>
//           <button type='submit' className='btn btn-primary mt-2'>
//             Login
//           </button>
//           {isSuccessful && (
//             <p className='text-success mt-3'>Login successful</p>
//           )}
//           {errorMessage && (
//             <p className='text-danger mt-3'>{errorMessage}</p>
//           )}
//         </form>
//         <p className="text-center mt-3">
//           Don't have an account? &nbsp;
//           <a href="http://localhost:3000/registration">Sign up</a>
//         </p>
//       </div>
//     </div>
//   </div>
// );
// };

// export default Login;

import React, { useState } from "react";
import axios from "axios";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:8080/api/v1/users/login", {
        username,
        password,
      });

      if (response.data && response.data.role === "admin") {
        window.location.href = "/admin-home";
      } else if (response.data && response.data.role === "user") {
        window.location.href = "/user-home";
      }
    } catch (error) {
      setErrorMessage("Incorrect username or password");
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header bg-primary text-white">Login</div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Username</label>
                  <input type="text" className="form-control" value={username} onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div className="form-group">
                  <label>Password</label>
                  <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
                <button type="submit" className="btn btn-primary">Login</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;