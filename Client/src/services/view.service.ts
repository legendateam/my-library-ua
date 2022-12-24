import { axiosInstance } from './axiosInstance.service';
import { urls } from '../constants';
import {
    IResponseError, IResponseOK, IView,
} from '../interfaces';

class ViewService {
    public async getView({ bookId }: IView): Promise<IResponseOK<string> | IResponseError> {
        return axiosInstance.get(`${urls.views}/${bookId}`).then(({ data }) => data);
    }

    public async setView({ bookId }: IView): Promise<IResponseOK<string> | IResponseError> {
        return axiosInstance.post(`${urls.views}`, { bookId }).then(({ data }) => data);
    }

    public async updateView({ bookId }: IView): Promise<IResponseOK<string> | IResponseError> {
        return axiosInstance.patch(`${urls.views}/${bookId}`).then(({ data }) => data);
    }
}

export const viewService = new ViewService();
