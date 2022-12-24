import { NextFunction, Request } from 'express';

import { IResponse } from '../interfaces';
import { userRepository } from '../repositories';
import { MessageEnum, StatusEnum } from '../enums';

class UsersController {
    public async getNewUsersByDate(req: Request, res: IResponse<number>, next:NextFunction)
        : Promise<IResponse<number> | undefined> {
        try {
            const { date } = req.params;

            const countUsers = await userRepository.getCountNewUsers(date);

            return res.status(StatusEnum.OK).json({
                message: MessageEnum.OK,
                data: countUsers,
                status: StatusEnum.OK,
            });
        } catch (e) {
            next(e);
        }
    }

    public async getAllCount(_: Request, res: IResponse<number>, next:NextFunction)
        : Promise<IResponse<number> | undefined> {
        try {
            const countUsers = await userRepository.getAllCount();

            return res.status(StatusEnum.OK).json({
                message: MessageEnum.OK,
                data: countUsers,
                status: StatusEnum.OK,
            });
        } catch (e) {
            next(e);
        }
    }
}

export const usersController = new UsersController();
