import { NextFunction } from 'express';
import { DeleteResult } from 'typeorm';

import {
    IAlreadyRead, IRequest, IResponse,
} from '../interfaces';
import { AlreadyRead, Users } from '../entities';
import { HttpMessageEnum, HttpStatusEnum } from '../enums';
import { alreadyReadService } from '../services';
import { alreadyReadRepository } from '../repositories';
import { ErrorHandler } from '../error';
import { errorMessageConstant } from '../constants';

class AlreadyReadController {
    public async createOne(req: IRequest, res: IResponse<AlreadyRead>, next: NextFunction)
        : Promise<IResponse<AlreadyRead> | undefined> {
        try {
            req.err = null;

            const { id } = req.userData as Users;
            const { bookId } = req.alreadyReadBook! as IAlreadyRead;

            const alreadyReadBookFromDB = await alreadyReadService.create({ bookId, userId: id });

            return res.status(HttpStatusEnum.CREATED).json({
                status: HttpStatusEnum.CREATED,
                data: alreadyReadBookFromDB,
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

            const deleteResult = await alreadyReadRepository.deleteOne(userId);

            return res.status(HttpStatusEnum.CREATED).json({
                status: HttpStatusEnum.NO_CONTENT,
                data: deleteResult,
                message: HttpMessageEnum.NO_CONTENT,
            });
        } catch (e) {
            next(e);
        }
    }

    public async updateOne(req: IRequest, res: IResponse<AlreadyRead>, next: NextFunction)
        : Promise<IResponse<AlreadyRead> | undefined> {
        try {
            const { bookId } = req.body as IAlreadyRead;
            const { userId, books } = req.alreadyReadBook! as AlreadyRead;
            const query = req.actions!;

            const alreadyReadBookFromDB = await alreadyReadService.updateOne(query, userId, books, bookId);

            return res.status(HttpStatusEnum.CREATED).json({
                status: HttpStatusEnum.CREATED,
                data: alreadyReadBookFromDB,
                message: HttpMessageEnum.CREATED,
            });
        } catch (e) {
            next(e);
        }
    }

    public async getOneByUserId(req: IRequest, res: IResponse<AlreadyRead>, next: NextFunction)
        : Promise<IResponse<AlreadyRead> | undefined> {
        try {
            const userData = req.userData as Users;
            const userId = userData.id;

            const alreadyReadForCurrentUser = await alreadyReadRepository.getOneByUserId(userId);

            if (!alreadyReadForCurrentUser) {
                next(new ErrorHandler(errorMessageConstant.notFound, HttpStatusEnum.NOT_FOUND, HttpMessageEnum.NOT_FOUND));
                return;
            }

            return res.status(HttpStatusEnum.OK).json({
                status: HttpStatusEnum.OK,
                message: HttpMessageEnum.OK,
                data: alreadyReadForCurrentUser,
            });
        } catch (e) {
            next(e);
        }
    }
}
export const alreadyReadController = new AlreadyReadController();
