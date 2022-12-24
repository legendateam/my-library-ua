import { ICommonSlice } from '../../commonSlice.interface';
import { IWillReadResponse } from '../../response/willRead.response.interface';
import { IResponseError } from '../../response/error.response.interface';

export interface IWillReadInitialStateSlice extends ICommonSlice {
    willRead: IWillReadResponse | null,
    err: null | IResponseError,
    typeAction: null | string,
}
