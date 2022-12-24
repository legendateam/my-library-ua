"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paginationMiddleware = void 0;
class PaginationMiddleware {
    checkQuery(req, _, next) {
        const queryParams = req.query;
        if (queryParams?.page && Number(queryParams.page) > 0) {
            req.pagination = { ...req.pagination, page: Number(queryParams.page) };
        }
        if (queryParams?.perPage && Number(queryParams.perPage) > 0) {
            req.pagination = { ...req.pagination, perPage: Number(queryParams.perPage) };
        }
        next();
    }
}
exports.paginationMiddleware = new PaginationMiddleware();
//# sourceMappingURL=pagination.middleware.js.map