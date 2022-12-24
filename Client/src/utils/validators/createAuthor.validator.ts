import Joi from 'joi';

import { validationMessageErrorConstant } from '../../constants';
import { IAuthorCreate } from '../../interfaces';

export const createAuthorValidator = Joi.object<IAuthorCreate>({
    firstName: Joi.string()
        .min(1)
        .max(255)
        .trim()
        .messages(validationMessageErrorConstant)
        .required(),
    lastName: Joi.string()
        .min(1)
        .max(255)
        .trim()
        .messages(validationMessageErrorConstant)
        .required(),
    biography: Joi.string()
        .trim()
        .min(1)
        .max(8000)
        .messages(validationMessageErrorConstant)
        .required(),
    country: Joi.string()
        .trim()
        .min(1)
        .max(255)
        .messages(validationMessageErrorConstant)
        .required(),
    dateBirthday: Joi.date()
        .messages(validationMessageErrorConstant)
        .required(),
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
    genres: Joi.alternatives()
        .try(Joi.array().items(Joi.number()), Joi.number())
        .allow(null, '')
        .messages(validationMessageErrorConstant)
        .optional(),
});
