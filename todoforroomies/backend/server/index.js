import http from 'http';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import db from './db.js';
import api from './api';
import MongoClient from 'mongodb';

let app = express();
app.server = http.createServer(app);
// // configure http server

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

db.connect('mongodb://localhost:27017/todoforroomies', (err) => {
  if (err) {
    console.log("unable to reach Mongo");
    process.exit(1)
  } else {
    console.log('connected to Mongo');



  app.get('/', (req, res) => {
    res.json({
      'todo': 'api',
      'version': "0.1"
    });
  });

  app.use('/api', api());
  app.server.listen(process.env.PORT || 3000);
  console.log(`started on port ${app.server.address().port}`);
  }
});

export default app;
