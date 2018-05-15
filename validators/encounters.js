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
        .allow('', null),

    phone: Joi
        .string()
        .regex(/^[0-9]*$/),

    mail: Joi
        .string()
        .email()
        .regex(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
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
        .allow('', null),

    phone: Joi
        .string()
        .regex(/^[0-9]*$/),

    mail: Joi
        .string()
        .email()
        .regex(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
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

export const onlineValidator = Joi.object().keys({
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
        .allow('', null),

    phone: Joi
        .string()
        .regex(/^[0-9]*$/),

    mail: Joi
        .string()
        .email()
        .regex(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
        .required(),

    paymentType: Joi
        .string()
        .required(),

    currency: Joi
        .string()
        .required(),

    issue: Joi
        .string()
        .allow('', null),

    timeframe: Joi
        .string()
        .allow('', null),

    fb: Joi
        .boolean(),

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