"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.jwtService = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const configs_1 = require("../configs");
const enums_1 = require("../enums");
class JwtService {
    sign(payload, type = enums_1.TokensEnum.ACCESS) {
        let secretWord = configs_1.mainConfig.SECRET_ACCESS_KEY;
        let expiresIn = configs_1.mainConfig.EXPIRES_IN_ACCESS;
        if (type === enums_1.TokensEnum.REFRESH) {
            secretWord = configs_1.mainConfig.SECRET_REFRESH_KEY;
            expiresIn = configs_1.mainConfig.EXPIRES_IN_REFRESH;
        }
        if (type === enums_1.TokensEnum.FORGOT) {
            secretWord = configs_1.mainConfig.SECRET_FORGOT_PASSWORD_KEY;
            expiresIn = configs_1.mainConfig.EXPIRES_IN_FORGOT_PASSWORD;
        }
        return jsonwebtoken_1.default.sign(payload, secretWord, { expiresIn });
    }
    verify(token, type = enums_1.TokensEnum.ACCESS) {
        let secretWord = configs_1.mainConfig.SECRET_ACCESS_KEY;
        if (type === enums_1.TokensEnum.REFRESH) {
            secretWord = configs_1.mainConfig.SECRET_REFRESH_KEY;
        }
        if (type === enums_1.TokensEnum.FORGOT) {
            secretWord = configs_1.mainConfig.SECRET_FORGOT_PASSWORD_KEY;
        }
        return jsonwebtoken_1.default.verify(token, secretWord);
    }
}
exports.jwtService = new JwtService();
//# sourceMappingURL=jwt.service.js.map