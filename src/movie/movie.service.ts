import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { MovieResult } from './models/movieResults';
import { MovieDetail } from './models/movieDetail';
import { MovieCredits } from './models/movieCredits';
import { MovieCreditResult } from './models/movieCreditResult';
import { MovieRecommendationResult } from './models/movieRecommendationResult';
import { MovieTrendingResult } from './models/movieTrendingResult';
import { AppConfig } from 'src/config/app.config';
import { AuthService } from 'src/app/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(private http: HttpClient, private authService : AuthService) {
    
  }

  public getPopularMovies(page: number): Observable<MovieResult> {
    return this.http.get<MovieResult>(AppConfig.settings.Resource.Url + 'api/Movie/popular/' + page,{ headers: 
      new HttpHeaders({
        Authorization: `Bearer ${this.authService.getAccessToken()}`
      })}).pipe(map((res => res)));
  }

  public getMovie(movieId: number): Observable<MovieDetail> {
    return this.http.get<MovieDetail>(AppConfig.settings.Resource.Url + 'api/Movie/' + movieId, { headers: 
      new HttpHeaders({
        Authorization: `Bearer ${this.authService.getAccessToken()}`
      })}).pipe(map((res => res)));
  }

  public getMovieCredits(movieId: number): Observable<MovieCreditResult> {
    return this.http.get<MovieCreditResult>(AppConfig.settings.Resource.Url + 'api/Cast/' + movieId, { headers: 
      new HttpHeaders({
        Authorization: `Bearer ${this.authService.getAccessToken()}`
      })}).pipe(map(res => res));
  }

  public getMovieRecommendations(movieId: number): Observable<MovieRecommendationResult> {
    return this.http.get<MovieRecommendationResult>(AppConfig.settings.Resource.Url + 'api/Movie/recommendations/' + movieId, { headers: 
      new HttpHeaders({
        Authorization: `Bearer ${this.authService.getAccessToken()}`
      })});
  }

  public getTrendingMovies(): Observable<MovieTrendingResult> {
    return this.http.get<MovieTrendingResult>(AppConfig.settings.Resource.Url + 'api/Movie/trending', { headers: 
      new HttpHeaders({
        Authorization: `Bearer ${this.authService.getAccessToken()}`
      })}) 
  }

  public searchMovies(searchString: string, page: number) {
    return this.http.get<MovieResult>(AppConfig.settings.Resource.Url + `api/Movie/search?query=${searchString}&page=${page}`, { headers: 
      new HttpHeaders({
        Authorization: `Bearer ${this.authService.getAccessToken()}`
      })});
  }
}
