import { IAuth } from './auth.interface';

export interface IRating extends IAuth{
    rate: number,
    bookId: number,
}
