import { ICommonResponseFields } from '../commonResponseFields.interface';
import { IBookResponse } from './book.response.interface';
import { IUserResponse } from './user.reponse.interface';
import { IPayload } from '../auth/payload.interface';

export interface ICommentsResponse extends ICommonResponseFields{
    userId: number,
    bookId: number,
    text: string,
    book?: IBookResponse,
    user?: IUserResponse | IPayload,
}
