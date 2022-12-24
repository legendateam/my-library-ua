import multer from 'multer';

import { IRequest } from '../interfaces';
import { fileSizeConstant } from '../constants/file-size.constant';
import { errorMessageConstant, fileMimetypeConstant } from '../constants';
import {
    FileEnum, FilesUploadFieldsEnum, HttpMessageEnum, HttpStatusEnum,
} from '../enums';
import { ErrorHandler } from '../error';

class FileUploadMiddleware {
    public static userAvatar(): multer.Multer {
        return multer({
            limits: { fileSize: fileSizeConstant.SIZE_AVATAR },
            fileFilter(_: IRequest, file: Express.Multer.File, callback: multer.FileFilterCallback) {
                if (!fileMimetypeConstant[FileEnum.PHOTOS].includes(file.mimetype)) {
                    return callback(
                        new ErrorHandler(errorMessageConstant.fileMimetype, HttpStatusEnum.BAD_REQUEST, HttpMessageEnum.BAD_REQUEST),
                    );
                }

                if (fileSizeConstant.SIZE_AVATAR < file.size) {
                    return callback(
                        new ErrorHandler(errorMessageConstant.fileMimetype, HttpStatusEnum.BAD_REQUEST, HttpMessageEnum.BAD_REQUEST),
                    );
                }
                callback(null, true);
            },
        });
    }

    public static authorPhoto(): multer.Multer {
        return multer({
            limits: { fileSize: fileSizeConstant.SIZE_AUTHOR_PHOTO },
            fileFilter(_: IRequest, file: Express.Multer.File, callback: multer.FileFilterCallback) {
                if (!fileMimetypeConstant[FileEnum.PHOTOS].includes(file.mimetype)) {
                    return callback(
                        new ErrorHandler(errorMessageConstant.fileMimetype, HttpStatusEnum.BAD_REQUEST, HttpMessageEnum.BAD_REQUEST),
                    );
                }

                if (fileSizeConstant.SIZE_AUTHOR_PHOTO < file.size) {
                    return callback(
                        new ErrorHandler(errorMessageConstant.fileMimetype, HttpStatusEnum.BAD_REQUEST, HttpMessageEnum.BAD_REQUEST),
                    );
                }
                callback(null, true);
            },
        });
    }

    public static bookTextAudioCoverFields(): multer.Multer {
        return multer({
            fileFilter(_: IRequest, file: Express.Multer.File, callback: multer.FileFilterCallback) {
                if (file.fieldname === FilesUploadFieldsEnum.FILE_TEXT) {
                    if (!fileMimetypeConstant[FileEnum.TEXTS].includes(file.mimetype)) {
                        return callback(
                            new ErrorHandler(errorMessageConstant.fileMimetype, HttpStatusEnum.BAD_REQUEST, HttpMessageEnum.BAD_REQUEST),
                        );
                    }

                    if (fileSizeConstant.SIZE_BOOK_TEXT_FILE < file.size) {
                        return callback(
                            new ErrorHandler(errorMessageConstant.fileMimetype, HttpStatusEnum.BAD_REQUEST, HttpMessageEnum.BAD_REQUEST),
                        );
                    }
                }

                if (file.fieldname === FilesUploadFieldsEnum.COVER) {
                    if (!fileMimetypeConstant[FileEnum.PHOTOS].includes(file.mimetype)) {
                        return callback(
                            new ErrorHandler(errorMessageConstant.fileMimetype, HttpStatusEnum.BAD_REQUEST, HttpMessageEnum.BAD_REQUEST),
                        );
                    }

                    if (fileSizeConstant.SIZE_COVER < file.size) {
                        return callback(
                            new ErrorHandler(errorMessageConstant.fileMimetype, HttpStatusEnum.BAD_REQUEST, HttpMessageEnum.BAD_REQUEST),
                        );
                    }
                }

                if (file.fieldname === FilesUploadFieldsEnum.FILE_AUDIO) {
                    if (!fileMimetypeConstant[FileEnum.AUDIOS].includes(file.mimetype)) {
                        return callback(
                            new ErrorHandler(errorMessageConstant.fileMimetype, HttpStatusEnum.BAD_REQUEST, HttpMessageEnum.BAD_REQUEST),
                        );
                    }

                    if (fileSizeConstant.SIZE_AUDIO_BOOK < file.size) {
                        return callback(
                            new ErrorHandler(errorMessageConstant.fileMimetype, HttpStatusEnum.BAD_REQUEST, HttpMessageEnum.BAD_REQUEST),
                        );
                    }
                }
                callback(null, true);
            },
        });
    }
}
export const {
    userAvatar, authorPhoto, bookTextAudioCoverFields,
} = FileUploadMiddleware;
