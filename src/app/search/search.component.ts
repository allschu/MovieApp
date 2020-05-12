import { Component, OnInit } from '@angular/core';
import { MovieService } from 'src/movie/movie.service';
import { ActivatedRoute } from '@angular/router';
import { Movie } from 'src/movie/models/movie';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  movies: Movie[] = [];
  searchQuery = '';
  totalResults = 0;

  constructor(private route: ActivatedRoute, private movieService: MovieService) { }

  ngOnInit() {
    const query = this.route.snapshot.params['query'];
    this.searchQuery = query;

    this.movieService.searchMovies(query, 1).subscribe(result => {
      this.movies = result.movies;
      this.totalResults = result.total_Results;
    });
  }

}
