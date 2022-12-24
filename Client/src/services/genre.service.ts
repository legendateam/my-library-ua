import { axiosInstance } from './axiosInstance.service';
import {
    IAuth, IDeleteResult, IGenre, IGenreResponse, IResponseOK,
} from '../interfaces';
import { queryConstant, urls } from '../constants';

class GenreService {
    public async getAll() : Promise<IResponseOK<IGenreResponse[]>> {
        return axiosInstance.get<Promise<IResponseOK<IGenreResponse[]>>>(urls.genres).then(({ data }) => data);
    }

    public async createOne(genre: IGenre, { accessToken, clientKey }: IAuth) : Promise<IResponseOK<IGenreResponse>> {
        return axiosInstance.post<Promise<IResponseOK<IGenreResponse>>>(urls.genres, { ...genre, clientKey }, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        }).then(({ data }) => data);
    }

    public async deleteOne({ name }: IGenre, { accessToken, clientKey }: IAuth) : Promise<IResponseOK<IDeleteResult>> {
        return axiosInstance.delete(`${urls.genres}/${name}?${queryConstant.clientKey}=${clientKey}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        }).then(({ data }) => data);
    }
}

export const genreService = new GenreService();
