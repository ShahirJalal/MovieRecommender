import React,{useState,useEffect} from 'react'
import MovieService from '../services/MovieService'
import {Link, useNavigate,useParams }from 'react-router-dom'
const AddMovieComponet=()=>{
    const [title, setTitle] = useState('')
    const [genres, setGenres] = useState('')
    const navigate=useNavigate();
    const {movieId}=useParams();
    console.log(movieId);

    const saveOrUpdateMovie=(e)=>{
       e.preventDefault();
        const movie={movieId,title,genres}
        console.log(movie);
        if(movieId){
        MovieService.updateMovie(movieId,movie).then((response)=>{
            console.log(response.data)
            navigate('/movies') //navigate page
        }).catch(error=>{
            console.log(error)
        })
    }else{
        MovieService.createMovie(movie).then((response)=>{
            console.log(response.data)
            navigate('/movies')
        }).catch(error=>{
            console.log(error)
        })
    }
}
    useEffect(() => {
        MovieService.getMoviebyId(movieId).then((response)=>{
         console.log(response.data.title)
         setTitle(response.data.title)
        setGenres(response.data.genres)
      }).catch(error=>{
       console.log(error)
    })
    }, [])  
    const pageTitle= () => {
        if(movieId){
            return <h2 className = "text-center"> Update Movie</h2>
        }else{
            return <h2 className = "text-center"> Add Movie</h2>
        }
    }
    return(
        <div>
            <br></br>
            <div className = "container">
                <div className= "row">
                    <div className = "card col-md-6 offset-md-3 offset-md-3">
                    {pageTitle()}
                        <div className= "card-body">
                            <form>
                                <div className = "form-group mb-2">
                                    <label className = "form-label">Movie Title  :</label>
                                    <input
                                            type="text"
                                            placeholder="Enter Title"
                                            name = "title"
                                            className="form-control"
                                            value = {title}
                                            onChange ={(e) => setTitle(e.target.value)}>
                            </input>
                        </div>
                                <div className = "form-group mb-2">
                                    <label className = "form-label"> Genres :</label>
                                    <input
                                        type="text"
                                        placeholder="Enter Genres"
                                        name = "genres"
                                        className="form-control"
                                        value = {genres}
                                        onChange ={(e) => setGenres(e.target.value)}
                                        >
                                    </input>
                                </div>
                             <button className="btn btn-success" onClick={(e)=>saveOrUpdateMovie(e)}>Save Movie</button>
                             <Link to="/movies" className='btn btn-danger'>Cancel</Link>
                        </form>
                    </div>
              </div>
          </div>
     </div>
</div>
    )
}
export default AddMovieComponet