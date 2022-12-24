import { IAuthor } from './author.interface';

export interface IAuthorCreate {
    author: IAuthor,
    genresId: number[] | number
}
