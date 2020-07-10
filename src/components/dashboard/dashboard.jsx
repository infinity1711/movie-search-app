import React, { useState } from 'react';
import axios from 'axios';
import './dashboard.css';
import MCard from '../movie-card/movie-card';
import { withRouter } from 'react-router-dom'

class Dashboard extends React.Component {



    constructor(props) {
        super(props)
        this.state = {
            searchKey: '',
            response: [],
            type: '',
            showResp: ''
        }
    }

    handleChange = (e) => {
        let value = e.target.value
        this.setState({ searchKey: value })
    }


    search = () => {
        axios.get('http://www.omdbapi.com/?apikey=57831544&s=' + this.state.searchKey + '&type=' + this.state.type).then(
            res => {
                console.log(res)
                let data = res.data;
                if (data.Search) this.setState({ response: data.Search })
                this.setState({ showResp: data.Response })
                this.refreshCheck()
            },
            err => {
                console.log(err)
            }
        )
    }

    refreshCheck = () => {
        let favMovies = JSON.parse(localStorage.getItem('favourites'))
        // console.log(favMovies, 'refresh')
        if (favMovies) {
            let resp = this.state.response
            if (!resp) return;
            resp.forEach((movie, i) => {
                favMovies.forEach(fav => {
                    if (movie.imdbID == fav.imdbID) {
                        resp[i]['fav'] = true
                        return
                    }
                    // else resp[i]['fav'] = false
                })
            })
            this.setState({ response: resp })
        }
    }

    setToFav = (item) => {
        try {
            console.log(item, 'item')
            let favs = localStorage.getItem('favourites')
            if (favs) {
                favs = JSON.parse(favs);
                favs.push(item)
                localStorage.setItem('favourites', JSON.stringify(favs))
                this.refreshCheck()
            }
            else {
                let newFav = [];
                newFav.push(item);
                localStorage.setItem('favourites', JSON.stringify(newFav))
                this.refreshCheck()
            }
        }
        catch (e) {
            console.log(e)
        }
    }

    removeFav = (item, i) => {
        let movies = JSON.parse(localStorage.getItem('favourites'))
        if (movies) {
            movies.forEach((movie, j) => {
                if (movie.imdbID == item.imdbID) {
                    movies.splice(j, 1)
                    localStorage.setItem('favourites', JSON.stringify(movies))
                }
            })
            let resp = this.state.response
            resp[i]['fav'] = false;
            this.setState({ response: resp })
        }
    }

    selectChange = (e) => {
        let value = e.target.value;
        this.setState({ type: value })
        console.log(value)
    }

    imgError = (e) => {
        e.target.src = 'placeholder.jpg'
    }
    render() {
        return (
            <>

                <div className="main">
                    <div className="row" style={{ paddingTop: '20px' }}>
                        <div className="col-3"></div>
                        <div className="col-4">
                            <div class="input-group mb-3">
                                <input type="text" className="form-control" onChange={this.handleChange} />
                                <div class="input-group-append">
                                    <select class="custom-select" id="inputGroupSelect02" onChange={this.selectChange}>
                                        <option selected>All</option>
                                        <option value="movie">Movie</option>
                                        <option value="series">Series</option>
                                        <option value="episode">Episode</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="col-2">
                            <button className="btn btn-outline-secondary btn-block" onClick={this.search}>Search</button>
                        </div>
                        <div className="col-3"></div>
                    </div>

                    {this.state.showResp === "True" ?
                        <div className="movie-list">
                            <div className="row">
                                {this.state.response.map((movie, idx) => (
                                    <>
                                        <div className="col-md-2 col-6 col-sm-4 col-xs-2">
                                            <div class="card m-card" style={{ marginBottom: '20px' }}>
                                                <img class="card-img-top" src={movie.Poster} alt={movie.Title} onError={this.imgError} />

                                                <div class="movie-desc">
                                                    <p >{movie.Title}</p>
                                                    <p class="card-text"><small><b>Year : </b>{movie.Year}</small></p>

                                                    <>
                                                        {movie.fav === true ?
                                                            <a className="fav-btn" onClick={() => { this.removeFav(movie, idx) }}>Unfavourite</a>
                                                            :
                                                            <a className="fav-btn" onClick={() => { this.setToFav(movie) }}>Favourite</a>
                                                        }
                                                    </>

                                                </div>
                                            </div>
                                        </div>
                                    </>
                                ))}
                            </div>
                        </div> :

                        null}
                    {
                        this.state.showResp === 'False' ?
                            <h4 className="text-center" style={{ marginTop: '20vh', color: '#fff' }}>
                                Movie not found!
                    </h4> : null
                    }
                </div>
            </>
        )
    }
}

export default withRouter(Dashboard)