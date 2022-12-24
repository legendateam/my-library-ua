import Joi from 'joi';
import { regexConstant } from '../constants/regex.constant';

export const joiCommonsFieldsUtil = {
    email: Joi.string()
        .email()
        .min(5)
        .max(35)
        .lowercase()
        .trim(),
    password: Joi.string()
        .min(7)
        .max(40)
        .regex(regexConstant.PASSWORD)
        .trim(),
    token: Joi.string()
        .min(10),
    clientKey: Joi.string(),
};
