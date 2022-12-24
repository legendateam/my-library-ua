import { IBook } from './book.interface';

export interface IBookCreate {
    book: IBook,
    genresId: number | number[],
}
