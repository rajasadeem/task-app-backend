import app from './app';
import config from './config/env';
import client from './config/db';
import logger from './config/logger';

const PORT = config.PORT || 3000;

const startServer = async () => {
  try {
    await client.connect();
    logger.info('database connected successfully');

    app.listen(PORT, () => {
      logger.info(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    logger.error('Error during Data Source initialization:', error);
    process.exit(1);
  }
};

startServer();
