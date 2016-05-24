import {connection} from './database';

connection.connect(err => {
  if(err) {
    console.error('Error connection' + err.stack);
  }
})
