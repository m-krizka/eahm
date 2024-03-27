/* global window fetch localStorage */

import config from '../../config.json';
import { authHeader } from '../_helpers';

export default function getAircraftConstantsForType(type) {
  const requestOptions = {
    method: 'GET',
    headers: { ...authHeader() },
  };

  return fetch(`${config.apiUrl}/api/aircraft-types/${type}/aircraft-constants`, requestOptions)
    .then(handleResponse);
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
