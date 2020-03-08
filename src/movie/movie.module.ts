import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ListComponent } from './list/list.component';
import { DetailComponent } from './detail/detail.component';
import { RouterModule, Routes } from '@angular/router';
import { MovieService } from './movie.service';
import { GridModule } from '@progress/kendo-angular-grid';
import { StatePersistingService } from './state-persisting.service';

const secondaryRoutes: Routes = [
  { path: 'movie',  component: ListComponent },
  { path: 'movie/:movieId', component: DetailComponent },
];

@NgModule({
  declarations: [ListComponent, DetailComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    GridModule,
    RouterModule.forChild(secondaryRoutes)
  ],
  providers: [MovieService, StatePersistingService]
})
export class MovieModule { }
