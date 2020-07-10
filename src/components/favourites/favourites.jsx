import React, { useEffect, useState } from 'react'
import MCard from '../movie-card/movie-card';

export default function Favourites(props) {

    const [favourites, setFav] = useState(JSON.parse(localStorage.getItem('favourites')));

    console.log(favourites)
    
    return (
        <>
            <h5>Favourites</h5>
            {favourites ? 
            <div className="movie-list">
                <div className="row">
                    {favourites.map(movie => (
                        <>
                            <div className="col-md-2 col-6 col-sm-4 col-xs-2">
                                <MCard movie={movie} type='fav'/>
                            </div>
                        </>
                    ))}
                </div>
            </div> : null}
        </>
    )
}