import express from 'express';
import mysql from 'mysql';
import * as database from './database';
import moment from 'moment';
import exphbs from 'express-handlebars';
import bodyParser from 'body-parser';
import fs from 'fs';
import path from 'path';
import os from 'os';

// Connect to the datase
database.connect();

// Init the express server
const app = express();

// The public directory for static files is public
app.use(express.static('public'));
// Setup views
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
// To get the post params if there is a POST req
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


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
      const tijdGewenstOpstaan =
        tijdGaanSlapen
        .clone()
        .add(result.gewenste_slaaptijd, 'seconds')
        .format(format);
      const diff = tijdOpgestaan.diff(tijdGaanSlapen, 'seconds');
      const tijdGeslapen =
        moment()
        .startOf('day')
        .seconds(diff)
        .format('HH:mm');
      tijdGaanSlapen = tijdGaanSlapen.format(format);
      tijdOpgestaan = tijdOpgestaan.format(format);

      return {
        tijdGaanSlapen,
        tijdOpgestaan,
        tijdGewenstOpstaan,
        tijdGeslapen,
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
    res.render('index', { results });
  });
});

/**
 * GET: ./hoe
 * Information about how the app works
 */
app.get('/hoe', (req, res) => {
  res.render('hoe');
});

/**
 * GET: ./over
 * Information about pixelsleep
 */
app.get('/over', (req, res) => {
  res.render('over');
});

/**
 * POST: ./api/instellen-van-tijden
 * Configuring time
 */
app.post('/api/instellen-van-tijden', (req, res) => {
  const filePath = path.join(os.homedir(), 'pixelsleep', 'settings.json');
  fs.writeFile(filePath, JSON.stringify(req.body), {
    encoding: 'utf-8',
    mode: 0o666,
    flag: 'w',
  }, (err) => {
    if (err) {
      console.error(err);
      res.send(`Error! ${err}`);
    }
  });
  res.send('Updated times');
});

// Listen for requests on port 3000
app.listen(3000, () => {
  console.log('Listening on port 3000');
});
