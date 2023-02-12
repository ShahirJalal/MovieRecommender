import './App.css';
import {BrowserRouter, BrowserRouter as Router, Route, Routes }from 'react-router-dom';
import CustomFooter from './components/CustomFooter';
import CustomHeader from './components/CustomHeader';
// import { Link } from 'react-router-dom';
import ListUserComponent from './components/ListUserComponent';
import ListMoviesComponent from './components/ListMoviesComponent';
import AddUserComponet from './components/AddUserComponent';
import AddMovieComponet from './components/AddMovieComponent';
import RecommendComponent from './components/RecommendComponent'
import MovieInfo from './components/MovieInfo';
import Login from './components/Login';
import Registration from './components/Registration';
import UserHome from './components/UserHome';
import UserMovies from './components/UserMovies';
import AdminHome from './components/AdminHome';
import FavouritesList from './components/FavouritesList';

function App() {
  const role = localStorage.getItem("role");

  return (
    <div>
      <BrowserRouter>
        <CustomHeader />
        <div className="container">
          <Routes>
            {!role && (
              <Route path="/" element={<Login />} />
            )}
            <Route path="/login" element={<Login />} />
            <Route path="/registration" element={<Registration />} />

            {role === "user" && (
              <>
                <Route path="/user-home" element={<UserHome />} />
                <Route path="/user-movies" element={<UserMovies />} />
                <Route path="/info-movie/:movieId" element={<MovieInfo />} />
                <Route path="/recommendations/:movieId" element={<RecommendComponent />} />
                <Route path="/favourites" element={<FavouritesList />} />
              </>
            )}

            {role === "admin" && (
              <>
                <Route path="/admin-home" element={<AdminHome />} />
                <Route path="/admin-movies" element={<ListMoviesComponent />} />
                <Route path="/add-Movie" element={<AddMovieComponet />} />
                <Route path="/edit-movie/:movieId" element={<AddMovieComponet />} />
                <Route path="/users" element={<ListUserComponent />} />
                <Route path="/add-User" element={<AddUserComponet />} />
                <Route path="/edit-user/:userId" element={<AddUserComponet />} />
                <Route path="/favourites" element={<FavouritesList />} />
              </>
            )}
          </Routes>
        </div>
        <CustomFooter />
      </BrowserRouter>
    </div>
  );
}

export default App;