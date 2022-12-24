import { IBookResponse } from '../response/book.response.interface';

export interface IDeleteIconProps {
    type: string,
    book?: IBookResponse,
    authorId?: number,
    // handleDelete: () => void,
}
