import { Router } from 'express';

import { viewsMiddleware } from '../middlewares';
import { viewsController } from '../controllers';

export const viewsRouter = Router();

viewsRouter.get(
    '/',
    viewsController.getAll,
);

viewsRouter.get(
    '/:date',
    viewsController.getOneDate,
);

viewsRouter.post(
    '/',
    viewsMiddleware.validateBodyUserId,
    viewsMiddleware.checkOnFirst,
    viewsMiddleware.checkUserExists,
    viewsMiddleware.ipAddressIsUnique,
    viewsController.createOne,
);

viewsRouter.patch(
    '/',
    viewsMiddleware.validateBodyUserId,
    viewsMiddleware.isExists,
    viewsMiddleware.checkUserExists,
    viewsMiddleware.ipAddressIsUnique,
    viewsController.updateOne,
);
