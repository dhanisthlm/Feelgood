import Joi from 'joi';

export const encounterValidator = Joi.object().keys({
    name: Joi
        .string()
        .trim()
        .required(),

    street: Joi
        .string()
        .trim()
        .required(),

    postal: Joi
        .string()
        .trim()
        .required(),

    city: Joi
        .string()
        .trim()
        .required(),

    country: Joi
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

    issue: Joi
        .string()
        .allow('', null),

    timeframe: Joi
        .string()
        .allow('', null),

    newsletter: Joi
        .boolean()
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