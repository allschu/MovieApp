import { Component, OnInit } from '@angular/core';
import { MovieService } from '../movie.service';
import { MovieResult } from '../models/movieResults';
import { PageChangeEvent, GridDataResult, GridComponent } from '@progress/kendo-angular-grid';
import { ColumnSettings } from '../models/columnSettings';
import { StatePersistingService } from '../state-persisting.service';
import { GridSettings } from '../models/gridSettings';
import { State } from '@progress/kendo-data-query';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent {

  public gridSettings: GridSettings = {
    state: {
      skip: 0,
      take: 20,

      // Initial filter descriptor
      filter: {
        logic: 'and',
        filters: []
      }
    },
  };
  public gridData: GridDataResult = null;
  public pageSize = 20;
  public page = 1;

  constructor(private movieService: MovieService, private persistingService: StatePersistingService) {
    const gridSettings: GridSettings = this.persistingService.get('gridSettings');

    if (gridSettings !== null) {
      this.gridSettings = this.mapGridSettings(gridSettings);
      this.page = (gridSettings.state.skip / this.pageSize) + 1;
      this.loadItems(this.page);
    } else {
      this.loadItems(1);
    }
  }


  public pageChange(event: PageChangeEvent): void {
    this.gridSettings.state.skip = event.skip;
    this.page = (event.skip / this.pageSize) + 1;
    this.saveGridSettings();
    this.loadItems((event.skip / this.pageSize) + 1);
  }

  private loadItems(page): void {
    this.movieService.getPopularMovies(page).subscribe((movies: MovieResult) => {
      this.gridData = {
        data: movies.movies,
        total: movies.total_Results
      };
    });
  }

  public get savedStateExists(): boolean {
    return !!this.persistingService.get('gridSettings');
  }

  public mapGridSettings(gridSettings: GridSettings): GridSettings {
    const state = gridSettings.state;
    return {
      state,
    };
  }

  public dataStateChange(state: State): void {
    this.gridSettings.state = state;
  }

  public saveGridSettings(): void {
    const gridConfig = {
      state: this.gridSettings.state,
    };

    this.persistingService.set('gridSettings', gridConfig);
  }

}
