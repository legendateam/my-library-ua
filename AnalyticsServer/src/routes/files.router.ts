import { Router } from 'express';

import { filesMiddleware } from '../middlewares/files.middleware';
import { filesController } from '../controllers';

export const filesRouter = Router();

filesRouter.get(
    '/',
    filesController.getAll,
);

filesRouter.get(
    '/:date',
    filesController.getOne,
);

filesRouter.post(
    '/',
    filesMiddleware.validateBody,
    filesMiddleware.isUnique,
    filesController.createOne,
);

filesRouter.patch(
    '/',
    filesMiddleware.validateBody,
    filesMiddleware.isExists,
    filesController.updateOne,
);
