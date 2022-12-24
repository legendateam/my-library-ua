import { IComment } from './comment.interface';

export interface ICommentCreate extends IComment{
    bookId: number,
}
