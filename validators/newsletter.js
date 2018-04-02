import Joi from 'joi';

export const newsletterValidator = Joi.object().keys({
    mail: Joi
        .string()
        .email()
        .required()
}).options({
    stripUnknown: true,
    allowUnknown: true
});