import './App.css';
import {BrowserRouter, BrowserRouter as Router, Route, Routes }from 'react-router-dom';
import CustomFooter from './components/CustomFooter';
import CustomHeader from './components/CustomHeader';
import ListUserComponent from './components/ListUserComponent';
import ListMoviesComponent from './components/ListMoviesComponent';
import AddUserComponent from './components/AddUserComponent';
import AddMovieComponent from './components/AddMovieComponent';
import RecommendComponent from './components/RecommendComponent'
import Login from './components/Login';
import Registration from './components/Registration';
import UserHome from './components/UserHome';
import UserMovies from './components/UserMovies';
import AdminHome from './components/AdminHome';
import FavouritesList from './components/FavouritesList';
import ViewMovieComponent from './components/ViewMovieComponent';
import React from 'react';

function App() {
  return (
    <div >
      <BrowserRouter>
      <CustomHeader></CustomHeader>
      <div className="container">
        <Routes>
            <Route path = "/" element={<Login />}></Route>
            <Route path = "/login" element={<Login />}></Route>
            <Route path = "/registration" element={<Registration />}></Route>

            <Route path= "/user-home" element={<UserHome />}></Route>
            <Route path = "/user-movies" element={<UserMovies/>}></Route>

            <Route path = "/recommendations/:movieId" element={<RecommendComponent/>}></Route>
            <Route path= "/favourites" element={<FavouritesList />}></Route>
            <Route path = "/view-movie/:movieId" element={<ViewMovieComponent/>}></Route>

            <Route path= "/admin-home" element={<AdminHome />}></Route>
            <Route path = "/admin-movies" element={<ListMoviesComponent/>}></Route>
            <Route path = "/add-Movie" element={<AddMovieComponent/>}></Route>
            <Route path = "/edit-movie/:movieId" element={<AddMovieComponent/>}></Route>
            <Route path = "/users" element={<ListUserComponent/>}></Route>
            <Route path = "/add-User" element={<AddUserComponent/>}></Route>
            <Route path = "/edit-user/:userId" element={<AddUserComponent/>}></Route>
        </Routes>
      </div>
      <CustomFooter></CustomFooter>
      </BrowserRouter>
    </div>
  );
}

export default App;