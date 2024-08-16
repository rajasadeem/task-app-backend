import pg from 'pg';
import config from './env';

const { Client } = pg;

const client = new Client({
  user: 'postgres',
  password: 'admin',
  host: 'localhost',
  port: 5432,
  database: 'task_app',
});

export default client;
