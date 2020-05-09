import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../movie.service';
import { MovieDetail } from '../models/movieDetail';
import { MovieCredits } from '../models/movieCredits';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit, OnDestroy {

  constructor(private route: ActivatedRoute, private movieService: MovieService) { }
 

  public movie: MovieDetail = null;
  public movieCredits: MovieCredits[] = null;
  public movieRecommendations: MovieDetail[] = null;

  routeSubscription: Subscription;
  movieSubscription: Subscription;
  creditSubscription: Subscription;
  relatedSubscription: Subscription;

  // tslint:disable-next-line: variable-name
  movie_rating_average: string;

  ngOnInit() {
   this.routeSubscription = this.route.paramMap.subscribe(params => {
      const movieId = +params.get('movieId');
      // get movie
      this.movieSubscription = this.movieService.getMovie(movieId).subscribe((mov) => {
        this.movie = mov;
        this.movie_rating_average = mov.vote_average.toFixed();
      });
      // only show first twelve charaters
      this.creditSubscription = this.movieService.getMovieCredits(movieId).subscribe((credits) => {
        this.movieCredits = credits.cast.slice(0, 12);
      });
      // show 4 recommendations
      this.relatedSubscription = this.movieService.getMovieRecommendations(movieId).subscribe((recommendations) => {
        this.movieRecommendations = recommendations.result.slice(0, 4);
      });
    });
  }

  ngOnDestroy(): void {
    this.movieSubscription.unsubscribe();
    this.creditSubscription.unsubscribe();
    this.relatedSubscription.unsubscribe();
    this.routeSubscription.unsubscribe();
  }
}
