"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookTextAudioCoverFields = exports.authorPhoto = exports.userAvatar = void 0;
const multer_1 = __importDefault(require("multer"));
const file_size_constant_1 = require("../constants/file-size.constant");
const constants_1 = require("../constants");
const enums_1 = require("../enums");
const error_1 = require("../error");
class FileUploadMiddleware {
    static userAvatar() {
        return (0, multer_1.default)({
            limits: { fileSize: file_size_constant_1.fileSizeConstant.SIZE_AVATAR },
            fileFilter(_, file, callback) {
                if (!constants_1.fileMimetypeConstant[enums_1.FileEnum.PHOTOS].includes(file.mimetype)) {
                    return callback(new error_1.ErrorHandler(constants_1.errorMessageConstant.fileMimetype, enums_1.HttpStatusEnum.BAD_REQUEST, enums_1.HttpMessageEnum.BAD_REQUEST));
                }
                if (file_size_constant_1.fileSizeConstant.SIZE_AVATAR < file.size) {
                    return callback(new error_1.ErrorHandler(constants_1.errorMessageConstant.fileMimetype, enums_1.HttpStatusEnum.BAD_REQUEST, enums_1.HttpMessageEnum.BAD_REQUEST));
                }
                callback(null, true);
            },
        });
    }
    static authorPhoto() {
        return (0, multer_1.default)({
            limits: { fileSize: file_size_constant_1.fileSizeConstant.SIZE_AUTHOR_PHOTO },
            fileFilter(_, file, callback) {
                if (!constants_1.fileMimetypeConstant[enums_1.FileEnum.PHOTOS].includes(file.mimetype)) {
                    return callback(new error_1.ErrorHandler(constants_1.errorMessageConstant.fileMimetype, enums_1.HttpStatusEnum.BAD_REQUEST, enums_1.HttpMessageEnum.BAD_REQUEST));
                }
                if (file_size_constant_1.fileSizeConstant.SIZE_AUTHOR_PHOTO < file.size) {
                    return callback(new error_1.ErrorHandler(constants_1.errorMessageConstant.fileMimetype, enums_1.HttpStatusEnum.BAD_REQUEST, enums_1.HttpMessageEnum.BAD_REQUEST));
                }
                callback(null, true);
            },
        });
    }
    static bookTextAudioCoverFields() {
        return (0, multer_1.default)({
            fileFilter(_, file, callback) {
                if (file.fieldname === enums_1.FilesUploadFieldsEnum.FILE_TEXT) {
                    if (!constants_1.fileMimetypeConstant[enums_1.FileEnum.TEXTS].includes(file.mimetype)) {
                        return callback(new error_1.ErrorHandler(constants_1.errorMessageConstant.fileMimetype, enums_1.HttpStatusEnum.BAD_REQUEST, enums_1.HttpMessageEnum.BAD_REQUEST));
                    }
                    if (file_size_constant_1.fileSizeConstant.SIZE_BOOK_TEXT_FILE < file.size) {
                        return callback(new error_1.ErrorHandler(constants_1.errorMessageConstant.fileMimetype, enums_1.HttpStatusEnum.BAD_REQUEST, enums_1.HttpMessageEnum.BAD_REQUEST));
                    }
                }
                if (file.fieldname === enums_1.FilesUploadFieldsEnum.COVER) {
                    if (!constants_1.fileMimetypeConstant[enums_1.FileEnum.PHOTOS].includes(file.mimetype)) {
                        return callback(new error_1.ErrorHandler(constants_1.errorMessageConstant.fileMimetype, enums_1.HttpStatusEnum.BAD_REQUEST, enums_1.HttpMessageEnum.BAD_REQUEST));
                    }
                    if (file_size_constant_1.fileSizeConstant.SIZE_COVER < file.size) {
                        return callback(new error_1.ErrorHandler(constants_1.errorMessageConstant.fileMimetype, enums_1.HttpStatusEnum.BAD_REQUEST, enums_1.HttpMessageEnum.BAD_REQUEST));
                    }
                }
                if (file.fieldname === enums_1.FilesUploadFieldsEnum.FILE_AUDIO) {
                    if (!constants_1.fileMimetypeConstant[enums_1.FileEnum.AUDIOS].includes(file.mimetype)) {
                        return callback(new error_1.ErrorHandler(constants_1.errorMessageConstant.fileMimetype, enums_1.HttpStatusEnum.BAD_REQUEST, enums_1.HttpMessageEnum.BAD_REQUEST));
                    }
                    if (file_size_constant_1.fileSizeConstant.SIZE_AUDIO_BOOK < file.size) {
                        return callback(new error_1.ErrorHandler(constants_1.errorMessageConstant.fileMimetype, enums_1.HttpStatusEnum.BAD_REQUEST, enums_1.HttpMessageEnum.BAD_REQUEST));
                    }
                }
                callback(null, true);
            },
        });
    }
}
exports.userAvatar = FileUploadMiddleware.userAvatar, exports.authorPhoto = FileUploadMiddleware.authorPhoto, exports.bookTextAudioCoverFields = FileUploadMiddleware.bookTextAudioCoverFields;
//# sourceMappingURL=file-upload.middleware.js.map