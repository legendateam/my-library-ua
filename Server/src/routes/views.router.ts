import { Router } from 'express';

import { viewMiddleware } from '../middlewares';
import { viewsController } from '../controllers';

export const viewsRouter = Router();

viewsRouter.get(
    '/:bookId',
    viewMiddleware.checkParamsOnBookId,
    viewsController.getByBookId,
);
viewsRouter.post(
    '/',
    viewMiddleware.validateBodyOnBookId,
    viewMiddleware.isUnique,
    viewMiddleware.checkBookExists,
    viewsController.createOne,
);
viewsRouter.patch(
    '/:bookId',
    viewMiddleware.checkParamsOnBookId,
    viewMiddleware.isExists,
    viewsController.updateView,
);
viewsRouter.delete(
    '/:bookId',
    viewMiddleware.checkParamsOnBookId,
    viewMiddleware.isExists,
    viewsController.removeViews,
);
