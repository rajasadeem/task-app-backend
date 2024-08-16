import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morganMiddleware from './config/morgan';
import errorHandler from './middlewares/error';
import router from './routes';

const app = express();

app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(morganMiddleware);

app.get('/', async (_, res) => {
  return res.send('Server is Running!');
});

app.use('/api', router);

app.use(errorHandler);

export default app;
