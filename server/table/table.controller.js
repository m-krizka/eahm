import express from 'express';

import tableService from './table.service';

export default function tableController() {
  const router = express.Router();
  router.post('/', create);
  router.get('/', getAll);
  router.get('/:id', getById);
  router.put('/:id', update);
  router.delete('/:id', _delete);
  return router;
}

function create(req, res, next) {
  const { body, baseUrl } = req;
  tableService.create(body, baseUrl)
    .then(() => res.json({}))
    .catch(err => next(err));
}

function getAll(req, res, next) {
  const { baseUrl } = req;
  tableService.getAll(req, baseUrl)
    .then(maxWeights => res.json(maxWeights))
    .catch(err => next(err));
}

function getById(req, res, next) {
  const { baseUrl, params } = req;
  const { id } = params;
  tableService.getById(id, baseUrl)
    .then((tableRecord) => {
      return tableRecord ? res.json(tableRecord) : res.sendStatus(404);
    })
    .catch(err => next(err));
}

function update(req, res, next) {
  const { body, baseUrl, params } = req;
  const { id } = params;
  tableService.update(id, body, baseUrl)
    .then(() => res.json({}))
    .catch(err => next(err));
}

function _delete(req, res, next) {
  const { baseUrl, params } = req;
  const { id } = params;
  tableService.delete(id, baseUrl)
    .then(() => res.json({}))
    .catch(err => next(err));
}
