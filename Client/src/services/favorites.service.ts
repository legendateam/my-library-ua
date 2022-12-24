import { axiosInstance } from './axiosInstance.service';
import { queryConstant, urls } from '../constants';
import {
    IFavorites, IFavoritesResponse, IAuth, IDeleteResult, IResponseError, IResponseOK,
} from '../interfaces';

class FavoritesService {
    public async addBook({ bookId, clientKey, accessToken }: IFavorites): Promise<IResponseOK<IFavoritesResponse>> {
        return axiosInstance.post(urls.favorites, { bookId, clientKey }, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        }).then(({ data }) => data);
    }

    public async setBook({ clientKey, accessToken, bookId }: IFavorites): Promise<IResponseOK<IFavoritesResponse>> {
        return axiosInstance.patch(urls.favorites, {
            bookId,
            clientKey,
        }, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        }).then(({ data }) => data);
    }

    public async removeBook({ clientKey, accessToken, bookId }: IFavorites): Promise<IResponseOK<IFavoritesResponse>> {
        return axiosInstance.patch(
            `${urls.favorites}?${queryConstant.updateRemove}=true`,
            {
                bookId,
                clientKey,
            },
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            },
        ).then(({ data }) => data);
    }

    public async getOneByUserId({ clientKey, accessToken }: IAuth): Promise<IResponseOK<IFavoritesResponse> | IResponseError> {
        return axiosInstance.get(`${urls.favorites}/${clientKey}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        }).then(({ data }) => data);
    }

    public async deleteBook({ accessToken, clientKey }: IAuth): Promise<IResponseOK<IDeleteResult>> {
        return axiosInstance.delete(urls.favorites, {
            data: { clientKey },
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        }).then(({ data }) => data);
    }
}

export const favoritesService = new FavoritesService();
