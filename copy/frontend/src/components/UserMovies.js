import React, { useState, useEffect } from 'react'
import MovieService from '../services/MovieService'
import Pagination from './Pagination'
import MoviePoster from './MoviePoster'
import { Link } from 'react-router-dom'

const UserMovies = () => {
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(5)

  useEffect(() => {
    getMovies();
  }, [])

  const getMovies = () => {
    MovieService.getAllMovies().then((response) => {
      setMovies(response.data)
      console.log(response.data);
    }).catch(error => {
      console.log(error);
    })
  }

  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentPosts = movies.slice(firstPostIndex, lastPostIndex)

  return (
    <div className="container">
      <br />
      <h2 className="text-center">Movies</h2>
      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th>Poster</th>
            <th>Title</th>
            <th>Genres</th>
            <th>Function</th>
          </tr>
        </thead>
        <tbody>
          {
            currentPosts.map(
              movie =>
                <tr key={movie.movieId}>
                  <td><MoviePoster movieId={movie.movieId} /></td>
                  <td>{movie.title}</td>
                  <td>{movie.genres}</td>
                  <td>
                    <Link className='btn btn-success' to={`/recommendations/${movie.movieId}`}>Recommendation</Link>
                  </td>
                </tr>
            )
          }
        </tbody>
      </table>
      <Pagination
        totalPosts={movies.length}
        postsPerpage={postsPerPage}
        setCurrentPage={setCurrentPage}>
      </Pagination>
    </div>
  )
}

export default UserMovies;