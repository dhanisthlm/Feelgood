import Joi from 'joi';

export const authValidator = Joi.object().keys({
    firstName: Joi
        .string()
        .required(),

    lastName: Joi
        .string()
        .required(),

    userName: Joi
        .string()
        .email()
        .required(),

    password: Joi
        .string()
        .required(),

    scope: Joi
        .string()
        .required()
});