import { NextFunction, Response } from 'express';

import { IGenre, IRequest } from '../interfaces';
import { ErrorHandler } from '../error';
import { errorMessageConstant } from '../constants';
import { HttpMessageEnum, HttpStatusEnum } from '../enums';
import { genreSchema } from '../utils';
import { genreRepository } from '../repositories';

class GenreMiddleware {
    public checkParamsNameAndQueryClientKey(req: IRequest, _: Response, next: NextFunction): void {
        const { params } = req;
        const { query } = req;

        const { name } = params;
        const { clientKey } = query;

        const { error, value } = genreSchema.validate({ name, clientKey });

        if (error) {
            next(new ErrorHandler(error.message, HttpStatusEnum.BAD_REQUEST, HttpMessageEnum.BAD_REQUEST));
            return;
        }

        const genre = value as IGenre;

        req.genre = { name: genre.name };
        req.clientKey = value.clientKey as string;

        next();
    }

    public validateBody(req: IRequest, _: Response, next: NextFunction): void {
        const genre = req.body;

        const { error, value } = genreSchema.validate(genre);

        if (error) {
            next(new ErrorHandler(error.message, HttpStatusEnum.BAD_REQUEST, HttpMessageEnum.BAD_REQUEST));
            return;
        }

        req.genre = value;
        req.clientKey = value.clientKey;
        next();
    }

    public async isUnique(req: IRequest, _: Response, next: NextFunction): Promise<void> {
        try {
            const genre = req.genre as IGenre;

            const genreDB = await genreRepository.getOneByName(genre.name);

            if (genreDB) {
                next(new ErrorHandler(errorMessageConstant.genreAlreadyExists, HttpStatusEnum.CONFLICT, HttpMessageEnum.CONFLICT));
                return;
            }

            next();
        } catch (e) {
            next(e);
        }
    }

    public async checkExists(req: IRequest, _: Response, next: NextFunction): Promise<void> {
        try {
            const genre = req.genre as IGenre;

            const genreDB = await genreRepository.getOneByName(genre.name);

            if (!genreDB) {
                next(new ErrorHandler(errorMessageConstant.notFound, HttpStatusEnum.NOT_FOUND, HttpMessageEnum.NOT_FOUND));
                return;
            }

            next();
        } catch (e) {
            next(e);
        }
    }
}

export const genreMiddleware = new GenreMiddleware();
