import Joi from 'joi';

const userValidation = {
  update: {
    body: Joi.object({
      user_name: Joi.string().trim(),
      full_name: Joi.string().trim(),
      password: Joi.string().trim(),
    }),
  },
  delete: {
    params: Joi.object({
      id: Joi.number().required(),
    }),
  },
};

export default userValidation;
