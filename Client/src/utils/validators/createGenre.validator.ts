import Joi from 'joi';

import { IGenre } from '../../interfaces';

export const createGenreValidator = Joi.object<IGenre>({
    name: Joi.string()
        .min(2)
        .max(50)
        .required(),
});
