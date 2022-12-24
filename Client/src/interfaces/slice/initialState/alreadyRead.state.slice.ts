import { IAlreadyReadResponse } from '../../response/alreadyRead.response.interface';
import { ICommonSlice } from '../../commonSlice.interface';
import { IResponseError } from '../../response/error.response.interface';

export interface IAlreadyReadStateSlice extends ICommonSlice {
    alreadyRead: IAlreadyReadResponse| null,
    err: null | IResponseError,
    typeAction: null | string,
}
