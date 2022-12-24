import { NextFunction } from 'express';

import { userRepository } from '../repositories';
import { Users } from '../entities';
import {
    EmailEnum, FileEnum, HttpMessageEnum, HttpStatusEnum, ItemTypeFileEnum,
} from '../enums';
import {
    IRequest, IResponse, ITokensPair, IUserUpdate,
} from '../interfaces';
import {
    authService, bcryptService, s3Service, userService,
} from '../services';
import { emailService } from '../services/email.service';
import { mainConfig } from '../configs';

class UsersController {
    public async getAll(_: IRequest, res: IResponse<Users[]>, next: NextFunction): Promise<IResponse<Users[]> | undefined> {
        try {
            const users = await userRepository.getAll();
            return res.status(HttpStatusEnum.OK).json({
                status: HttpStatusEnum.OK,
                data: users,
                message: HttpMessageEnum.OK,
            });
        } catch (e) {
            next(e);
        }
    }

    public async updateOne(req: IRequest, res: IResponse<ITokensPair>, next: NextFunction): Promise<IResponse<ITokensPair> | undefined> {
        try {
            const userDB = req.userData as Users;
            const userDataForUpdate = req.body as IUserUpdate;

            let passwordHashed = '';
            if (userDataForUpdate?.password) {
                passwordHashed = await bcryptService.hash(userDataForUpdate.password);
            }

            const dataNormalizer = { ...userDataForUpdate, password: passwordHashed };

            const userUpdate = Object.assign(passwordHashed ? dataNormalizer : userDataForUpdate);
            delete userUpdate.currentPassword;
            delete userUpdate.clientKey;

            if (req.file) {
                const avatarSaved = await s3Service.uploadFile(req.file, userDB.id, FileEnum.PHOTOS, ItemTypeFileEnum.USERS);

                if (userDB.avatar) {
                    await s3Service.deleteFile(userDB.avatar);
                }

                const pathFile = avatarSaved.Location.split(mainConfig.CLOUD_DOMAIN_NAME!)[1];

                await userRepository.updateData(userDB.id, { ...userUpdate, avatar: pathFile });

                await emailService.sendEmail(userUpdate?.email ?? userDB.email, EmailEnum.UPDATE_USER_DATA, {
                    nickName: userUpdate?.nickName ?? userDB.nickName,
                });

                const user = await userService.getOneById(userDB.id);
                const tokenPair = await authService.login({
                    id: user?.id,
                    email: user?.email,
                    avatar: user?.avatar,
                    role: user?.role,
                    nickName: user?.nickName,
                });

                if (tokenPair) {
                    return res.status(HttpStatusEnum.OK).json({
                        status: HttpStatusEnum.OK,
                        data: tokenPair,
                        message: HttpMessageEnum.OK,
                    });
                }
            }

            await userRepository.updateData(userDB.id, userUpdate);

            await emailService.sendEmail(userUpdate?.email ?? userDB.email, EmailEnum.UPDATE_USER_DATA, {
                nickName: userUpdate?.nickName ?? userDB.nickName,
            });

            const user = await userService.getOneById(userDB.id);
            const tokenPair = await authService.login({
                id: user?.id,
                email: user?.email,
                avatar: user?.avatar,
                role: user?.role,
                nickName: user?.nickName,
            });

            if (tokenPair) {
                return res.status(HttpStatusEnum.OK).json({
                    status: HttpStatusEnum.OK,
                    data: tokenPair,
                    message: HttpMessageEnum.OK,
                });
            }
        } catch (e) {
            next(e);
        }
    }
}

export const usersController = new UsersController();
