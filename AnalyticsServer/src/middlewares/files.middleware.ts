import { NextFunction, Response } from 'express';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

import { IRequest } from '../interfaces';
import { filesRepository } from '../repositories';
import { ErrorHandler } from '../error';
import { MessageEnum, StatusEnum } from '../enums';
import { FilesSchema } from '../utils';

dayjs.extend(utc);

class FilesMiddleware {
    // @ts-ignore
    public async isUnique(req: IRequest, _: Response, next: NextFunction): Promise<void> {
        try {
            const toDay = dayjs().utc().startOf('day').format();

            const files = await filesRepository.getOneByDate(toDay);

            if (files) {
                next(new ErrorHandler(MessageEnum.CONFLICT, StatusEnum.CONFLICT, MessageEnum.CONFLICT));
                return;
            }

            next();
        } catch (e) {
            next(e);
        }
    }

    public async isExists(req: IRequest, _: Response, next: NextFunction): Promise<void> {
        try {
            const toDay = dayjs().startOf('day').utc().format();

            const files = await filesRepository.getOneByDate(toDay);

            if (!files) {
                next(new ErrorHandler(MessageEnum.NOT_FOUND, StatusEnum.NOT_FOUND, MessageEnum.NOT_FOUND));
                return;
            }

            req.files = files;
            next();
        } catch (e) {
            next(e);
        }
    }

    public async validateBody(req: IRequest, _: Response, next: NextFunction): Promise<void> {
        try {
            const { body } = req;

            const { error, value } = FilesSchema.validate(body);

            if (error) {
                next(new ErrorHandler(MessageEnum.BAD_REQUEST, StatusEnum.BAD_REQUEST, MessageEnum.BAD_REQUEST));
                return;
            }

            if (value?.downloadNumbers && value?.readNumbers) {
                next(new ErrorHandler(MessageEnum.BAD_REQUEST, StatusEnum.BAD_REQUEST, MessageEnum.BAD_REQUEST));
                return;
            }

            if (value?.downloadNumbers) req.downloadNumbers = value?.downloadNumbers;
            if (value?.readNumbers) req.readNumbers = value?.readNumbers;

            next();
        } catch (e) {
            next(e);
        }
    }
}

export const filesMiddleware = new FilesMiddleware();
