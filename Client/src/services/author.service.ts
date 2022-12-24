import { axiosInstance } from './axiosInstance.service';
import { queryConstant, routePathConstant, urls } from '../constants';
import {
    IAuth, IAuthorResponse, IPagination, IResponseOK,
} from '../interfaces';

class AuthorService {
    public async getAll({ page }: IPagination): Promise<IResponseOK<[IAuthorResponse[], number]>> {
        if (page && Number(page) > 1) {
            return axiosInstance.get(`${urls.authors}?page=${page}`).then(({ data }) => data);
        }
        return axiosInstance.get(`${urls.authors}`).then(({ data }) => data);
    }

    public async getAllAdmin({ accessToken, clientKey }: IAuth): Promise<IResponseOK<IAuthorResponse[]>> {
        return axiosInstance.get(`${urls.authors}${urls.admin}/${clientKey}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        }).then(({ data }) => data);
    }

    public async getForHome({ perPage }: { perPage: number }): Promise<IResponseOK<[IAuthorResponse[], number]>> {
        return axiosInstance.get(`${urls.authors}?perPage=${perPage}`).then(({ data }) => data);
    }

    public async getOneById(id: number): Promise<IResponseOK<IAuthorResponse>> {
        return axiosInstance.get(`${urls.authors}/${id}`).then(({ data }) => data);
    }

    public async getAllByLikeFullName(fullname: string): Promise<IResponseOK<[IAuthorResponse[], number]>> {
        return axiosInstance.get(`${urls.authors}/${routePathConstant.search}/${fullname}`).then(({ data }) => data);
    }

    public async createOne({ accessToken }: IAuth, author: FormData): Promise<IResponseOK<IAuthorResponse>> {
        return axiosInstance.post(urls.authors, author, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        }).then(({ data }) => data);
    }

    public async updateOne({ accessToken }: IAuth, author: FormData, id :number): Promise<IResponseOK<IAuthorResponse>> {
        return axiosInstance.patch(`${urls.authors}/${id}`, author, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        }).then(({ data }) => data);
    }

    public async deleteOne({ accessToken, clientKey }: IAuth, authorId: number): Promise<IResponseOK<IAuthorResponse>> {
        return axiosInstance.delete(`${urls.authors}/${authorId}?${queryConstant.clientKey}=${clientKey}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        }).then(({ data }) => data);
    }
}

export const authorService = new AuthorService();
