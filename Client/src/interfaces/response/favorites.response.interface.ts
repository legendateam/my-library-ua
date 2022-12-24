import { ICommonResponseFields } from '../commonResponseFields.interface';
import { IBookResponse } from './book.response.interface';
import { IAuthorResponse } from './author.response.interface';

export interface IFavoritesResponse extends ICommonResponseFields{
    userId: number,
    books: IBookResponse[],
    author: IAuthorResponse
}
