import { ICommonResponseFields } from '../commonResponseFields.interface';
import { IGenreResponse } from './genre.response.interface';
import { IAuthorResponse } from './author.response.interface';
import { IRatingsResponse } from './ratings.response.interface';
import { ICommentsResponse } from './comments.response.interface';

export interface IBookResponse extends ICommonResponseFields {
    name: string,
    yearOfRelease?: string,
    description: string,
    fileText: string,
    cover: string,
    fileAudio: string,
    authorId: number,
    genres?: IGenreResponse[],
    author?: IAuthorResponse,
    ratings?: IRatingsResponse[],
    comments?: ICommentsResponse[],
    views?: number,
}
