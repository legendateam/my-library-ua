import { IClientKey } from './client-key.interface';

export interface ICommentCreate extends IClientKey{
    bookId: number,
    text: string,
}
