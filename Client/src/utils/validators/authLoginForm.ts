import Joi from 'joi';

import { validationMessageErrorConstant } from '../../constants';

export const authLoginFormValidator = Joi.object({
    email: Joi.string()
        .min(5)
        .max(35)
        .regex(/^(?!.* )(?!^ |.* $)^.+@[^@]+\.[^@]{2,}$/)
        .lowercase()
        .trim()
        .required()
        .messages({
            ...validationMessageErrorConstant,
            'string.pattern.base': 'електронна пошта повина мати "@", також "."',
        }),
    password: Joi.string().min(7).max(40).trim()
        .regex(/^(?!.* )(?=.*\d)(?=.*[A-ZА-ЯІЇҐ])/)
        .disallow(Joi.ref('email'))
        .trim()
        .required()
        .messages({
            ...validationMessageErrorConstant,
            'any.invalid': 'пароль і псевдонім не можуть бути однаковими!',
            'string.pattern.base': 'Пароль повимен мати хоча б одну велику літеру і одну цифру',
        }),
});
