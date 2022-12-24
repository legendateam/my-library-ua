import { ICommonSlice } from '../../commonSlice.interface';
import { IBookResponse } from '../../response/book.response.interface';
import { IBookHomeInitialStateSlice } from './bookHome.initial.state.slice';

export interface IBookInitialStateSlice extends ICommonSlice {
    err: null | string,
    books: IBookResponse[],
    countBooks: number | null,
    booksNovelty: IBookResponse[] | null,
    countNovelty: number | null,
    booksRatings: IBookResponse[] | null,
    countBooksRatings: number | null,
    homeBooks: IBookHomeInitialStateSlice,
    searchBooks: IBookResponse[] | null,
    deleteOne: boolean;
}
