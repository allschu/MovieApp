import { Movie } from './movie';

export class MovieResult{
    results: Movie[];
    page: number;
    total_results: number;
    total_pages: number
}