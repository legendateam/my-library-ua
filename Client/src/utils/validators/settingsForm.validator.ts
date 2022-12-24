import Joi from 'joi';
import { validationMessageErrorConstant } from '../../constants';

export const settingsFormValidator = Joi.object({
    nickName: Joi.string().min(4).max(50).trim()
        .regex(/^[A-ZА-ЯЄІЇҐ][a-zа-яєіїґ0-9]*(([,.] |[ '-])[A-Za-zА-ЯІЄЇҐа-яієїґ0-9][a-zа-яієїґ0-9]*)*(\.?)( [IVXLCDM]+)?$/)
        .trim()
        .allow(null, '')
        .optional()
        .messages(validationMessageErrorConstant),
    email: Joi.string()
        .min(5)
        .max(35)
        .regex(/^(?!.* )(?!^ |.* $)^.+@[^@]+\.[^@]{2,}$/)
        .lowercase()
        .trim()
        .allow(null, '')
        .optional()
        .messages({
            ...validationMessageErrorConstant,
            'string.pattern.base': 'електронна пошта повина мати "@, .", повина бути без пробілів',
        }),
    currentPassword: Joi.string().min(7).max(40).trim()
        .required()
        .regex(/^(?!.* )(?=.*\d)(?=.*[A-ZА-ЯІЇҐ])/)
        .messages({
            ...validationMessageErrorConstant,
            'string.pattern.base': 'Пароль повимен мати хоча б одну велику літеру і одну цифру',
        }),
    password: Joi.string().min(7).max(40).trim()
        .regex(/^(?!.* )(?=.*\d)(?=.*[A-ZА-ЯІЇҐ])/)
        .disallow(Joi.ref('currentPassword'), Joi.ref('nickName'), Joi.ref('email'))
        .trim()
        .optional()
        .allow(null, '')
        .messages({
            ...validationMessageErrorConstant,
            'any.invalid': 'новий пароль повинен відрізнатись від поточного, також не може бути нікнеймом, чи поштою',
            'string.pattern.base': 'Пароль повимен мати хоча б одну велику літеру і одну цифру',
        }),
    confirmPassword: Joi.any().valid(Joi.ref('password'))
        .optional()
        .allow(null, '')
        .messages({
            'any.only': 'паролі не збігаються',
            'string.pattern.base': 'Пароль повимен мати хоча б одну велику літеру і одну цифру',
        }),
    avatar: Joi.any()
        .meta({ swaggerType: 'file' })
        .optional()
        .messages(validationMessageErrorConstant),
});
