import {IAuth, IDeleteResult, IRating, IResponseOK} from '../interfaces';
import { IRatingsResponse } from '../interfaces/response/ratings.response.interface';
import { axiosInstance } from './axiosInstance.service';
import { urls } from '../constants';

class RatingService {
    public async createRate({
        rate, bookId, clientKey, accessToken,
    }: IRating): Promise<IResponseOK<IRatingsResponse>> {
        return axiosInstance.post(urls.ratings, {
            rate, bookId, clientKey,
        }, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        }).then(({ data }) => data);
    }

    public async updateRate({
        rate, bookId, clientKey, accessToken,
    }: IRating, ratingId: string): Promise<IResponseOK<IRatingsResponse>> {
        return axiosInstance.patch(`${urls.ratings}/${ratingId}`, {
            rate, bookId, clientKey,
        }, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        }).then(({ data }) => data);
    }

    public async deleteRate(ratingId: number, { accessToken, clientKey }: IAuth): Promise<IResponseOK<IDeleteResult>> {
        return axiosInstance.delete(`${urls.ratings}/${ratingId}`, {
            data: { clientKey },
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        }).then(({ data }) => data);
    }
}

export const ratingService = new RatingService();
