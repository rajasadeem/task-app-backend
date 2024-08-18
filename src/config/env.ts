import * as dotenv from 'dotenv';
import Joi from 'joi';

dotenv.config();

const envSchema = Joi.object({
  NODE_ENV: Joi.string().valid('development', 'production', 'test').required(),
  PORT: Joi.number().required(),
  DB_NAME: Joi.string().trim().required(),
  DB_HOST: Joi.string().hostname().trim().required(),
  DB_PORT: Joi.number().port().required(),
  DB_USERNAME: Joi.string().trim().required(),
  DB_PASSWORD: Joi.string().trim().required(),
  DATABASE_URL: Joi.string().trim().required(),
  JWT_SECRET: Joi.string().trim().required(),
})
  .unknown()
  .required();

// Validate environment variables
const { error, value: envVars } = envSchema.validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const config = {
  NODE_ENV: envVars.NODE_ENV,
  PORT: envVars.PORT,
  JWT_SECRET: envVars.JWT_SECRET,
  DB: {
    NAME: envVars.DB_NAME,
    HOST: envVars.DB_HOST,
    PORT: envVars.DB_PORT,
    USERNAME: envVars.DB_USERNAME,
    PASSWORD: envVars.DB_PASSWORD,
  },
};

export default config;
