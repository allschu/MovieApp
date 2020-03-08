import { Component, OnInit } from '@angular/core';
import { MovieService } from '../movie.service';
import { MovieResult } from '../models/movieResults';
import { PageChangeEvent, GridDataResult } from '@progress/kendo-angular-grid';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  public gridData: GridDataResult = null;
  public pageSize = 20;
  public page = 1;
  public skip = 0;

  constructor(private movieService: MovieService) {

  }

  ngOnInit() {
   this.loadItems(1);
  }

  public pageChange(event: PageChangeEvent): void {
    this.skip = event.skip;
    this.page = (event.skip / this.pageSize) + 1;
    this.loadItems((event.skip / this.pageSize) + 1);
  }

  private loadItems(page): void {
    this.movieService.getPopularMovies(page).subscribe((movies: MovieResult) => {
      this.gridData = {
        data: movies.results,
        total: movies.total_results
      }
    });
  }

}
