"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paginationService = void 0;
class PaginationService {
    createSkip(page, perPage) {
        return perPage * (page - 1);
    }
}
exports.paginationService = new PaginationService();
//# sourceMappingURL=pagination.service.js.map