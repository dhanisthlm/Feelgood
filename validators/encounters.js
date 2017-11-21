import Joi from 'joi';

export const encounterValidator = Joi.object().keys({
    name: Joi
        .string()
        .trim()
        .required(),

    phone: Joi
        .string()
        .required(),

    mail: Joi
        .string()
        .email()
        .required(),

    price: Joi
        .string()
        .required(),

    comment: Joi
        .string()
        .allow('', null)

}).options({
    stripUnknown: true,
    allowUnknown: true
});