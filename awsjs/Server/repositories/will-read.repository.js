"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.willReadRepository = void 0;
const configs_1 = require("../configs");
const entities_1 = require("../entities");
class WillReadRepository {
    constructor() {
        this.willReadRepository = configs_1.AppDataSource.getRepository(entities_1.WillRead);
    }
    async createOne(willRead) {
        return this.willReadRepository.save(willRead);
    }
    async deleteOne(userId) {
        return this.willReadRepository.delete({ userId });
    }
    async getAll() {
        return this.willReadRepository.find();
    }
    async getOneByUserId(userId) {
        return this.willReadRepository.createQueryBuilder('WillRead')
            .leftJoinAndSelect('WillRead.books', 'books')
            .leftJoinAndSelect('books.genres', 'genres')
            .leftJoinAndSelect('books.comments', 'comments')
            .leftJoinAndSelect('comments.user', 'user')
            .leftJoinAndSelect('books.author', 'author')
            .leftJoinAndSelect('books.ratings', 'ratings')
            .where('WillRead.userId = :userId', { userId })
            .getOne();
    }
}
exports.willReadRepository = new WillReadRepository();
//# sourceMappingURL=will-read.repository.js.map