import { Component, OnInit } from '@angular/core';
import { MovieDetail } from 'src/movie/models/movieDetail';
import { MovieService } from 'src/movie/movie.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public movieTrends: MovieDetail[] = null;

  constructor(private movieService: MovieService) { }

  ngOnInit() {
    this.movieService.getTrendingMovies().subscribe((mov) => {
      this.movieTrends = mov.results;
    });
  }

}
