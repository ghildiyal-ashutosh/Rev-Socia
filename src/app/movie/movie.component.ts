import { Component, OnInit } from '@angular/core';
import {MovieServiceClient} from  '../../services/movie.service.client'

@Component({
    selector: 'app-movie',
    templateUrl: './movie.component.html',
    styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {

    title: String;
    year: String;
    movieStatus = false;
    searchStatus = false;
    detailsStatus = false;
    movies = [];
    movie = {Title: '', Year: '', Rated: '', Genre: '', imdbRating: '', Hits: '', Language: ''}
    movieDetails = {Title: '', Year: '', Rated: '', Genre: '', Actors: '', imdbRating: '', Awards: '',
        Plot: '', Hits: '', Language: '', Website: '', Poster: ''};

    constructor(private movieService: MovieServiceClient) {
        this.title = '';
        this.year = '';
    }

    findAllMovies = () => {
        // this.movies = [];
        this.detailsStatus = false;
        this.movieStatus = false;
        this.searchStatus = true;
        this.movieService.findAllMovies()
            .then((response) => {
                if (response === null) {
                    alert('No such movie found.');
                }
                else {
                    console.log(response);
                    this.movies = response;
                    // this.updateMovies(this.movies);
                }
            });
    }

    search = (title, year) => {
        this.movies = [];
        this.detailsStatus = false;
        this.searchStatus = false;
        const movie = {title: title, year: year};
        if (title === null || title === '') {
            alert('Please enter movie title.');
        }
        else if (year === null || year === '') {
            this.movieService.findMovieByTitle(title)
                .then((response) => {
                    if (response.Title === '-1') {
                        this.fetchMovie(movie);
                    }
                    else {
                        console.log(response);
                        this.movieStatus = true;
                        this.movie = response;
                    }
                });
        }
        else {
            console.log(movie);
            this.movieService.findMovieUsingFilters(movie)
                .then((response) => {
                    if (response.Title === '-1') {
                        this.fetchMovie(movie);
                    }
                    else {
                        console.log(response);
                        this.movieStatus = true;
                        this.movie = response;
                    }
                });
        }
    }

    fetchMovie = (movie) => {
        this.detailsStatus = false;
        this.movieService.fetchMovie(movie)
            .then((response) => {
                if (response.Response === 'False') {
                    alert('No such movie found.');
                }
                else {
                    console.log(response);
                    this.movieStatus = true;
                    this.movie = response;
                    this.createMovie(response);
                }
            });
    }

    createMovie = (movie) => {
        this.movieService.createMovie(movie);
    }


    showDetails = (movie) => {
        this.detailsStatus = true;
        this.movieStatus = false;
        this.movieDetails = movie;
        // this.updateMovies(movie);
    }

    ngOnInit() {
    }

}