import jwt, { JwtPayload } from 'jsonwebtoken';

import { TokensEnum } from '../enums';
import { mainConfig } from '../configs';

class JwtService {
    public verify(token: string, type = TokensEnum.ACCESS): string | JwtPayload {
        let secretWord = mainConfig.REACT_APP_SECRET_ACCESS_KEY;

        if (type === TokensEnum.REFRESH) {
            secretWord = mainConfig.REACT_APP_SECRET_REFRESH_KEY;
        }

        if (type === TokensEnum.FORGOT) {
            secretWord = mainConfig.REACT_APP_SECRET_FORGOT_PASSWORD_KEY;
        }

        return jwt.verify(token, secretWord);
    }
}

export const jwtService = new JwtService();
