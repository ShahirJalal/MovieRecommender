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
            <Route path= "/home" element={<UserHome />}></Route>
            <Route path = "/user-movies" element={<UserMovies/>}></Route>
            <Route path = "/info-movie/:movieId" element={<MovieInfo/>}></Route>
            <Route path = "/recommendations/:movieId" element={<RecommendComponent/>}></Route>

            <Route path= "/admin-home" element={<AdminHome />}></Route>
            <Route path = "/admin-movies" element={<ListMoviesComponent/>}></Route>
            <Route path = "/add-Movie" element={<AddMovieComponet/>}></Route>
            <Route path = "/edit-movie/:movieId" element={<AddMovieComponet/>}></Route>
            <Route path = "/users" element={<ListUserComponent/>}></Route>
            <Route path = "/add-User" element={<AddUserComponet/>}></Route>
            <Route path = "/edit-user/:userId" element={<AddUserComponet/>}></Route>
        </Routes>
      </div>
      <CustomFooter></CustomFooter>
      </BrowserRouter>
    </div>
  );
}

export default App;