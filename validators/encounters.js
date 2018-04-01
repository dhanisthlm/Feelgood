import Joi from 'joi';

export const encounterValidator = Joi.object().keys({
    name: Joi
        .string()
        .trim()
        .required(),

    street: Joi
        .string()
        .trim()
        .allow('', null),

    postal: Joi
        .string()
        .trim()
        .allow('', null),

    city: Joi
        .string()
        .trim()
        .allow('', null),

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

    paymentType: Joi
        .string()
        .required(),

    currency: Joi
        .string()
        .required(),

    timeframe: Joi
        .string()
        .allow('', null),

    newsletter: Joi
        .boolean()
        .allow('', null),

    comment: Joi
        .string()
        .allow('', null),

    rating: Joi
        .object()
        .allow('', null),

}).options({
    stripUnknown: true,
    allowUnknown: true
});

export const workshopValidator = Joi.object().keys({
    name: Joi
        .string()
        .trim()
        .required(),

    street: Joi
        .string()
        .trim()
        .allow('', null),

    postal: Joi
        .string()
        .trim()
        .allow('', null),

    city: Joi
        .string()
        .trim()
        .allow('', null),

    country: Joi
        .string()
        .trim()
        .required(),

    phone: Joi
        .string()
        .regex(/^[0-9]*$/)
        .required(),

    mail: Joi
        .string()
        .email()
        .required(),

    month: Joi
        .string()
        .required(),

    day: Joi
        .string()
        .required(),

    workshopName: Joi
        .string()
        .required(),

    location: Joi
        .string()
        .required(),

    paymentType: Joi
        .string()
        .required(),

    currency: Joi
        .string()
        .required(),

    newsletter: Joi
        .boolean()
        .allow('', null),

    comment: Joi
        .string()
        .allow('', null),

    rating: Joi
        .object()
        .allow('', null),

}).options({
    stripUnknown: true,
    allowUnknown: true
});