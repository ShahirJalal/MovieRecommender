import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CustomFooter from "./components/CustomFooter";
import CustomHeader from "./components/CustomHeader";
import ListUserComponent from "./components/UsersList";
import ListMoviesComponent from "./components/MoviesList";
import AddUserComponent from "./components/AddUser";
import AddMovieComponent from "./components/AddMovie";
import RecommendComponent from "./components/RecommendationsList";
import Login from "./components/Login";
import Registration from "./components/Registration";
import UserHome from "./components/UserHome";
import UserMovies from "./components/UserMovies";
import AdminHome from "./components/AdminHome";
import FavouritesList from "./components/FavouritesList";
import ViewMovieComponent from "./components/ViewMovie";

function App() {
  return (
    <div>
      <BrowserRouter>
        <CustomHeader />
        <div className="container">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/registration" element={<Registration />} />

            <Route path="/user-home" element={<UserHome />} />
            <Route path="/user-movies" element={<UserMovies />} />

            <Route path="/recommendations/:movieId" element={<RecommendComponent />} />
            <Route path="/favourites" element={<FavouritesList />} />
            <Route path="/view-movie/:movieId" element={<ViewMovieComponent />} />

            <Route path="/admin-home" element={<AdminHome />} />
            <Route path="/admin-movies" element={<ListMoviesComponent />} />
            <Route path="/add-Movie" element={<AddMovieComponent />} />
            <Route path="/edit-movie/:movieId" element={<AddMovieComponent />} />
            <Route path="/users" element={<ListUserComponent />} />
            <Route path="/add-User" element={<AddUserComponent />} />
            <Route path="/edit-user/:userId" element={<AddUserComponent />} />
          </Routes>
        </div>
        <CustomFooter />
      </BrowserRouter>
    </div>
  );
}

export default App;