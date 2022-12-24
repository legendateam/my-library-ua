import { NextFunction } from 'express';

import { IRequest, IResponse } from '../interfaces';
import { authorPathSchema, authorSchema } from '../utils';
import { ErrorHandler } from '../error';
import { errorMessageConstant } from '../constants';
import { HttpMessageEnum, HttpStatusEnum } from '../enums';
import { authorRepository } from '../repositories';
import { authorService } from '../services';

class AuthorMiddleware {
    public validateBody(req: IRequest, _: IResponse<void>, next: NextFunction): void {
        try {
            const author = req.body;

            const { error, value } = authorSchema.validate(author);

            if (error) {
                next(new ErrorHandler(error.message, HttpStatusEnum.BAD_REQUEST, HttpMessageEnum.BAD_REQUEST));
                return;
            }

            req.author = value;
            req.clientKey = value.clientKey;
            next();
        } catch (e) {
            next(e);
        }
    }

    public async checkPseudonymExists(req: IRequest, _: IResponse<void>, next: NextFunction): Promise<void> {
        try {
            const pseudonym = req.author?.pseudonym;

            if (pseudonym) {
                const author = await authorService.getOneByPseudonym(pseudonym);

                if (author) {
                    next(new ErrorHandler(errorMessageConstant.authorAlreadyExists, HttpStatusEnum.CONFLICT, HttpMessageEnum.CONFLICT));
                    return;
                }
            }

            next();
        } catch (e) {
            next(e);
        }
    }

    public checkParamsId(req: IRequest, _: IResponse<void>, next: NextFunction): void {
        try {
            const { params } = req;

            if (!params?.id || Number(params?.id) <= 0) {
                next(new ErrorHandler(errorMessageConstant.badRequest, HttpStatusEnum.BAD_REQUEST, HttpMessageEnum.BAD_REQUEST));
                return;
            }

            next();
        } catch (e) {
            next(e);
        }
    }

    public checkParamsName(req: IRequest, _: IResponse<void>, next: NextFunction): void {
        try {
            const { params } = req;

            if (!params?.fullname) {
                next(new ErrorHandler(errorMessageConstant.badRequest, HttpStatusEnum.BAD_REQUEST, HttpMessageEnum.BAD_REQUEST));
                return;
            }

            next();
        } catch (e) {
            next(e);
        }
    }

    public async checkExists(req: IRequest, _: IResponse<void>, next: NextFunction): Promise<void> {
        try {
            const { params } = req;

            const authorFromDB = await authorRepository.getOneById(Number(params.id));

            if (!authorFromDB) {
                next(new ErrorHandler(errorMessageConstant.authorNotFound, HttpStatusEnum.NOT_FOUND, HttpMessageEnum.NOT_FOUND));
                return;
            }

            req.author = authorFromDB;

            next();
        } catch (e) {
            next(e);
        }
    }

    public validatePatchBody(req: IRequest, _: IResponse<void>, next: NextFunction): void {
        try {
            const author = req.body;

            const { error, value } = authorPathSchema.validate(author);

            if (error) {
                next(new ErrorHandler(error.message, HttpStatusEnum.BAD_REQUEST, HttpMessageEnum.BAD_REQUEST));
                return;
            }

            req.authorPatch = value;
            req.clientKey = value.clientKey;

            next();
        } catch (e) {
            next(e);
        }
    }
}

export const authorMiddleware = new AuthorMiddleware();
