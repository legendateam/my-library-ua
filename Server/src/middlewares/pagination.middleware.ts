import { NextFunction } from 'express';

import {
    IPaginationQuery, IRequest, IResponse,
} from '../interfaces';

class PaginationMiddleware {
    public checkQuery(req: IRequest, _: IResponse<void>, next: NextFunction): void {
        const queryParams = req.query as IPaginationQuery;

        if (queryParams?.page && Number(queryParams.page) > 0) {
            req.pagination = { ...req.pagination, page: Number(queryParams.page) };
        }

        if (queryParams?.perPage && Number(queryParams.perPage) > 0) {
            req.pagination = { ...req.pagination, perPage: Number(queryParams.perPage) };
        }
        next();
    }
}

export const paginationMiddleware = new PaginationMiddleware();
