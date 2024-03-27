/* global window fetch localStorage */

import config from '../../config.json';
import { authHeader } from '../_helpers';

export const tableService = {
  getAll,
  getById,
  create,
  update,
  delete: _delete,
};

function getAll(search, apiURL) {
  const requestOptions = {
    method: 'GET',
    headers: { ...authHeader() },
  };
  return fetch(`${config.apiUrl}/api/${apiURL}?${search}`, requestOptions).then(handleResponse);
}

function getById(id, apiURL) {
  const requestOptions = {
    method: 'GET',
    headers: { ...authHeader() },
  };

  return fetch(`${config.apiUrl}/api/${apiURL}/${id}`, requestOptions).then(handleResponse);
}

function create(record, apiURL) {
  const requestOptions = {
    method: 'POST',
    headers: { ...authHeader(), 'Content-Type': 'application/json' },
    body: JSON.stringify(record),
  };

  return fetch(`${config.apiUrl}/api/${apiURL}`, requestOptions).then(handleResponse);
}

function update(record, apiURL) {
  const id = record._id;
  const requestOptions = {
    method: 'PUT',
    headers: { ...authHeader(), 'Content-Type': 'application/json' },
    body: JSON.stringify(record),
  };

  return fetch(`${config.apiUrl}/api/${apiURL}/${id}`, requestOptions).then(handleResponse);
}

function _delete(id, apiURL) {
  const requestOptions = {
    method: 'DELETE',
    headers: { ...authHeader() },
  };
  return fetch(`${config.apiUrl}/api/${apiURL}/${id}`, requestOptions).then(handleResponse);
}

function handleResponse(response) {
  return response.text().then((text) => {
    const data = text && JSON.parse(text);
    if (!response.ok) {
      if (response.status === 401) {
        logout();
        window.location.reload(true);
      }

      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }

    return data;
  });
}

function logout() {
  localStorage.removeItem('user');
}
