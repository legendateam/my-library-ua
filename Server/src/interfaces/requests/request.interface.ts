import { Request } from 'express';

import { IAlreadyRead } from '../already-read.interface';
import { IAuthor } from '../author.interface';
import { IBook } from '../book.interface';
import { IFavorite } from '../favorite.interface';
import { IGenre } from '../genre.interface';
import { ILogin } from '../login.interface';
import { IRating } from '../rating.interface';
import { IUser } from '../user.interface';
import { IWillRead } from '../will-read.interface';
import {
    AlreadyRead, Authors, Books, Favorites, Users, WillRead,
} from '../../entities';
import { IPayload } from '../payload.interface';
import { IClientKey } from '../client-key.interface';
import { IAuthorNewFields } from '../author-new-fields.interface';
import { IView } from '../view.interface';
import { IPagination } from '../pagination.interface';
import { ICommentRequest } from '../comment-request.interface';
import { IAlreadyReadExtended } from '../already-read-extended.interface';
import { IActionsUpdateQuery } from '../actions-update-query.interface';
import { IFavoriteExtended } from '../favorite-textended';
import { IWillReadExtended } from '../will-read-extended.interface';
import { ICommentLikes } from '../comment-likes.interface';
import { ICommentLikesCreate } from '../comment-likes-create.interface';
import { ISearch } from '../search.interface';

export interface IRequest extends Request{
    alreadyReadBook?: IAlreadyRead | AlreadyRead | IAlreadyReadExtended,
    author?: IAuthor | Authors,
    actions?: IActionsUpdateQuery,
    authorPatch?: IAuthorNewFields,
    book?: IBook | Books,
    commentLikes?: ICommentLikes | ICommentLikesCreate,
    comment?: ICommentRequest,
    favorite?: IFavorite | IFavoriteExtended | Favorites,
    genre?: IGenre,
    rating?: IRating,
    userData?: IUser | Users,
    willRead?: IWillRead | IWillReadExtended | WillRead,
    loginData?: ILogin,
    clientKey?: string | IClientKey,
    authorization?: string,
    email?: string,
    payload?: IPayload;
    password?: string;
    pagination?: IPagination;
    bookId?: string;
    generateKey?: string;
    views?: IView;
    err?: string | null,
    search?: ISearch,
}
