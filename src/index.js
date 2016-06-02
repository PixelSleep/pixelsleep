import express from 'express';
import path from 'path';
import mysql from 'mysql';
import {settings, connection} from './database';
import moment from 'moment';

// Connect to the database
connection.connect(err => {
  // If there is an error, display the message and exit the program
  if(err) {
    console.error('Error connection' + err.stack);
    process.exit();
  }
  console.log('Succesfully connected as id %d', connection.threadId);
});

// Init the express server
let app = express();

// The public directory for static files is public
app.use(express.static('public'));
// Setup views
app.set('view engine', 'pug');

/**
 * TODO: make promise out of this
 */
function getResults(cb, id = 0, howMany = 25) {
  const sql = `SELECT \`tijd_gaan_slapen\`, \`tijd_opgestaan\`, \`gewenste_slaaptijd\`
               FROM ??.\`hours\`
               WHERE \`id\` >= ?
               LIMIT ?`;
  const inserts = [settings.schema, id, howMany];
  const query = mysql.format(sql, inserts);

  connection.query(query, (err, results) => {
    if(err) console.error(err);
    const format = 'DD/MM/YY HH:mm';

    // Iterate trough each result and give them the format required.
    // Also calculate the time they slept.
    results.map((result) => {
      try {
        let tijd_gaan_slapen = moment(result.tijd_gaan_slapen);
        let tijd_opgestaan = moment(result.tijd_opgestaan);
        let hours = tijd_opgestaan.diff(tijd_gaan_slapen, 'hours');
        let minutes = tijd_opgestaan.diff(tijd_gaan_slapen, 'minutes') - (hours * 60)
        result.tijd_gaan_slapen = tijd_gaan_slapen.format(format);
        result.tijd_opgestaan = tijd_opgestaan.format(format);
        result.tijd_geslapen = {hours, minutes};
      } catch (e) {
        console.error(e);
      }
      return result;
    });
    cb(results);
  });
}

/**
 * GET: ./
 * The front page with a table
 */
app.get('/', (req, res) => {
  getResults((results) => {
    res.render('index.pug', {results});
  });
});

/**
 * GET: ./api
 * Get all the data from the database.
 */
app.get('/api', (req, res) => {
  connection.query('SELECT tijd_gaan_slapen, tijd_opgestaan, gewenste_slaaptijd FROM `hours`', (err, results) => {
    res.json(results);
  });
});

// Listen for requests on port 3000
app.listen(3000, () => {
  console.log('Listening on port 3000');
});
