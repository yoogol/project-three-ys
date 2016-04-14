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

  api.put('/todo/:oldtodoid', (req, res) => {
    console.log(req.params);
    collection.update({"_id": ObjectID(req.params.oldtodoid)}, req.body, {w:1} , (err, result) => {
      res.json(result);
    });
  });

  api.delete('/todo/:todoToDeleteId', (req, res) => {
    console.log(req.params);
    collection.remove({"_id": ObjectID(req.params.todoToDeleteId)}, (err, result) => {res.json(result);
    });
  });
  return api;
}
