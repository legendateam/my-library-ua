import { IAuthorResponse } from '../../response/author.response.interface';
import { ICommonSlice } from '../../commonSlice.interface';

export interface IAuthorState extends ICommonSlice{
    authors: IAuthorResponse[] | null,
    error: string | null,
    count: number,
    authorsHome: IAuthorResponse[] | null,
    searchAuthors: IAuthorResponse[] | null,
    delete: boolean,
}
