import Joi from 'joi';

class ValidatorsUtil {
    public static idSchema: Joi.ObjectSchema = Joi.object({
        id: Joi.number().min(1).optional(),
    });

    public static FilesSchema: Joi.ObjectSchema = Joi.object({
        readNumbers: Joi.boolean()
            .optional(),
        downloadNumbers: Joi.boolean()
            .optional(),
    });
}

export const {
    idSchema, FilesSchema,
} = ValidatorsUtil;
