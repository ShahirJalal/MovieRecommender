import React, { useState, useEffect } from "react";
import UserService from "../services/UserService";
import { Link, useNavigate, useParams } from "react-router-dom";
import { hashPassword } from "./passwordUtils";

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

const AddUserComponent = () => {
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [role, setRole] = useState("");
  const navigate = useNavigate();
  const { userId } = useParams();
  const saveOrUpdateUser = (e) => {
    e.preventDefault();
  
    const user = {
      userId,
      email,
      userName,
      role,
    };
  
    if (userId) {
      UserService.getUserbyId(userId)
        .then((response) => {
          const { userPassword: oldPassword } = response.data;
          if (oldPassword === userPassword) {
            user.userPassword = oldPassword;
            return UserService.updateUser(userId, user);
          } else {
            const hashedPassword = hashPassword(userPassword); // hash the password
            user.userPassword = hashedPassword;
            return UserService.updateUser(userId, user);
          }
        })
        .then((response) => {
          console.log(response.data);
          navigate("/users");
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      const hashedPassword = hashPassword(userPassword); // hash the password
      user.userPassword = hashedPassword;
      UserService.createUser(user)
        .then((response) => {
          console.log(response.data);
          navigate("/users");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };  

  useEffect(() => {
    UserService.getUserbyId(userId)
      .then((response) => {
        console.log(response.data.email);
        setEmail(response.data.email);
        setUserName(response.data.userName);
        setUserPassword(response.data.userPassword);
        setRole(response.data.role);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const title = () => {
    if (userId) {
      return <h2 className="text-center"> Update User</h2>;
    } else {
      return <h2 className="text-center"> Add User</h2>;
    }
  };

  return (
    <div>
      <br></br>
      <div className="container">
        <div className="row">
          <div className="card col-md-6 offset-md-3 offset-md-3">
            {title()}
            <div className="card-body">
              <form>
                <div className="form-group mb-2">
                  <label className="form-label"> Email :</label>
                  <input
                    type="email"
                    placeholder="Enter Email"
                    name="Email"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  ></input>
                </div>
                <div className="form-group mb-2">
                  <label className="form-label"> Username :</label>
                  <input
                    type="text"
                    placeholder="Enter username"
                    name="username"
                    className="form-control"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                  ></input>
                </div>
                <div className="form-group mb-2">
                  <label className="form-label"> Password :</label>
                  <input
                    type="password"
                    placeholder="Enter Password"
                    name="userpassword"
                    className="form-control"
                    value={userPassword}
                    onChange={(e) => setUserPassword(e.target.value)}
                  ></input>
                </div>
                <div className="form-group mb-2">
                  <label className="form-label"> Role :</label>
                  <select
                    className="form-control"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                  >
                    <option value="user">user</option>
                    <option value="admin">admin</option>
                  </select>
                </div>
                <button
                  className="btn btn-success"
                  onClick={(e) => saveOrUpdateUser(e)}
                >
                  Save User
                </button>
                &nbsp;
                <Link to="/users" className="btn btn-danger">
                  Cancel
                </Link>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withRoleCheck(AddUserComponent);