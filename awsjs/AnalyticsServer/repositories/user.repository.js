"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRepository = void 0;
const configs_1 = require("../configs");
const entities_1 = require("../entities");
class UserRepository {
    constructor() {
        this.userRepository = configs_1.AppDataSource.getRepository(entities_1.Users);
    }
    async getOneById(id) {
        return this.userRepository.findOneBy({ id });
    }
    async getOneByRole(role) {
        return this.userRepository.findOneBy({ role });
    }
    async getCountNewUsers(date) {
        return this.userRepository.createQueryBuilder('user')
            .where('user.createdAt >= :date', { date })
            .getCount();
    }
    async getAllCount() {
        return this.userRepository.createQueryBuilder('user')
            .getCount();
    }
}
exports.userRepository = new UserRepository();
//# sourceMappingURL=user.repository.js.map