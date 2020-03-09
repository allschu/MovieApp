export class MovieDetail{
    id: number;
    original_title: string;
    overview: string;
    popularity: number;
    release_date: Date;
    status: string;
    tagline: string;
    title: string;
    vote_average: number;
    vote_count: number;
    revenue: number;
    poster_path:string;
    genres: Genre[];
}

export class Genre{
    name:string
}