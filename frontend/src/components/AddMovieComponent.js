import React, { useState, useEffect } from 'react';
import MovieService from '../services/MovieService';
import { Link, useNavigate, useParams } from 'react-router-dom';

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

const AddMovieComponent = () => {
  const [movieId, setMovieId] = useState('');
  const [title, setTitle] = useState('');
  const [genres, setGenres] = useState('');
  const navigate = useNavigate();
  const { movieId: paramMovieId } = useParams();

  const saveOrUpdateMovie = (e) => {
    e.preventDefault();
    const formData = {
      movieId,
      title,
      genres
    };
    console.log(formData);
    if (paramMovieId) {
      MovieService.updateMovie(paramMovieId, formData)
        .then((response) => {
          console.log(response.data);
          navigate('/admin-movies');
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      MovieService.createMovie(formData)
        .then((response) => {
          console.log(response.data);
          navigate('/admin-movies');
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  useEffect(() => {
    if (paramMovieId) {
      MovieService.getMoviebyId(paramMovieId)
        .then((response) => {
          console.log(response.data.title);
          setMovieId(response.data.movieId);
          setTitle(response.data.title);
          setGenres(response.data.genres);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [paramMovieId]);

  const pageTitle = () => {
    if (paramMovieId) {
      return <h2 className="text-center">Update Movie</h2>;
    } else {
      return <h2 className="text-center">Add Movie</h2>;
    }
  };

  return (
    <div>
      <br />
      <div className="container">
        <div className="row">
          <div className="card col-md-6 offset-md-3 offset-md-3">
            {pageTitle()}
            <div className="card-body">
              <form>
                {(!paramMovieId) && (
                  <div className="form-group mb-2">
                    <label className="form-label">Movie ID:</label>
                    <input
                      type="text"
                      placeholder="Enter Movie ID"
                      name="movieId"
                      className="form-control"
                      value={movieId}
                      onChange={(e) => setMovieId(e.target.value)}
                    />
                  </div>
                )}
                <div className="form-group mb-2">
                  <label className="form-label">Movie Title:</label>
                  <input
                    type="text"
                    placeholder="Enter Title"
                    name="title"
                    className="form-control"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
                <div className="form-group mb-2">
                  <label className="form-label">Genres:</label>
                  <input
                    type="text"
                    placeholder="Enter Genres"
                    name="genres"
                    className="form-control"
                    value={genres}
                    onChange={(e) => setGenres(e.target.value)}
                  />
                </div>
                <button
                  className="btn btn-success"
                  onClick={(e) => saveOrUpdateMovie(e)}
                  style={{ marginRight: '10px' }}
                >
                  Save Movie
                </button>
                <Link to="/admin-movies" className="btn btn-danger">
                  Cancel
                </Link>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
                
export default withRoleCheck(AddMovieComponent);