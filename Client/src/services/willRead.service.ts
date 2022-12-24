import {
    IWillRead, IWillReadResponse, IAuth, IDeleteResult, IResponseError, IResponseOK,
} from '../interfaces';
import { axiosInstance } from './axiosInstance.service';
import { queryConstant, urls } from '../constants';

class WillReadService {
    public async addBook({ bookId, clientKey, accessToken }: IWillRead): Promise<IResponseOK<IWillReadResponse>> {
        return axiosInstance.post(urls.willRead, { bookId, clientKey }, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        }).then(({ data }) => data);
    }

    public async setBook({ clientKey, accessToken, bookId }: IWillRead): Promise<IResponseOK<IWillReadResponse>> {
        return axiosInstance.patch(urls.willRead, {
            bookId,
            clientKey,
        }, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        }).then(({ data }) => data);
    }

    public async removeBook({ clientKey, accessToken, bookId }: IWillRead): Promise<IResponseOK<IWillReadResponse>> {
        return axiosInstance.patch(
            `${urls.willRead}?${queryConstant.updateRemove}=true`,
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

    public async getOneByUserId({ clientKey, accessToken }: IAuth): Promise<IResponseOK<IWillReadResponse> | IResponseError> {
        return axiosInstance.get(`${urls.willRead}/${clientKey}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        }).then(({ data }) => data);
    }

    public async deleteBook({ accessToken, clientKey }: IAuth): Promise<IResponseOK<IDeleteResult>> {
        return axiosInstance.delete(urls.willRead, {
            data: { clientKey },
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        }).then(({ data }) => data);
    }
}

export const willReadService = new WillReadService();
