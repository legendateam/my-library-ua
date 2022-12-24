import { ICommentLikes } from './comment-likes.interface';

export interface ICommentLikesCreate extends ICommentLikes{
    clientKey: string,
    commentId: number,
}
