"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commentRepository = void 0;
const configs_1 = require("../configs");
const entities_1 = require("../entities");
class CommentRepository {
    constructor() {
        this.commentRepository = configs_1.AppDataSource.getRepository(entities_1.Comments);
    }
    async getAllWithPagination(skip, take) {
        return this.commentRepository.find({ skip, take, relations: { user: true } });
    }
    async getAll() {
        return this.commentRepository.find();
    }
    async createOne(comment) {
        return this.commentRepository.save(comment);
    }
    async getAllByUserIdAndBookId(bookId, userId) {
        return this.commentRepository.find({ where: { bookId, userId } });
    }
    async getOneById(commentId) {
        return this.commentRepository.findOneBy({ id: commentId });
    }
}
exports.commentRepository = new CommentRepository();
//# sourceMappingURL=comment.repository.js.map