import { Movie } from './movie';

export class MovieResult{
    movies: Movie[];
    page: number;
    total_Results: number;
    total_Pages: number
}