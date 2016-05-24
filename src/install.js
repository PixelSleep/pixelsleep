import {connection, settings} from './database';

// Connect to the database
connection.connect(err => {
  // If there is an error, display the message and exit the program
  if(err) {
    console.error('Error connection' + err.stack);
    process.exit();
  }
  console.log('Succesfully connected as id %d', connection.threadId);
});

connection.query(`
  CREATE TABLE ${settings.database}.\`hours\` (
    \`id\` INT NOT NULL,
    \`tijd_gaan_slapen\` DATETIME,
    \`tijd_opgestaan\` DATETIME,
    \`gewenste_slaaptijd\` DATETIME,
    PRIMARY KEY (\`id\`)
  );
`, err => {
  if(err) console.log(`Err: ${err}`);
});

// End the connection
connection.end(err => {
  if(err) console.error('Error ending connection' + err.stack);
});