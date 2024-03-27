const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const userModel = require('../users/user.model');
const regTokenModel = require('../users/regToken.model');
const tableModel = require('../table/table.model');

if (true) {
  mongoose.connect(
    `mongodb+srv://airlinedata:KyrMxr12Vi7UQTro@cluster0.8fh1d.mongodb.net/airlinedata?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true },
  )
    .then(() => console.log('DB connected'))
    .catch(err => console.error(err));
} else {
  mongoose.connect('mongodb://localhost:27017/a', { useNewUrlParser: true })
    .then(() => console.log('DB connected'))
    .catch(err => console.error(err));
}

mongoose.Promise = global.Promise;

const schemasToExport = {
  User: userModel,
  RegToken: regTokenModel,
  ...tableModel,
};


module.exports = schemasToExport;
