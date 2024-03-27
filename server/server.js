import '@babel/polyfill';
import path from 'path';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

import jwt from './_helpers/jwt';
import errorHandler from './_helpers/error-handler';
import setTableRoutes from './_helpers/setTableRoutes';
import userController from './users/user.controller';
import tableController from './table/table.controller';
import getConstantsForRegistration from './_helpers/getConstantsForRegistration';
import getConstantsForType from './_helpers/getConstantsForType';

let app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(process.env.PWD, 'static')));

// User route
app.use('/api/users', jwt());
app.use('/api/users', userController());

// Aircraft Types
app.use('/api/aircraft-types', jwt());
app.use('/api/aircraft-types', tableController());

// Retrieve Aircraft Constants based on Fleet Identifier
app.use('/api/fleet-identifiers/:registration/aircraft-constants', jwt());
app.get('/api/fleet-identifiers/:registration/aircraft-constants', getConstantsForRegistration);

// Retrieve Aircraft Constants based on Fleet Identifier
app.use('/api/aircraft-types/:aircraftType/aircraft-constants', jwt());
app.get('/api/aircraft-types/:aircraftType/aircraft-constants', getConstantsForType);

// Table routes
app = setTableRoutes(app);

// Fallback route
app.get('/*', (req, res) => {
  res.sendFile(path.resolve('./static/index.html'), (err) => {
    if (err) {
      res.status(500).send(err);
    }
  });
});

// Global error handler
app.use(errorHandler);

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Server listening on port ${port}`));
