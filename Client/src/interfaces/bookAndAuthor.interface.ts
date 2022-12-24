import { IAuthorResponse } from './response/author.response.interface';
import { IBookResponse } from './response/book.response.interface';

export interface IBookAndAuthor {
    author: IAuthorResponse,
    book: IBookResponse,
}
