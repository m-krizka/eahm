﻿import express from 'express';
import userService from './user.service';

export default function userController() {
  const router = express.Router();
  router.post('/authenticate', authenticate);
  router.post('/register', register);
  router.get('/', getAll);
  router.get('/current', getCurrent);
  router.get('/:id', getById);
  router.put('/:id', update);
  router.delete('/:id', _delete);
  return router;
}

function authenticate(req, res, next) {
  userService.authenticate(req.body)
    .then((user) => {
      return user ? res.json(user) : res.status(400).json({ message: 'Username or password is incorrect' });
    })
    .catch(err => next(err));
}

function register(req, res, next) {
  userService.create(req.body)
    .then(() => res.json({}))
    .catch(err => next(err));
}

function getAll(req, res, next) {
  userService.getAll()
    .then(users => res.json(users))
    .catch(err => next(err));
}

function getCurrent(req, res, next) {
  userService.getById(req.user.sub)
    .then((user) => {
      return user ? res.json(user) : res.sendStatus(404);
    })
    .catch(err => next(err));
}

function getById(req, res, next) {
  userService.getById(req.params.id)
    .then((user) => {
      return user ? res.json(user) : res.sendStatus(404);
    })
    .catch(err => next(err));
}

function update(req, res, next) {
  userService.update(req.params.id, req.body)
    .then(() => res.json({}))
    .catch(err => next(err));
}

function _delete(req, res, next) {
  userService.delete(req.params.id)
    .then(() => res.json({}))
    .catch(err => next(err));
}
