import { NextFunction, Response } from 'express';

import { IRating, IRequest } from '../interfaces';
import { ratingsSchema } from '../utils';
import { ErrorHandler } from '../error';
import { HttpMessageEnum, HttpStatusEnum } from '../enums';
import { bookRepository, ratingRepository } from '../repositories';
import { Users } from '../entities';
import { errorMessageConstant } from '../constants';

class RatingMiddleware {
    public checkBody(req: IRequest, _: Response, next: NextFunction): void {
        const { body } = req;
        const { error, value } = ratingsSchema.validate(body);

        if (error) {
            next(new ErrorHandler(error.message, HttpStatusEnum.BAD_REQUEST, HttpMessageEnum.BAD_REQUEST));
            return;
        }

        req.rating = value;
        req.clientKey = value.clientKey;
        next();
    }

    public async isBookExistsById(req: IRequest, _: Response, next: NextFunction): Promise<void> {
        try {
            const { bookId } = req.rating!;

            const book = await bookRepository.getOneById(bookId);

            if (!book) {
                next(new ErrorHandler(errorMessageConstant.bookNotFound, HttpStatusEnum.NOT_FOUND, HttpMessageEnum.NOT_FOUND));
                return;
            }

            next();
        } catch (e) {
            next(e);
        }
    }

    public async isUnique(req: IRequest, _: Response, next: NextFunction): Promise<void> {
        try {
            const { bookId } = req.rating!;
            const { id } = req.userData as Users;

            const rating = await ratingRepository.getOneByUserIdAndBookId({ bookId, userId: id });

            if (rating) {
                next(new ErrorHandler(HttpMessageEnum.CONFLICT, HttpStatusEnum.CONFLICT, HttpMessageEnum.CONFLICT));
                return;
            }

            const setUserIdInRating = req.rating as IRating;
            req.rating = { ...setUserIdInRating, userId: id };
            next();
        } catch (e) {
            next(e);
        }
    }

    public async isExists(req: IRequest, _: Response, next: NextFunction): Promise<void> {
        try {
            const { id } = req.params!;

            const rating = await ratingRepository.getOneById(Number(id));

            if (!rating) {
                next(new ErrorHandler(HttpMessageEnum.NOT_FOUND, HttpStatusEnum.NOT_FOUND, HttpMessageEnum.NOT_FOUND));
                return;
            }

            next();
        } catch (e) {
            next(e);
        }
    }
}

export const ratingMiddleware = new RatingMiddleware();
