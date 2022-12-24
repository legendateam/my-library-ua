import Joi from 'joi';

import { validationMessageErrorConstant } from '../../constants';

export const forgotPasswordChangePasswordValidator = Joi.object({
    password: Joi.string().min(7).max(40).trim()
        .regex(/^(?!.* )(?=.*\d)(?=.*[A-ZА-ЯІЇҐ])/)
        .trim()
        .required()
        .messages({
            ...validationMessageErrorConstant,
            'string.pattern.base': 'Пароль повимен мати хоча б одну велику літеру і одну цифру',
        }),
    confirmPassword: Joi.any().valid(Joi.ref('password'))
        .required()
        .messages({
            ...validationMessageErrorConstant,
            'any.only': 'паролі не збігаються',
            'string.pattern.base': 'Пароль повимен мати хоча б одну велику літеру і одну цифру',
        }),
});
