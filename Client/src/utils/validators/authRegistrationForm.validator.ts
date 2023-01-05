import Joi from 'joi';

import { validationMessageErrorConstant } from '../../constants';

export const authRegistrationFormValidator = Joi.object({
    nickName: Joi.string().min(4).max(50).trim()
        .regex(/^[A-ZА-ЯЄІЇҐ][a-zа-яєіїґ0-9]*(([,.] |[ '-])[A-Za-zА-ЯІЄЇҐа-яієїґ0-9][a-zа-яієїґ0-9]*)*(\.?)( [IVXLCDM]+)?$/)
        .trim()
        .required()
        .messages({
            ...validationMessageErrorConstant,
            'string.pattern.base': 'Псевдонім повинен починатись з великої літери, а далі все з малої від 4 до 50 букв або цифр, без спеціальних символів',
        }),
    email: Joi.string()
        .min(5)
        .max(35)
        .regex(/^(?!.* )(?!^ |.* $)^.+@[^@]+\.[^@]{2,}$/)
        .lowercase()
        .trim()
        .required()
        .messages({
            ...validationMessageErrorConstant,
            'string.pattern.base': 'електронна пошта повина мати "@, .", повина бути без пробілів',
        }),
    password: Joi.string().min(7).max(40).trim()
        .regex(/^(?!.* )(?=.*\d)(?=.*[A-ZА-ЯІЇҐ])/)
        .disallow(Joi.ref('nickName'), Joi.ref('email'))
        .trim()
        .required()
        .messages({
            ...validationMessageErrorConstant,
            'any.invalid': 'пароль не може бути нікнеймом, чи поштою!',
            'string.pattern.base': 'Пароль повимен мати хоча б одну велику літеру і одну цифру',
        }),
    confirmPassword: Joi.any().valid(Joi.ref('password'))
        .required()
        .messages({
            'any.only': 'паролі не збігаються',
        }),
    avatar: Joi.any()
        .meta({ swaggerType: 'file' })
        .optional()
        .messages(validationMessageErrorConstant),
});
