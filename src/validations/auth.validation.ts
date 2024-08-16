import Joi from 'joi';

const authValidation = {
  signup: {
    body: Joi.object({
      user_name: Joi.string().trim().required(),
      full_name: Joi.string().trim().required(),
      password: Joi.string().trim().required(),
    }),
  },
  login: {
    body: Joi.object({
      user_name: Joi.string().trim().required(),
      password: Joi.string().trim().required(),
    }),
  },
};

export default authValidation;
