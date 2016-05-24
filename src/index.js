import express from 'express';
import path from 'path';
import {connection} from './database';

// Connect to the database
connection.connect(err => {
  // If there is an error, display the message and exit the program
  if(err) {
    console.error('Error connection' + err.stack);
    process.exit();
  }
  console.log('Succesfully connected as id %d', connection.threadId);
});

// Initialiseren van servers
let app = express();

// Public directory instellen voor statische bestanden
app.use(express.static('public'));

// API
app.get('/api', (req, res) => {
  let query = connection.query('SELECT tijd_gaan_slapen, tijd_opgestaan, gewenste_slaaptijd FROM `hours`', (err, results) => {
    console.log(results);
    res.json(results);
  });
});

app.listen(3000, () => {
  console.log('Listening on port 3000');
});