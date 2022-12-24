import { NextFunction, Response } from 'express';

import { IRequest } from '../interfaces';
import { bookSchema, bookUpdateSchema, searchSchema } from '../utils';
import { ErrorHandler } from '../error';
import { errorMessageConstant } from '../constants';
import { HttpMessageEnum, HttpStatusEnum } from '../enums';
import { bookService } from '../services';
import { bookRepository } from '../repositories';
import { Books } from '../entities';

class BookMiddleware {
    public checkParamsId(req: IRequest, _: Response, next: NextFunction): void {
        try {
            const { params } = req;
            const { id } = params;

            if (!id || (Number(params.id) <= 0)) {
                next(new ErrorHandler(errorMessageConstant.badRequest, HttpStatusEnum.BAD_REQUEST, HttpMessageEnum.BAD_REQUEST));
                return;
            }

            next();
        } catch (e) {
            next(e);
        }
    }

    public validateBody(req: IRequest, _: Response, next: NextFunction): void {
        try {
            const { body } = req;

            const { value, error } = bookSchema.validate(body);

            if (error) {
                next(new ErrorHandler(error.message, HttpStatusEnum.BAD_REQUEST, HttpMessageEnum.BAD_REQUEST));
                return;
            }

            req.book = value;
            req.clientKey = value.clientKey;
            next();
        } catch (e) {
            next(e);
        }
    }

    public validateUpdateBody(req: IRequest, _: Response, next: NextFunction): void {
        try {
            const { body } = req;

            const { value, error } = bookUpdateSchema.validate(body);

            if (error) {
                next(new ErrorHandler(error.message, HttpStatusEnum.BAD_REQUEST, HttpMessageEnum.BAD_REQUEST));
                return;
            }

            req.clientKey = value.clientKey;

            delete value.clientKey;
            if (value?.cover) delete value.cover;
            if (value?.fileText) delete value.fileText;
            if (value?.fileAudio) delete value.fileAudio;

            req.book = value;
            next();
        } catch (e) {
            next(e);
        }
    }

    public async isBooksExistsByDescription(req: IRequest, _: Response, next: NextFunction): Promise<void> {
        try {
            const book = req.book!;

            const bookDB = await bookService.isBooksExists(book?.description);

            if (bookDB) {
                next(new ErrorHandler(errorMessageConstant.bookAlreadyExists, HttpStatusEnum.CONFLICT, HttpMessageEnum.CONFLICT));
                return;
            }

            next();
        } catch (e) {
            next(e);
        }
    }

    public checkQueryClientKey(req: IRequest, _: Response, next: NextFunction): void {
        try {
            const { query } = req;
            const clientKey = query?.clientKey;

            if (!clientKey) {
                next(new ErrorHandler(errorMessageConstant.unauthorized, HttpStatusEnum.UNAUTHORIZED, HttpMessageEnum.UNAUTHORIZED));
                return;
            }

            req.clientKey = clientKey as string;

            next();
        } catch (e) {
            next(e);
        }
    }

    public async checkBookExistsById(req: IRequest, _: Response, next: NextFunction): Promise<void> {
        try {
            const id = req.params.id!;

            const book = await bookRepository.getOneById(Number(id));

            if (!book) {
                next(new ErrorHandler(errorMessageConstant.notFound, HttpStatusEnum.NOT_FOUND, HttpMessageEnum.NOT_FOUND));
                return;
            }

            req.book = book as Books;
            next();
        } catch (e) {
            next(e);
        }
    }

    public async checkBookExistsForUpdateById(req: IRequest, _: Response, next: NextFunction): Promise<void> {
        try {
            const id = req.params.id!;

            const book = await bookRepository.getOneById(Number(id));

            if (!book) {
                next(new ErrorHandler(errorMessageConstant.notFound, HttpStatusEnum.NOT_FOUND, HttpMessageEnum.NOT_FOUND));
                return;
            }

            next();
        } catch (e) {
            next(e);
        }
    }

    public checkSearchData(req: IRequest, _: Response, next: NextFunction): void {
        try {
            const data = req.params!;

            const { value, error } = searchSchema.validate(data);

            if (error) {
                next(new ErrorHandler(errorMessageConstant.badRequest, HttpStatusEnum.BAD_REQUEST, HttpMessageEnum.BAD_REQUEST));
                return;
            }

            req.search = value;

            next();
        } catch (e) {
            next(e);
        }
    }
}

export const bookMiddleware = new BookMiddleware();
