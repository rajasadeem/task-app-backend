import pg from 'pg';
import config from './env';

const { Client } = pg;

const client = new Client({
  user: config.DB.USERNAME,
  password: config.DB.PASSWORD,
  host: config.DB.HOST,
  port: Number(config.DB.PORT),
  database: config.DB.NAME,
});

export default client;
