import Joi from 'joi';

import { joiCommonsFieldsUtil } from './joi-commons-fields.util';
import { ErrorsMessagesValidationsConstant } from '../constants';
import { regexConstant } from '../constants/regex.constant';

class JoiValidatorUtil {
    public static userSchema: Joi.ObjectSchema = Joi.object({
        nickName: Joi.string().min(4).max(50).trim()
            .regex(regexConstant.NICKNAME)
            .required()
            .messages(ErrorsMessagesValidationsConstant),
        password: joiCommonsFieldsUtil.password
            .required()
            .messages(ErrorsMessagesValidationsConstant),
        email: joiCommonsFieldsUtil.email
            .required()
            .messages(ErrorsMessagesValidationsConstant),
        role: Joi.string().min(4).max(5).trim()
            .messages(ErrorsMessagesValidationsConstant)
            .optional(),
        avatar: Joi.binary()
            .optional()
            .messages(ErrorsMessagesValidationsConstant),
    });

    public static loginSchema: Joi.ObjectSchema = Joi.object({
        email: joiCommonsFieldsUtil.email
            .required()
            .messages(ErrorsMessagesValidationsConstant),
        password: joiCommonsFieldsUtil.password
            .required()
            .messages(ErrorsMessagesValidationsConstant),
    });

    public static emailSchema: Joi.ObjectSchema = Joi.object({
        email: joiCommonsFieldsUtil.email
            .required()
            .messages(ErrorsMessagesValidationsConstant),
    });

    public static clientKeySchema: Joi.ObjectSchema = Joi.object({
        clientKey: joiCommonsFieldsUtil.clientKey
            .required()
            .messages(ErrorsMessagesValidationsConstant),
    });

    public static tokenSchema: Joi.ObjectSchema = Joi.object({
        token: joiCommonsFieldsUtil.token
            .required()
            .messages(ErrorsMessagesValidationsConstant),
    });

    public static passwordSchema: Joi.ObjectSchema = Joi.object({
        password: joiCommonsFieldsUtil.password
            .required()
            .messages(ErrorsMessagesValidationsConstant),
    });

    public static userGoogleSchema: Joi.ObjectSchema = Joi.object({
        nickName: Joi.string().min(4).max(50).trim()
            .regex(regexConstant.NICKNAME)
            .required()
            .messages(ErrorsMessagesValidationsConstant),
        email: joiCommonsFieldsUtil.email
            .required()
            .messages(ErrorsMessagesValidationsConstant),
        role: Joi.string().min(4).max(5).trim()
            .messages(ErrorsMessagesValidationsConstant)
            .optional(),
        avatar: Joi.string()
            .optional()
            .messages(ErrorsMessagesValidationsConstant),
    });

    public static authorSchema: Joi.ObjectSchema = Joi.object({
        firstName: Joi.string()
            .max(255)
            .trim()
            .messages(ErrorsMessagesValidationsConstant)
            .required(),
        lastName: Joi.string()
            .max(255)
            .trim()
            .messages(ErrorsMessagesValidationsConstant)
            .required(),
        biography: Joi.string()
            .trim()
            .max(8000)
            .messages(ErrorsMessagesValidationsConstant)
            .required(),
        country: Joi.string()
            .trim()
            .max(255)
            .messages(ErrorsMessagesValidationsConstant)
            .required(),
        dateBirthday: Joi.date()
            .messages(ErrorsMessagesValidationsConstant)
            .required(),
        dateDeath: Joi.date()
            .allow(null)
            .messages(ErrorsMessagesValidationsConstant)
            .optional(),
        photo: Joi.binary()
            .allow(null)
            .messages(ErrorsMessagesValidationsConstant)
            .optional(),
        pseudonym: Joi.string()
            .allow(null)
            .messages(ErrorsMessagesValidationsConstant)
            .optional(),
        genres: Joi.alternatives()
            .try(Joi.array().items(Joi.number()), Joi.number())
            .messages(ErrorsMessagesValidationsConstant)
            .required(),
        clientKey: joiCommonsFieldsUtil.clientKey
            .required()
            .messages(ErrorsMessagesValidationsConstant),
    });

    public static authorPathSchema: Joi.ObjectSchema = Joi.object({
        firstName: Joi.string()
            .max(255)
            .trim()
            .messages(ErrorsMessagesValidationsConstant)
            .optional(),
        lastName: Joi.string()
            .max(255)
            .trim()
            .messages(ErrorsMessagesValidationsConstant)
            .optional(),
        dateDeath: Joi.date()
            .messages(ErrorsMessagesValidationsConstant)
            .optional(),
        country: Joi.string()
            .trim()
            .max(255)
            .messages(ErrorsMessagesValidationsConstant)
            .optional(),
        photo: Joi.binary()
            .messages(ErrorsMessagesValidationsConstant)
            .optional(),
        pseudonym: Joi.string()
            .messages(ErrorsMessagesValidationsConstant)
            .optional(),
        biography: Joi.string()
            .trim()
            .max(8000)
            .messages(ErrorsMessagesValidationsConstant)
            .optional(),
        clientKey: joiCommonsFieldsUtil.clientKey
            .required()
            .messages(ErrorsMessagesValidationsConstant),
    });

    public static genreSchema: Joi.ObjectSchema = Joi.object({
        name: Joi.string()
            .min(2)
            .max(50)
            .required(),
        clientKey: joiCommonsFieldsUtil.clientKey
            .required()
            .messages(ErrorsMessagesValidationsConstant),
    });

    public static bookSchema: Joi.ObjectSchema = Joi.object({
        name: Joi.string()
            .messages(ErrorsMessagesValidationsConstant)
            .min(1)
            .max(255)
            .required(),
        yearOfRelease: Joi.number()
            .messages(ErrorsMessagesValidationsConstant)
            .max(1300)
            .max(new Date().getFullYear())
            .optional(),
        description: Joi.string()
            .messages(ErrorsMessagesValidationsConstant)
            .min(100)
            .max(8000)
            .required(),
        fileText: Joi.binary()
            .messages(ErrorsMessagesValidationsConstant)
            .optional(),
        cover: Joi.binary()
            .messages(ErrorsMessagesValidationsConstant)
            .optional(),
        fileAudio: Joi.binary()
            .messages(ErrorsMessagesValidationsConstant)
            .optional(),
        authorId: Joi.number()
            .messages(ErrorsMessagesValidationsConstant)
            .required(),
        genres: Joi.alternatives()
            .try(Joi.array().items(Joi.number()), Joi.number())
            .messages(ErrorsMessagesValidationsConstant)
            .optional(),
        clientKey: joiCommonsFieldsUtil.clientKey
            .required()
            .messages(ErrorsMessagesValidationsConstant),
    });

    public static bookUpdateSchema: Joi.ObjectSchema = Joi.object({
        name: Joi.string()
            .messages(ErrorsMessagesValidationsConstant)
            .min(1)
            .max(255)
            .optional(),
        yearOfRelease: Joi.number()
            .messages(ErrorsMessagesValidationsConstant)
            .max(1300)
            .max(new Date().getFullYear())
            .optional(),
        description: Joi.string()
            .messages(ErrorsMessagesValidationsConstant)
            .min(100)
            .max(8000)
            .optional(),
        fileText: Joi.binary()
            .messages(ErrorsMessagesValidationsConstant)
            .optional(),
        cover: Joi.binary()
            .messages(ErrorsMessagesValidationsConstant)
            .optional(),
        fileAudio: Joi.binary()
            .messages(ErrorsMessagesValidationsConstant)
            .optional(),
        clientKey: joiCommonsFieldsUtil.clientKey
            .required()
            .messages(ErrorsMessagesValidationsConstant),
    });

    public static viewFirstCreateSchema: Joi.ObjectSchema = Joi.object({
        bookId: Joi.number()
            .messages(ErrorsMessagesValidationsConstant)
            .required(),
    });

    public static commentSchema: Joi.ObjectSchema = Joi.object({
        bookId: Joi.number()
            .messages(ErrorsMessagesValidationsConstant)
            .required(),
        text: Joi.string()
            .trim()
            .messages(ErrorsMessagesValidationsConstant)
            .regex(regexConstant.BAD_WORDS, { invert: true })
            .required(),
        clientKey: joiCommonsFieldsUtil.clientKey
            .required()
            .messages(ErrorsMessagesValidationsConstant),
    });

    public static actionsSchema: Joi.ObjectSchema = Joi.object({
        bookId: Joi.number()
            .required(),
        clientKey: joiCommonsFieldsUtil.clientKey
            .required()
            .messages(ErrorsMessagesValidationsConstant),
    });

    public static actionsUserIdParamsSchema: Joi.ObjectSchema = Joi.object({
        nickName: Joi.string().min(4).max(50).trim()
            .regex(regexConstant.NICKNAME)
            .required()
            .messages(ErrorsMessagesValidationsConstant),
    });

    public static ratingsSchema: Joi.ObjectSchema = Joi.object({
        rate: Joi.number()
            .required()
            .messages(ErrorsMessagesValidationsConstant),
        bookId: Joi.number()
            .required()
            .messages(ErrorsMessagesValidationsConstant),
        clientKey: joiCommonsFieldsUtil.clientKey
            .required()
            .messages(ErrorsMessagesValidationsConstant),
    });

    public static commentActionsSchema: Joi.ObjectSchema = Joi.object({
        disLike: Joi.number()
            .min(0)
            .max(1)
            .required()
            .messages(ErrorsMessagesValidationsConstant),
        like: Joi.number()
            .min(0)
            .max(1)
            .required()
            .disallow(Joi.ref('disLike'))
            .messages(ErrorsMessagesValidationsConstant),
        clientKey: joiCommonsFieldsUtil.clientKey
            .required()
            .messages(ErrorsMessagesValidationsConstant),
        commentId: Joi.number()
            .required()
            .messages(ErrorsMessagesValidationsConstant),
    });

    public static commentUpdateActionsSchema: Joi.ObjectSchema = Joi.object({
        disLike: Joi.number()
            .min(0)
            .max(1)
            .optional()
            .messages(ErrorsMessagesValidationsConstant),
        like: Joi.number()
            .optional()
            .min(0)
            .max(1)
            .disallow(Joi.ref('disLike'))
            .messages(ErrorsMessagesValidationsConstant),
        clientKey: joiCommonsFieldsUtil.clientKey
            .required()
            .messages(ErrorsMessagesValidationsConstant),
    });

    public static searchSchema: Joi.ObjectSchema = Joi.object({
        search: Joi.string()
            .messages(ErrorsMessagesValidationsConstant)
            .min(1)
            .max(255)
            .trim()
            .required(),
    });

    public static updateUserSchema: Joi.ObjectSchema = Joi.object({
        nickName: Joi.string().min(4).max(50).trim()
            .regex(regexConstant.NICKNAME)
            .optional()
            .messages(ErrorsMessagesValidationsConstant),
        currentPassword: joiCommonsFieldsUtil.password
            .optional()
            .required()
            .messages(ErrorsMessagesValidationsConstant),
        password: joiCommonsFieldsUtil.password
            .optional()
            .disallow(Joi.ref('currentPassword'))
            .messages(ErrorsMessagesValidationsConstant),
        email: joiCommonsFieldsUtil.email
            .optional()
            .messages(ErrorsMessagesValidationsConstant),
        avatar: Joi.binary()
            .optional()
            .messages(ErrorsMessagesValidationsConstant),
        clientKey: joiCommonsFieldsUtil.clientKey
            .required()
            .messages(ErrorsMessagesValidationsConstant),
    });

    public static forgotPasswordSchema: Joi.ObjectSchema = Joi.object({
        password: joiCommonsFieldsUtil.password
            .required()
            .messages(ErrorsMessagesValidationsConstant),
        clientKey: joiCommonsFieldsUtil.clientKey
            .required()
            .messages(ErrorsMessagesValidationsConstant),
    });
}

export const {
    userSchema, loginSchema, emailSchema, clientKeySchema, authorPathSchema,
    tokenSchema, passwordSchema, userGoogleSchema, authorSchema, genreSchema,
    bookSchema, viewFirstCreateSchema, commentSchema, actionsSchema,
    actionsUserIdParamsSchema, ratingsSchema, commentActionsSchema, commentUpdateActionsSchema,
    searchSchema, updateUserSchema, forgotPasswordSchema, bookUpdateSchema,
} = JoiValidatorUtil;
