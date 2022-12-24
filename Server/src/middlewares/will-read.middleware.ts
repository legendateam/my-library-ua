import { NextFunction, Response } from 'express';

import {
    IActionsUpdateQuery, IClientKey, IRequest, IWillRead,
} from '../interfaces';
import { actionsSchema, actionsUserIdParamsSchema, clientKeySchema } from '../utils';
import { ErrorHandler } from '../error';
import { errorMessageConstant } from '../constants';
import { HttpMessageEnum, HttpStatusEnum } from '../enums';
import { bookRepository, willReadRepository } from '../repositories';
import { Users } from '../entities';

class WillReadMiddleware {
    public validateBody(req: IRequest, _: Response, next: NextFunction): void {
        const willRead = req.body;

        const { error, value } = actionsSchema.validate(willRead);

        if (error) {
            next(new ErrorHandler(error.message, HttpStatusEnum.BAD_REQUEST, HttpMessageEnum.BAD_REQUEST));
            return;
        }

        req.willRead = value;
        req.clientKey = value.clientKey;
        next();
    }

    public async checkBooksById(req: IRequest, _: Response, next: NextFunction): Promise<void> {
        try {
            const willReadBook = req.willRead as IWillRead;

            const bookId = willReadBook?.bookId!;

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

            const willReadBook = await willReadRepository.getOneByUserId(id);

            if (!willReadBook) {
                next(new ErrorHandler(errorMessageConstant.notFound, HttpStatusEnum.NOT_FOUND, HttpMessageEnum.NOT_FOUND));
                return;
            }

            req.willRead = willReadBook;
            next();
        } catch (e) {
            next(e);
        }
    }

    public async checkUniqueByUserId(req: IRequest, _: Response, next: NextFunction): Promise<void> {
        try {
            const { id: userId } = req.userData as Users;

            const willReadBook = await willReadRepository.getOneByUserId(userId);

            if (willReadBook) {
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

export const willReadMiddleware = new WillReadMiddleware();
