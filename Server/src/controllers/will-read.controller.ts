import { NextFunction } from 'express';
import { DeleteResult } from 'typeorm';

import { IRequest, IResponse, IWillRead } from '../interfaces';
import { Users, WillRead } from '../entities';
import { willReadRepository } from '../repositories';
import { HttpMessageEnum, HttpStatusEnum } from '../enums';
import { willReadService } from '../services';
import { ErrorHandler } from '../error';
import { errorMessageConstant } from '../constants';

class WillReadController {
    public async createOne(req: IRequest, res: IResponse<WillRead>, next: NextFunction)
        : Promise<IResponse<WillRead> | undefined> {
        try {
            req.err = null;

            const { id } = req.userData as Users;
            const { bookId } = req.willRead! as IWillRead;

            const favoritesFromDB = await willReadService.create({ bookId, userId: id });

            return res.status(HttpStatusEnum.CREATED).json({
                status: HttpStatusEnum.CREATED,
                data: favoritesFromDB,
                message: HttpMessageEnum.CREATED,
            });
        } catch (e) {
            next(e);
        }
    }

    public async deleteOne(req: IRequest, res: IResponse<DeleteResult>, next: NextFunction)
        : Promise<IResponse<DeleteResult> | undefined> {
        try {
            const { id: userId } = req.userData! as Users;

            const deleteResult = await willReadRepository.deleteOne(userId);

            return res.status(HttpStatusEnum.NO_CONTENT).json({
                status: HttpStatusEnum.NO_CONTENT,
                data: deleteResult,
                message: HttpMessageEnum.NO_CONTENT,
            });
        } catch (e) {
            next(e);
        }
    }

    public async updateOne(req: IRequest, res: IResponse<WillRead>, next: NextFunction)
        : Promise<IResponse<WillRead> | undefined> {
        try {
            const { bookId } = req.body as IWillRead;
            const { userId, books } = req.willRead! as WillRead;
            const query = req.actions!;

            const favoritesFromDB = await willReadService.updateOne(query, userId, books, bookId);

            return res.status(HttpStatusEnum.OK).json({
                status: HttpStatusEnum.OK,
                data: favoritesFromDB,
                message: HttpMessageEnum.OK,
            });
        } catch (e) {
            next(e);
        }
    }

    public async getOneByUserId(req: IRequest, res: IResponse<WillRead>, next: NextFunction)
        : Promise<IResponse<WillRead> | undefined> {
        try {
            const userData = req.userData as Users;
            const userId = userData.id;

            const favoritesForCurrentUser = await willReadRepository.getOneByUserId(userId);

            if (!favoritesForCurrentUser) {
                next(new ErrorHandler(errorMessageConstant.notFound, HttpStatusEnum.NOT_FOUND, HttpMessageEnum.NOT_FOUND));
                return;
            }

            return res.status(HttpStatusEnum.OK).json({
                status: HttpStatusEnum.OK,
                message: HttpMessageEnum.OK,
                data: favoritesForCurrentUser,
            });
        } catch (e) {
            next(e);
        }
    }
}
export const willReadController = new WillReadController();
