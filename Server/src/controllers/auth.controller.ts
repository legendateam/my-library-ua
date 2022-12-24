import { NextFunction, Request } from 'express';

import {
    IForgotToken, IPayload, IRequest, IResponse, ITokensPair, IUser,
} from '../interfaces';
import {
    authService, clientService, jwtService, s3Service, userService,
} from '../services';
import {
    EmailEnum,
    FileEnum,
    HttpMessageEnum,
    HttpStatusEnum,
    ItemTypeFileEnum,
    MessagesEnum,
    TokensEnum,
} from '../enums';
import { Users } from '../entities';
import { ErrorHandler } from '../error';
import { emailMessagesConstant, errorMessageConstant } from '../constants';
import { emailService } from '../services/email.service';
import { mainConfig } from '../configs';

class AuthController {
    public async login(req: IRequest, res: IResponse<ITokensPair>, next: NextFunction): Promise<IResponse<ITokensPair> |undefined> {
        try {
            const {
                nickName, role, id, email, avatar,
            } = req.userData as Users;

            const tokensGeneratedAndSaved = await authService.login({
                id, role, nickName, avatar, email,
            });

            if (!tokensGeneratedAndSaved) {
                next(new ErrorHandler(
                    errorMessageConstant.unknown,
                    HttpStatusEnum.INTERNAL_SERVER_ERROR,
                    HttpMessageEnum.INTERNAL_SERVER_ERROR,
                ));
                return;
            }

            const { access, refresh, clientKey } = tokensGeneratedAndSaved as ITokensPair;

            await emailService.sendEmail(email, EmailEnum.WELCOME_BACK, { nickName });

            return res.status(HttpStatusEnum.OK).json({
                status: HttpStatusEnum.OK,
                message: HttpMessageEnum.OK,
                data: {
                    access,
                    refresh,
                    clientKey,
                },
            });
        } catch (e) {
            next(e);
        }
    }

    public async registration(req: IRequest, res: IResponse<Users>, next: NextFunction): Promise<IResponse<Users> | undefined> {
        try {
            const {
                nickName, role, email, password,
            } = req.userData as IUser;

            const userDB = await authService.registration({
                nickName, role, email, password,
            });

            if (!userDB) {
                next(new ErrorHandler(
                    errorMessageConstant.userNotRegistration,
                    HttpStatusEnum.NOT_IMPLEMENTED,
                    HttpMessageEnum.NOT_IMPLEMENTED,
                ));
                return;
            }

            if (req.file) {
                const userId = userDB.id;
                const avatarSaved = await s3Service.uploadFile(req.file, userId, FileEnum.PHOTOS, ItemTypeFileEnum.USERS);

                if (!avatarSaved.Location) {
                    await emailService.sendEmail(userDB.email, EmailEnum.WELCOME, { nickName: userDB.nickName });
                    return res.status(HttpStatusEnum.PARTIAL_CONTENT).json({
                        status: HttpStatusEnum.PARTIAL_CONTENT,
                        data: { ...userDB },
                        message: HttpMessageEnum.PARTIAL_CONTENT,
                    });
                }
                const pathFile = avatarSaved.Location.split(mainConfig.CLOUD_DOMAIN_NAME!)[1];

                await userService.updateAvatar(userId, pathFile);
                await emailService.sendEmail(userDB.email, EmailEnum.WELCOME, { nickName: userDB.nickName });
                return res.status(HttpStatusEnum.CREATED).json({
                    status: HttpStatusEnum.CREATED,
                    data: { ...userDB, avatar: pathFile },
                    message: HttpMessageEnum.CREATED,
                });
            }

            await emailService.sendEmail(userDB.email, EmailEnum.WELCOME, { nickName: userDB.nickName });
            return res.status(HttpStatusEnum.CREATED).json({
                status: HttpStatusEnum.CREATED,
                data: userDB,
                message: HttpMessageEnum.CREATED,
            });
        } catch (e) {
            next(e);
        }
    }

    public async logout(req: IRequest, res: IResponse<number>, next: NextFunction): Promise<IResponse<number> | undefined> {
        try {
            const clientKey = req.clientKey as string;
            const deletedTokens = await authService.logout(clientKey);

            if (!deletedTokens) {
                next(new ErrorHandler(
                    errorMessageConstant.unknown,
                    HttpStatusEnum.INTERNAL_SERVER_ERROR,
                    HttpMessageEnum.INTERNAL_SERVER_ERROR,
                ));
                return;
            }
            req.logout((err) => {
                if (err) {
                    return next(new ErrorHandler(
                        err.message,
                        HttpStatusEnum.INTERNAL_SERVER_ERROR,
                        HttpMessageEnum.INTERNAL_SERVER_ERROR,
                    ));
                }
            });

            return res.status(HttpStatusEnum.OK).clearCookie('connect.sid', { path: '/' }).json({
                status: HttpStatusEnum.OK,
                message: HttpMessageEnum.OK,
                data: deletedTokens,
            });
        } catch (e) {
            next(e);
        }
    }

    public async refresh(req: IRequest, res: IResponse<ITokensPair>, next: NextFunction): Promise<IResponse<ITokensPair> | undefined> {
        try {
            const requestClientKey = req.clientKey as string;
            const payload = req.payload as IPayload;
            const newTokens = await authService.refresh(payload, requestClientKey);

            if (!newTokens) {
                next(new ErrorHandler(
                    errorMessageConstant.unknown,
                    HttpStatusEnum.INTERNAL_SERVER_ERROR,
                    HttpMessageEnum.INTERNAL_SERVER_ERROR,
                ));
                return;
            }

            const { refresh, access, clientKey } = newTokens;

            return res.status(HttpStatusEnum.OK).json({
                status: HttpStatusEnum.OK,
                message: HttpMessageEnum.OK,
                data: {
                    refresh,
                    access,
                    clientKey,
                },
            });
        } catch (e) {
            next(e);
        }
    }

    public async forgotPassword(req: IRequest, res: IResponse<string>, next: NextFunction): Promise<IResponse<string> | undefined> {
        try {
            const {
                nickName, id, role, email,
            } = req.userData as Users;

            const forgotGeneratedAndSaved = await authService.forgotPassword({ id, nickName, role });

            if (!forgotGeneratedAndSaved) {
                next(new ErrorHandler(
                    errorMessageConstant.unknown,
                    HttpStatusEnum.INTERNAL_SERVER_ERROR,
                    HttpMessageEnum.INTERNAL_SERVER_ERROR,
                ));
                return;
            }

            const { forgot, clientKey } = forgotGeneratedAndSaved as IForgotToken;

            await emailService.sendEmail(email, EmailEnum.FORGOT_PASSWORD, {
                nickName, clientKey, forgot, forgotTime: mainConfig.EXPIRES_IN_FORGOT_PASSWORD,
            });

            return res.status(HttpStatusEnum.OK).json({
                status: HttpStatusEnum.OK,
                message: HttpMessageEnum.OK,
                data: emailMessagesConstant[MessagesEnum.AFTER_SENT_MESSAGE_ON_EMAIL],
            });
        } catch (e) {
            next(e);
        }
    }

    public async changePassword(req: IRequest, res: IResponse<string>, next: NextFunction): Promise<IResponse<string> | undefined> {
        try {
            const password = req.password as string;
            const clientKey = req.clientKey as string;
            const { id } = req.payload as IPayload;

            const changePassword = await userService.changePassword(id!, password);

            if (!changePassword) {
                next(new ErrorHandler(
                    errorMessageConstant.unknown,
                    HttpStatusEnum.INTERNAL_SERVER_ERROR,
                    HttpMessageEnum.INTERNAL_SERVER_ERROR,
                ));
                return;
            }

            await clientService.delete(clientKey);

            const { email, nickName } = req.userData as Users;
            await emailService.sendEmail(email, EmailEnum.CHANGE_PASSWORD, { nickName });

            return res.status(HttpStatusEnum.OK)
                .json({
                    status: HttpStatusEnum.OK,
                    message: HttpMessageEnum.OK,
                    data: emailMessagesConstant[MessagesEnum.CHANGE_PASSWORD],
                });
        } catch (e) {
            next(e);
        }
    }

    public async loginSuccess(req: Request, res: IResponse<ITokensPair>, next: NextFunction)
        : Promise<IResponse<ITokensPair> | undefined> {
        try {
            const tokenPair = req.user as ITokensPair;

            return res.status(HttpStatusEnum.OK).json({
                status: HttpStatusEnum.OK,
                message: HttpMessageEnum.OK,
                data: tokenPair,
            });
        } catch (e) {
            next(e);
        }
    }

    public async loginFailed(_: Request, res: IResponse<string>, next: NextFunction): Promise<IResponse<string> | undefined> {
        try {
            return res.status(HttpStatusEnum.UNAUTHORIZED).json({
                status: HttpStatusEnum.UNAUTHORIZED,
                message: HttpMessageEnum.UNAUTHORIZED,
                data: errorMessageConstant.authorization,
            });
        } catch (e) {
            next(e);
        }
    }

    public async refreshVerify(req: IRequest, res: IResponse<string>, next: NextFunction): Promise<IResponse<string> | undefined> {
        try {
            const token = req.authorization as string;
            const { nickName, role, id } = jwtService.verify(token, TokensEnum.REFRESH) as IPayload;

            if (!nickName || !role || !id) {
                next(
                    new ErrorHandler(
                        errorMessageConstant.unauthorized,
                        HttpStatusEnum.UNAUTHORIZED,
                        HttpMessageEnum.UNAUTHORIZED,
                    ),
                );
                return;
            }

            return res.status(HttpStatusEnum.OK).json({
                status: HttpStatusEnum.OK,
                data: HttpMessageEnum.OK,
                message: HttpMessageEnum.OK,
            });
        } catch (e) {
            next(e);
        }
    }
}
export const authController = new AuthController();
