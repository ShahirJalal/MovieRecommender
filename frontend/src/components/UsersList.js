import React, { useState, useEffect } from "react";
import UserService from "../services/UserService";
import Pagination from "./Pagination";
import { Link } from "react-router-dom";

// check user's role
const withRoleCheck = (Component) => {
  return () => {
    const role = localStorage.getItem("role");

    if (role === "user") {
      window.location.href = "http://localhost:3000/user-home";
      return null;
    } else if (!role) {
      window.location.href = "http://localhost:3000";
      return null;
    }

    return <Component />;
  };
};

const ListUserComponent = () => {
  const [user, setUser] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 10;
  useEffect(() => {
    getUsers();
  }, []);

  // Get all users
  const getUsers = () => {
    UserService.getAllUsers()
      .then((response) => {
        setUser(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Delete user by userId
  const deleteUser = (userId) => {
    UserService.deleteUser(userId)
      .then((response) => {
        getUsers();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Index range of users to be displayed
  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const curentPosts = user.slice(firstPostIndex, lastPostIndex);
  return (
    <div className="container">
      <br />
      <h2 className="text-center"> Users </h2>
      <Link to="/add-User" className="btn btn-primary mb-2">
        {" "}
        Add New User{" "}
      </Link>
      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th> User Id </th>
            <th> Email </th>
            <th> UserName </th>
            <th> UserPassword </th>
            <th> Role </th>
            <th> Function </th>
          </tr>
        </thead>
        <tbody>
          {curentPosts.map((user) => (
            <tr key={user.userId}>
              <td> {user.userId} </td>
              <td> {user.email} </td>
              <td> {user.userName} </td>
              <td>{user.userPassword}</td>
              <td>{user.role}</td>
              <td>
                <Link className="btn btn-info" to={`/edit-user/${user.userId}`}> {/* Update user */}
                  Update
                </Link>
                <button
                  className="btn btn-danger"
                  onClick={() => deleteUser(user.userId)}
                  style={{ marginLeft: "10px" }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination
        totalPosts={user.length}
        postsPerpage={postsPerPage}
        setCurrentPage={setCurrentPage}
      ></Pagination>
    </div>
  );
};
export default withRoleCheck(ListUserComponent);