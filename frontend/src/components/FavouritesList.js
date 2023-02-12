import React, { useState, useEffect } from 'react'
import FavouriteService from '../services/FavouriteService'
import MoviePoster from './MoviePoster';

const FavouritesList = () => {
    const [favourites, setFavourites] = useState([]);

    useEffect(() => {
        getFavourites();
    }, [])

    const getFavourites = () => {
        FavouriteService.getFavouriteById(localStorage.getItem("userId")).then((response) => {
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
                        <th>Poster</th>
                        <th>Title</th>
                        <th>Genres</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        favourites.map(
                            favourite =>
                                <tr key={favourite.favouriteId}>
                                    <td><MoviePoster movieId={favourite.movieId}/></td>
                                    <td>{favourite.title}</td>
                                    <td>{favourite.genres}</td>
                                </tr>
                        )
                    }
                </tbody>
            </table>
        </div>
    )
}

export default FavouritesList