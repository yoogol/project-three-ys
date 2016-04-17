import {Router} from 'express';
import db from '../db.js';
import { ObjectID } from 'mongodb';

export default function() {
  const api = Router();
  const collectionTodos = db.get().collection('todos');
  const collectionUsers = db.get().collection('users');

//*******TODOS***********//
  api.get('/todos/:group', (req, res) => {
    console.log(req.params);
    collectionTodos.find(req.params).toArray((err,docs) => {
      res.json({ todos : docs });
    });
  });

  api.post('/todo', (req, res) => {
    collectionTodos.insert(req.body, (err, result) => { res.json(result);
    });
  });

  api.put('/todo/:oldtodoid', (req, res) => {
    console.log(req.params);
    collectionTodos.update({"_id": ObjectID(req.params.oldtodoid)}, {$set: req.body}, {w:1} , (err, result) => {
      res.json(result);
    });
  });

  api.delete('/todo/:todoToDeleteId', (req, res) => {
    console.log(req.params);
    collectionTodos.remove({"_id": ObjectID(req.params.todoToDeleteId)}, (err, result) => {res.json(result);
    });
  });

//******USERS************//
  api.post('/user', (req, res) => {
    collectionUsers.insert(req.body, (err, result) => { res.json(result);
    });
  });
  api.get('/users', (req, res) => {
    collectionUsers.find().toArray((err,docs) => {
      res.json(docs);
    });
  });
  api.put('/user/:name', (req, res) => {
    console.log(req.params);
    console.log(req.body);
    collectionUsers.update({"name": req.params.name}, {$set: req.body}, {w:1}, (err, result) => {
      res.json(result);
    });
  });
  api.get('/users/:group', (req, res) => {
    console.log(req.params);
    collectionUsers.find({"group": req.params.group}).toArray((err, result) => {
      res.json(result);
    });
  });
  return api;
}
