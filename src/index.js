//import mysql from 'mysql';
import express from 'express';
import path from 'path';

// Mysql
/*let connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'secret',
  database: 'pixelsleep',
});
connection.connect();*/

// Initialiseren van servers
let app = express();

// Public directory instellen voor statische bestanden
app.use(express.static('public'));

// API
app.get('/api', (req, res) => {
  let gegevens = [
    {
      gaan: '23:00',
      willen: '8:00',
      geslapen: '8:00'
    },
    {
      gaan: '22:00',
      willen: '8:00',
      geslapen: '9:00'
    }
  ];
  res.json(gegevens);
});

app.listen(3000, () => {
  console.log('Listening on port 3000');
});
