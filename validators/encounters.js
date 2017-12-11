import Joi from 'joi';

export const encounterValidator = Joi.object().keys({
    name: Joi
        .string()
        .trim()
        .required(),

    skypeId: Joi
        .string()
        .allow('', null),

    phone: Joi
        .string()
        .regex(/^[0-9]*$/)
        .required(),

    mail: Joi
        .string()
        .email()
        .required(),

    comment: Joi
        .string()
        .allow('', null),

    rating: Joi
        .object()
        .allow('', null)

}).options({
    stripUnknown: true,
    allowUnknown: true
});