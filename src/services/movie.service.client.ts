import { Injectable } from '@angular/core';

// const MOVIE_API = 'http://localhost:3000/api/movie';
const MOVIE_API =  'https://rev-socia-node-server.herokuapp.com/api/movie';

const API_MOVIE_URL = 'http://www.omdbapi.com/?apikey=a272f8ec&t=title&y=year&plot=full';


@Injectable()
export  class MovieServiceClient {

    findAllMovies = () => {
        return fetch(MOVIE_API)
            .then((response) => response.json());
    }

    findMovieUsingFilters = (movie) => {
        return fetch(MOVIE_API + '/' + movie.title + '/' + movie.year, )
            .then((response) => response.json());
    }

    findMovieByTitle = (title) => {
        return fetch(MOVIE_API + '/' + title)
            .then((response) => response.json());
    }

    fetchMovie = (movie) => {
        const url = API_MOVIE_URL.replace('title', movie.title);
        return fetch(url)
            .then((response) => response.json());
    }


    createMovie = (movie) => {
        return fetch(MOVIE_API + '/create', {
            method: 'post',
            body: JSON.stringify(movie),
            headers: {
                'content-type': 'application/json'
            }
        })
            .then((response) => response);
    }

    updateMovie = (movie) => {
        return fetch(MOVIE_API + '/update',{
            method: 'put',
            body: JSON.stringify(movie),
            headers: {
                'content-type': 'application/json'
            }
        })
            .then( (response) => response);
    }
}