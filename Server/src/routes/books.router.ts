import { Router } from 'express';

import { booksController } from '../controllers';
import {
    bookTextAudioCoverFields, bookMiddleware, paginationMiddleware, authMiddleware,
} from '../middlewares';
import { filesUploadFields } from '../constants';

export const booksRouter = Router();

const filesUpload = bookTextAudioCoverFields();

booksRouter.get('/', booksController.getAll);

booksRouter.get(
    '/:id',
    bookMiddleware.checkParamsId,
    booksController.getOneById,
);

booksRouter.get(
    '/search/:search',
    bookMiddleware.checkSearchData,
    booksController.getAllBySearchData,
);

booksRouter.post(
    '/',
    filesUpload.fields(filesUploadFields),
    authMiddleware.isAuthorization,
    authMiddleware.checkAuthorizationOnBearer,
    authMiddleware.validateAuthorizationToken,
    authMiddleware.verifyAccessToken,
    bookMiddleware.validateBody,
    authMiddleware.wasItIssuedToken,
    authMiddleware.checkUserAuthByPayload,
    authMiddleware.isAdmin,
    bookMiddleware.isBooksExistsByDescription,
    booksController.createOne,
);

booksRouter.patch(
    '/:id',
    filesUpload.fields(filesUploadFields),
    authMiddleware.isAuthorization,
    authMiddleware.checkAuthorizationOnBearer,
    authMiddleware.validateAuthorizationToken,
    authMiddleware.verifyAccessToken,
    bookMiddleware.validateUpdateBody,
    authMiddleware.wasItIssuedToken,
    authMiddleware.checkUserAuthByPayload,
    authMiddleware.isAdmin,
    bookMiddleware.checkBookExistsForUpdateById,
    booksController.updateOne,
);

booksRouter.get(
    '/ratings/:rate',
    paginationMiddleware.checkQuery,
    booksController.getAllRatings,
);

booksRouter.get(
    '/ratings/top/:rate',
    booksController.getTopRatings,
);

booksRouter.get(
    '/last/all',
    paginationMiddleware.checkQuery,
    booksController.lastAddedBooks,
);

booksRouter.get(
    '/novelty/:startDay',
    paginationMiddleware.checkQuery,
    booksController.getAllNovelty,
);

booksRouter.get(
    '/genres/:genre',
    paginationMiddleware.checkQuery,
    booksController.getAllByGenre,
);

booksRouter.delete(
    '/:id',
    bookMiddleware.checkParamsId,
    authMiddleware.isAuthorization,
    authMiddleware.checkAuthorizationOnBearer,
    authMiddleware.validateAuthorizationToken,
    bookMiddleware.checkQueryClientKey,
    authMiddleware.verifyAccessToken,
    authMiddleware.wasItIssuedToken,
    authMiddleware.checkUserAuthByPayload,
    authMiddleware.isAdmin,
    bookMiddleware.checkBookExistsById,
    booksController.deleteOne,
);
