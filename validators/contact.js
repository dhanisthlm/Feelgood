import Joi from 'joi';

export const contactValidator = Joi.object().keys({
    name: Joi
        .string()
        .required(),

    mail: Joi
        .string()
        .email()
        .required(),

    comment: Joi
        .string()
        .required()
}).options({
    stripUnknown: true,
    allowUnknown: true
});