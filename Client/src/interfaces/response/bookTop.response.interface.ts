import { IBookResponse } from './book.response.interface';

export interface IBookTopResponseInterface extends IBookResponse {
    countRatings: number,
}
