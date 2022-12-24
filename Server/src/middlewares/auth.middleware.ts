import { NextFunction, Response } from 'express';

import {
    IClientKey, ILogin, IPayload, IRequest, IResponse, ITokensPair, IUser,
} from '../interfaces';
import {
    clientKeySchema, emailSchema, forgotPasswordSchema, loginSchema, tokenSchema, userSchema,
} from '../utils';
import { ErrorHandler } from '../error';
import {
    bcryptService, clientService, jwtService, userService,
} from '../services';
import { errorMessageConstant, requestConstant } from '../constants';
import { Users } from '../entities';
import {
    ClientKeyEnum, HttpMessageEnum, HttpStatusEnum, RoleEnum, TokensEnum,
} from '../enums';

class AuthMiddleware {
    public validateBodyLogin(req: IRequest, _: Response, next: NextFunction): void {
        try {
            const { body } = req;
            const { value, error } = loginSchema.validate(body);

            if (error) {
                next(new ErrorHandler(error.message, HttpStatusEnum.BAD_REQUEST, HttpMessageEnum.BAD_REQUEST));
                return;
            }

            req.loginData = value;
            req.email = value.email;
            next();
        } catch (e) {
            next(e);
        }
    }

    public validateBodyRegistration(req: IRequest, _: Response, next: NextFunction): void {
        try {
            const { body } = req;

            const { value, error } = userSchema.validate(body);

            if (error) {
                next(new ErrorHandler(error.message, HttpStatusEnum.BAD_REQUEST, HttpMessageEnum.BAD_REQUEST));
                return;
            }

            req.userData = value;
            next();
        } catch (e) {
            next(e);
        }
    }

    public async checkUserOnUnique(req: IRequest, _: Response, next: NextFunction): Promise<void> {
        try {
            const { email, nickName } = req.userData as IUser;
            const user = await userService.getOneByEmailOrNickName({ nickName, email });

            if (user) {
                next(new ErrorHandler(errorMessageConstant.userAlreadyExists, HttpStatusEnum.CONFLICT, HttpMessageEnum.CONFLICT));
                return;
            }

            next();
        } catch (e) {
            next(e);
        }
    }

    public async checkUserAuthByEmail(req: IRequest, _: Response, next: NextFunction): Promise<void> {
        try {
            const email = req.email as string;

            const user = await userService.getOneByEmail(email);

            if (!user) {
                next(new ErrorHandler(errorMessageConstant.userNotFound, HttpStatusEnum.NOT_FOUND, HttpMessageEnum.NOT_FOUND));
                return;
            }

            req.userData = user;
            next();
        } catch (e) {
            next(e);
        }
    }

    public async checkUserAuthByPayload(req: IRequest, _: Response, next: NextFunction): Promise<void> {
        try {
            const { nickName: nickNamePayload } = req.payload as IPayload;
            const nickName = nickNamePayload as string;
            const user = await userService.getOneByEmailOrNickName({ nickName });

            if (!user) {
                next(new ErrorHandler(errorMessageConstant.unauthorized, HttpStatusEnum.UNAUTHORIZED, HttpMessageEnum.UNAUTHORIZED));
                return;
            }

            req.userData = user;
            next();
        } catch (e) {
            next(e);
        }
    }

    public async checkPassword(req: IRequest, _: Response, next: NextFunction): Promise<void> {
        try {
            const { password } = req.loginData as ILogin;
            const { password: passwordFromDB } = req.userData as Users;

            const resultAfterChecked = await bcryptService.compare(password, passwordFromDB);

            if (!resultAfterChecked) {
                next(new ErrorHandler(errorMessageConstant.unauthorized, HttpStatusEnum.UNAUTHORIZED, HttpMessageEnum.UNAUTHORIZED));
                return;
            }

            next();
        } catch (e) {
            next(e);
        }
    }

    public async isAuthorization(req: IRequest, _: Response, next: NextFunction): Promise<void> {
        try {
            const authorization = req.get(requestConstant.AUTHORIZATION) as string;

            if (!authorization) {
                next(new ErrorHandler(
                    errorMessageConstant.authorization,
                    HttpStatusEnum.BAD_REQUEST,
                    HttpMessageEnum.BAD_REQUEST,
                ));
                return;
            }

            req.authorization = authorization;
            next();
        } catch (e) {
            next(e);
        }
    }

    public validateAuthorizationToken(req: IRequest, _: Response, next: NextFunction): void {
        try {
            const authorization = req.authorization as string;
            const token = authorization.split(' ')[1];

            if (!token) {
                next(new ErrorHandler(
                    errorMessageConstant.authorization,
                    HttpStatusEnum.BAD_REQUEST,
                    HttpMessageEnum.BAD_REQUEST,
                ));
                return;
            }

            const { error } = tokenSchema.validate({ token });

            if (error) {
                next(new ErrorHandler(error.message, HttpStatusEnum.BAD_REQUEST, HttpMessageEnum.BAD_REQUEST));
                next();
                return;
            }

            req.authorization = token;
            next();
        } catch (e) {
            next(e);
        }
    }

    public async checkAuthorizationOnBearer(req: IRequest, _: Response, next: NextFunction): Promise<void> {
        try {
            const authorization = req.authorization as string;
            const bearer = authorization.split(' ')[0];

            if (bearer !== requestConstant.BEARER) {
                next(new ErrorHandler(
                    errorMessageConstant.authorization,
                    HttpStatusEnum.BAD_REQUEST,
                    HttpMessageEnum.BAD_REQUEST,
                ));
                return;
            }

            next();
        } catch (e) {
            next(e);
        }
    }

    public validateEmail(req: IRequest, _: Response, next: NextFunction): void {
        try {
            const { body } = req;
            const { value, error } = emailSchema.validate(body);

            if (error) {
                next(new ErrorHandler(error.message, HttpStatusEnum.BAD_REQUEST, HttpMessageEnum.BAD_REQUEST));
                return;
            }

            req.email = value.email;
            next();
        } catch (e) {
            next(e);
        }
    }

    public async verifyAccessToken(req: IRequest, _: Response, next: NextFunction): Promise<void> {
        try {
            const token = req.authorization as string;
            const { nickName, role } = jwtService.verify(token) as IPayload;

            if (!nickName) {
                next(
                    new ErrorHandler(
                        errorMessageConstant.unauthorized,
                        HttpStatusEnum.UNAUTHORIZED,
                        HttpMessageEnum.UNAUTHORIZED,
                    ),
                );
                return;
            }

            req.payload = { nickName, role };
            next();
        } catch (e) {
            next(e);
        }
    }

    public async verifyRefreshToken(req: IRequest, _: Response, next: NextFunction): Promise<void> {
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

            req.payload = { nickName, role, id };
            next();
        } catch (e) {
            next(e);
        }
    }

    public async verifyForgotToken(req: IRequest, _: Response, next: NextFunction): Promise<void> {
        try {
            const token = req.authorization as string;
            const { nickName, role, id } = jwtService.verify(token, TokensEnum.FORGOT) as IPayload;

            if (!nickName) {
                next(
                    new ErrorHandler(
                        errorMessageConstant.unauthorized,
                        HttpStatusEnum.UNAUTHORIZED,
                        HttpMessageEnum.UNAUTHORIZED,
                    ),
                );
                return;
            }

            req.payload = { nickName, role, id };
            next();
        } catch (e) {
            next(e);
        }
    }

    public async wasItIssuedToken(req: IRequest, _: Response, next: NextFunction): Promise<void> {
        try {
            const key = req.clientKey as string;

            const keyFromDB = await clientService.getKey(key);

            if (!keyFromDB.length) {
                next(
                    new ErrorHandler(
                        errorMessageConstant.unauthorized,
                        HttpStatusEnum.UNAUTHORIZED,
                        HttpMessageEnum.UNAUTHORIZED,
                    ),
                );
                return;
            }

            next();
        } catch (e) {
            next(e);
        }
    }

    public isClientKey(req: IRequest, _: Response, next: NextFunction): void {
        try {
            const { body } = req;

            const { error } = clientKeySchema.validate(body);

            if (error) {
                next(
                    new ErrorHandler(
                        error.message,
                        HttpStatusEnum.BAD_REQUEST,
                        HttpMessageEnum.BAD_REQUEST,
                    ),
                );
                return;
            }

            const { clientKey } = body as IClientKey;

            req.clientKey = clientKey;
            next();
        } catch (e) {
            next(e);
        }
    }

    public isClientKeyParams(req: IRequest, _: IResponse<void>, next: NextFunction): void {
        const { params } = req;

        const { error, value } = clientKeySchema.validate(params);

        if (error) {
            next(new ErrorHandler(errorMessageConstant.badRequest, HttpStatusEnum.BAD_REQUEST, HttpMessageEnum.BAD_REQUEST));
            return;
        }

        req.clientKey = value.clientKey;
        next();
    }

    public isClientKeyOfParams(req: IRequest, _: Response, next: NextFunction): void {
        try {
            const { params } = req;

            const { error } = clientKeySchema.validate(params);

            if (error) {
                next(
                    new ErrorHandler(
                        error.message,
                        HttpStatusEnum.BAD_REQUEST,
                        HttpMessageEnum.BAD_REQUEST,
                    ),
                );
                return;
            }

            const { clientKey } = { clientKey: params.clientKey } as IClientKey;

            req.clientKey = clientKey;
            next();
        } catch (e) {
            next(e);
        }
    }

    public async alreadyExistsForgotToken(req: IRequest, _: IResponse<ITokensPair>, next: NextFunction): Promise<void> {
        try {
            const { nickName } = req.userData as Users;

            const anyKeysByNickName = await clientService.getAnyKeysByNickName(nickName, ClientKeyEnum.FORGOT);

            if (anyKeysByNickName.length) {
                const deleted = await clientService.delete(anyKeysByNickName[0]);

                if (!deleted) {
                    next(new ErrorHandler(
                        errorMessageConstant.unknown,
                        HttpStatusEnum.INTERNAL_SERVER_ERROR,
                        HttpMessageEnum.INTERNAL_SERVER_ERROR,
                    ));
                    return;
                }
            }
            next();
        } catch (e) {
            next(e);
        }
    }

    public async isAuthClientKey(req: IRequest, _: IResponse<ITokensPair>, next: NextFunction): Promise<void> {
        try {
            const clientKey = req.clientKey as string;

            const forgotToken = await clientService.getKey(clientKey);

            if (!forgotToken.length) {
                next(new ErrorHandler(
                    errorMessageConstant.unauthorized,
                    HttpStatusEnum.UNAUTHORIZED,
                    HttpMessageEnum.UNAUTHORIZED,
                ));
                return;
            }

            next();
        } catch (e) {
            next(e);
        }
    }

    public async checkOldTokens(req: IRequest, _: IResponse<ITokensPair>, next: NextFunction): Promise<void> {
        try {
            const { nickName } = req.userData as Users;
            const { clientKey } = req;

            const forgotToken = await clientService.getAnyKeysByNickName(nickName, ClientKeyEnum.FORGOT);

            if (forgotToken.length > 1) {
                forgotToken.map(async (token) => {
                    if (token !== clientKey) {
                        await clientService.delete(token);
                    }
                });
            }

            next();
        } catch (e) {
            next(e);
        }
    }

    public validateForgotBody(req: IRequest, _: IResponse<ITokensPair>, next: NextFunction): void {
        try {
            const { body } = req;
            const { value, error } = forgotPasswordSchema.validate(body);

            if (error) {
                next(new ErrorHandler(error.message, HttpStatusEnum.BAD_REQUEST, HttpMessageEnum.BAD_REQUEST));
                return;
            }

            req.clientKey = body?.clientKey;
            req.password = value.password;
            next();
        } catch (e) {
            next(e);
        }
    }

    public async checkOnDuplicatePassword(req: IRequest, _: IResponse<ITokensPair>, next: NextFunction): Promise<void> {
        try {
            const userData = req.userData as Users;
            const password = req.password as string;

            const comparedPassword = await bcryptService.compare(password, userData?.password);

            if (comparedPassword) {
                next(new ErrorHandler(errorMessageConstant.duplicateNewPassword, HttpStatusEnum.BAD_REQUEST, HttpMessageEnum.BAD_REQUEST));
                return;
            }

            next();
        } catch (e) {
            next(e);
        }
    }

    public isAdmin(req: IRequest, _: Response, next: NextFunction): void {
        try {
            const { role } = req.payload!;

            if (role !== RoleEnum.ADMIN) {
                next(new ErrorHandler(HttpMessageEnum.FORBIDDEN, HttpStatusEnum.FORBIDDEN, HttpMessageEnum.FORBIDDEN));
                return;
            }

            next();
        } catch (e) {
            next(e);
        }
    }
}
export const authMiddleware = new AuthMiddleware();
