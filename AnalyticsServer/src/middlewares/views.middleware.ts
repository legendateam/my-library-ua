import { NextFunction, Response } from 'express';
import IP from 'ip';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

import { ErrorHandler } from '../error';
import { MessageEnum, StatusEnum } from '../enums';
import { IRequest } from '../interfaces';
import { idSchema } from '../utils';
import { ipAddressRepository, userRepository, viewsRepository } from '../repositories';

dayjs.extend(utc);

class ViewsMiddleware {
    public async validateBodyUserId(req: IRequest, _: Response, next: NextFunction): Promise<void> {
        try {
            const { body } = req;

            if (body?.id) {
                const { value, error } = idSchema.validate(body);

                if (error) {
                    next(new ErrorHandler(MessageEnum.BAD_REQUEST, StatusEnum.BAD_REQUEST, MessageEnum.BAD_REQUEST));
                    return;
                }

                req.userId = value.id;
            }

            next();
        } catch (e) {
            next(e);
        }
    }

    public async checkUserExists(req: IRequest, _: Response, next: NextFunction): Promise<void> {
        try {
            const id = req?.userId;

            if (id) {
                const user = await userRepository.getOneById(id);

                if (!user) {
                    next(new ErrorHandler(MessageEnum.NOT_FOUND, StatusEnum.NOT_FOUND, MessageEnum.NOT_FOUND));
                    return;
                }

                req.user = user;
            }

            next();
        } catch (e) {
            next(e);
        }
    }

    public async ipAddressIsUnique(req: IRequest, _: Response, next: NextFunction): Promise<void> {
        try {
            const ipAddress = IP.address();

            if (ipAddress) {
                const ipAddressFromDB = await ipAddressRepository.getOne({ ipAddress });

                if (!ipAddressFromDB) {
                    const ipAddressFormCreated = await ipAddressRepository.createOne({ ipAddress });

                    req.ipAddress = ipAddressFormCreated;
                }
            }

            next();
        } catch (e) {
            next(e);
        }
    }

    // @ts-ignore
    public async checkOnFirst(req: IRequest, _: Response, next: NextFunction): Promise<void> {
        try {
            const date = dayjs().utc().startOf('day').format();

            const views = await viewsRepository.getOneByDay(date);

            if (views) {
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
            const date = dayjs().utc().startOf('day').format();

            const views = await viewsRepository.getOneByDay(date);

            if (!views) {
                next(new ErrorHandler(MessageEnum.NOT_FOUND, StatusEnum.NOT_FOUND, MessageEnum.NOT_FOUND));
                return;
            }

            req.views = views;

            next();
        } catch (e) {
            next(e);
        }
    }
}

export const viewsMiddleware = new ViewsMiddleware();
