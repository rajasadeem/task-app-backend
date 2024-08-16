import { NextFunction, Request, Response } from 'express';
import Joi, { ObjectSchema } from 'joi';

export const validate =
  (schema: Record<string, ObjectSchema>) =>
  (req: Request, res: Response, next: NextFunction) => {
    const validSchema = pick(schema, ['params', 'query', 'body']);
    const object = pick(req, Object.keys(validSchema) as (keyof Request)[]);
    const { value, error } = Joi.compile(validSchema)
      .prefs({ errors: { label: 'key' }, abortEarly: false })
      .validate(object);

    if (error) return res.status(400).json({ message: error.message });

    Object.assign(req, value);
    return next();
  };

const pick = <T extends object, K extends keyof T>(
  object: T,
  keys: K[],
): Partial<T> => {
  return keys.reduce((obj, key) => {
    if (object && Object.prototype.hasOwnProperty.call(object, key)) {
      obj[key] = object[key];
    }
    return obj;
  }, {} as Partial<T>);
};
