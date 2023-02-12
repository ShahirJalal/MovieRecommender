import React, { useState, useEffect } from 'react'
import FavouriteService from '../services/FavouriteService'
import MoviePoster from './MoviePoster';

const FavouritesList = () => {
    const [favourites, setFavourites] = useState([]);

    useEffect(() => {
        getFavourites();
    }, [])

    const getFavourites = () => {
        FavouriteService.getAll().then((response) => {
            setFavourites(response.data)
        }).catch(error => {
            console.log(error);
        })
    }

    return (
        <div className="container">
            <br />
            <h2 className="text-center">Favourites</h2><br />
            <table className="table table-bordered table-striped">
                <thead>
                    <tr>
                        <th>Favourite Id</th>
                        <th>Movie Id</th>
                        <th>Poster</th>
                        <th>Title</th>
                        <th>Genres</th>
                        <th>User Id</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        favourites.map(
                            favourite =>
                                <tr key={favourite.favouriteId}>
                                    <td>{favourite.favouriteId}</td>
                                    <td>{favourite.movieId}</td>
                                    <td><MoviePoster movieId={favourite.movieId}/></td>
                                    <td>{favourite.title}</td>
                                    <td>{favourite.genres}</td>
                                    <td>{favourite.userId}</td>
                                </tr>
                        )
                    }
                </tbody>
            </table>
        </div>
    )
}

export default FavouritesList