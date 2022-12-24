"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRepository = void 0;
const configs_1 = require("../configs");
const entities_1 = require("../entities");
class UserRepository {
    constructor() {
        this.userRepository = configs_1.AppDataSource.getRepository(entities_1.Users);
    }
    async createOne(user) {
        return this.userRepository.save(user);
    }
    async getOneByEmailOrNickName({ email, nickName }) {
        return this.userRepository.findOne({
            where: [
                { email },
                { nickName },
            ],
        });
    }
    async getAll() {
        return this.userRepository.createQueryBuilder('users')
            .leftJoinAndSelect('users.comments', 'comments')
            .leftJoinAndSelect('users.alreadyRead', 'alreadyRead')
            .leftJoinAndSelect('users.willRead', 'willRead')
            .leftJoinAndSelect('users.favorites', 'favorites')
            .leftJoinAndSelect('users.ratings', 'ratings')
            .getMany();
    }
    async getOneByEmail(email) {
        return this.userRepository.findOneBy({ email });
    }
    async getOneById(id) {
        return this.userRepository.findOneBy({ id });
    }
    async changePassword(id, password) {
        return this.userRepository.update({ id }, { password });
    }
    async updateAvatar(id, pathFile) {
        return this.userRepository.update({ id }, { avatar: pathFile });
    }
    async updateData(id, data) {
        return this.userRepository.update({ id }, data);
    }
}
exports.userRepository = new UserRepository();
//# sourceMappingURL=user.repository.js.map