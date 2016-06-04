import { createConnection } from 'mysql';

/**
 * @type {object} settings - Object containing all the settings
 * @type {string} settings.host - Where the database is hosted
 * @type {number} settings.port - Port used by the database
 * @type {string} settings.user - User to connect WITH
 * @type {string} settings.password - Password of the user
 * @type {string} settings.schema - Schema the database uses for saving the data
 */
export const settings = {
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USERNAME || 'root',
  password: process.env.DB_PASSWORD || 'root',
  schema: process.env.DB_DATABASENAME || 'pixelsleep',
};

export const connection = createConnection(settings);

export function connect() {
  connection.connect(err => {
    // If there is an error, display the message and exit the program
    if (err) {
      console.error(`Error connection ${err.stack}`);
      process.exit();
    }
    console.log(`Succesfully connected as id ${connection.threadId}`);
  });
}
