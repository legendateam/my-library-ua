import { axiosInstance } from './axiosInstance.service';
import { urls } from '../constants';
import {
    IAuth,
    ICommentCreate, ICommentsResponse, IPagination, IResponseOK,
} from '../interfaces';

class CommentService {
    public async createComment({ bookId, text }: ICommentCreate, { accessToken, clientKey }: IAuth):
        Promise<IResponseOK<ICommentsResponse>> {
        return axiosInstance.post(urls.comments, { bookId, text, clientKey }, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        }).then(({ data }) => data);
    }

    public async getAllWithPagination({ page }: IPagination): Promise<IResponseOK<ICommentsResponse[]>> {
        if (Number(page) > 1) {
            return axiosInstance.get(`${urls.comments}?page=${page}`).then(({ data }) => data);
        }
    }
}

export const commentService = new CommentService();
