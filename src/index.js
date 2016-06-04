import express from 'express';
import mysql from 'mysql';
import * as database from './database';
import moment from 'moment';
import leftPad from 'left-pad';

// Connect to the datase
database.connect();

// Init the express server
const app = express();

// The public directory for static files is public
app.use(express.static('public'));
// Setup views
app.set('view engine', 'pug');

/**
 * TODO: make promise out of this
 */
function getResults(cb, id = 0) {
  const sql = `SELECT \`tijd_gaan_slapen\`, \`tijd_opgestaan\`, \`gewenste_slaaptijd\`
               FROM ??.\`hours\`
               WHERE \`id\` >= ?
               ORDER BY \`tijd_gaan_slapen\` DESC
               `;
  const inserts = [database.settings.schema, id];
  const query = mysql.format(sql, inserts);

  database.connection.query(query, (err, results) => {
    if (err) console.error(err);
    const format = 'DD/MM/YY HH:mm';

    // Iterate trough each result and give them the format required.
    // Also calculate the time they slept.
    const mappedResults = results.map((result) => {
      let tijdGaanSlapen = moment(result.tijd_gaan_slapen);
      let tijdOpgestaan = moment(result.tijd_opgestaan);
      let tijdGewenstOpstaan = tijdGaanSlapen.clone().add(result.gewenesteSlaaptijd, 'seconds');
      const hours = leftPad(tijdOpgestaan.diff(tijdGaanSlapen, 'hours'), 2, 0);
      const minutes = leftPad(tijdOpgestaan.diff(tijdGaanSlapen, 'minutes') - (hours * 60), 2, 0);
      tijdGaanSlapen = tijdGaanSlapen.format(format);
      tijdOpgestaan = tijdOpgestaan.format(format);
      tijdGewenstOpstaan = tijdGewenstOpstaan.format(format);

      return {
        tijdGaanSlapen,
        tijdOpgestaan,
        tijdGewenstOpstaan,
        tijdGeslapen: {
          hours,
          minutes,
        },
      };
    });

    cb(mappedResults);
  });
}

/**
 * GET: ./
 * The front page with a table
 */
app.get('/', (req, res) => {
  getResults((results) => {
    res.render('index.pug', { results });
  });
});

/**
 * GET: ./hoe
 * Information about how the app works
 */
app.get('/hoe', (req, res) => {
  res.render('hoe.pug');
});

/**
 * GET: ./over
 * Information about pixelsleep
 */
app.get('/over', (req, res) => {
  res.render('over.pug');
});

// Listen for requests on port 3000
app.listen(3000, () => {
  console.log('Listening on port 3000');
});
