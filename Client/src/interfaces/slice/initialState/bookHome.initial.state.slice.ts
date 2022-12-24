import { IBookResponse } from '../../response/book.response.interface';
import { IAuthorResponse } from '../../response/author.response.interface';
import { IBookTopResponseInterface } from '../../response/bookTop.response.interface';

export interface IBookHomeInitialStateSlice {
    popular: IBookTopResponseInterface[] | null,
    novelty: IBookResponse[] | null,
    lastAddedBooks: IBookResponse[] | null,
}
