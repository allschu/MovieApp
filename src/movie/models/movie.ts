export class Movie {
    constructor(obj?: any){
        Object.assign(this, obj);
    }
    Id: number;
    title: string;
    popularity: number;
    vote_average: number;
    adult: boolean;
    original_title: string;
    release_date: Date;
    original_language: string;
    overview: string;
}