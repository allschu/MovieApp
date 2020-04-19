import { Component, OnInit, OnDestroy } from '@angular/core';
import { MovieDetail } from 'src/movie/models/movieDetail';
import { MovieService } from 'src/movie/movie.service';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  public movieTrends: MovieDetail[] = null;
  trendingSubscription: Subscription;

  constructor(private movieService: MovieService, private authService: AuthService) { }

  ngOnDestroy(): void {
    this.trendingSubscription.unsubscribe();
  }

  ngOnInit() {
    this.trendingSubscription = this.movieService.getTrendingMovies().subscribe((mov) => {
      this.movieTrends = mov.results;
    });
  }

  login(){
    this.authService.login();
  }
}
