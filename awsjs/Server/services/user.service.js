"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userService = exports.UserService = void 0;
const repositories_1 = require("../repositories");
const bcrypt_service_1 = require("./bcrypt.service");
class UserService {
    async getOneByEmailOrNickName(data) {
        return repositories_1.userRepository.getOneByEmailOrNickName(data);
    }
    async getOneByEmail(email) {
        return repositories_1.userRepository.getOneByEmail(email);
    }
    async getOneById(id) {
        return repositories_1.userRepository.getOneById(id);
    }
    async changePassword(id, password) {
        const hashPassword = await bcrypt_service_1.bcryptService.hash(password);
        return repositories_1.userRepository.changePassword(id, hashPassword);
    }
    async updateAvatar(id, pathFile) {
        return repositories_1.userRepository.updateAvatar(id, pathFile);
    }
}
exports.UserService = UserService;
exports.userService = new UserService();
//# sourceMappingURL=user.service.js.map