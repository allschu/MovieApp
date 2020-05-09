import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../movie.service';
import { MovieDetail } from '../models/movieDetail';
import { MovieCredits } from '../models/movieCredits';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

  constructor(private route: ActivatedRoute, private movieService: MovieService) { }

  public movie: MovieDetail = null;
  public movieCredits: MovieCredits[] = null;
  public movieRecommendations: MovieDetail[] = null;

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      let movieId = params.get('movieId');
      // get movie
      this.movieService.getMovie((parseInt(movieId))).subscribe((mov) => {
        this.movie = mov;
      });
      // only show first twelve charaters
      this.movieService.getMovieCredits((parseInt(movieId))).subscribe((credits) => {
        this.movieCredits = credits.cast.slice(0, 12);
      });
      // show 4 recommendations
      this.movieService.getMovieRecommendations((parseInt(movieId))).subscribe((recommendations) => {
        console.log(recommendations);
        this.movieRecommendations = recommendations.result.slice(0, 4);
      });
    });
  }
}
