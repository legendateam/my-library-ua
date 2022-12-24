"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commentService = void 0;
const repositories_1 = require("../repositories");
const pagination_service_1 = require("./pagination.service");
class CommentService {
    async getAllPagination(page = 1, perPage = 10) {
        const skip = pagination_service_1.paginationService.createSkip(page, perPage);
        return repositories_1.commentRepository.getAllWithPagination(skip, perPage);
    }
}
exports.commentService = new CommentService();
//# sourceMappingURL=comment.service.js.map