import React, { useState, useEffect } from 'react';
import MovieService from '../services/MovieService';
import { Link, useNavigate, useParams } from 'react-router-dom';

const AddMovieComponent = () => {
  const [title, setTitle] = useState('');
  const [genres, setGenres] = useState('');
  const [posterFile, setPosterFile] = useState(null);
  const navigate = useNavigate();
  const { movieId } = useParams();

  const saveOrUpdateMovie = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('genres', genres);
    formData.append('poster', posterFile);
    console.log(formData);
    if (movieId) {
      MovieService.updateMovie(movieId, formData)
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
    if (movieId) {
      MovieService.getMoviebyId(movieId)
        .then((response) => {
          console.log(response.data.title);
          setTitle(response.data.title);
          setGenres(response.data.genres);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [movieId]);

  const pageTitle = () => {
    if (movieId) {
      return <h2 className="text-center">Update Movie</h2>;
    } else {
      return <h2 className="text-center">Add Movie</h2>;
    }
  };

  const handlePosterChange = (e) => {
    setPosterFile(e.target.files[0]);
  };

  return (
    <div>
      <br />
      <div className="container">
        <div className="row">
          <div className="card col-md-6 offset-md-3 offset-md-3">
            {pageTitle()}
            <div className="card-body">
              <form encType="multipart/form-data">
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
                <div className="form-group mb-2">
                  <label className="form-label">Poster:</label>
                  <input
                    type="file"
                    name="poster"
                    accept=".jpeg,.jpg"
                    className="form-control"
                    onChange={handlePosterChange}
                  />
                </div>
                <button
                  className="btn btn-success"
                  onClick={(e) => saveOrUpdateMovie(e)}
                  style={{ marginRight: '10px' }}
                >
                  Save Movie
                </button>
                <Link to="/movies" className="btn btn-danger">
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

export default AddMovieComponent;
