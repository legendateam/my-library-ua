import {
    IForgotToken, IPayload, IUser, ITokensPair,
} from '../interfaces';
import { Users } from '../entities';
import { userRepository } from '../repositories';
import { clientService } from './client.service';
import { jwtService } from './jwt.service';
import { ClientKeyEnum, TokensEnum } from '../enums';
import { bcryptService } from './bcrypt.service';
import { mainConfig } from '../configs';

class AuthService {
    public async registration(user: IUser): Promise<Users> {
        const hashPassword = await bcryptService.hash(user.password);
        return userRepository.createOne({ ...user, password: hashPassword });
    }

    public async login(payload: IPayload): Promise<ITokensPair | undefined> {
        const generatedTokens = await this._generateNewTokenPair(payload);

        if (!generatedTokens) {
            return;
        }

        if (generatedTokens) {
            const { refresh, access, clientKey } = generatedTokens as ITokensPair;

            return {
                access,
                refresh,
                clientKey,
            };
        }
    }

    public async logout(clientKey: string): Promise<number> {
        return clientService.delete(clientKey);
    }

    public async refresh(payload: IPayload, clientKey: string): Promise<ITokensPair | undefined> {
        const numberDeleted = await clientService.delete(clientKey);
        if (!numberDeleted) {
            return;
        }
        return this._generateNewTokenPair(payload);
    }

    public async forgotPassword(payload: IPayload): Promise<IForgotToken| undefined> {
        const { nickName } = payload as Users;
        const forgot = jwtService.sign(payload, TokensEnum.FORGOT);
        const clientKey = clientService.generateKey(nickName, ClientKeyEnum.FORGOT);

        if (clientKey) {
            const savedToken = await clientService
                .setExpire(clientKey, Number(mainConfig.EXPIRES_CLIENT_FORGOT), JSON.stringify({ forgot }));
            if (!savedToken) {
                return;
            }

            return {
                clientKey,
                forgot,
            };
        }
    }

    private async _generateNewTokenPair({
        nickName, role, id, avatar, email,
    }: IPayload): Promise<ITokensPair | undefined> {
        const access = jwtService.sign({
            id, nickName, role, avatar, email,
        });

        const refresh = jwtService.sign({
            id, nickName, role, avatar, email,
        }, TokensEnum.REFRESH);

        const clientKey = clientService.generateKey(nickName!, ClientKeyEnum.AUTH_TOKENS);

        const savedToken = await clientService
            .setExpire(clientKey, Number(mainConfig.EXPIRES_CLIENT_TOKENS_PAIR), JSON.stringify({ access, refresh }));

        if (!savedToken) {
            return;
        }
        return {
            access, refresh, clientKey,
        };
    }
}
export const authService = new AuthService();
