import { ICommonResponseFields } from '../commonResponseFields.interface';
import { IGenreResponse } from './genre.response.interface';
import { IBookResponse } from './book.response.interface';

export interface IAuthorResponse extends ICommonResponseFields {
    firstName: string,
    lastName: string,
    pseudonym?: string,
    dateBirthday: string,
    dateDeath?: string,
    country: string,
    biography: string,
    photo?: string,
    genres: IGenreResponse[],
    books?: IBookResponse[],
}
