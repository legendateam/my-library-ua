import { axiosInstance } from './axiosInstance.service';
import { urls } from '../constants';
import { ILikesResponse } from '../interfaces/response/likes.response.interface';
import {
    IAuth, IDeleteResult, ILikesAndDisLikes, IResponseOK,
} from '../interfaces';

class LikesAndDisLikesService {
    public async getAll(commentId: number): Promise<IResponseOK<ILikesResponse[]>> {
        return axiosInstance.get(`${urls.comments}${urls.likes}/${commentId}`).then(({ data }) => data);
    }

    public async createOne(commentId: number, {
        like, disLike, accessToken, clientKey,
    }: ILikesAndDisLikes): Promise<IResponseOK<ILikesResponse>> {
        return axiosInstance.post(`${urls.comments}${urls.likes}`, {
            like, commentId, disLike, clientKey,
        }, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        }).then(({ data }) => data);
    }

    public async updateOne(commentId: number, {
        like, disLike, clientKey, accessToken,
    }: ILikesAndDisLikes)
        : Promise<IResponseOK<ILikesResponse>> {
        return axiosInstance.patch(`${urls.comments}${urls.likes}/${commentId}`, { like, disLike, clientKey }, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        }).then(({ data }) => data);
    }

    public async deleteOne(commentId: number, { clientKey, accessToken }: IAuth): Promise<IDeleteResult> {
        return axiosInstance.delete(`${urls.comments}${urls.likes}/${commentId}`, {
            data: { clientKey },
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        }).then(({ data }) => data);
    }
}

export const likesAndDisLikesService = new LikesAndDisLikesService();
