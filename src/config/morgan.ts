import morgan from 'morgan';
import logger from './logger';

/**
 * Define a stream object with a 'write' function that will be used by Morgan
 * to log messages using your custom logger.
 */
const stream = {
  write: (message: string) => {
    // Use your logger to log the message
    logger.info(message.trim());
  },
};

/**
 * Define the format for successful responses.
 * You can use predefined formats like 'dev' or define a custom format.
 */
const format = 'dev';

/**
 * Create the Morgan middleware using the defined format and stream.
 */
const morganMiddleware = morgan(format, { stream });

export default morganMiddleware;
