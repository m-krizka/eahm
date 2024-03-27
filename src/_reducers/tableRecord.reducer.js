import { tableDataConstants } from '../_constants';
import moment from 'moment';

export function tableRecord(state = {}, action) {
  if (action.tableRecord) {
    action.tableRecord['effFrom'] = moment(new Date(action.tableRecord.effFrom));
    action.tableRecord['effTo'] = action.tableRecord.effTo ? moment(new Date(action.tableRecord.effTo)) : null;
  }
  switch (action.type) {
    case tableDataConstants.GETBYID_REQUEST:
      return {
        loading: true,
      };
    case tableDataConstants.GETBYID_SUCCESS:
      return {
        item: action.tableRecord,
      };
    case tableDataConstants.GETBYID_FAILURE:
      return {
        error: action.error,
      };

    case tableDataConstants.CREATE_REQUEST:
      return {
        creating: true,
      };
    case tableDataConstants.CREATE_SUCCESS:
      return {};
    case tableDataConstants.CREATE_FAILURE:
      return {
        validationArr: action.err,
      };

    case tableDataConstants.UPDATE_REQUEST:
      return {
        updating: true,
      };
    case tableDataConstants.UPDATE_SUCCESS:
      return {
        item: 'ok',
      };
    case tableDataConstants.UPDATE_FAILURE:
      return {
        error: action.error,
      };

    case tableDataConstants.DELETE_REQUEST:
      return {
        deleting: true,
      };
    case tableDataConstants.DELETE_SUCCESS:
      return {};
    case tableDataConstants.DELETE_FAILURE:
      return {};

    default:
      return state;
  }
}
