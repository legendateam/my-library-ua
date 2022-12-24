import { ICommonResponseFields } from '../commonResponseFields.interface';
import { IBookResponse } from './book.response.interface';
import { IUserResponse } from './user.reponse.interface';

export interface IRatingsResponse extends ICommonResponseFields {
    rate: number,
    userId: number,
    bookId: number,
    book?: IBookResponse,
    user?: IUserResponse
}
