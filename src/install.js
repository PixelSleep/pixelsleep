import {connect, connection, settings} from './database';

// Connect to the database
connect();

// Execute a query to create a table where we save the hours
connection.query(`
  CREATE TABLE ${settings.schema}.\`hours\` (
    \`id\` INT NOT NULL,
    \`tijd_gaan_slapen\` DATETIME NULL,
    \`tijd_opgestaan\` DATETIME NULL,
    \`gewenste_slaaptijd\` INT NULL,
    PRIMARY KEY (\`id\`)
  );
`, err => {
  if(err) console.log(`Err: ${err}`);
});

// End the connection
connection.end(err => {
  if(err) console.error('Error ending connection' + err.stack);
});
