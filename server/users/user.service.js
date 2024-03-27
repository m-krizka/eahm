const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const config = require('../../config.json');
const db = require('../_helpers/db.js');

const { User } = db;
const { RegToken } = db;

module.exports = {
  authenticate,
  getAll,
  getById,
  create,
  update,
  delete: _delete,
};

async function authenticate({ email, password }) {
  const user = await User.findOne({ email });
  if (user && bcrypt.compareSync(password, user.hash)) {
    const { hash, ...userWithoutHash } = user.toObject();
    const token = jwt.sign({ sub: user.id }, config.secret);
    return {
      ...userWithoutHash,
      token,
    };
  }
  return true;
}

async function getAll() {
  const result = await User.find().select('-hash');
  return result;
}

async function getById(id) {
  const result = await User.findById(id).select('-hash');
  return result;
}

async function create(userParam) {
  // validate
  if (await User.findOne({ email: userParam.email })) {
    throw new Error(`Username ${userParam.email} is already taken`);
  }

  const tokenObject = await RegToken.findOne({ email: userParam.email });
  const tokenDB = tokenObject.token;
  const doTokensMatch = bcrypt.compareSync(userParam.regToken, tokenDB);

  if (!doTokensMatch) throw new Error('Invalid token');

  const user = new User(userParam);

  if (userParam.password1) {
    user.hash = bcrypt.hashSync(userParam.password1, 10);
  }

  await user.save();
}

async function update(id, userParam) {
  const user = await User.findById(id);

  // validate
  if (!user) throw new Error('User not found');
  const userDB = await User.findOne({ username: userParam.username });
  if (user.username !== userParam.username && userDB) {
    throw new Error(`Username ${userParam.username} is already taken`);
  }

  // hash password if it was entered
  if (userParam.password) {
    userParam.hash = bcrypt.hashSync(userParam.password, 10);
  }

  // copy userParam properties to user
  Object.assign(user, userParam);

  await user.save();
}

async function _delete(id) {
  await User.findByIdAndRemove(id);
}
