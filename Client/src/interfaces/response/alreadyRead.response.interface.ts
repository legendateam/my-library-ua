import { IBookResponse } from './book.response.interface';
import { ICommonResponseFields } from '../commonResponseFields.interface';
import { IAuthorResponse } from './author.response.interface';

export interface IAlreadyReadResponse extends ICommonResponseFields{
    userId: number,
    books: IBookResponse[],
    author: IAuthorResponse
}
