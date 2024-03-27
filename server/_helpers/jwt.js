const expressJwt = require('express-jwt');
const config = require('../../config.json');
const userService = require('../users/user.service');

async function isRevoked(req, payload, done) {
  const user = await userService.getById(payload.sub);

  // Revoke token if user no longer exists
  if (!user) {
    return done(null, true);
  }

  done();
  return true;
}

function jwt() {
  const { secret } = config;
  return expressJwt({ secret, isRevoked }).unless({
    path: [
      // Public routes that do not require authentication
      '/api/users/authenticate',
      '/api/users/register',
      '/login',
    ],
  });
}

module.exports = jwt;
