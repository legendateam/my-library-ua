import {
    IAuth,
    IBook,
    IBookResponse, IBookTopResponseInterface, IResponseOK,
} from '../interfaces';
import { axiosInstance } from './axiosInstance.service';
import { queryConstant, routePathConstant, urls } from '../constants';

class BookService {
    public async getOneById(id: string | number): Promise<IResponseOK<IBookResponse | null>> {
        return axiosInstance.get(`${urls.books}/${id}`).then(({ data }) => data);
    }

    public async getAllNovelty(startDay: string, page: number): Promise<IResponseOK<[IBookResponse[], number] | null>> {
        return axiosInstance.get(`${urls.books}${routePathConstant.novelty}/${startDay}?${queryConstant.page}=${page}`)
            .then(({ data }) => data);
    }

    public async getAllRatings(rate: number, page: number): Promise<IResponseOK<[IBookResponse[], number] | null>> {
        return axiosInstance.get(`${urls.books}/${routePathConstant.ratings}/${rate}?${queryConstant.page}=${page}`)
            .then(({ data }) => data);
    }

    public async getHomeRatings(rate: number, perPage: number): Promise<IResponseOK<[IBookTopResponseInterface[], number] | null>> {
        return axiosInstance.get(`${urls.books}/${routePathConstant.ratings}/top/${rate}?${queryConstant.perPage}=${perPage}`)
            .then(({ data }) => data);
    }

    public async getHomeNovelty(startDay: string, perPage: number): Promise<IResponseOK<[IBookResponse[], number] | null>> {
        return axiosInstance.get(`${urls.books}${routePathConstant.novelty}/${startDay}?${queryConstant.perPage}=${perPage}`)
            .then(({ data }) => data);
    }

    public async lastAddedBooks(perPage:number): Promise<IResponseOK<IBookResponse[] | null>> {
        return axiosInstance.get(`${urls.books}${urls.last}${urls.all}?${queryConstant.perPage}=${perPage}`)
            .then(({ data }) => data);
    }

    public async getByGenre(genre: string, page = 1, perPage = 30): Promise<IResponseOK<[IBookResponse[], number] | null>> {
        return axiosInstance.get(
            `${urls.books}/${routePathConstant.genres}/${genre}?${queryConstant.perPage}=${perPage}&${queryConstant.page}=${page}`,
        )
            .then(({ data }) => data);
    }

    public async getAllByLikeNameOrDescription(data: string)
        : Promise<IResponseOK<[IBookResponse[], number] | null>> {
        return axiosInstance.get(`${urls.books}/${routePathConstant.search}/${data}`)
            .then(({ data }) => data);
    }

    public async createOne(data: FormData, { accessToken }: IAuth): Promise<IResponseOK<IBookResponse>> {
        return axiosInstance.post(urls.books, data, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        }).then(({ data }) => data);
    }

    public async updateOne(data: FormData, { accessToken }: IAuth, id: number): Promise<IResponseOK<IBookResponse>> {
        return axiosInstance.patch(`${urls.books}/${id}`, data, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        }).then(({ data }) => data);
    }

    public async deleteOne(id: number, { accessToken, clientKey }: IAuth): Promise<IResponseOK<string>> {
        return axiosInstance.delete(`${urls.books}/${id}?${queryConstant.clientKey}=${clientKey}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        }).then(({ data }) => data);
    }
}

export const bookService = new BookService();
