/* global dispatch */
import { tableDataConstants } from '../_constants';
import { tableService } from '../_services';
import { alertActions } from '.';
import { loaderActions } from '.';
import { validationActions } from '.';
import { history } from '../_helpers';

const tabs = {
  active: 'draft',
  draft: 'draft',
  inactive: 'active',
};

export const tableDataActions = {
  getAll,
  getById,
  create,
  update,
  delete: _delete,
  setPage,
};

function getAll(search, page, url) {
  return (dispatch) => {
    dispatch(request());

    tableService.getAll(search, url)
      .then(
        tableData => dispatch(success(tableData)),
        error => dispatch(failure(error.toString())),
      );
  };

  function request() { return { type: tableDataConstants.GETALL_REQUEST }; }
  function success(tableData) {
    return { type: tableDataConstants.GETALL_SUCCESS, tableData, page };
  }
  function failure(error) { return { type: tableDataConstants.GETALL_FAILURE, error }; }
}

function getById(id, url) {
  return (dispatch) => {
    dispatch(request());
    return tableService.getById(id, url)
      .then(
        tableRecord => dispatch(success(tableRecord)),
        error => dispatch(failure(error.toString())),
      );
  };

  function request() { return { type: tableDataConstants.GETBYID_REQUEST }; }
  function success(tableRecord) {
    return { type: tableDataConstants.GETBYID_SUCCESS, tableRecord };
  }
  function failure(error) { return { type: tableDataConstants.GETBYID_FAILURE, error }; }
}

function create(data, url) {
  return (dispatch) => {
    dispatch(loaderActions.start());

    return tableService.create(data, url)
      .then(
        () => {
          dispatch(loaderActions.stop());
          dispatch(success());
          history.push(`/${url}/draft`);
          dispatch(alertActions.success('Record has been added'));
        },
        (errorArr) => {
          dispatch(loaderActions.stop());
          dispatch(validationActions.error(errorArr));
        },
      );
  };

  function request(rec) { return { type: tableDataConstants.CREATE_REQUEST, rec }; }
  function success(rec) { return { type: tableDataConstants.CREATE_SUCCESS, rec }; }
  function failure(err) { return { type: tableDataConstants.CREATE_FAILURE, err }; }
}

function update(record, url) {
  return (dispatch) => {
    dispatch(loaderActions.start());

    return tableService.update(record, url)
      .then(
        () => {
          const tabToRedirect = tabs[record.status];
          dispatch(loaderActions.stop());
          dispatch(success());
          history.push(`/${url}/${tabToRedirect}`);
          dispatch(alertActions.success('Update successful'));
        },
        (errorArr) => {
          console.log(errorArr);
          dispatch(loaderActions.stop());
          dispatch(validationActions.error(errorArr));
        },
      );
  };

  function request() { return { type: tableDataConstants.UPDATE_REQUEST }; }
  function success() { return { type: tableDataConstants.UPDATE_SUCCESS }; }
  function failure() { return { type: tableDataConstants.UPDATE_FAILURE }; }
}

function _delete(id, url) {
  return (dispatch) => {
    dispatch(loaderActions.start());
    dispatch(request(id));

    return tableService.delete(id, url)
      .then(
        () => {
          dispatch(loaderActions.stop());
          dispatch(success(id));
        },
        (error) => {
          dispatch(loaderActions.stop());
          dispatch(failure(id, error.toString()));
        },
      )
      .then(() => {
        history.push(`/${url}/draft`);
        dispatch(alertActions.success('Record has been deleted'));
      });
  };

  function request() { return { type: tableDataConstants.DELETE_REQUEST }; }
  function success() { return { type: tableDataConstants.DELETE_SUCCESS }; }
  function failure() { return { type: tableDataConstants.DELETE_FAILURE }; }
}

function setPage(page) {
  dispatch(success(page));

  function success(page) { return { type: tableDataConstants.SETPAGE_SUCCESS, page }; }
}
