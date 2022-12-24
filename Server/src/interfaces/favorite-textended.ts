import { IFavorite } from './favorite.interface';

export interface IFavoriteExtended extends IFavorite{
    userId: number,
}
