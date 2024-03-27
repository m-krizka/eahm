import { combineReducers } from 'redux';

import { authentication } from './authentication.reducer';
import { registration } from './registration.reducer';
import { users } from './users.reducer';
import { alert } from './alert.reducer';
import { loader } from './loader.reducer';
import { validation } from './validation.reducer';
import { tableData } from './tableData.reducer';
import { subTableData } from './subTableData.reducer';
import { tableRecord } from './tableRecord.reducer';

const rootReducer = combineReducers({
  authentication,
  registration,
  users,
  alert,
  loader,
  validation,

  tableData,
  subTableData,
  tableRecord,
});

export default rootReducer;
