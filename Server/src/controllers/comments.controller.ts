import { NextFunction } from 'express';

import { ICommentLikesCreate, IRequest, IResponse } from '../interfaces';
import { Comments, Users } from '../entities';
import { HttpMessageEnum, HttpStatusEnum } from '../enums';
import { commentRepository } from '../repositories';
import { clientService, commentService, likeAndDisLikeService } from '../services';
import { ErrorHandler } from '../error';
import { errorMessageConstant } from '../constants';

class CommentsController {
    public async getAll(req: IRequest, res: IResponse<Comments[]>, next: NextFunction): Promise<IResponse<Comments[]> | undefined> {
        try {
            const { pagination } = req;

            if (pagination?.page) {
                const allComments = await commentService.getAllPagination(pagination?.page);

                if (!allComments?.length) {
                    next(new ErrorHandler(errorMessageConstant.notFound, HttpStatusEnum.NOT_FOUND, HttpMessageEnum.NOT_FOUND));
                    return;
                }

                return res.status(HttpStatusEnum.OK).json({
                    status: HttpStatusEnum.OK,
                    message: HttpMessageEnum.OK,
                    data: allComments,
                });
            }

            const allComments = await commentService.getAllPagination();

            if (!allComments.length) {
                next(new ErrorHandler(errorMessageConstant.notFound, HttpStatusEnum.NOT_FOUND, HttpMessageEnum.NOT_FOUND));
                return;
            }

            return res.status(HttpStatusEnum.OK).json({
                status: HttpStatusEnum.OK,
                message: HttpMessageEnum.OK,
                data: allComments,
            });
        } catch (e) {
            next(e);
        }
    }

    public async createOne(req: IRequest, res: IResponse<Comments>, next: NextFunction)
        : Promise<IResponse<Comments> | undefined> {
        try {
            const { id } = req.userData! as Users;
            const { text, bookId } = req.comment!;
            const commentCreated = await commentRepository.createOne({ bookId, text, userId: id });

            return res.status(HttpStatusEnum.CREATED).json({
                status: HttpStatusEnum.CREATED,
                data: commentCreated,
                message: HttpMessageEnum.CREATED,
            });
        } catch (e) {
            next(e);
        }
    }

    public async getOneActions(req: IRequest, res: IResponse<string[] | null>, next: NextFunction)
        : Promise<IResponse<string[] | null> | undefined> {
        try {
            const { id } = req.params!;

            const actions = await likeAndDisLikeService.getAllByCommentId(id);

            if (!actions.length) {
                next(new ErrorHandler(HttpMessageEnum.NOT_FOUND, HttpStatusEnum.NOT_FOUND, HttpMessageEnum.NOT_FOUND));
                return;
            }

            const likes = actions.map(async (action) => new Promise((resolve) => {
                clientService.get(action).then((data) => resolve(JSON.parse(data!)));
            }));

            const allLikes = await Promise.all(likes) as string[];

            return res.status(HttpStatusEnum.OK).json({
                status: HttpStatusEnum.OK,
                data: allLikes,
                message: HttpMessageEnum.OK,
            });
        } catch (e) {
            next(e);
        }
    }

    public async addAction(req: IRequest, res: IResponse<string>, next: NextFunction)
    : Promise<IResponse<string> | undefined> {
        try {
            const {
                like, userId, disLike,
            } = req.commentLikes!;
            const generateKey = req.generateKey!;

            const newLikes = await clientService.set(generateKey, JSON.stringify({ userId, like, disLike }));

            if (!newLikes) {
                next(
                    new ErrorHandler(
                        HttpMessageEnum.INTERNAL_SERVER_ERROR,
                        HttpStatusEnum.INTERNAL_SERVER_ERROR,
                        HttpMessageEnum.INTERNAL_SERVER_ERROR,
                    ),
                );
                return;
            }

            return res.status(HttpStatusEnum.CREATED).json({
                status: HttpStatusEnum.CREATED,
                message: HttpMessageEnum.CREATED,
                data: newLikes,
            });
        } catch (e) {
            next(e);
        }
    }

    public async removeAction(req: IRequest, res: IResponse<number>, next: NextFunction)
        : Promise<IResponse<number> | undefined> {
        try {
            const generateKey = req.generateKey!;

            const removed = await clientService.delete(generateKey);

            return res.status(HttpStatusEnum.NO_CONTENT).json({
                status: HttpStatusEnum.NO_CONTENT,
                message: HttpMessageEnum.NO_CONTENT,
                data: removed,
            });
        } catch (e) {
            next(e);
        }
    }

    public async updateAction(req: IRequest, res: IResponse<string>, next: NextFunction)
        : Promise<IResponse<string> | undefined> {
        try {
            const generateKey = req.generateKey!;
            const {
                like, disLike, userId,
            } = req.commentLikes! as ICommentLikesCreate;

            const updated = await clientService.set(generateKey, JSON.stringify({ userId, like, disLike }));

            if (!updated) {
                next(
                    new ErrorHandler(
                        HttpMessageEnum.INTERNAL_SERVER_ERROR,
                        HttpStatusEnum.INTERNAL_SERVER_ERROR,
                        HttpMessageEnum.INTERNAL_SERVER_ERROR,
                    ),
                );
                return;
            }

            return res.status(HttpStatusEnum.OK).json({
                status: HttpStatusEnum.OK,
                message: HttpMessageEnum.OK,
                data: updated,
            });
        } catch (e) {
            next(e);
        }
    }
}
export const commentsController = new CommentsController();
