import { axiosInstance } from './axiosInstance.service';
import { queryConstant, urls } from '../constants';
import {
    IAlreadyRead, IAlreadyReadResponse, IAuth, IDeleteResult, IResponseError, IResponseOK,
} from '../interfaces';

class AlreadyReadService {
    public async addBook({ bookId, clientKey, accessToken }: IAlreadyRead): Promise<IResponseOK<IAlreadyReadResponse>> {
        return axiosInstance.post(urls.alreadyRead, { bookId, clientKey }, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        }).then(({ data }) => data);
    }

    public async setBook({ clientKey, accessToken, bookId }: IAlreadyRead): Promise<IResponseOK<IAlreadyReadResponse>> {
        return axiosInstance.patch(urls.alreadyRead, {
            bookId,
            clientKey,
        }, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        }).then(({ data }) => data);
    }

    public async removeBook({ clientKey, accessToken, bookId }: IAlreadyRead): Promise<IResponseOK<IAlreadyReadResponse>> {
        return axiosInstance.patch(
            `${urls.alreadyRead}?${queryConstant.updateRemove}=true`,
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

    public async getOneByUserId({ clientKey, accessToken }: IAuth): Promise<IResponseOK<IAlreadyReadResponse> | IResponseError> {
        return axiosInstance.get(`${urls.alreadyRead}/${clientKey}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        }).then(({ data }) => data);
    }

    public async deleteBook({ accessToken, clientKey }: IAuth): Promise<IResponseOK<IDeleteResult>> {
        return axiosInstance.delete(urls.alreadyRead, {
            data: { clientKey },
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        }).then(({ data }) => data);
    }
}

export const alreadyReadService = new AlreadyReadService();
