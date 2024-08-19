import Joi from 'joi';

const taskValidation = {
  add: {
    body: Joi.object({
      user_id: Joi.number().required(),
      title: Joi.string().trim().required(),
      description: Joi.string().trim().required(),
      priority: Joi.string().valid('low', 'medium', 'high').required(),
      due_date: Joi.string()
        .regex(/^\d{4}-\d{2}-\d{2}$/)
        .required()
        .messages({
          'string.pattern.base': 'due_date must be in YYYY-MM-DD format',
        }),
    }),
  },
  id: {
    params: Joi.object({
      id: Joi.number().required(),
    }),
  },
  update: {
    params: Joi.object({
      id: Joi.number().required(),
    }),
    body: Joi.object({
      title: Joi.string().trim(),
      description: Joi.string().trim(),
      status: Joi.string().valid('to_do', 'in_progress', 'completed'),
      priority: Joi.string().valid('low', 'medium', 'high'),
      due_date: Joi.string()
        .regex(/^\d{4}-\d{2}-\d{2}$/)
        .messages({
          error: 'due_date must be in YYYY-MM-DD format',
        }),
      completed_at: Joi.date(),
    }),
  },
};

export default taskValidation;
