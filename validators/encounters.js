import Joi from 'joi';

export const encounterValidator = Joi.object().keys({
    name: Joi
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

    comment: Joi
        .string()
        .allow('', null)

}).options({
    stripUnknown: true,
    allowUnknown: true
});