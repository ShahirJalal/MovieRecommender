import './App.css';
import {BrowserRouter, BrowserRouter as Router, Route, Routes }from 'react-router-dom';
import CustomFooter from './components/CustomFooter';
import CustomHeader from './components/CustomHeader';
import { Link } from 'react-router-dom';
import ListUserComponent from './components/ListUserComponent';
import ListMoviesComponent from './components/ListMoviesComponent';
import AddUserComponet from './components/AddUserComponent';
import AddMovieComponet from './components/AddMovieComponent';
import RecommendComponent from './components/RecommendComponent'
import LoginComponent from './components/LoginComponent';
import RegisterComponent from './components/RegisterComponent';
import MovieInfo from './components/MovieInfo';

function App() {
  return (
    <div >
      <BrowserRouter>
      <CustomHeader></CustomHeader>
      <div className="container">
        <Routes>
            <Route path = "/register" element={<RegisterComponent />}></Route>
            <Route path = "/" element={<LoginComponent />}></Route>
            {/* <Route path = "/" element={<ListUserComponent/>}></Route> */}
            <Route path = "/users" element={<ListUserComponent/>}></Route>
            <Route path = "/add-User" element={<AddUserComponet/>}></Route>
            <Route path = "/edit-user/:userId" element={<AddUserComponet/>}></Route>
            <Route path = "/movies" element={<ListMoviesComponent/>}></Route>
            <Route path = "/add-Movie" element={<AddMovieComponet/>}></Route>
            <Route path = "/edit-movie/:movieId" element={<AddMovieComponet/>}></Route>
            <Route path = "/recommendations/:movieId" element={<RecommendComponent/>}></Route>
            <Route path = "/info-movie/:movieId" element={<MovieInfo/>}></Route>
        </Routes>
      </div>
      <CustomFooter></CustomFooter>
      </BrowserRouter>
    </div>
  );
}

export default App;