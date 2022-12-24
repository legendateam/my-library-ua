import { NextFunction } from 'express';
import { DeleteResult } from 'typeorm';

import {
    IAlreadyRead, IFavorite, IRequest, IResponse,
} from '../interfaces';
import { Favorites, Users } from '../entities';
import { favoritesRepository } from '../repositories';
import { HttpMessageEnum, HttpStatusEnum } from '../enums';
import { favoritesService } from '../services';
import { ErrorHandler } from '../error';
import { errorMessageConstant } from '../constants';

class FavoritesController {
    public async createOne(req: IRequest, res: IResponse<Favorites>, next: NextFunction)
        : Promise<IResponse<Favorites> | undefined> {
        try {
            req.err = null;

            const { id } = req.userData as Users;
            const { bookId } = req.favorite! as IFavorite;

            const favoritesFromDB = await favoritesService.create({ bookId, userId: id });

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

            const deleteResult = await favoritesRepository.deleteOne(userId);

            return res.status(HttpStatusEnum.CREATED).json({
                status: HttpStatusEnum.NO_CONTENT,
                data: deleteResult,
                message: HttpMessageEnum.NO_CONTENT,
            });
        } catch (e) {
            next(e);
        }
    }

    public async updateOne(req: IRequest, res: IResponse<Favorites>, next: NextFunction)
        : Promise<IResponse<Favorites> | undefined> {
        try {
            const { bookId } = req.body as IAlreadyRead;
            const { userId, books } = req.favorite! as Favorites;
            const query = req.actions!;

            const favoritesFromDB = await favoritesService.updateOne(query, userId, books, bookId);

            return res.status(HttpStatusEnum.OK).json({
                status: HttpStatusEnum.OK,
                data: favoritesFromDB,
                message: HttpMessageEnum.OK,
            });
        } catch (e) {
            next(e);
        }
    }

    public async getOneByUserId(req: IRequest, res: IResponse<Favorites>, next: NextFunction)
        : Promise<IResponse<Favorites> | undefined> {
        try {
            const userData = req.userData as Users;
            const userId = userData.id;

            const favoritesForCurrentUser = await favoritesRepository.getOneByUserId(userId);

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
export const favoritesController = new FavoritesController();
