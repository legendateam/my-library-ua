import { IPayload } from '../../auth/payload.interface';
import { IResponseError } from '../../response/error.response.interface';
import { ICommonSlice } from '../../commonSlice.interface';

export interface IUserInitialStateSlice extends ICommonSlice{
    user: IPayload | null,
    errorResponse: IResponseError | null
}
