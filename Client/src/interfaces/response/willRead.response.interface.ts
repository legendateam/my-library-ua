import { IBookResponse } from './book.response.interface';
import { IAuthorResponse } from './author.response.interface';
import { ICommonResponseFields } from '../commonResponseFields.interface';

export interface IWillReadResponse extends ICommonResponseFields {
    userId: number,
    books: IBookResponse[],
    author: IAuthorResponse
}
