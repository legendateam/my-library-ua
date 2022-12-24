import { NextFunction, Response } from 'express';
import { ErrorHandler } from '../error';
import { HttpMessageEnum, HttpStatusEnum } from '../enums';
import { IRequest, IUserUpdate } from '../interfaces';
import { updateUserSchema } from '../utils';
import { bcryptService, userService } from '../services';
import { Users } from '../entities';
import { errorMessageConstant } from '../constants';

class UserMiddleware {
    public validateData(req: IRequest, _: Response, next: NextFunction): void {
        try {
            const { body } = req;

            const { value, error } = updateUserSchema.validate(body);

            if (error) {
                next(new ErrorHandler(error.message, HttpStatusEnum.BAD_REQUEST, HttpMessageEnum.BAD_REQUEST));
                return;
            }

            req.clientKey = value.clientKey;

            next();
        } catch (e) {
            next(e);
        }
    }

    public async compareNewPassword(req: IRequest, _: Response, next: NextFunction): Promise<void> {
        try {
            const updateUser = req.body as IUserUpdate;
            const userFormDB = req.userData as Users;

            const compare = await bcryptService.compare(updateUser.currentPassword, userFormDB?.password);

            if (!compare) {
                next(new ErrorHandler(errorMessageConstant.unauthorized, HttpStatusEnum.UNAUTHORIZED, HttpMessageEnum.UNAUTHORIZED));
                return;
            }

            next();
        } catch (e) {
            next(e);
        }
    }

    public async uniqueNickNameOrEmail(req: IRequest, _: Response, next: NextFunction): Promise<void> {
        try {
            const updateUser = req.body as IUserUpdate;

            if (updateUser?.nickName && updateUser?.email) {
                const userByEmailAndNickName = await userService.getOneByEmailOrNickName(
                    { nickName: updateUser.nickName, email: updateUser.email },
                );

                if (userByEmailAndNickName) {
                    next(new ErrorHandler(errorMessageConstant.userAlreadyExists, HttpStatusEnum.CONFLICT, HttpMessageEnum.CONFLICT));
                    return;
                }
            }

            if (updateUser?.nickName) {
                const userByEmailAndNickName = await userService.getOneByEmailOrNickName(
                    { nickName: updateUser.nickName },
                );

                if (userByEmailAndNickName) {
                    next(new ErrorHandler(errorMessageConstant.userAlreadyExists, HttpStatusEnum.CONFLICT, HttpMessageEnum.CONFLICT));
                    return;
                }
            }

            if (updateUser?.email) {
                const userByEmailAndNickName = await userService.getOneByEmailOrNickName(
                    { email: updateUser.email },
                );

                if (userByEmailAndNickName) {
                    next(new ErrorHandler(errorMessageConstant.userAlreadyExists, HttpStatusEnum.CONFLICT, HttpMessageEnum.CONFLICT));
                    return;
                }
            }

            next();
        } catch (e) {
            next(e);
        }
    }
}
export const userMiddleware = new UserMiddleware();
