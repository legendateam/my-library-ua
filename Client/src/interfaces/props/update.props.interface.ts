import { IAuthorResponse } from '../response/author.response.interface';
import { IBookResponse } from '../response/book.response.interface';

export interface IUpdateProps {
    author?: IAuthorResponse,
    book?: IBookResponse,
    type: string,
}
