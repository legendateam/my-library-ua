import { IAuthorNewFields } from './author-new-fields.interface';

export interface IAuthorPatch {
    id: number,
    newFields: IAuthorNewFields
}
