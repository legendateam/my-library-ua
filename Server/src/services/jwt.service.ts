import jwt, { JwtPayload } from 'jsonwebtoken';

import { mainConfig } from '../configs';
import { TokensEnum } from '../enums';
import { IPayload } from '../interfaces';

class JwtService {
    public sign(payload: IPayload, type = TokensEnum.ACCESS): string {
        let secretWord = mainConfig.SECRET_ACCESS_KEY;
        let expiresIn = mainConfig.EXPIRES_IN_ACCESS;

        if (type === TokensEnum.REFRESH) {
            secretWord = mainConfig.SECRET_REFRESH_KEY;
            expiresIn = mainConfig.EXPIRES_IN_REFRESH;
        }

        if (type === TokensEnum.FORGOT) {
            secretWord = mainConfig.SECRET_FORGOT_PASSWORD_KEY;
            expiresIn = mainConfig.EXPIRES_IN_FORGOT_PASSWORD;
        }

        return jwt.sign(payload, secretWord, { expiresIn });
    }

    public verify(token: string, type = TokensEnum.ACCESS): string | JwtPayload {
        let secretWord = mainConfig.SECRET_ACCESS_KEY;

        if (type === TokensEnum.REFRESH) {
            secretWord = mainConfig.SECRET_REFRESH_KEY;
        }

        if (type === TokensEnum.FORGOT) {
            secretWord = mainConfig.SECRET_FORGOT_PASSWORD_KEY;
        }

        return jwt.verify(token, secretWord);
    }
}

export const jwtService = new JwtService();
