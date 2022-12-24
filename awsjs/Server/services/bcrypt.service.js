"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bcryptService = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const configs_1 = require("../configs");
class BcryptService {
    async hash(data) {
        return bcrypt_1.default.hash(data, Number(configs_1.mainConfig.PASSWORD_SALT_ROUNDS));
    }
    async compare(password, passwordFromDB) {
        return bcrypt_1.default.compare(password, passwordFromDB);
    }
}
exports.bcryptService = new BcryptService();
//# sourceMappingURL=bcrypt.service.js.map