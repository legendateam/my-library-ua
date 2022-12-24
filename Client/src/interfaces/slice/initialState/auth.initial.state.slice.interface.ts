import { ITokenPair } from '../../auth/tokenPair.interface';
import { IResponseError } from '../../response/error.response.interface';
import { ICommonSlice } from '../../commonSlice.interface';

export interface IAuthState extends ICommonSlice{
    responseError: IResponseError | null,
    tokenPair: ITokenPair | null,
}
