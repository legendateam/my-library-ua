import { IAuth } from './auth.interface';

export interface ILikesAndDisLikes extends IAuth {
    like: number,
    disLike: number,
}
