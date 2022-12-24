import Joi from 'joi';
import { IForgotPasswordForm } from '../../interfaces';
import { validationMessageErrorConstant } from '../../constants';

export const forgotPasswordFormValidator = Joi.object<IForgotPasswordForm>({
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
});
