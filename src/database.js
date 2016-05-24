import {createConnection} from 'mysql';

export const settings = {
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USERNAME || 'root',
  password: process.env.DB_PASSWORD || 'root',
  database: process.env.DB_DATABASENAME || 'pixelsleep',
}

export const connection = createConnection(settings);