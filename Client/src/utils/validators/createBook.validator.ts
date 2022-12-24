import Joi from 'joi';

import { IBook } from '../../interfaces';
import { validationMessageErrorConstant } from '../../constants';

export const createBookValidator = Joi.object<IBook>({
    name: Joi.string()
        .messages(validationMessageErrorConstant)
        .min(1)
        .max(255)
        .trim()
        .required(),
    yearOfRelease: Joi.number()
        .messages(validationMessageErrorConstant)
        .min(1700)
        .max(1300)
        .max(new Date().getFullYear())
        .optional(),
    description: Joi.string()
        .messages(validationMessageErrorConstant)
        .min(100)
        .max(8000)
        .trim()
        .required(),
    fileText: Joi.any()
        .meta({ swaggerType: 'file' })
        .messages(validationMessageErrorConstant)
        .optional(),
    cover: Joi.any()
        .meta({ swaggerType: 'file' })
        .messages(validationMessageErrorConstant)
        .optional(),
    fileAudio: Joi.any()
        .meta({ swaggerType: 'file' })
        .messages(validationMessageErrorConstant)
        .optional(),
    authorId: Joi.string()
        .messages(validationMessageErrorConstant)
        .required(),
    genres: Joi.alternatives()
        .try(Joi.array().items(Joi.string()), Joi.string())
        .allow(null, '')
        .messages(validationMessageErrorConstant)
        .required(),
});
