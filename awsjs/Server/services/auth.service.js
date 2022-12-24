"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authService = void 0;
const repositories_1 = require("../repositories");
const client_service_1 = require("./client.service");
const jwt_service_1 = require("./jwt.service");
const enums_1 = require("../enums");
const bcrypt_service_1 = require("./bcrypt.service");
const configs_1 = require("../configs");
class AuthService {
    async registration(user) {
        const hashPassword = await bcrypt_service_1.bcryptService.hash(user.password);
        return repositories_1.userRepository.createOne({ ...user, password: hashPassword });
    }
    async login(payload) {
        const generatedTokens = await this._generateNewTokenPair(payload);
        if (!generatedTokens) {
            return;
        }
        if (generatedTokens) {
            const { refresh, access, clientKey } = generatedTokens;
            return {
                access,
                refresh,
                clientKey,
            };
        }
    }
    async logout(clientKey) {
        return client_service_1.clientService.delete(clientKey);
    }
    async refresh(payload, clientKey) {
        const numberDeleted = await client_service_1.clientService.delete(clientKey);
        if (!numberDeleted) {
            return;
        }
        return this._generateNewTokenPair(payload);
    }
    async forgotPassword(payload) {
        const { nickName } = payload;
        const forgot = jwt_service_1.jwtService.sign(payload, enums_1.TokensEnum.FORGOT);
        const clientKey = client_service_1.clientService.generateKey(nickName, enums_1.ClientKeyEnum.FORGOT);
        if (clientKey) {
            const savedToken = await client_service_1.clientService
                .setExpire(clientKey, Number(configs_1.mainConfig.EXPIRES_CLIENT_FORGOT), JSON.stringify({ forgot }));
            if (!savedToken) {
                return;
            }
            return {
                clientKey,
                forgot,
            };
        }
    }
    async _generateNewTokenPair({ nickName, role, id, avatar, email, }) {
        const access = jwt_service_1.jwtService.sign({
            id, nickName, role, avatar, email,
        });
        const refresh = jwt_service_1.jwtService.sign({
            id, nickName, role, avatar, email,
        }, enums_1.TokensEnum.REFRESH);
        const clientKey = client_service_1.clientService.generateKey(nickName, enums_1.ClientKeyEnum.AUTH_TOKENS);
        const savedToken = await client_service_1.clientService
            .setExpire(clientKey, Number(configs_1.mainConfig.EXPIRES_CLIENT_TOKENS_PAIR), JSON.stringify({ access, refresh }));
        if (!savedToken) {
            return;
        }
        return {
            access, refresh, clientKey,
        };
    }
}
exports.authService = new AuthService();
//# sourceMappingURL=auth.service.js.map