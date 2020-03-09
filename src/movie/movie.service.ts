import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { MovieResult } from './models/movieResults';
import { MovieDetail } from './models/movieDetail';
import { MovieCredits } from './models/movieCredits';
import { MovieCreditResult } from './models/movieCreditResult';
import { MovieRecommendationResult } from './models/movieRecommendationResult';
import { MovieTrendingResult } from './models/movieTrendingResult';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  //for the open movie db
  apiKey = '';

  constructor(private http: HttpClient) {

  }

  public getPopularMovies(page: number): Observable<MovieResult> {
    return this.http.get<MovieResult>('https://api.themoviedb.org/3/movie/popular?api_key=' + this.apiKey + '&language=en-US&page=' + page).pipe(map((res => res)));
  }

  public getMovie(movieId: number): Observable<MovieDetail> {
    return this.http.get<MovieDetail>('https://api.themoviedb.org/3/movie/' + movieId + '?api_key=' + this.apiKey + '&language=en-US').pipe(map((res => res)));
  }

  public getMovieCredits(movieId: number): Observable<MovieCreditResult> {
    return this.http.get<MovieCreditResult>('https://api.themoviedb.org/3/movie/' + movieId + '/credits?api_key=' + this.apiKey).pipe(map(res => res));
  }

  public getMovieRecommendations(movieId: number): Observable<MovieRecommendationResult> {
    return this.http.get<MovieRecommendationResult>('https://api.themoviedb.org/3/movie/' + movieId + '/recommendations?api_key=' + this.apiKey + '&language=en-US&page=1')
  }

  public getTrendingMovies(): Observable<MovieTrendingResult> {
    return this.http.get<MovieTrendingResult>('https://api.themoviedb.org/3/trending/movie/day?api_key=' + this.apiKey);
  }
}
