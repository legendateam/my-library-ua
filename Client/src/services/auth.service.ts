import {
    ILogin,
    IResponseOK,
    ITokenPair,
    IUserResponse,
    IUserCreate,
    IAuth,
    IRefreshTokenPair,
    IEmail,
} from '../interfaces';
import { axiosInstance } from './axiosInstance.service';
import { urls } from '../constants';
import { IChangePassword } from '../interfaces/changePassword.interface';

class AuthService {
    public async registration(user: IUserCreate | FormData): Promise<IResponseOK<IUserResponse>> {
        return axiosInstance.post<Promise<IResponseOK<IUserResponse>>>(`${urls.auth}${urls.registration}`, user).then(({ data }) => data);
    }

    public async login(login: ILogin): Promise<IResponseOK<ITokenPair>> {
        return axiosInstance.post<Promise<IResponseOK<ITokenPair>>>(`${urls.auth}${urls.login}`, login, {
            headers: {
                Accept: 'application/json',
            },
            withCredentials: true,
        }).then(({ data }) => data);
    }

    public async loginSuccess(): Promise<IResponseOK<ITokenPair>> {
        return axiosInstance.get(
            `${urls.auth}${urls.login}${urls.success}`,
            {
                headers: {
                    Accept: 'application/json',
                },
                withCredentials: true,
            },
        ).then(({ data }) => data);
    }

    public async logOut({ clientKey, accessToken }: IAuth): Promise<IResponseOK<number>> {
        return axiosInstance.post(
            `${urls.auth}${urls.logout}`,
            { clientKey },
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            },
        ).then(({ data }) => data);
    }

    public async refreshTokenPair({ refreshToken, clientKey }: IRefreshTokenPair): Promise<IResponseOK<ITokenPair>> {
        return axiosInstance.post(
            `${urls.auth}${urls.refresh}`,
            { clientKey },
            {
                headers: {
                    Authorization: `Bearer ${refreshToken}`,
                },
            },
        ).then(({ data }) => data);
    }

    public async checkRefreshOnJwtExpired({ refreshToken, clientKey }: IRefreshTokenPair): Promise<IResponseOK<string>> {
        return axiosInstance.get(
            `${urls.auth}${urls.refresh}${urls.verify}/${clientKey}`,
            {
                headers: {
                    Authorization: `Bearer ${refreshToken}`,
                },
            },
        ).then(({ data }) => data);
    }

    public async forgotPasswordSendEmail({ email }: IEmail): Promise<IResponseOK<string>> {
        return axiosInstance.post(
            `${urls.auth}${urls.forgotPassword}`,
            { email },
        ).then(({ data }) => data);
    }

    public async changePassword({ password, clientKey, forgotToken }: IChangePassword): Promise<IResponseOK<string>> {
        return axiosInstance.patch(
            `${urls.auth}${urls.forgotPassword}`,
            { clientKey, password },
            {
                headers: {
                    Authorization: `Bearer ${forgotToken}`,
                },
            },
        ).then(({ data }) => data);
    }
}

export const authService = new AuthService();
