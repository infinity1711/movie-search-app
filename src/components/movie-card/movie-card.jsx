import React, { useEffect } from 'react';
import './movie-card.css';



export default function MCard(props) {

    return (
        <>
            <div class="card m-card" style={{ marginBottom: '20px' }}>
                <img class="card-img-top" src={props.movie.Poster} alt={props.movie.Title} />

                <div class="movie-desc">
                    <p >{props.movie.Title}</p>
                    <p class="card-text"><small><b>Year : </b>{props.movie.Year}</small></p>
                </div>
            </div>
        </>
    )
}
