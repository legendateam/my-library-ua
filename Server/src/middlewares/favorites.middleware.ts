import { NextFunction, Response } from 'express';

import {
    IActionsUpdateQuery, IClientKey, IFavorite, IRequest,
} from '../interfaces';
import { actionsSchema, actionsUserIdParamsSchema, clientKeySchema } from '../utils';
import { errorMessageConstant } from '../constants';
import { HttpMessageEnum, HttpStatusEnum } from '../enums';
import { ErrorHandler } from '../error';
import { bookRepository, favoritesRepository } from '../repositories';
import { Users } from '../entities';

class FavoritesMiddleware {
    public validateBody(req: IRequest, _: Response, next: NextFunction): void {
        const favorites = req.body;

        const { error, value } = actionsSchema.validate(favorites);

        if (error) {
            next(new ErrorHandler(errorMessageConstant.badRequest, HttpStatusEnum.BAD_REQUEST, HttpMessageEnum.BAD_REQUEST));
            return;
        }

        req.favorite = value;
        req.clientKey = value.clientKey;
        next();
    }

    public async checkBooksById(req: IRequest, _: Response, next: NextFunction): Promise<void> {
        try {
            const favorite = req.favorite as IFavorite;

            const bookId = favorite?.bookId!;

            const bookFromDB = await bookRepository.getOneById(bookId);

            if (!bookFromDB) {
                next(new ErrorHandler(errorMessageConstant.notFound, HttpStatusEnum.NOT_FOUND, HttpMessageEnum.NOT_FOUND));
                return;
            }

            next();
        } catch (e) {
            next(e);
        }
    }

    public async checkExistsByUserId(req: IRequest, _: Response, next: NextFunction): Promise<void> {
        try {
            const { id } = req.userData as Users;

            const favorite = await favoritesRepository.getOneByUserId(id);

            if (!favorite) {
                next(new ErrorHandler(errorMessageConstant.notFound, HttpStatusEnum.NOT_FOUND, HttpMessageEnum.NOT_FOUND));
                return;
            }

            req.favorite = favorite;
            next();
        } catch (e) {
            next(e);
        }
    }

    public async checkUniqueByUserId(req: IRequest, _: Response, next: NextFunction): Promise<void> {
        try {
            const { id: userId } = req.userData as Users;

            const favorite = await favoritesRepository.getOneByUserId(userId);

            if (favorite) {
                next(new ErrorHandler(errorMessageConstant.notFound, HttpStatusEnum.NOT_FOUND, HttpMessageEnum.NOT_FOUND));
                return;
            }

            next();
        } catch (e) {
            next(e);
        }
    }

    public async checkParams(req: IRequest, _: Response, next: NextFunction): Promise<void> {
        try {
            const { params } = req;

            const { error } = actionsUserIdParamsSchema.validate(params);

            if (error) {
                next(new ErrorHandler(error.message, HttpStatusEnum.BAD_REQUEST, HttpMessageEnum.BAD_REQUEST));
                return;
            }

            next();
        } catch (e) {
            next(e);
        }
    }

    public async checkQuery(req: IRequest, _: Response, next: NextFunction): Promise<void> {
        try {
            const query = req.query as IActionsUpdateQuery;

            if (query?.updateSet) req.actions = { updateSet: query.updateSet };

            if (query?.updateRemove) req.actions = { updateRemove: query.updateRemove };

            if (!query.updateSet && !query.updateRemove) req.actions = { updateSet: true, updateRemove: false };

            next();
        } catch (e) {
            next(e);
        }
    }

    public async checkParamsOnClientKey(req: IRequest, _: Response, next: NextFunction): Promise<void> {
        try {
            const { params } = req;

            const { error, value } = clientKeySchema.validate(params);

            if (error) {
                next(new ErrorHandler(errorMessageConstant.clientKey, HttpStatusEnum.BAD_REQUEST, HttpMessageEnum.BAD_REQUEST));
                return;
            }

            req.clientKey = value.clientKey as IClientKey;
            next();
        } catch (e) {
            next(e);
        }
    }
}

export const favoritesMiddleware = new FavoritesMiddleware();
