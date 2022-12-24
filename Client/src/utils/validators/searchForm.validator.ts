import Joi from 'joi';

import { validationMessageErrorConstant } from '../../constants';

export const searchFormValidator = Joi.object({
    search: Joi.string()
        .messages(validationMessageErrorConstant)
        .min(1)
        .max(255)
        .trim()
        .required(),
});
