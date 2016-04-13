import {Router} from 'express';
import db from '../db.js';
import { ObjectID } from 'mongodb';

export default function() {
  const api = Router();
  const collection = db.get().collection('todos');

  api.get('/todos', (req, res) => {
    collection.find().toArray((err,docs) => {
      res.json({ todos : docs });
    });
  });

  api.post('/todo', (req, res) => {
    collection.insert(req.body, (err, result) => { res.json(result);
    });
  });

  api.put('/todo', (req, res) => {
    collection.update({"_id": ObjectID(req.body._id)}, req.body, {w:1} , (err, result) => {
      res.json(result);
    });
  });

  api.delete('/todo', (req, res) => {
    collection.remove({"_id": ObjectID(req.body._id)}, (err, result) => {res.json(result);
    });
  });
  return api;
}
