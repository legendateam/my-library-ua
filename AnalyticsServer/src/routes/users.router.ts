import { Router } from 'express';

import { usersController } from '../controllers';

export const usersRouter = Router();

usersRouter.get(
    '/',
    usersController.getAllCount,
);

usersRouter.get(
    '/:date',
    usersController.getNewUsersByDate,
);
