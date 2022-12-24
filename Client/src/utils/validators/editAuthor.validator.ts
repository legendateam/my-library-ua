import Joi from 'joi';

import { validationMessageErrorConstant } from '../../constants';

export const editAuthorValidator = Joi.object({
    firstName: Joi.string()
        .min(1)
        .max(255)
        .trim()
        .messages(validationMessageErrorConstant)
        .optional(),
    lastName: Joi.string()
        .min(1)
        .max(255)
        .trim()
        .messages(validationMessageErrorConstant)
        .optional(),
    biography: Joi.string()
        .trim()
        .min(1)
        .max(8000)
        .messages(validationMessageErrorConstant)
        .optional(),
    country: Joi.string()
        .trim()
        .min(1)
        .max(255)
        .messages(validationMessageErrorConstant)
        .optional(),
    dateDeath: Joi.date()
        .allow(null, '')
        .messages(validationMessageErrorConstant)
        .optional(),
    photo: Joi.any()
        .meta({ swaggerType: 'file' })
        .allow(null, '')
        .messages(validationMessageErrorConstant)
        .optional(),
    pseudonym: Joi.string()
        .allow(null, '')
        .messages(validationMessageErrorConstant)
        .optional(),
});
