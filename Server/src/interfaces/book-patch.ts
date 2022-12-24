import { IBookNewFields } from './book-new-fields';

export interface IBookPatch {
    id: number,
    newFields: IBookNewFields
}
