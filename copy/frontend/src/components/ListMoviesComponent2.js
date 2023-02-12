// this is the ListMoviesComponent.js original code

import React, {useState,useEffect} from 'react'
import MovieService from '../services/MovieService'
import Pagination from './Pagination'
import { Link } from 'react-router-dom'
import MoviePoster from './MoviePoster'

const ListMovieComponent = () => {
      const [movie, setMovie] = useState([]);
      const [currentPage, setCurrentPage] = useState (1);
      const [postsPerPage, setPostsPerPage] = useState (5)
            useEffect(() => {
                getMovies();
            }, [])
            const getMovies=()=> {
                MovieService.getAllMovies().then((response)=> {
                    setMovie(response.data)
                    console.log(response.data);
                }).catch(error=>{
                    console.log(error);
                })
            }
            const deleteMovie=(movieId)=> {
                MovieService.deleteMovie(movieId).then((response)=> {     
                    getMovies();          
                }).catch(error=>{
                    console.log(error);
                })
            }
         const lastPostIndex = currentPage*postsPerPage;
        const firstPostIndex = lastPostIndex - postsPerPage;
        const curentPosts=movie.slice(firstPostIndex,lastPostIndex)
      return(
      <div className = "container">
        <br />
           <h2 className = "text-center"> Movies </h2> 
           <Link to = "/add-Movie" className="btn btn-primary mb-2"> Add New Movie </Link>
           <table className="table table-bordered table-striped">
                <thead>
                    <tr>
                        <th> Movie Id </th>
                        <th> Poster </th>
                        <th> Title </th> 
                        <th> Genres </th> 
                        <th> Function </th> 
                    </tr>
                </thead>
                  <tbody>
                    {
                        curentPosts.map( 
                            movie =>
                            <tr key = {movie.movieId}>
                            <td> {movie.movieId} </td> 
                            <td><MoviePoster movieId={movie.movieId}/></td>
                            <td> {movie.title} </td> 
                            <td> {movie.genres} </td>       
                            <td>
                                <Link className='btn btn-warning' to={`/edit-movie/${movie.movieId}`}>Update</Link>
                                <button className='btn btn-danger' onClick={()=>deleteMovie(movie.movieId)} 
                                style={{marginLeft:"10px", marginRight: "10px"}}>Delete</button>
                                <Link className='btn btn-success' to={`/recommendations/${movie.movieId}`}>Recommendation</Link>
                            </td>                      
                            </tr>
                    )
                    }
                  </tbody>
           </table>
           <Pagination 
                    totalPosts={movie.length}
                    postsPerpage={postsPerPage}
                    setCurrentPage={setCurrentPage}>
                    </Pagination>
       </div>
               )
}
export default ListMovieComponent