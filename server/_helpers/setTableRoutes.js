import { tables } from '../../src/config/_tables';
import tableController from '../table/table.controller';
import jwt from './jwt';

export default function setTableRoutes(app) {
  return tables.reduce((prevApp, table) => {
    prevApp.use(`/api/${table.url}`, jwt());
    prevApp.use(`/api/${table.url}`, tableController());
    if (table.withMapping === true) {
      prevApp.use(`/api/${table.url}-mapping`, tableController());
    }
    return prevApp;
  }, app);
}
