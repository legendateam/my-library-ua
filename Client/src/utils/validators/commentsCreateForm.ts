import Joi from 'joi';

import { IComment } from '../../interfaces';
import { validationMessageErrorConstant } from '../../constants';

export const commentsCreateForm = Joi.object<IComment>({
    text: Joi.string()
        .min(4)
        .max(1000)
        .trim()
        .messages({
            ...validationMessageErrorConstant,
        })
        .required(),
});
