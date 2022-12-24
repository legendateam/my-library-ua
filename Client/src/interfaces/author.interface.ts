import { IGenreResponse } from './response/genre.response.interface';
import { IBookResponse } from './response/book.response.interface';

export interface IAuthor {
    firstName: string,
    lastName: string,
    pseudonym?: string,
    dateBirthday: string,
    dateDeath?: string,
    dates?: string,
    country: string,
    biography: string,
    photo?: string,
    genres: IGenreResponse[];
    books?: IBookResponse[];
    id?: number,
}
