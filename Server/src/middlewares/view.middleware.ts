import { NextFunction, Response } from 'express';

import { IRequest, IView, IViewParams } from '../interfaces';
import { ErrorHandler } from '../error';
import { errorMessageConstant } from '../constants';
import { ClientKeyEnum, HttpMessageEnum, HttpStatusEnum } from '../enums';
import { viewFirstCreateSchema } from '../utils';
import { clientService } from '../services';
import { bookRepository } from '../repositories';

class ViewMiddleware {
    public checkParamsOnBookId(req: IRequest, _: Response, next: NextFunction): void {
        const { params } = req;

        const { bookId } = Object.assign(params) as IViewParams;

        if (!bookId) {
            next(new ErrorHandler(errorMessageConstant.badRequest, HttpStatusEnum.BAD_REQUEST, HttpMessageEnum.BAD_REQUEST));
            return;
        }

        req.bookId = bookId;
        next();
    }

    public async isUnique(req: IRequest, _: Response, next: NextFunction): Promise<void> {
        try {
            const bookId = req.bookId!;
            const generateKey = clientService.generateKey(bookId, ClientKeyEnum.VIEWS_COUNT_BOOK);

            const viewExists = await clientService.get(generateKey);

            if (viewExists) {
                next(new ErrorHandler(errorMessageConstant.viewsForBookExists, HttpStatusEnum.CONFLICT, HttpMessageEnum.CONFLICT));
                return;
            }

            req.generateKey = generateKey;
            next();
        } catch (e) {
            next(e);
        }
    }

    public async isExists(req: IRequest, _: Response, next: NextFunction): Promise<void> {
        try {
            const bookId = req.bookId!;
            const generateKey = clientService.generateKey(bookId, ClientKeyEnum.VIEWS_COUNT_BOOK);

            const viewExists = await clientService.get(generateKey);

            if (!viewExists) {
                next(new ErrorHandler(errorMessageConstant.notFound, HttpStatusEnum.NOT_FOUND, HttpMessageEnum.NOT_FOUND));
                return;
            }

            const { views } = JSON.parse(viewExists) as IView;

            req.views = { views };
            req.generateKey = generateKey;

            next();
        } catch (e) {
            next(e);
        }
    }

    public validateBodyOnBookId(req: IRequest, _: Response, next: NextFunction): void {
        const { body } = req;
        const { value, error } = viewFirstCreateSchema.validate(body);

        if (error) {
            next(new ErrorHandler(errorMessageConstant.badRequest, HttpStatusEnum.BAD_REQUEST, HttpMessageEnum.BAD_REQUEST));
            return;
        }

        req.bookId = value.bookId.toString();
        req.views = { views: 0 };
        next();
    }

    public async checkBookExists(req: IRequest, _: Response, next: NextFunction): Promise<void> {
        const bookId = req.bookId!;

        const book = await bookRepository.getOneById(Number(bookId));

        if (!book) {
            next(new ErrorHandler(errorMessageConstant.notFound, HttpStatusEnum.NOT_FOUND, HttpMessageEnum.NOT_FOUND));
            return;
        }

        next();
    }
}

export const viewMiddleware = new ViewMiddleware();
