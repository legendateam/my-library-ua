import { IGenreResponse } from '../response/genre.response.interface';

export interface IGenreProps {
    genre: IGenreResponse,
    handleGenre?: ()=>void,
}
