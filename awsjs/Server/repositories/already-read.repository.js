"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.alreadyReadRepository = void 0;
const configs_1 = require("../configs");
const entities_1 = require("../entities");
class AlreadyReadRepository {
    constructor() {
        this.alreadyReadRepository = configs_1.AppDataSource.getRepository(entities_1.AlreadyRead);
    }
    async createOne(AlreadyRead) {
        return this.alreadyReadRepository.save(AlreadyRead);
    }
    async deleteOne(userId) {
        return this.alreadyReadRepository.delete({ userId });
    }
    async getAll() {
        return this.alreadyReadRepository.find();
    }
    async getOneByUserId(userId) {
        return this.alreadyReadRepository.createQueryBuilder('alreadyRead')
            .leftJoinAndSelect('alreadyRead.books', 'books')
            .leftJoinAndSelect('books.genres', 'genres')
            .leftJoinAndSelect('books.comments', 'comments')
            .leftJoinAndSelect('comments.user', 'user')
            .leftJoinAndSelect('books.author', 'author')
            .leftJoinAndSelect('books.ratings', 'ratings')
            .where('alreadyRead.userId = :userId', { userId })
            .getOne();
    }
}
exports.alreadyReadRepository = new AlreadyReadRepository();
//# sourceMappingURL=already-read.repository.js.map