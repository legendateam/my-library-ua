"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookUpdateSchema = exports.forgotPasswordSchema = exports.updateUserSchema = exports.searchSchema = exports.commentUpdateActionsSchema = exports.commentActionsSchema = exports.ratingsSchema = exports.actionsUserIdParamsSchema = exports.actionsSchema = exports.commentSchema = exports.viewFirstCreateSchema = exports.bookSchema = exports.genreSchema = exports.authorSchema = exports.userGoogleSchema = exports.passwordSchema = exports.tokenSchema = exports.authorPathSchema = exports.clientKeySchema = exports.emailSchema = exports.loginSchema = exports.userSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const joi_commons_fields_util_1 = require("./joi-commons-fields.util");
const constants_1 = require("../constants");
const regex_constant_1 = require("../constants/regex.constant");
class JoiValidatorUtil {
}
JoiValidatorUtil.userSchema = joi_1.default.object({
    nickName: joi_1.default.string().min(4).max(50).trim()
        .regex(regex_constant_1.regexConstant.NICKNAME)
        .required()
        .messages(constants_1.ErrorsMessagesValidationsConstant),
    password: joi_commons_fields_util_1.joiCommonsFieldsUtil.password
        .required()
        .messages(constants_1.ErrorsMessagesValidationsConstant),
    email: joi_commons_fields_util_1.joiCommonsFieldsUtil.email
        .required()
        .messages(constants_1.ErrorsMessagesValidationsConstant),
    role: joi_1.default.string().min(4).max(5).trim()
        .messages(constants_1.ErrorsMessagesValidationsConstant)
        .optional(),
    avatar: joi_1.default.binary()
        .optional()
        .messages(constants_1.ErrorsMessagesValidationsConstant),
});
JoiValidatorUtil.loginSchema = joi_1.default.object({
    email: joi_commons_fields_util_1.joiCommonsFieldsUtil.email
        .required()
        .messages(constants_1.ErrorsMessagesValidationsConstant),
    password: joi_commons_fields_util_1.joiCommonsFieldsUtil.password
        .required()
        .messages(constants_1.ErrorsMessagesValidationsConstant),
});
JoiValidatorUtil.emailSchema = joi_1.default.object({
    email: joi_commons_fields_util_1.joiCommonsFieldsUtil.email
        .required()
        .messages(constants_1.ErrorsMessagesValidationsConstant),
});
JoiValidatorUtil.clientKeySchema = joi_1.default.object({
    clientKey: joi_commons_fields_util_1.joiCommonsFieldsUtil.clientKey
        .required()
        .messages(constants_1.ErrorsMessagesValidationsConstant),
});
JoiValidatorUtil.tokenSchema = joi_1.default.object({
    token: joi_commons_fields_util_1.joiCommonsFieldsUtil.token
        .required()
        .messages(constants_1.ErrorsMessagesValidationsConstant),
});
JoiValidatorUtil.passwordSchema = joi_1.default.object({
    password: joi_commons_fields_util_1.joiCommonsFieldsUtil.password
        .required()
        .messages(constants_1.ErrorsMessagesValidationsConstant),
});
JoiValidatorUtil.userGoogleSchema = joi_1.default.object({
    nickName: joi_1.default.string().min(4).max(50).trim()
        .regex(regex_constant_1.regexConstant.NICKNAME)
        .required()
        .messages(constants_1.ErrorsMessagesValidationsConstant),
    email: joi_commons_fields_util_1.joiCommonsFieldsUtil.email
        .required()
        .messages(constants_1.ErrorsMessagesValidationsConstant),
    role: joi_1.default.string().min(4).max(5).trim()
        .messages(constants_1.ErrorsMessagesValidationsConstant)
        .optional(),
    avatar: joi_1.default.string()
        .optional()
        .messages(constants_1.ErrorsMessagesValidationsConstant),
});
JoiValidatorUtil.authorSchema = joi_1.default.object({
    firstName: joi_1.default.string()
        .max(255)
        .trim()
        .messages(constants_1.ErrorsMessagesValidationsConstant)
        .required(),
    lastName: joi_1.default.string()
        .max(255)
        .trim()
        .messages(constants_1.ErrorsMessagesValidationsConstant)
        .required(),
    biography: joi_1.default.string()
        .trim()
        .max(8000)
        .messages(constants_1.ErrorsMessagesValidationsConstant)
        .required(),
    country: joi_1.default.string()
        .trim()
        .max(255)
        .messages(constants_1.ErrorsMessagesValidationsConstant)
        .required(),
    dateBirthday: joi_1.default.date()
        .messages(constants_1.ErrorsMessagesValidationsConstant)
        .required(),
    dateDeath: joi_1.default.date()
        .allow(null)
        .messages(constants_1.ErrorsMessagesValidationsConstant)
        .optional(),
    photo: joi_1.default.binary()
        .allow(null)
        .messages(constants_1.ErrorsMessagesValidationsConstant)
        .optional(),
    pseudonym: joi_1.default.string()
        .allow(null)
        .messages(constants_1.ErrorsMessagesValidationsConstant)
        .optional(),
    genres: joi_1.default.alternatives()
        .try(joi_1.default.array().items(joi_1.default.number()), joi_1.default.number())
        .messages(constants_1.ErrorsMessagesValidationsConstant)
        .required(),
    clientKey: joi_commons_fields_util_1.joiCommonsFieldsUtil.clientKey
        .required()
        .messages(constants_1.ErrorsMessagesValidationsConstant),
});
JoiValidatorUtil.authorPathSchema = joi_1.default.object({
    firstName: joi_1.default.string()
        .max(255)
        .trim()
        .messages(constants_1.ErrorsMessagesValidationsConstant)
        .optional(),
    lastName: joi_1.default.string()
        .max(255)
        .trim()
        .messages(constants_1.ErrorsMessagesValidationsConstant)
        .optional(),
    dateDeath: joi_1.default.date()
        .messages(constants_1.ErrorsMessagesValidationsConstant)
        .optional(),
    country: joi_1.default.string()
        .trim()
        .max(255)
        .messages(constants_1.ErrorsMessagesValidationsConstant)
        .optional(),
    photo: joi_1.default.binary()
        .messages(constants_1.ErrorsMessagesValidationsConstant)
        .optional(),
    pseudonym: joi_1.default.string()
        .messages(constants_1.ErrorsMessagesValidationsConstant)
        .optional(),
    biography: joi_1.default.string()
        .trim()
        .max(8000)
        .messages(constants_1.ErrorsMessagesValidationsConstant)
        .optional(),
    clientKey: joi_commons_fields_util_1.joiCommonsFieldsUtil.clientKey
        .required()
        .messages(constants_1.ErrorsMessagesValidationsConstant),
});
JoiValidatorUtil.genreSchema = joi_1.default.object({
    name: joi_1.default.string()
        .min(2)
        .max(50)
        .required(),
    clientKey: joi_commons_fields_util_1.joiCommonsFieldsUtil.clientKey
        .required()
        .messages(constants_1.ErrorsMessagesValidationsConstant),
});
JoiValidatorUtil.bookSchema = joi_1.default.object({
    name: joi_1.default.string()
        .messages(constants_1.ErrorsMessagesValidationsConstant)
        .min(1)
        .max(255)
        .required(),
    yearOfRelease: joi_1.default.number()
        .messages(constants_1.ErrorsMessagesValidationsConstant)
        .max(1300)
        .max(new Date().getFullYear())
        .optional(),
    description: joi_1.default.string()
        .messages(constants_1.ErrorsMessagesValidationsConstant)
        .min(100)
        .max(8000)
        .required(),
    fileText: joi_1.default.binary()
        .messages(constants_1.ErrorsMessagesValidationsConstant)
        .optional(),
    cover: joi_1.default.binary()
        .messages(constants_1.ErrorsMessagesValidationsConstant)
        .optional(),
    fileAudio: joi_1.default.binary()
        .messages(constants_1.ErrorsMessagesValidationsConstant)
        .optional(),
    authorId: joi_1.default.number()
        .messages(constants_1.ErrorsMessagesValidationsConstant)
        .required(),
    genres: joi_1.default.alternatives()
        .try(joi_1.default.array().items(joi_1.default.number()), joi_1.default.number())
        .messages(constants_1.ErrorsMessagesValidationsConstant)
        .optional(),
    clientKey: joi_commons_fields_util_1.joiCommonsFieldsUtil.clientKey
        .required()
        .messages(constants_1.ErrorsMessagesValidationsConstant),
});
JoiValidatorUtil.bookUpdateSchema = joi_1.default.object({
    name: joi_1.default.string()
        .messages(constants_1.ErrorsMessagesValidationsConstant)
        .min(1)
        .max(255)
        .optional(),
    yearOfRelease: joi_1.default.number()
        .messages(constants_1.ErrorsMessagesValidationsConstant)
        .max(1300)
        .max(new Date().getFullYear())
        .optional(),
    description: joi_1.default.string()
        .messages(constants_1.ErrorsMessagesValidationsConstant)
        .min(100)
        .max(8000)
        .optional(),
    fileText: joi_1.default.binary()
        .messages(constants_1.ErrorsMessagesValidationsConstant)
        .optional(),
    cover: joi_1.default.binary()
        .messages(constants_1.ErrorsMessagesValidationsConstant)
        .optional(),
    fileAudio: joi_1.default.binary()
        .messages(constants_1.ErrorsMessagesValidationsConstant)
        .optional(),
    clientKey: joi_commons_fields_util_1.joiCommonsFieldsUtil.clientKey
        .required()
        .messages(constants_1.ErrorsMessagesValidationsConstant),
});
JoiValidatorUtil.viewFirstCreateSchema = joi_1.default.object({
    bookId: joi_1.default.number()
        .messages(constants_1.ErrorsMessagesValidationsConstant)
        .required(),
});
JoiValidatorUtil.commentSchema = joi_1.default.object({
    bookId: joi_1.default.number()
        .messages(constants_1.ErrorsMessagesValidationsConstant)
        .required(),
    text: joi_1.default.string()
        .trim()
        .messages(constants_1.ErrorsMessagesValidationsConstant)
        .regex(regex_constant_1.regexConstant.BAD_WORDS, { invert: true })
        .required(),
    clientKey: joi_commons_fields_util_1.joiCommonsFieldsUtil.clientKey
        .required()
        .messages(constants_1.ErrorsMessagesValidationsConstant),
});
JoiValidatorUtil.actionsSchema = joi_1.default.object({
    bookId: joi_1.default.number()
        .required(),
    clientKey: joi_commons_fields_util_1.joiCommonsFieldsUtil.clientKey
        .required()
        .messages(constants_1.ErrorsMessagesValidationsConstant),
});
JoiValidatorUtil.actionsUserIdParamsSchema = joi_1.default.object({
    nickName: joi_1.default.string().min(4).max(50).trim()
        .regex(regex_constant_1.regexConstant.NICKNAME)
        .required()
        .messages(constants_1.ErrorsMessagesValidationsConstant),
});
JoiValidatorUtil.ratingsSchema = joi_1.default.object({
    rate: joi_1.default.number()
        .required()
        .messages(constants_1.ErrorsMessagesValidationsConstant),
    bookId: joi_1.default.number()
        .required()
        .messages(constants_1.ErrorsMessagesValidationsConstant),
    clientKey: joi_commons_fields_util_1.joiCommonsFieldsUtil.clientKey
        .required()
        .messages(constants_1.ErrorsMessagesValidationsConstant),
});
JoiValidatorUtil.commentActionsSchema = joi_1.default.object({
    disLike: joi_1.default.number()
        .min(0)
        .max(1)
        .required()
        .messages(constants_1.ErrorsMessagesValidationsConstant),
    like: joi_1.default.number()
        .min(0)
        .max(1)
        .required()
        .disallow(joi_1.default.ref('disLike'))
        .messages(constants_1.ErrorsMessagesValidationsConstant),
    clientKey: joi_commons_fields_util_1.joiCommonsFieldsUtil.clientKey
        .required()
        .messages(constants_1.ErrorsMessagesValidationsConstant),
    commentId: joi_1.default.number()
        .required()
        .messages(constants_1.ErrorsMessagesValidationsConstant),
});
JoiValidatorUtil.commentUpdateActionsSchema = joi_1.default.object({
    disLike: joi_1.default.number()
        .min(0)
        .max(1)
        .optional()
        .messages(constants_1.ErrorsMessagesValidationsConstant),
    like: joi_1.default.number()
        .optional()
        .min(0)
        .max(1)
        .disallow(joi_1.default.ref('disLike'))
        .messages(constants_1.ErrorsMessagesValidationsConstant),
    clientKey: joi_commons_fields_util_1.joiCommonsFieldsUtil.clientKey
        .required()
        .messages(constants_1.ErrorsMessagesValidationsConstant),
});
JoiValidatorUtil.searchSchema = joi_1.default.object({
    search: joi_1.default.string()
        .messages(constants_1.ErrorsMessagesValidationsConstant)
        .min(1)
        .max(255)
        .trim()
        .required(),
});
JoiValidatorUtil.updateUserSchema = joi_1.default.object({
    nickName: joi_1.default.string().min(4).max(50).trim()
        .regex(regex_constant_1.regexConstant.NICKNAME)
        .optional()
        .messages(constants_1.ErrorsMessagesValidationsConstant),
    currentPassword: joi_commons_fields_util_1.joiCommonsFieldsUtil.password
        .optional()
        .required()
        .messages(constants_1.ErrorsMessagesValidationsConstant),
    password: joi_commons_fields_util_1.joiCommonsFieldsUtil.password
        .optional()
        .disallow(joi_1.default.ref('currentPassword'))
        .messages(constants_1.ErrorsMessagesValidationsConstant),
    email: joi_commons_fields_util_1.joiCommonsFieldsUtil.email
        .optional()
        .messages(constants_1.ErrorsMessagesValidationsConstant),
    avatar: joi_1.default.binary()
        .optional()
        .messages(constants_1.ErrorsMessagesValidationsConstant),
    clientKey: joi_commons_fields_util_1.joiCommonsFieldsUtil.clientKey
        .required()
        .messages(constants_1.ErrorsMessagesValidationsConstant),
});
JoiValidatorUtil.forgotPasswordSchema = joi_1.default.object({
    password: joi_commons_fields_util_1.joiCommonsFieldsUtil.password
        .required()
        .messages(constants_1.ErrorsMessagesValidationsConstant),
    clientKey: joi_commons_fields_util_1.joiCommonsFieldsUtil.clientKey
        .required()
        .messages(constants_1.ErrorsMessagesValidationsConstant),
});
exports.userSchema = JoiValidatorUtil.userSchema, exports.loginSchema = JoiValidatorUtil.loginSchema, exports.emailSchema = JoiValidatorUtil.emailSchema, exports.clientKeySchema = JoiValidatorUtil.clientKeySchema, exports.authorPathSchema = JoiValidatorUtil.authorPathSchema, exports.tokenSchema = JoiValidatorUtil.tokenSchema, exports.passwordSchema = JoiValidatorUtil.passwordSchema, exports.userGoogleSchema = JoiValidatorUtil.userGoogleSchema, exports.authorSchema = JoiValidatorUtil.authorSchema, exports.genreSchema = JoiValidatorUtil.genreSchema, exports.bookSchema = JoiValidatorUtil.bookSchema, exports.viewFirstCreateSchema = JoiValidatorUtil.viewFirstCreateSchema, exports.commentSchema = JoiValidatorUtil.commentSchema, exports.actionsSchema = JoiValidatorUtil.actionsSchema, exports.actionsUserIdParamsSchema = JoiValidatorUtil.actionsUserIdParamsSchema, exports.ratingsSchema = JoiValidatorUtil.ratingsSchema, exports.commentActionsSchema = JoiValidatorUtil.commentActionsSchema, exports.commentUpdateActionsSchema = JoiValidatorUtil.commentUpdateActionsSchema, exports.searchSchema = JoiValidatorUtil.searchSchema, exports.updateUserSchema = JoiValidatorUtil.updateUserSchema, exports.forgotPasswordSchema = JoiValidatorUtil.forgotPasswordSchema, exports.bookUpdateSchema = JoiValidatorUtil.bookUpdateSchema;
//# sourceMappingURL=joi-validator.util.js.map