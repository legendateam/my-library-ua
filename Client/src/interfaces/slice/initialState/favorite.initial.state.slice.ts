import { ICommonSlice } from '../../commonSlice.interface';
import { IFavoritesResponse } from '../../response/favorites.response.interface';
import { IResponseError } from '../../response/error.response.interface';

export interface IFavoriteInitialStateSlice extends ICommonSlice {
    favorites: IFavoritesResponse | null,
    err: null | IResponseError,
    typeAction: null | string,
}
